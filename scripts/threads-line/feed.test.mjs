import { test } from 'node:test';
import assert from 'node:assert/strict';

import { parseFeed, toPlainText } from './lib/feed.mjs';
import { buildMessages } from './lib/format.mjs';

const RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<item>
  <title><![CDATA[ショート動画の裏技↓]]></title>
  <description><![CDATA[<p>1行目</p><p>2行目 &quot;引用&quot;</p>]]></description>
  <link>https://www.threads.com/@4610_hotel/post/AAA</link>
  <guid isPermaLink="true">https://www.threads.com/@4610_hotel/post/AAA</guid>
  <pubDate>Mon, 25 Aug 2025 00:22:00 GMT</pubDate>
</item>
</channel></rss>`;

const ATOM = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<entry>
  <title type="html">タイトル &amp; 記号</title>
  <link rel="alternate" href="https://www.threads.com/@4610_hotel/post/BBB"/>
  <id>tag:threads,BBB</id>
  <summary>本文 &lt;テスト&gt;</summary>
  <published>2025-08-25T00:22:00Z</published>
</entry>
</feed>`;

test('RSS 2.0 の item を投稿として取り出す', () => {
  const [post] = parseFeed(RSS);
  assert.equal(post.title, 'ショート動画の裏技↓');
  assert.equal(post.body, '1行目\n\n2行目 "引用"');
  assert.equal(post.url, 'https://www.threads.com/@4610_hotel/post/AAA');
  assert.equal(post.id, 'https://www.threads.com/@4610_hotel/post/AAA');
  assert.equal(post.publishedAt.toISOString(), '2025-08-25T00:22:00.000Z');
});

test('Atom の entry を投稿として取り出す', () => {
  const [post] = parseFeed(ATOM);
  assert.equal(post.title, 'タイトル & 記号');
  assert.equal(post.url, 'https://www.threads.com/@4610_hotel/post/BBB');
  assert.equal(post.id, 'tag:threads,BBB');
});

test('本文中の山括弧はタグ除去で消さない', () => {
  const [post] = parseFeed(ATOM);
  assert.equal(post.body, '本文 <テスト>');
});

test('toPlainText は <br> と </p> を改行にする', () => {
  assert.equal(toPlainText('a<br/>b<p>c</p>'), 'a\nb\nc');
});

test('タイトルと本文が同一なら本文を重複表示しない', () => {
  const messages = buildMessages(
    [{ title: '同じ文言', body: '同じ文言', url: 'https://example.com/1', publishedAt: null }],
    { username: '4610_hotel', profileUrl: 'https://www.threads.com/@4610_hotel', bodyCharLimit: 220 },
  );
  assert.equal(messages.length, 1);
  assert.equal(messages[0].match(/同じ文言/g).length, 1);
});

test('件数が多くても1通あたり 5000 文字を超えない', () => {
  const posts = Array.from({ length: 40 }, (_, i) => ({
    title: `投稿${i} ${'あ'.repeat(200)}`,
    body: 'あ'.repeat(400),
    url: `https://example.com/${i}`,
    publishedAt: new Date('2025-08-25T00:00:00Z'),
  }));
  const messages = buildMessages(posts, {
    username: '4610_hotel',
    profileUrl: 'https://www.threads.com/@4610_hotel',
    bodyCharLimit: 220,
  });
  assert.ok(messages.length > 1);
  for (const message of messages) assert.ok(message.length <= 5000, `長すぎます: ${message.length}`);
});
