// 確認・リマインドメールのテンプレート（HTML）

import { CONFIG } from './config';
import type { Booking } from './store';
import { jstLabel } from './time';

const GOLD = '#c5a059';

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="ja"><body style="margin:0;padding:0;background:#f5f5f4;font-family:'Hiragino Sans','Noto Sans JP',sans-serif;color:#1c1917;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#0a0a0a;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
      <p style="margin:0;color:${GOLD};font-size:11px;letter-spacing:0.4em;text-transform:uppercase;">${CONFIG.hostName}</p>
    </div>
    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:32px;">
      <h1 style="font-size:18px;margin:0 0 24px;border-bottom:2px solid ${GOLD};padding-bottom:12px;">${title}</h1>
      ${bodyHtml}
      <p style="font-size:11px;color:#a8a29e;margin-top:32px;border-top:1px solid #e7e5e4;padding-top:16px;">
        このメールは ${CONFIG.hostName}（${CONFIG.hostEmail}）の予約システムから自動送信されています。<br/>
        ご不明な点は、このメールに返信してお問い合わせください。
      </p>
    </div>
  </div>
</body></html>`;
}

function detailsTable(b: Booking): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;white-space:nowrap;">${label}</td><td style="padding:8px 12px;font-size:14px;">${value}</td></tr>`;
  return `<table style="width:100%;border-collapse:collapse;border:1px solid #e7e5e4;border-radius:8px;overflow:hidden;">
    ${row('日時', `${jstLabel(new Date(b.start))} 〜 ${jstLabel(new Date(b.end)).split(' ')[1]}（日本時間）`)}
    ${row('お名前', `${escapeHtml(b.name)} 様`)}
    ${row('形式', 'Zoomミーティング（オンライン）')}
  </table>
  <div style="text-align:center;margin:24px 0;">
    <a href="${b.zoomJoinUrl}" style="display:inline-block;background:#0a0a0a;color:${GOLD};text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;letter-spacing:0.1em;">Zoomに参加する</a>
    <p style="font-size:11px;color:#a8a29e;margin-top:8px;word-break:break-all;">${b.zoomJoinUrl}</p>
  </div>`;
}

function cancelSection(b: Booking): string {
  if (!b.cancelUrl) return '';
  return `<p style="text-align:center;font-size:12px;margin:8px 0 0;">
    <a href="${b.cancelUrl}" style="color:#78716c;text-decoration:underline;">ご予約のキャンセル・日程変更はこちら</a>
  </p>`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function confirmationEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【ご予約確定】${jstLabel(new Date(b.start))}〜 Zoomミーティングのご案内`,
    html: layout(
      'ご予約が確定しました',
      `<p style="font-size:14px;line-height:1.9;">${escapeHtml(b.name)} 様<br/><br/>
      この度はご予約いただきありがとうございます。以下の内容でZoomミーティングを確定しました。<br/>
      Googleカレンダーの招待も別途お送りしていますので、「はい」で承諾いただくとご自身のカレンダーに自動で追加されます。</p>
      ${detailsTable(b)}
      <p style="font-size:13px;line-height:1.9;color:#57534e;">・開始前日と1時間前にリマインドメールをお送りします。<br/>・当日は時間になりましたら上記リンクからご参加ください。</p>
      ${cancelSection(b)}`
    ),
  };
}

export function reminder24hEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【明日開催】${jstLabel(new Date(b.start))}〜 Zoomミーティングのリマインド`,
    html: layout(
      '明日のご予約のリマインドです',
      `<p style="font-size:14px;line-height:1.9;">${escapeHtml(b.name)} 様<br/><br/>
      ご予約いただいたZoomミーティングが明日に迫りましたのでお知らせします。</p>
      ${detailsTable(b)}
      <p style="font-size:13px;line-height:1.9;color:#57534e;">ご都合が悪くなった場合は、下記リンクからキャンセルいただけます。</p>
      ${cancelSection(b)}`
    ),
  };
}

export function reminder1hEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【まもなく開始】本日${jstLabel(new Date(b.start)).split(' ')[1]}〜 Zoomミーティング`,
    html: layout(
      'まもなく開始します',
      `<p style="font-size:14px;line-height:1.9;">${escapeHtml(b.name)} 様<br/><br/>
      Zoomミーティングの開始まで約1時間です。お時間になりましたら以下のリンクからご参加ください。</p>
      ${detailsTable(b)}
      ${cancelSection(b)}`
    ),
  };
}

export function cancellationEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【キャンセル完了】${jstLabel(new Date(b.start))}〜 のご予約`,
    html: layout(
      'ご予約をキャンセルしました',
      `<p style="font-size:14px;line-height:1.9;">${escapeHtml(b.name)} 様<br/><br/>
      以下のご予約のキャンセルを承りました。Zoomミーティングとカレンダーの予定は削除済みです。</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e7e5e4;">
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;white-space:nowrap;">キャンセルした日時</td><td style="padding:8px 12px;font-size:14px;">${jstLabel(new Date(b.start))}〜（日本時間）</td></tr>
      </table>
      <p style="font-size:13px;line-height:1.9;color:#57534e;">改めてのご予約は、予約ページからいつでもお取りいただけます。</p>`
    ),
  };
}

/** 主催者向け：キャンセルの通知 */
export function cancellationHostEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【予約キャンセル】${jstLabel(new Date(b.start))}〜 ${b.name} 様`,
    html: layout(
      '予約がキャンセルされました',
      `<table style="width:100%;border-collapse:collapse;border:1px solid #e7e5e4;">
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;white-space:nowrap;">日時</td><td style="padding:8px 12px;font-size:14px;">${jstLabel(new Date(b.start))}〜（日本時間）</td></tr>
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;">お名前</td><td style="padding:8px 12px;font-size:14px;">${escapeHtml(b.name)} 様</td></tr>
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;">メール</td><td style="padding:8px 12px;font-size:14px;">${escapeHtml(b.email)}</td></tr>
      </table>
      <p style="font-size:13px;color:#57534e;">Zoomミーティングとカレンダーの予定は自動削除済みです。この枠は再び予約可能になります。</p>`
    ),
  };
}

/** 主催者向け：新規予約の通知 */
export function hostNotificationEmail(b: Booking): { subject: string; html: string } {
  return {
    subject: `【新規予約】${jstLabel(new Date(b.start))}〜 ${b.name} 様`,
    html: layout(
      '新しい予約が入りました',
      `${detailsTable(b)}
      <table style="width:100%;border-collapse:collapse;border:1px solid #e7e5e4;margin-top:16px;">
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;">メール</td><td style="padding:8px 12px;font-size:14px;">${escapeHtml(b.email)}</td></tr>
        <tr><td style="padding:8px 12px;background:#fafaf9;font-size:12px;color:#78716c;">ご相談内容</td><td style="padding:8px 12px;font-size:14px;">${escapeHtml(b.note || '（記入なし）')}</td></tr>
      </table>
      <p style="font-size:13px;color:#57534e;">Googleカレンダーにも登録済みです。確認・リマインドメールは自動送信されます。</p>`
    ),
  };
}
