// POST /api/book — 予約を確定する
// 1. 枠の再検証（ダブルブッキング防止）
// 2. Zoomミーティング作成（有料アカウント）
// 3. Googleカレンダー登録＋相手へ招待メール（sendUpdates=all）
// 4. 確認メール（相手）＋通知メール（主催者）を自動送信
// 5. リマインド用に予約を保存

import type { Config } from '@netlify/functions';
import { CONFIG, assertServerConfig, json } from './lib/config';
import { createZoomMeeting, deleteZoomMeeting } from './lib/zoom';
import { createCalendarEvent, sendGmail } from './lib/google';
import { isSlotAvailable } from './lib/slots';
import { saveBooking, type Booking } from './lib/store';
import { confirmationEmail, hostNotificationEmail } from './lib/emails';
import { jstLabel } from './lib/time';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const missing = assertServerConfig();
  if (missing.length > 0) {
    return json({ error: `サーバー設定が未完了です（環境変数: ${missing.join(', ')}）` }, 503);
  }

  let body: { name?: string; email?: string; note?: string; start?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'リクエスト形式が不正です。' }, 400);
  }

  // honeypot（botはこの不可視フィールドを埋める）
  if (body.website) return json({ ok: true });

  const name = (body.name || '').trim().slice(0, 100);
  const email = (body.email || '').trim().slice(0, 200);
  const note = (body.note || '').trim().slice(0, 2000);
  const start = (body.start || '').trim();

  if (!name) return json({ error: 'お名前を入力してください。' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'メールアドレスの形式が正しくありません。' }, 400);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\+09:00$/.test(start)) {
    return json({ error: '日時の指定が不正です。' }, 400);
  }

  try {
    // 枠の再検証（画面表示後に他の予約やカレンダー予定が入った場合を弾く）
    if (!(await isSlotAvailable(start))) {
      return json({ error: 'この枠は埋まってしまいました。別の日時をお選びください。', code: 'SLOT_TAKEN' }, 409);
    }

    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + CONFIG.slotMinutes * 60 * 1000);
    const endIso = start.replace(/T\d{2}:\d{2}/, (m) => {
      const [h, min] = m.slice(1).split(':').map(Number);
      const total = h * 60 + min + CONFIG.slotMinutes;
      return `T${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
    });

    // 1) Zoomミーティング作成
    const zoom = await createZoomMeeting({
      topic: `${CONFIG.meetingTitle}｜${name}様`,
      agenda: note ? `ご相談内容: ${note}` : '',
      startJstIso: start.replace('+09:00', ''),
      durationMinutes: CONFIG.slotMinutes,
    });

    // 2) Googleカレンダー登録 + 相手へ招待（失敗時はZoomを削除してロールバック）
    let calendarEventId = '';
    try {
      const event = await createCalendarEvent({
        summary: `${CONFIG.meetingTitle}｜${name}様`,
        description: [
          `Zoom参加リンク: ${zoom.join_url}`,
          '',
          `お名前: ${name}`,
          `メール: ${email}`,
          note ? `ご相談内容: ${note}` : '',
        ].join('\n'),
        startIso: start,
        endIso,
        attendeeEmail: email,
        attendeeName: name,
        location: zoom.join_url,
      });
      calendarEventId = event.id;
    } catch (err) {
      await deleteZoomMeeting(zoom.id).catch(() => {});
      throw err;
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      name,
      email,
      note,
      start,
      end: endIso,
      zoomMeetingId: String(zoom.id),
      zoomJoinUrl: zoom.join_url,
      calendarEventId,
      createdAt: new Date().toISOString(),
      reminded24h: false,
      reminded1h: false,
      status: 'confirmed',
    };

    // 3) 保存（リマインド送信に必要）
    await saveBooking(booking);

    // 4) メール送信（確認＋主催者通知）。失敗しても予約自体は成立させる
    const results = await Promise.allSettled([
      (async () => {
        const m = confirmationEmail(booking);
        await sendGmail({ to: email, subject: m.subject, html: m.html });
      })(),
      (async () => {
        const m = hostNotificationEmail(booking);
        await sendGmail({ to: CONFIG.hostEmail, subject: m.subject, html: m.html });
      })(),
    ]);
    results.forEach((r) => {
      if (r.status === 'rejected') console.error('booking email error:', r.reason);
    });

    return json({
      ok: true,
      booking: {
        start,
        end: endIso,
        label: jstLabel(startDate),
        joinUrl: zoom.join_url,
      },
    });
  } catch (err) {
    console.error('book error:', err);
    return json({ error: '予約処理中にエラーが発生しました。時間をおいて再度お試しください。' }, 500);
  }
};

export const config: Config = {
  path: '/api/book',
};
