// /api/cancel — 予約者本人によるキャンセル（メール内の専用リンクからアクセス）
// GET: 確認画面を表示 / POST: キャンセル実行
// 実行内容: Googleカレンダーの予定削除（相手へ中止通知メールが自動送信される）
//          → Zoomミーティング削除 → 予約を cancelled に更新 → 双方へキャンセル完了メール

import type { Config } from '@netlify/functions';
import { CONFIG, assertServerConfig } from './lib/config';
import { deleteZoomMeeting } from './lib/zoom';
import { deleteCalendarEvent, sendGmail } from './lib/google';
import { getBookingByKey, saveBooking, type Booking } from './lib/store';
import { cancellationEmail, cancellationHostEmail, escapeHtml } from './lib/emails';
import { jstLabel } from './lib/time';

const GOLD = '#c5a059';

function page(title: string, bodyHtml: string, status = 200): Response {
  const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(title)} | ${escapeHtml(CONFIG.hostName)}</title>
<style>
  body{margin:0;background:#0a0a0a;color:#fafaf9;font-family:'Hiragino Sans','Noto Sans JP',sans-serif;line-height:1.9;}
  .wrap{max-width:480px;margin:0 auto;padding:64px 24px;text-align:center;}
  .brand{color:${GOLD};font-size:11px;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:40px;}
  h1{font-size:20px;font-weight:700;margin:0 0 24px;}
  p{font-size:14px;color:#a8a29e;margin:0 0 16px;}
  .card{background:#171717;border:1px solid #262626;border-radius:12px;padding:20px;margin:24px 0;font-size:14px;color:#fafaf9;}
  .btn{display:inline-block;background:${GOLD};color:#0a0a0a;border:none;border-radius:8px;padding:14px 40px;font-size:14px;font-weight:700;letter-spacing:0.1em;cursor:pointer;text-decoration:none;}
  .link{color:${GOLD};text-decoration:underline;font-size:13px;}
</style></head>
<body><div class="wrap"><div class="brand">${escapeHtml(CONFIG.hostName)}</div>${bodyHtml}</div></body></html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function validate(booking: Booking | null, token: string): { error?: Response; booking?: Booking } {
  if (!booking || !token || booking.cancelToken !== token) {
    return { error: page('リンクが無効です', `<h1>リンクが無効です</h1><p>この予約は見つかりませんでした。お手数ですが、メールへの返信でご連絡ください。</p>`, 404) };
  }
  if (booking.status === 'cancelled') {
    return { error: page('キャンセル済み', `<h1>すでにキャンセル済みです</h1><p>この予約はキャンセルされています。<br/>改めてのご予約は予約ページからお願いします。</p>`) };
  }
  if (new Date(booking.start).getTime() <= Date.now()) {
    return { error: page('キャンセルできません', `<h1>開始時刻を過ぎています</h1><p>この予約はオンラインでのキャンセルができません。<br/>お手数ですが、メールへの返信でご連絡ください。</p>`) };
  }
  return { booking };
}

export default async (req: Request) => {
  const missing = assertServerConfig();
  if (missing.length > 0) return page('エラー', `<h1>設定エラー</h1><p>サーバー設定が未完了です。</p>`, 503);

  const url = new URL(req.url);
  const key = url.searchParams.get('key') || '';
  const token = url.searchParams.get('token') || '';

  const found = await getBookingByKey(key);
  const { error, booking } = validate(found, token);
  if (error || !booking) return error!;

  const label = `${jstLabel(new Date(booking.start))}〜`;

  if (req.method === 'GET') {
    return page(
      '予約のキャンセル',
      `<h1>ご予約をキャンセルしますか？</h1>
       <div class="card">${escapeHtml(booking.name)} 様<br/>${label}（日本時間）<br/>Zoomミーティング</div>
       <p>キャンセルすると、Zoomミーティングとカレンダーの予定は削除されます。</p>
       <form method="POST" action="${url.pathname}?key=${encodeURIComponent(key)}&token=${encodeURIComponent(token)}">
         <button class="btn" type="submit">キャンセルを確定する</button>
       </form>
       <p style="margin-top:24px;"><a class="link" href="/#booking">日程を変更したい方はこちら（キャンセル後に再予約）</a></p>`
    );
  }

  if (req.method !== 'POST') return page('エラー', `<h1>不正なリクエストです</h1>`, 405);

  try {
    // カレンダー削除（sendUpdates=all で相手にGoogleの中止通知も届く）→ Zoom削除 → 状態更新
    await deleteCalendarEvent(booking.calendarEventId).catch((err) => console.error('cancel: calendar delete error:', err));
    await deleteZoomMeeting(booking.zoomMeetingId).catch((err) => console.error('cancel: zoom delete error:', err));

    booking.status = 'cancelled';
    await saveBooking(booking);

    const results = await Promise.allSettled([
      (async () => {
        const m = cancellationEmail(booking);
        await sendGmail({ to: booking.email, subject: m.subject, html: m.html });
      })(),
      (async () => {
        const m = cancellationHostEmail(booking);
        await sendGmail({ to: CONFIG.hostEmail, subject: m.subject, html: m.html });
      })(),
    ]);
    results.forEach((r) => {
      if (r.status === 'rejected') console.error('cancel email error:', r.reason);
    });

    return page(
      'キャンセル完了',
      `<h1>キャンセルが完了しました</h1>
       <div class="card">${label}（日本時間）</div>
       <p>確認メールをお送りしました。またのご予約をお待ちしております。</p>
       <p><a class="link" href="/#booking">別の日時で予約し直す</a></p>`
    );
  } catch (err) {
    console.error('cancel error:', err);
    return page('エラー', `<h1>処理中にエラーが発生しました</h1><p>時間をおいて再度お試しいただくか、メールへの返信でご連絡ください。</p>`, 500);
  }
};

export const config: Config = {
  path: '/api/cancel',
};
