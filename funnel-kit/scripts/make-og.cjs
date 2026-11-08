/**
 * LINE・SNSで共有されたときのプレビュー画像（1200×630）を作る。
 * 使い方: node scripts/make-og.cjs <ブランドid>   （brands/<id>/og.json を読み、brands/<id>/public/og.jpg を書き出す）
 * og.json: { image, kicker, title[], sub, badge, colors: { bg, ink, accent, sub } }
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const brand = process.argv[2];
const dir = path.join(__dirname, '..', 'brands', brand);
const o = JSON.parse(fs.readFileSync(path.join(dir, 'og.json'), 'utf8'));
const img = fs.readFileSync(path.join(dir, 'public', o.image)).toString('base64');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const c = o.colors;
const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${c.bg};font-family:'Zen Maru Gothic',sans-serif;color:${c.ink};display:flex;overflow:hidden}
  .photo{width:470px;height:630px;background:url(data:image/webp;base64,${img}) center 20%/cover}
  .txt{flex:1;padding:70px 64px;display:flex;flex-direction:column;justify-content:center}
  .kicker{font-size:30px;font-weight:700;color:${c.sub};letter-spacing:.08em}
  h1{margin-top:22px;font-size:68px;font-weight:900;line-height:1.3;letter-spacing:.04em}
  h1 em{font-style:normal;color:${c.accent};background:linear-gradient(transparent 70%,${c.mark} 70%)}
  .sub{margin-top:26px;font-size:30px;font-weight:700;line-height:1.5}
  .badge{margin-top:34px;align-self:flex-start;background:${c.accent};color:#fff;font-size:28px;font-weight:900;padding:12px 28px;border-radius:999px;letter-spacing:.08em}
</style></head><body>
<div class="photo"></div>
<div class="txt">
  <p class="kicker">${esc(o.kicker)}</p>
  <h1>${o.title.map((t) => t.replace(/\[(.*?)\]/g, (_, x) => `<em>${esc(x)}</em>`)).join('<br>')}</h1>
  <p class="sub">${esc(o.sub)}</p>
  <p class="badge">${esc(o.badge)}</p>
</div></body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(dir, 'public', 'og.jpg');
  await p.screenshot({ path: out, type: 'jpeg', quality: 85 });
  await b.close();
  console.log(out);
})();
