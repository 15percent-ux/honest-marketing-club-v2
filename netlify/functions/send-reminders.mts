// 定期実行（15分ごと）：開始24時間前と1時間前に相手へリマインドメールを自動送信する

import type { Config } from '@netlify/functions';
import { assertServerConfig } from './lib/config';
import { sendGmail } from './lib/google';
import { listUpcomingBookings, saveBooking } from './lib/store';
import { reminder1hEmail, reminder24hEmail } from './lib/emails';

export default async () => {
  const missing = assertServerConfig();
  if (missing.length > 0) {
    console.warn(`send-reminders: 環境変数が未設定のためスキップ: ${missing.join(', ')}`);
    return new Response('config missing', { status: 200 });
  }

  const now = new Date();
  const in25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);
  const bookings = await listUpcomingBookings(now, in25h);

  let sent = 0;
  for (const b of bookings) {
    const msUntilStart = new Date(b.start).getTime() - now.getTime();
    const hoursUntil = msUntilStart / (60 * 60 * 1000);

    try {
      // 前日リマインド：残り24時間を切ったら一度だけ送る（1時間前リマインドと近すぎる場合は省略）
      if (!b.reminded24h && hoursUntil <= 24 && hoursUntil > 2) {
        const m = reminder24hEmail(b);
        await sendGmail({ to: b.email, subject: m.subject, html: m.html });
        b.reminded24h = true;
        await saveBooking(b);
        sent++;
      }

      // 1時間前リマインド：残り1時間を切ったら一度だけ送る
      if (!b.reminded1h && hoursUntil <= 1 && hoursUntil > 0) {
        const m = reminder1hEmail(b);
        await sendGmail({ to: b.email, subject: m.subject, html: m.html });
        b.reminded1h = true;
        if (hoursUntil <= 2) b.reminded24h = true; // 直前予約では前日分は不要
        await saveBooking(b);
        sent++;
      }
    } catch (err) {
      console.error(`send-reminders: booking ${b.id} でエラー:`, err);
    }
  }

  console.log(`send-reminders: ${bookings.length}件の予約を確認、${sent}通送信`);
  return new Response(`sent ${sent}`, { status: 200 });
};

export const config: Config = {
  schedule: '*/15 * * * *',
};
