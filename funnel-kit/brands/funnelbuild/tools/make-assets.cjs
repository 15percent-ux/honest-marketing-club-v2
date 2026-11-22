/**
 * 販売LP（funnelbuild）用の画像を作る。
 *   public/demo/line.webp   … 公式LINEのトーク画面のモック（オミ塾のボットの実際のカード画像を使用）
 *   public/hero.webp        … ファーストビュー（スマホ2台の構図）
 *   public/cards/*.jpg      … 業種別カード
 * 使い方: node brands/funnelbuild/tools/make-assets.cjs
 * 先に capture-demo.cjs でスクリーンショットを撮り、public/demo/*.webp にしておくこと。
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { iconSvg } = require('../../../scripts/lib/icons.cjs');

const brandDir = path.join(__dirname, '..');
const kit = path.join(brandDir, '..', '..');
const pub = path.join(brandDir, 'public');
const omi = path.join(kit, 'brands', 'omijuku', 'public', 'line');
const data = (file, mime) => `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
// LPの calm テーマと同じ色（深い緑ひとつだけをアクセントに）
const C = { bg: '#F4F5F1', ink: '#1F2A24', accent: '#2E5E4E', sage: '#5E6A63', sand: '#E1E5DF', mark: '#E5EEE9', mist: '#DCEBD9' };
const FONTS =
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap" rel="stylesheet">';
const base = `<!doctype html><html lang="ja"><head><meta charset="utf-8">${FONTS}<style>*{margin:0;box-sizing:border-box}body{font-family:'Zen Kaku Gothic New',sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased}.en{font-family:'Outfit',sans-serif;font-weight:600;letter-spacing:.2em;text-transform:uppercase}</style></head><body>`;

// ── 公式LINEのトーク画面（モック） ──
function lineChat() {
  const diag = data(path.join(omi, 'diag.jpg'), 'image/jpeg');
  const menu = data(path.join(omi, 'richmenu.jpg'), 'image/jpeg');
  const bubble = (html, w = 250) => `<div style="display:flex;gap:6px;align-items:flex-start;margin:10px 12px">
    <div style="width:30px;height:30px;border-radius:50%;background:${C.mark};color:${C.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">オ</div>
    <div style="max-width:${w}px;background:#fff;border-radius:16px;overflow:hidden;font-size:12px;line-height:1.55">${html}</div></div>`;
  const mine = (t) => `<div style="display:flex;justify-content:flex-end;margin:10px 12px"><div style="background:#85E249;border-radius:16px;padding:8px 12px;font-size:12px">${t}</div></div>`;
  const opt = (t) => `<div style="border:1px solid #E5DCD2;background:${C.bg};border-radius:9px;padding:8px 10px;margin-top:6px;font-weight:700;font-size:11px;display:flex;justify-content:space-between">${t}<span style="color:${C.accent}">›</span></div>`;
  return `${base}<div style="width:390px;height:844px;background:#8CABD9;position:relative;overflow:hidden">
    <div style="height:56px;background:#fff;display:flex;align-items:center;padding:0 14px;gap:10px;font-weight:700;font-size:15px"><span style="font-size:20px">‹</span>オミ塾<span style="margin-left:auto;font-size:18px">☰</span></div>
    ${bubble('<div style="padding:10px 12px">友だち追加ありがとうございます。<br>まずは3つの質問で、安心して始められるか確かめてみませんか？</div>')}
    ${bubble(`<img src="${diag}" style="display:block;width:100%"><div style="padding:10px 12px"><b style="font-size:13px">3つの質問で、オミ塾を安心して始められるか分かる</b><div style="color:${C.accent};font-size:10px;margin-top:2px">所要30秒・タップだけで完了</div><div style="margin-top:10px;background:${C.accent};color:#fff;text-align:center;border-radius:8px;padding:8px;font-weight:700">無料診断をはじめる</div></div>`)}
    ${mine('無料診断をはじめる')}
    ${bubble(`<div style="padding:10px 12px"><b style="color:${C.accent};font-size:20px">Q1</b><span style="color:#8A857C"> / 3</span><div style="font-weight:700;margin-top:2px">これまでのお仕事や得意なことに、いちばん近いものは？</div>${opt('接客・販売など、人と話す仕事')}${opt('事務・経理などのパソコン作業')}</div>`)}
    <div style="position:absolute;left:0;right:0;bottom:0">
      <img src="${menu}" style="display:block;width:100%">
      <div style="height:30px;background:#fff;text-align:center;font-size:11px;line-height:30px;color:#555">メニュー ▾</div>
    </div></div></body></html>`;
}

// スマホの枠。画面の画像はそのままの比率で入れる（切り抜かない）
const phone = (src, w, extra = '') =>
  `<div style="position:absolute;${extra};width:${w}px;border-radius:${w * 0.12}px;background:${C.ink};padding:${w * 0.035}px;box-shadow:0 40px 70px -30px rgba(31,68,54,.5)">
     <img src="${src}" style="display:block;width:100%;border-radius:${w * 0.09}px"></div>`;

// ── ファーストビュー（4:3。診断ページの先頭で、この比率のまま表示される） ──
function hero() {
  return `${base}<div style="width:1200px;height:900px;position:relative;overflow:hidden;background:${C.bg}">
    <div style="position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;background:${C.mist}"></div>
    <div style="position:absolute;left:-140px;bottom:-220px;width:560px;height:560px;border-radius:50%;background:${C.mark}"></div>
    ${phone(data(path.join(pub, 'demo', 'admin.webp'), 'image/webp'), 330, 'left:640px;top:230px')}
    ${phone(data(path.join(pub, 'demo', 'line.webp'), 'image/webp'), 340, 'left:250px;top:60px')}
  </div></body></html>`;
}

const CARDS = [
  { file: 'salon', en: 'HAIR SALON', name: '美容院・\nヘアサロン', flow: '髪の悩み診断 → おすすめメニュー → 予約', icon: 'scissors', col: C.accent },
  { file: 'esthe', en: 'ESTHE & NAIL', name: 'エステ・\nネイル', flow: '肌・爪の悩み診断 → コース提案 → 初回予約', icon: 'sparkle', col: C.accent },
  { file: 'restaurant', en: 'RESTAURANT', name: '飲食店', flow: '人数・用途の質問 → コース提案 → 予約', icon: 'food', col: C.accent },
  { file: 'school', en: 'SCHOOL & COACH', name: '講座・\nスクール', flow: 'タイプ診断 → 結果 → 体験会・相談の予約', icon: 'book', col: C.accent },
];
function card(c, svg) {
  return `${base}<div style="width:1040px;height:676px;position:relative;background:${C.bg};overflow:hidden">
    <div style="position:absolute;right:90px;top:90px;width:400px;height:400px;border-radius:50%;background:${C.mark};display:flex;align-items:center;justify-content:center">${svg}</div>
    <p class="en" style="position:absolute;left:80px;top:100px;font-size:28px;color:${c.col}">${c.en}</p>
    <p style="position:absolute;left:80px;top:250px;font-size:76px;font-weight:900;line-height:1.25;white-space:pre-line">${c.name}</p>
    <p style="position:absolute;left:80px;bottom:80px;font-size:28px;font-weight:700;color:${C.accent};background:#fff;border:2px solid ${C.sand};padding:12px 24px;border-radius:999px">${c.flow}</p>
  </div></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const shoot = async (html, w, h, file, type = 'jpeg') => {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: file.endsWith('line.png') ? 2 : 1 });
    await p.setContent(html, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: file, type, ...(type === 'jpeg' ? { quality: 86 } : {}) });
    await p.close();
    console.log(path.relative(kit, file));
  };
  const tmp = path.join(pub, 'demo', 'line.png');
  await shoot(lineChat(), 390, 844, tmp, 'png');
  // PNG → WebP は sharp 等が無いので、ブラウザで変換する
  const toWebp = async (src, dst, w) => {
    const p = await b.newPage();
    const out = await p.evaluate(
      async ({ url, w }) => {
        const img = new Image();
        img.src = url;
        await img.decode();
        const c = document.createElement('canvas');
        c.width = w;
        c.height = Math.round((img.height * w) / img.width);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL('image/webp', 0.82);
      },
      { url: data(src, 'image/png'), w },
    );
    fs.writeFileSync(dst, Buffer.from(out.split(',')[1], 'base64'));
    await p.close();
    console.log(path.relative(kit, dst));
  };
  await toWebp(tmp, path.join(pub, 'demo', 'line.webp'), 780);
  fs.rmSync(tmp);
  const heroPng = path.join(pub, 'hero.png');
  await shoot(hero(), 1200, 900, heroPng, 'png');
  await toWebp(heroPng, path.join(pub, 'hero.webp'), 1200);
  fs.rmSync(heroPng);
  fs.mkdirSync(path.join(pub, 'cards'), { recursive: true });
  for (const c of CARDS) await shoot(card(c, await iconSvg(c.icon, 210, c.col)), 1040, 676, path.join(pub, 'cards', `${c.file}.jpg`));
  await b.close();
})();
