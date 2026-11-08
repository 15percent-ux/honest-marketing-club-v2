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

// 線で描くアイコン（絵文字より上品に見せる）
const ICONS = {
  compass: '<circle cx="50" cy="50" r="38"/><path d="M62 38 55 55 38 62 45 45Z"/><circle cx="50" cy="50" r="3" fill="currentColor"/>',
  calendar: '<rect x="16" y="22" width="68" height="62" rx="8"/><path d="M16 40h68M34 14v16M66 14v16"/><path d="M34 56h8M50 56h8M66 56h0M34 70h8M50 70h8"/>',
  question: '<circle cx="50" cy="50" r="38"/><path d="M38 40a12 12 0 1 1 18 10c-4 3-6 5-6 10"/><circle cx="50" cy="71" r="2.5" fill="currentColor"/>',
  gift: '<rect x="18" y="40" width="64" height="44" rx="4"/><path d="M14 30h72v12H14zM50 30v54"/><path d="M50 30c-6-12-22-14-22-4 0 6 14 4 22 4 8 0 22 2 22-4 0-10-16-8-22 4"/>',
  pen: '<path d="M22 78 28 58 66 20a8 8 0 0 1 12 12L40 70Z"/><path d="M60 26l12 12M22 78l18-8"/>',
  sprout: '<path d="M50 84V46"/><path d="M50 52c0-16-12-26-28-26 0 16 12 26 28 26Z"/><path d="M50 46c0-14 10-22 26-22 0 14-10 22-26 22Z"/><path d="M30 84h40"/>',
};
const icon = (name, size, color) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="color:${color}">${ICONS[name]}</svg>`;

const base = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{font-family:'Zen Maru Gothic',sans-serif;color:${c.ink};-webkit-font-smoothing:antialiased}
.en{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;letter-spacing:.12em}
.grain{position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px);background-size:6px 6px;pointer-events:none}
</style></head><body>`;

function richmenu() {
  const t = cfg.tiles;
  return `${base}<div style="width:2500px;height:1686px;position:relative;background:${c.bg};overflow:hidden">
  <div style="position:absolute;left:0;top:0;width:2500px;height:843px;display:flex;background:${c.sand}">
    <div style="width:1050px;height:843px;background:url(${photo}) center 18%/cover"></div>
    <div style="flex:1;padding:110px 120px;position:relative">
      <p class="en" style="font-size:54px;color:${c.sage}">${esc(cfg.banner.en)}</p>
      <h1 style="margin-top:24px;font-size:150px;font-weight:900;letter-spacing:.06em;line-height:1">${esc(cfg.banner.title)}</h1>
      <p style="margin-top:44px;font-size:62px;font-weight:700;line-height:1.5">${esc(cfg.banner.lead)}</p>
      <p style="position:absolute;right:120px;bottom:100px;background:${c.accent};color:#fff;font-size:52px;font-weight:900;padding:26px 64px;border-radius:999px;letter-spacing:.1em">${esc(cfg.banner.cta)} →</p>
    </div>
    <div class="grain"></div>
  </div>
  ${t.map((x, i) => `<div style="position:absolute;top:843px;left:${i * 833 + (i === 2 ? 1 : 0)}px;width:${i === 1 ? 834 : 833}px;height:843px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:${i ? `3px solid ${c.sand}` : 'none'};background:${i === 1 ? c.mist : c.bg}">
      ${icon(x.icon, 230, i === 1 ? c.sage : c.ink)}
      <p class="en" style="margin-top:44px;font-size:56px;color:${c.accent}">${esc(x.en)}</p>
      <p style="margin-top:14px;font-size:84px;font-weight:900;letter-spacing:.06em">${esc(x.label)}</p>
    </div>`).join('')}
  <div style="position:absolute;left:0;right:0;top:843px;height:3px;background:${c.sand}"></div>
  </div></body></html>`;
}

function diag() {
  return `${base}<div style="width:1040px;height:676px;position:relative;display:flex;background:${c.sand};overflow:hidden">
    <div style="width:420px;height:676px;background:url(${photo}) center 18%/cover"></div>
    <div style="flex:1;padding:70px 56px;display:flex;flex-direction:column;justify-content:center">
      <p class="en" style="font-size:30px;color:${c.sage}">${esc(cfg.banner.en)}</p>
      <p style="margin-top:18px;font-size:50px;font-weight:900;line-height:1.45">${esc(cfg.banner.cardLead || cfg.banner.lead)}</p>
      <p style="margin-top:30px;font-size:26px;font-weight:700;color:${c.accent}">所要30秒・タップだけで完了</p>
    </div><div class="grain"></div></div></body></html>`;
}

function typeCard(t) {
  const col = c[t.tone] || c.accent;
  return `${base}<div style="width:1040px;height:676px;position:relative;background:${c.bg};overflow:hidden">
    <div style="position:absolute;right:-120px;top:-120px;width:620px;height:620px;border-radius:50%;background:${c.mark}"></div>
    <div style="position:absolute;right:120px;bottom:-200px;width:420px;height:420px;border-radius:50%;background:${c.mist}"></div>
    <div style="position:absolute;right:150px;top:150px">${icon(t.icon, 300, col)}</div>
    <div style="position:absolute;left:80px;top:110px">
      <p class="en" style="font-size:40px;color:${col}">TYPE ${esc(t.no)}</p>
      <p style="margin-top:6px;font-size:28px;font-weight:700;color:${c.sage}">あなたに合う稼ぎ方</p>
    </div>
    <p style="position:absolute;left:80px;bottom:110px;font-size:66px;font-weight:900;letter-spacing:.04em;line-height:1.3;white-space:nowrap">${esc(t.name)}</p>
    <div style="position:absolute;left:80px;bottom:84px;width:120px;height:6px;background:${col}"></div>
    <p class="en" style="position:absolute;right:56px;bottom:40px;font-size:26px;color:${c.sage}">${esc(cfg.brandLine)}</p>
    <div class="grain"></div></div></body></html>`;
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
  await shoot(richmenu(), 2500, 1686, 'richmenu.jpg');
  await shoot(diag(), 1040, 676, 'diag.jpg');
  for (const t of cfg.types) await shoot(typeCard(t), 1040, 676, `${t.file}.jpg`);
  await b.close();
})();
