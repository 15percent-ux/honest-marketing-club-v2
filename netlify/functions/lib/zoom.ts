// Zoom Server-to-Server OAuth でミーティングを自動作成する
// 有料プランのZoomアカウント（HOST_EMAIL）のマーケットプレイスアプリの資格情報を使う

import { CONFIG } from './config';

interface ZoomMeeting {
  id: number;
  join_url: string;
  start_url: string;
  password?: string;
}

async function getZoomAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CONFIG.zoomClientId}:${CONFIG.zoomClientSecret}`).toString('base64');
  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(CONFIG.zoomAccountId)}`,
    {
      method: 'POST',
      headers: { Authorization: `Basic ${basic}` },
    }
  );
  if (!res.ok) {
    throw new Error(`Zoom token error (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createZoomMeeting(params: {
  topic: string;
  agenda?: string;
  startJstIso: string; // 例: 2026-08-20T10:00:00 （timezoneフィールドで解釈させるためオフセットなし）
  durationMinutes: number;
}): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();
  const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      topic: params.topic,
      agenda: params.agenda || '',
      type: 2, // scheduled meeting
      start_time: params.startJstIso,
      timezone: CONFIG.timezone,
      duration: params.durationMinutes,
      default_password: true,
      settings: {
        waiting_room: true,
        join_before_host: false,
        host_video: true,
        participant_video: true,
        audio: 'both',
        approval_type: 2,
        email_notification: false, // 通知は自前のメール＋カレンダー招待で行う
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`Zoom create meeting error (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as ZoomMeeting;
}

export async function deleteZoomMeeting(meetingId: string | number): Promise<void> {
  const token = await getZoomAccessToken();
  await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
