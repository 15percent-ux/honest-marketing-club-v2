import { TEXT_LIMIT } from './line.mjs';

const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

function truncate(text, limit) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}…`;
}

function formatDate(date) {
  if (!date) return '';
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const month = jst.getUTCMonth() + 1;
  const day = jst.getUTCDate();
  const hour = String(jst.getUTCHours()).padStart(2, '0');
  const minute = String(jst.getUTCMinutes()).padStart(2, '0');
  return `${month}/${day} ${hour}:${minute}`;
}

/**
 * 1投稿分のブロックを組み立てる。title と body が同一文言になるフィードが多いので重複は落とす。
 */
function renderPost(post, index, bodyCharLimit) {
  const marker = CIRCLED[index] ?? `(${index + 1})`;
  const headline = post.title || post.body;
  const lines = [`${marker} ${truncate(headline, bodyCharLimit)}`];

  if (post.body && post.body !== post.title && !post.title.startsWith(post.body)) {
    const rest = post.body.startsWith(post.title) ? post.body.slice(post.title.length).trim() : post.body;
    if (rest) lines.push(truncate(rest, bodyCharLimit));
  }

  const meta = [formatDate(post.publishedAt), post.url].filter(Boolean).join('\n');
  if (meta) lines.push(meta);

  return lines.join('\n');
}

/**
 * 新着投稿を LINE のテキストメッセージ配列に変換する。
 * 1通が上限を超える場合は複数通に分割する。
 * @returns {string[]}
 */
export function buildMessages(posts, { username, profileUrl, bodyCharLimit }) {
  const header = `📌 @${username} の新着スレッド（${posts.length}件）`;
  const footer = `── 全投稿を見る\n${profileUrl}`;
  const blocks = posts.map((post, index) => renderPost(post, index, bodyCharLimit));

  const messages = [];
  let current = header;

  for (const block of blocks) {
    const candidate = `${current}\n\n${block}`;
    if (candidate.length > TEXT_LIMIT - footer.length - 2) {
      messages.push(current);
      current = block;
    } else {
      current = candidate;
    }
  }

  messages.push(`${current}\n\n${footer}`);
  return messages;
}

export function buildEmptyMessage({ username, profileUrl }) {
  return `📭 @${username} の新着スレッドはありませんでした。\n${profileUrl}`;
}
