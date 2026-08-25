#!/usr/bin/env node
/**
 * Threads の指定アカウントの新着投稿を取得し、自分の LINE に push する。
 *
 * 使い方:
 *   node scripts/threads-line/notify.mjs
 *   DRY_RUN=1 node scripts/threads-line/notify.mjs   # 送信せず内容だけ確認
 *
 * 設定は環境変数で行う。詳細は scripts/threads-line/README.md を参照。
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { loadConfig } from './lib/config.mjs';
import { fetchFeed } from './lib/fetchFeed.mjs';
import { parseFeed } from './lib/feed.mjs';
import { buildEmptyMessage, buildMessages } from './lib/format.mjs';
import { pushTextMessages } from './lib/line.mjs';
import { loadState, saveState } from './lib/state.mjs';

const STATE_PATH = join(dirname(fileURLToPath(import.meta.url)), 'state.json');

/**
 * 未通知かつ取得対象期間内の投稿を、古い順に返す。
 * 期間フィルタは初回実行でフィード全件が一気に流れるのを防ぐためのもの。
 */
function selectNewPosts(posts, { seen, cutoff, maxPosts }) {
  const seenIds = new Set(seen);

  return posts
    .filter((post) => post.id && post.url)
    .filter((post) => !seenIds.has(post.id))
    .filter((post) => !post.publishedAt || post.publishedAt >= cutoff)
    .sort((a, b) => (a.publishedAt?.getTime() ?? 0) - (b.publishedAt?.getTime() ?? 0))
    .slice(-maxPosts);
}

async function main() {
  const config = loadConfig();
  const state = await loadState(STATE_PATH);

  console.log(`フィード取得: ${config.feedUrl}`);
  const posts = parseFeed(await fetchFeed(config.feedUrl));
  console.log(`フィード内の投稿数: ${posts.length}`);

  if (posts.length === 0) {
    throw new Error(
      'フィードから投稿を1件も取得できませんでした。THREADS_FEED_URL が有効か確認してください。',
    );
  }

  const cutoff = new Date(Date.now() - config.lookbackHours * 60 * 60 * 1000);
  const newPosts = selectNewPosts(posts, {
    seen: state.seen,
    cutoff,
    maxPosts: config.maxPosts,
  });
  console.log(`新着として配信する投稿数: ${newPosts.length}`);

  const messages =
    newPosts.length > 0
      ? buildMessages(newPosts, config)
      : config.notifyWhenEmpty
        ? [buildEmptyMessage(config)]
        : [];

  if (messages.length === 0) {
    console.log('新着なしのため送信をスキップしました。');
    return;
  }

  if (config.dryRun) {
    console.log('--- DRY_RUN: 以下の内容を送信します ---');
    messages.forEach((message) => console.log(`${message}\n---`));
    return;
  }

  await pushTextMessages({ accessToken: config.accessToken, to: config.to, texts: messages });
  console.log('LINE への送信が完了しました。');

  if (newPosts.length > 0) {
    await saveState(
      STATE_PATH,
      {
        seen: [...state.seen, ...newPosts.map((post) => post.id)],
        lastNotifiedAt: new Date().toISOString(),
      },
      config,
    );
    console.log(`state.json を更新しました（${newPosts.length}件を通知済みに記録）。`);
  }
}

main().catch((error) => {
  console.error(`エラー: ${error.message}`);
  process.exitCode = 1;
});
