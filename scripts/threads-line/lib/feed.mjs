/**
 * 依存パッケージなしの最小 RSS 2.0 / Atom パーサ。
 * RSS.app・RSSHub いずれの出力もこの2形式のどちらかに収まる。
 */

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  '#39': "'",
  nbsp: ' ',
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z0-9#]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function stripCdata(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

/** タグを剥がして本文だけにする（RSS の description は HTML が入ってくる）。 */
export function toPlainText(html) {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:p|div|li|tr|h[1-6])(?:\s[^>]*)?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  return decodeEntities(stripCdata(withBreaks))
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * タグの中身を「エンティティを解いていない生テキスト」として返す。
 * ここで先に解いてしまうと、本文中の `&lt;テスト&gt;` が toPlainText のタグ除去で消えてしまう。
 */
function rawTag(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`, 'i'));
  return match ? stripCdata(match[1]).trim() : '';
}

/** 属性値や日付・ID など、タグを含まない値の取り出し用。 */
function firstTag(xml, tagName) {
  return decodeEntities(rawTag(xml, tagName)).trim();
}

function allBlocks(xml, tagName) {
  const matches = xml.matchAll(new RegExp(`<${tagName}(?:\\s[^>]*)?>[\\s\\S]*?</${tagName}>`, 'gi'));
  return [...matches].map((m) => m[0]);
}

/** Atom の <link href="..."/> は属性側に URL がある。 */
function atomLink(xml) {
  const alternate = xml.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
  if (alternate) return decodeEntities(alternate[1]);
  const any = xml.match(/<link[^>]*href=["']([^"']+)["']/i);
  return any ? decodeEntities(any[1]) : '';
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * RSS/Atom の XML 文字列を投稿の配列に変換する。
 * @returns {{id: string, title: string, body: string, url: string, publishedAt: Date|null}[]}
 */
export function parseFeed(xml) {
  const isAtom = /<feed[\s>]/i.test(xml);
  const blocks = isAtom ? allBlocks(xml, 'entry') : allBlocks(xml, 'item');

  return blocks.map((block) => {
    const url = isAtom ? atomLink(block) : firstTag(block, 'link');
    const rawBody =
      rawTag(block, 'content:encoded') ||
      rawTag(block, 'content') ||
      rawTag(block, 'description') ||
      rawTag(block, 'summary');
    const publishedAt = parseDate(
      firstTag(block, 'pubDate') ||
        firstTag(block, 'published') ||
        firstTag(block, 'updated') ||
        firstTag(block, 'dc:date'),
    );

    return {
      id: firstTag(block, 'guid') || firstTag(block, 'id') || url,
      title: toPlainText(rawTag(block, 'title')),
      body: toPlainText(rawBody),
      url,
      publishedAt,
    };
  });
}
