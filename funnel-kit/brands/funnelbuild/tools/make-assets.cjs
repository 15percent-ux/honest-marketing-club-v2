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

const brandDir = path.join(__dirname, '..');
const kit = path.join(brandDir, '..', '..');
const pub = path.join(brandDir, 'public');
const omi = path.join(kit, 'brands', 'omijuku', 'public', 'line');
const data = (file, mime) => `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
const C = { bg: '#FBF8F4', ink: '#34424F', accent: '#A85E55', sage: '#5C7A6B', sand: '#EFE6DC', mark: '#F4E3DF', mist: '#E3EFEC' };
const FONTS =
  '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet">';
const base = `<!doctype html><html lang="ja"><head><meta charset="utf-8">${FONTS}<style>*{margin:0;box-sizing:border-box}body{font-family:'Zen Maru Gothic',sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased}.en{font-family:'Cormorant Garamond',serif;font-style:italic;letter-spacing:.12em}</style></head><body>`;

// ── 公式LINEのトーク画面（モック） ──
function lineChat() {
  const diag = data(path.join(omi, 'diag.jpg'), 'image/jpeg');
  const menu = data(path.join(omi, 'richmenu.jpg'), 'image/jpeg');
  const bubble = (html, w = 250) => `<div style="display:flex;gap:6px;align-items:flex-start;margin:10px 12px">
    <div style="width:30px;height:30px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:16px">🍵</div>
    <div style="max-width:${w}px;background:#fff;border-radius:16px;overflow:hidden;font-size:12px;line-height:1.55">${html}</div></div>`;
  const mine = (t) => `<div style="display:flex;justify-content:flex-end;margin:10px 12px"><div style="background:#85E249;border-radius:16px;padding:8px 12px;font-size:12px">${t}</div></div>`;
  const opt = (t) => `<div style="border:1px solid #E5DCD2;background:${C.bg};border-radius:9px;padding:8px 10px;margin-top:6px;font-weight:700;font-size:11px;display:flex;justify-content:space-between">${t}<span style="color:${C.accent}">›</span></div>`;
  return `${base}<div style="width:390px;height:844px;background:#8CABD9;position:relative;overflow:hidden">
    <div style="height:56px;background:#fff;display:flex;align-items:center;padding:0 14px;gap:10px;font-weight:700;font-size:15px"><span style="font-size:20px">‹</span>オミ塾<span style="margin-left:auto;font-size:18px">☰</span></div>
    ${bubble('<div style="padding:10px 12px">友だち追加ありがとうございます🍵<br>まずは下の診断で、あなたに合う稼ぎ方を見てみませんか？</div>')}
    ${bubble(`<img src="${diag}" style="display:block;width:100%"><div style="padding:10px 12px"><b style="font-size:13px">3つの質問で、あなたに合う稼ぎ方が分かる</b><div style="color:${C.accent};font-size:10px;margin-top:2px">所要30秒・タップだけで完了</div><div style="margin-top:10px;background:${C.accent};color:#fff;text-align:center;border-radius:8px;padding:8px;font-weight:700">無料診断をはじめる</div></div>`)}
    ${mine('無料診断をはじめる')}
    ${bubble(`<div style="padding:10px 12px"><b style="color:${C.accent};font-size:20px">Q1</b><span style="color:#8A857C"> / 3</span><div style="font-weight:700;margin-top:2px">いまの働き方・収入について、いちばん近いものは？</div>${opt('本業の収入だけでは少し不安')}${opt('副業したいが、何をすればいいか迷う')}</div>`)}
    <div style="position:absolute;left:0;right:0;bottom:0">
      <img src="${menu}" style="display:block;width:100%">
      <div style="height:30px;background:#fff;text-align:center;font-size:11px;line-height:30px;color:#555">メニュー ▾</div>
    </div></div></body></html>`;
}

const phone = (src, w, rot, extra = '') =>
  `<div style="position:absolute;${extra};width:${w}px;transform:rotate(${rot}deg);border-radius:${w * 0.12}px;background:#1E2630;padding:${w * 0.035}px;box-shadow:0 30px 60px rgba(52,66,79,.28)">
     <div style="border-radius:${w * 0.09}px;overflow:hidden;aspect-ratio:390/844;background:url(${src}) top/cover"></div></div>`;

// ── ファーストビュー（4:5） ──
function hero() {
  return `${base}<div style="width:800px;height:1000px;position:relative;overflow:hidden;background:linear-gradient(160deg,${C.mist},${C.bg} 45%,${C.mark})">
    <div style="position:absolute;left:-120px;top:-80px;width:520px;height:520px;border-radius:50%;background:${C.mark};opacity:.8"></div>
    <div style="position:absolute;left:140px;bottom:-160px;width:460px;height:460px;border-radius:50%;background:${C.mist}"></div>
    ${phone(data(path.join(pub, 'demo', 'admin.webp'), 'image/webp'), 300, 8, 'left:330px;top:150px;opacity:.95')}
    ${phone(data(path.join(pub, 'demo', 'line.webp'), 'image/webp'), 330, -5, 'left:40px;top:90px')}
  </div></body></html>`;
}

const ICONS = {
  scissors: '<circle cx="30" cy="74" r="12"/><circle cx="70" cy="74" r="12"/><path d="M38 66 74 16M62 66 26 16"/>',
  sparkle: '<path d="M50 18c4 14 8 18 22 22-14 4-18 8-22 22-4-14-8-18-22-22 14-4 18-8 22-22z"/><path d="M76 62c2 7 4 9 10 11-6 2-8 4-10 11-2-7-4-9-10-11 6-2 8-4 10-11z"/>',
  cutlery: '<path d="M34 14v28a8 8 0 0 1-16 0V14M26 14v72M72 14c-10 4-13 20-13 32h13v40"/>',
  book: '<path d="M50 28c-10-8-24-8-34-4v54c10-4 24-4 34 4 10-8 24-8 34-4V24c-10-4-24-4-34 4z"/><path d="M50 28v54"/>',
};
const icon = (n, s, col) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

const CARDS = [
  { file: 'salon', en: 'HAIR SALON', name: '美容院・\nヘアサロン', flow: '髪の悩み診断 → おすすめメニュー → 予約', icon: 'scissors', col: C.accent },
  { file: 'esthe', en: 'ESTHE & NAIL', name: 'エステ・\nネイル', flow: '肌・爪の悩み診断 → コース提案 → 初回予約', icon: 'sparkle', col: C.sage },
  { file: 'restaurant', en: 'RESTAURANT', name: '飲食店', flow: '人数・用途の質問 → コース提案 → 予約', icon: 'cutlery', col: C.ink },
  { file: 'school', en: 'SCHOOL & COACH', name: '講座・\nスクール', flow: 'タイプ診断 → 結果 → 体験会・相談の予約', icon: 'book', col: C.accent },
];
function card(c) {
  return `${base}<div style="width:1040px;height:676px;position:relative;background:${C.bg};overflow:hidden">
    <div style="position:absolute;right:-110px;top:-110px;width:600px;height:600px;border-radius:50%;background:${C.mark}"></div>
    <div style="position:absolute;right:140px;bottom:-210px;width:420px;height:420px;border-radius:50%;background:${C.mist}"></div>
    <div style="position:absolute;right:150px;top:140px">${icon(c.icon, 300, c.col)}</div>
    <p class="en" style="position:absolute;left:80px;top:100px;font-size:40px;color:${c.col}">${c.en}</p>
    <p style="position:absolute;left:80px;top:250px;font-size:76px;font-weight:900;line-height:1.25;white-space:pre-line">${c.name}</p>
    <p style="position:absolute;left:80px;bottom:80px;font-size:28px;font-weight:700;color:${C.sage};background:#fff;padding:12px 22px;border-radius:999px">${c.flow}</p>
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
  await shoot(hero(), 800, 1000, heroPng, 'png');
  await toWebp(heroPng, path.join(pub, 'hero.webp'), 800);
  fs.rmSync(heroPng);
  fs.mkdirSync(path.join(pub, 'cards'), { recursive: true });
  for (const c of CARDS) await shoot(card(c), 1040, 676, path.join(pub, 'cards', `${c.file}.jpg`));
  await b.close();
})();
