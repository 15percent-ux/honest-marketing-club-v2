// 予約システムの設定。環境変数（Netlifyの環境変数設定）で上書きできる。

function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  const n = v ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export const CONFIG = {
  // ホスト（主催者）情報
  hostEmail: process.env.HOST_EMAIL || 'millefield@gmail.com',
  hostName: process.env.HOST_NAME || 'Honest Marketing Club',

  // Zoom Server-to-Server OAuth
  zoomAccountId: process.env.ZOOM_ACCOUNT_ID || '',
  zoomClientId: process.env.ZOOM_CLIENT_ID || '',
  zoomClientSecret: process.env.ZOOM_CLIENT_SECRET || '',

  // Google OAuth（millefield@gmail.com の refresh token）
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
  calendarId: process.env.BOOKING_CALENDAR_ID || 'primary',

  // 予約枠のルール（日本時間）
  timezone: 'Asia/Tokyo',
  tzOffset: '+09:00', // Asia/Tokyo はDSTなしの固定オフセット
  slotMinutes: envInt('BOOKING_SLOT_MINUTES', 60),
  startHour: envInt('BOOKING_START_HOUR', 10), // 受付開始 10:00 JST
  endHour: envInt('BOOKING_END_HOUR', 18), // 最終枠は endHour - slot 開始
  daysAhead: envInt('BOOKING_DAYS_AHEAD', 14),
  minNoticeHours: envInt('BOOKING_MIN_NOTICE_HOURS', 12),

  meetingTitle: process.env.BOOKING_MEETING_TITLE || '無料相談（Honest Marketing Club）',
};

export function assertServerConfig(): string[] {
  const missing: string[] = [];
  if (!CONFIG.zoomAccountId) missing.push('ZOOM_ACCOUNT_ID');
  if (!CONFIG.zoomClientId) missing.push('ZOOM_CLIENT_ID');
  if (!CONFIG.zoomClientSecret) missing.push('ZOOM_CLIENT_SECRET');
  if (!CONFIG.googleClientId) missing.push('GOOGLE_CLIENT_ID');
  if (!CONFIG.googleClientSecret) missing.push('GOOGLE_CLIENT_SECRET');
  if (!CONFIG.googleRefreshToken) missing.push('GOOGLE_REFRESH_TOKEN');
  return missing;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
