/**
 * 公式LINE用の画像（リッチメニュー・カードのサムネ）を作る。
 * 使い方: node scripts/make-line-assets.cjs <ブランドid>
 *   brands/<id>/line-assets.json を読み、brands/<id>/public/line/ に JPEG を書き出す
 *   - richmenu.jpg   2500×1686（上：診断バナー／下：ボタン3つ）
 *   - diag.jpg       1040×676（診断スタートのカード）
 *   - <type>.jpg     1040×676（診断結果・稼ぎ方のカード）
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const brand = process.argv[2];
const dir = path.join(__dirname, '..', 'brands', brand);
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'line-assets.json'), 'utf8'));
const out = path.join(dir, 'public', 'line');
fs.mkdirSync(out, { recursive: true });
const photo = 'data:image/webp;base64,' + fs.readFileSync(path.join(dir, 'public', cfg.photo)).toString('base64');
const c = cfg.colors;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');

const { iconSvg } = require('./lib/icons.cjs');

// LPと同じ書体：見出しは Zen Kaku Gothic New、英字は Outfit
const base = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{font-family:'Zen Kaku Gothic New',sans-serif;color:${c.ink};-webkit-font-smoothing:antialiased}
.en{font-family:'Outfit',sans-serif;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
</style></head><body>`;

const surface = c.surface || '#fff';

function richmenu(ic) {
  const t = cfg.tiles;
  return `${base}<div style="width:2500px;height:1686px;position:relative;background:${c.bg};overflow:hidden">
  <div style="position:absolute;left:0;top:0;width:2500px;height:843px;display:flex;background:${c.accent};color:#fff">
    <div style="width:1050px;height:843px;background:url(${photo}) center 18%/cover"></div>
    <div style="flex:1;padding:120px 120px;position:relative">
      <p class="en" style="font-size:44px;opacity:.75">${esc(cfg.banner.en)}</p>
      <h1 style="margin-top:28px;font-size:150px;font-weight:900;letter-spacing:.06em;line-height:1">${esc(cfg.banner.title)}</h1>
      <p style="margin-top:48px;font-size:60px;font-weight:700;line-height:1.5">${esc(cfg.banner.lead)}</p>
      <p style="position:absolute;right:120px;bottom:100px;background:#fff;color:${c.accent};font-size:52px;font-weight:900;padding:28px 70px;border-radius:999px;letter-spacing:.1em">${esc(cfg.banner.cta)} →</p>
    </div>
  </div>
  ${t
    .map(
      (x, i) => `<div style="position:absolute;top:843px;left:${i * 833 + (i === 2 ? 1 : 0)}px;width:${i === 1 ? 834 : 833}px;height:843px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:${i ? `3px solid ${c.sand}` : 'none'};background:${surface}">
      <div style="width:300px;height:300px;border-radius:50%;background:${c.mark};display:flex;align-items:center;justify-content:center">${ic[x.icon]}</div>
      <p class="en" style="margin-top:56px;font-size:40px;color:${c.sage}">${esc(x.en)}</p>
      <p style="margin-top:14px;font-size:82px;font-weight:900;letter-spacing:.06em">${esc(x.label)}</p>
    </div>`,
    )
    .join('')}
  <div style="position:absolute;left:0;right:0;top:843px;height:3px;background:${c.sand}"></div>
  </div></body></html>`;
}

function diag() {
  return `${base}<div style="width:1040px;height:676px;position:relative;display:flex;background:${c.accent};color:#fff;overflow:hidden">
    <div style="width:420px;height:676px;background:url(${photo}) center 18%/cover"></div>
    <div style="flex:1;padding:70px 60px;display:flex;flex-direction:column;justify-content:center">
      <p class="en" style="font-size:24px;opacity:.75">${esc(cfg.banner.en)}</p>
      <p style="margin-top:22px;font-size:50px;font-weight:900;line-height:1.45">${esc(cfg.banner.cardLead || cfg.banner.lead)}</p>
      <p style="margin-top:34px;align-self:flex-start;background:#fff;color:${c.accent};font-size:24px;font-weight:700;padding:10px 26px;border-radius:999px">所要30秒・タップだけで完了</p>
    </div></div></body></html>`;
}

function typeCard(t, ic) {
  return `${base}<div style="width:1040px;height:676px;position:relative;background:${c.bg};overflow:hidden">
    <div style="position:absolute;right:90px;top:50%;transform:translateY(-50%);width:400px;height:400px;border-radius:50%;background:${c.mark};display:flex;align-items:center;justify-content:center">${ic[t.icon]}</div>
    <div style="position:absolute;left:84px;top:96px">
      <p class="en" style="font-size:28px;color:${c.accent}">TYPE ${esc(t.no)}</p>
      <p style="margin-top:10px;font-size:28px;font-weight:700;color:${c.sage}">あなたに合う稼ぎ方</p>
    </div>
    <p style="position:absolute;left:84px;bottom:104px;font-size:66px;font-weight:900;letter-spacing:.04em;line-height:1.35;white-space:nowrap">${esc(t.name)}</p>
    <div style="position:absolute;left:84px;bottom:76px;width:96px;height:6px;border-radius:3px;background:${c.accent}"></div>
    <p class="en" style="position:absolute;right:56px;bottom:40px;font-size:20px;color:${c.sage}">${esc(cfg.brandLine)}</p>
    </div></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const shoot = async (html, w, h, file) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, file), type: 'jpeg', quality: 86 });
    await p.close();
    console.log(file);
  };
  const tileIcons = {};
  for (const x of cfg.tiles) tileIcons[x.icon] = await iconSvg(x.icon, 170, c.accent);
  const typeIcons = {};
  for (const t of cfg.types) typeIcons[t.icon] = await iconSvg(t.icon, 210, c.accent);
  await shoot(richmenu(tileIcons), 2500, 1686, 'richmenu.jpg');
  await shoot(diag(), 1040, 676, 'diag.jpg');
  for (const t of cfg.types) await shoot(typeCard(t, typeIcons), 1040, 676, `${t.file}.jpg`);
  await b.close();
})();
