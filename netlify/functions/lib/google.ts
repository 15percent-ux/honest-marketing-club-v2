// Google API（カレンダー登録・空き状況・Gmail送信）
// millefield@gmail.com の OAuth refresh token を使ってアクセスする

import { CONFIG } from './config';

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getGoogleAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CONFIG.googleClientId,
      client_secret: CONFIG.googleClientSecret,
      refresh_token: CONFIG.googleRefreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token error (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

/** 指定期間の予定あり時間帯（busy）を返す */
export async function getBusyIntervals(
  timeMin: Date,
  timeMax: Date
): Promise<Array<{ start: Date; end: Date }>> {
  const token = await getGoogleAccessToken();
  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: CONFIG.timezone,
      items: [{ id: CONFIG.calendarId }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Google freeBusy error (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as {
    calendars: Record<string, { busy: Array<{ start: string; end: string }> }>;
  };
  const busy = Object.values(data.calendars)[0]?.busy || [];
  return busy.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

/**
 * Googleカレンダーに予定を作成し、相手（attendee）へ招待メールを自動送信する。
 * sendUpdates=all により、相手には Google からカレンダー招待が届き、
 * 承諾すれば相手のカレンダーにも自動で追加される。
 */
export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  startIso: string; // +09:00 付きISO
  endIso: string;
  attendeeEmail: string;
  attendeeName: string;
  location?: string;
}): Promise<{ id: string; htmlLink: string }> {
  const token = await getGoogleAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CONFIG.calendarId)}/events?sendUpdates=all`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        summary: params.summary,
        description: params.description,
        location: params.location || '',
        start: { dateTime: params.startIso, timeZone: CONFIG.timezone },
        end: { dateTime: params.endIso, timeZone: CONFIG.timezone },
        attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 主催者への前日メール通知
            { method: 'popup', minutes: 60 },
          ],
        },
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Google calendar insert error (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as { id: string; htmlLink: string };
}

/** 予定の状態を返す。'deleted' = 予定が存在しない or 中止済み */
export async function getCalendarEventStatus(eventId: string): Promise<'active' | 'deleted' | 'unknown'> {
  const token = await getGoogleAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CONFIG.calendarId)}/events/${encodeURIComponent(eventId)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (res.status === 404 || res.status === 410) return 'deleted';
  if (!res.ok) return 'unknown';
  const data = (await res.json()) as { status?: string };
  return data.status === 'cancelled' ? 'deleted' : 'active';
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = await getGoogleAccessToken();
  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CONFIG.calendarId)}/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
  );
}

// ---- Gmail 送信 ----

function b64urlEncode(input: string | Buffer): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf-8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** 日本語ヘッダ用の RFC 2047 エンコード */
function encodeHeader(text: string): string {
  return /^[\x00-\x7F]*$/.test(text)
    ? text
    : `=?UTF-8?B?${Buffer.from(text, 'utf-8').toString('base64')}?=`;
}

/** millefield@gmail.com から HTML メールを送信する */
export async function sendGmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const token = await getGoogleAccessToken();
  const bodyB64 = Buffer.from(params.html, 'utf-8').toString('base64');
  const mime = [
    `From: ${encodeHeader(CONFIG.hostName)} <${CONFIG.hostEmail}>`,
    `To: ${params.to}`,
    `Subject: ${encodeHeader(params.subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    bodyB64,
  ].join('\r\n');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ raw: b64urlEncode(mime) }),
  });
  if (!res.ok) {
    throw new Error(`Gmail send error (${res.status}): ${await res.text()}`);
  }
}
