// GET /api/availability — 予約可能な日時枠を返す

import type { Config } from '@netlify/functions';
import { CONFIG, assertServerConfig, json } from './lib/config';
import { getAvailableSlots } from './lib/slots';

export default async (req: Request) => {
  if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  const missing = assertServerConfig();
  if (missing.length > 0) {
    return json({ error: `サーバー設定が未完了です（環境変数: ${missing.join(', ')}）` }, 503);
  }

  try {
    const days = await getAvailableSlots();
    return json({
      timezone: CONFIG.timezone,
      slotMinutes: CONFIG.slotMinutes,
      days,
    });
  } catch (err) {
    console.error('availability error:', err);
    return json({ error: '空き状況の取得に失敗しました。時間をおいて再度お試しください。' }, 500);
  }
};

export const config: Config = {
  path: '/api/availability',
};
