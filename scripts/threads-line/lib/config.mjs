const DEFAULTS = {
  username: '4610_hotel',
  maxPosts: 5,
  lookbackHours: 26,
  bodyCharLimit: 220,
  stateSize: 300,
};

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `環境変数 ${name} が未設定です。scripts/threads-line/README.md のセットアップ手順を確認してください。`,
    );
  }
  return value;
}

function intEnv(name, fallback) {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`環境変数 ${name} は正の整数で指定してください（現在: ${raw}）。`);
  }
  return parsed;
}

function boolEnv(name) {
  const raw = process.env[name]?.trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes';
}

export function loadConfig() {
  const dryRun = boolEnv('DRY_RUN');
  const username = (process.env.THREADS_USERNAME?.trim() || DEFAULTS.username).replace(/^@/, '');

  return {
    dryRun,
    username,
    profileUrl: `https://www.threads.com/@${username}`,
    // Threads 公式 API は他人のアカウントを読めないため、RSS 変換サービスの URL が必須。
    // 公開インスタンスの rsshub.app は本番利用を拒否しているので既定値は用意しない。
    feedUrl: requireEnv('THREADS_FEED_URL'),
    // DRY_RUN のときは LINE の資格情報なしでも動作確認できるようにする。
    accessToken: dryRun ? (process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '') : requireEnv('LINE_CHANNEL_ACCESS_TOKEN'),
    to: dryRun ? (process.env.LINE_TO ?? '') : requireEnv('LINE_TO'),
    maxPosts: intEnv('MAX_POSTS_PER_RUN', DEFAULTS.maxPosts),
    lookbackHours: intEnv('LOOKBACK_HOURS', DEFAULTS.lookbackHours),
    bodyCharLimit: intEnv('BODY_CHAR_LIMIT', DEFAULTS.bodyCharLimit),
    stateSize: DEFAULTS.stateSize,
    notifyWhenEmpty: boolEnv('NOTIFY_WHEN_EMPTY'),
  };
}
