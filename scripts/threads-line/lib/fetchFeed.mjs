const RETRY_DELAYS_MS = [2000, 4000, 8000];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * RSS を取得する。RSSHub の公開インスタンスは一時的に 429/5xx を返すことがあるのでリトライする。
 */
export async function fetchFeed(url) {
  let lastError;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'honest-marketing-club-threads-line/1.0',
          Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8',
        },
        signal: AbortSignal.timeout(30_000),
      });

      if (!response.ok) {
        throw new Error(`フィード取得に失敗しました (${response.status} ${response.statusText}): ${url}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      const delay = RETRY_DELAYS_MS[attempt];
      if (delay === undefined) break;
      console.warn(`フィード取得に失敗、${delay / 1000}秒後に再試行します: ${error.message}`);
      await sleep(delay);
    }
  }

  throw lastError;
}
