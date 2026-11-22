/**
 * オミ塾LPの挿絵（3つの稼ぎ方）を作る。画面のモックを並べた、写真の代わりになる絵。
 *   public/art/experience.webp … 経験を商品にする（講座スライド＋予約）
 *   public/art/production.webp … AIで制作する（AIとのやりとり＋原稿）
 *   public/art/marketing.webp  … 集客を仕組みにする（スマホのトーク画面＋予約ページ）
 * 1200×800。中央の 800×675 に要素を収めているので、正方形（診断の予告）と16:9（LP）のどちらで切り抜いても崩れない。
 * 使い方: node brands/omijuku/tools/make-art.cjs
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { iconSvg } = require('../../../scripts/lib/icons.cjs');

const out = path.join(__dirname, '..', 'public', 'art');
fs.mkdirSync(out, { recursive: true });
const C = { bg: '#E5EEE9', surface: '#FFFFFF', ink: '#1F2A24', muted: '#5E6A63', line: '#E1E5DF', p: '#2E5E4E', soft: '#DCEBD9', paper: '#F4F5F1' };

const base = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{font-family:'Zen Kaku Gothic New',sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased}
.stage{width:1200px;height:800px;position:relative;overflow:hidden;background:${C.bg}}
.card{position:absolute;background:${C.surface};border-radius:28px;box-shadow:0 30px 60px -28px rgba(31,68,54,.35),0 2px 6px rgba(31,68,54,.06)}
.en{font-family:'Outfit',sans-serif;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.bar{height:14px;border-radius:7px;background:${C.line}}
.chip{display:inline-flex;align-items:center;gap:8px;border-radius:999px;font-weight:700}
</style></head><body>`;

const ring = (r, x, y) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${r}px;height:${r}px;border-radius:50%;background:${C.soft}"></div>`;

function experience(ic) {
  return `${base}<div class="stage">
    ${ring(520, 760, -160)}${ring(300, 120, 560)}
    <div class="card" style="left:230px;top:120px;width:560px;height:420px;padding:44px">
      <p class="en" style="font-size:18px;color:${C.p}">Mini Lesson 01</p>
      <p style="margin-top:14px;font-size:40px;font-weight:900;line-height:1.35">暮らしが整う<br>片づけの基本</p>
      <div style="margin-top:30px;display:grid;gap:14px">
        <div class="bar" style="width:86%"></div><div class="bar" style="width:72%"></div><div class="bar" style="width:58%"></div>
      </div>
      <div style="position:absolute;left:44px;bottom:40px;display:flex;gap:10px">
        <span class="chip" style="background:${C.paper};padding:8px 16px;font-size:16px;color:${C.muted}">全3回</span>
        <span class="chip" style="background:${C.paper};padding:8px 16px;font-size:16px;color:${C.muted}">オンライン</span>
      </div>
    </div>
    <div class="card" style="left:620px;top:380px;width:360px;padding:30px 30px 28px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:60px;height:60px;border-radius:50%;background:${C.paper};display:flex;align-items:center;justify-content:center">${ic.calendar}</div>
        <div><p style="font-size:15px;color:${C.muted};font-weight:700">個別相談</p><p style="font-size:24px;font-weight:900">11/18（火）10:00</p></div>
      </div>
      <p class="chip" style="margin-top:20px;background:${C.p};color:#fff;padding:10px 18px;font-size:17px">${ic.check}予約が入りました</p>
    </div>
  </div></body></html>`;
}

function production(ic) {
  return `${base}<div class="stage">
    ${ring(460, -120, -140)}${ring(360, 900, 520)}
    <div class="card" style="left:200px;top:110px;width:380px;height:500px;padding:36px;background:${C.paper};box-shadow:none;border:2px solid ${C.line}">
      <p class="en" style="font-size:16px;color:${C.muted}">Draft</p>
      <p style="margin-top:12px;font-size:26px;font-weight:900">お店の紹介文</p>
      <div style="margin-top:26px;display:grid;gap:14px">
        <div class="bar" style="width:92%;background:#D7DDD6"></div><div class="bar" style="width:80%;background:#D7DDD6"></div>
        <div class="bar" style="width:88%;background:#D7DDD6"></div><div class="bar" style="width:52%;background:#D7DDD6"></div>
      </div>
      <div style="margin-top:34px;display:flex;gap:10px">
        ${['案1', '案2', '案3'].map((t, i) => `<span class="chip" style="padding:8px 18px;font-size:16px;${i === 1 ? `background:${C.p};color:#fff` : `background:#fff;color:${C.muted}`}">${t}</span>`).join('')}
      </div>
    </div>
    <div style="position:absolute;left:470px;top:150px;width:520px;display:grid;gap:22px">
      <div style="justify-self:end;max-width:400px;background:${C.p};color:#fff;border-radius:26px 26px 6px 26px;padding:22px 28px;font-size:24px;font-weight:700;line-height:1.5;box-shadow:0 24px 48px -26px rgba(31,68,54,.5)">お店の紹介文を<br>やさしい言葉で3案つくって</div>
      <div class="card" style="position:relative;border-radius:26px 26px 26px 6px;padding:26px 28px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:48px;height:48px;border-radius:50%;background:${C.soft};display:flex;align-items:center;justify-content:center">${ic.sparkle}</div>
          <p style="font-size:20px;font-weight:900">3つの案をつくりました</p>
        </div>
        <div style="margin-top:20px;display:grid;gap:12px">
          <div class="bar" style="width:94%"></div><div class="bar" style="width:84%"></div><div class="bar" style="width:66%"></div>
        </div>
      </div>
    </div>
  </div></body></html>`;
}

function marketing(ic) {
  const tile = (name, label) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 0;background:#fff">${ic[name]}<span style="font-size:12px;font-weight:700">${label}</span></div>`;
  return `${base}<div class="stage">
    ${ring(560, 700, 360)}${ring(240, 150, 60)}
    <div style="position:absolute;left:250px;top:70px;width:330px;height:660px;border-radius:52px;background:${C.ink};padding:14px;box-shadow:0 40px 70px -30px rgba(31,68,54,.55)">
      <div style="width:100%;height:100%;border-radius:40px;overflow:hidden;background:${C.paper};position:relative">
        <div style="height:64px;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;border-bottom:1px solid ${C.line}">公式アカウント</div>
        <div style="margin:18px 16px 0;display:flex;gap:8px;align-items:flex-start">
          <div style="width:34px;height:34px;border-radius:50%;background:${C.soft};flex-shrink:0"></div>
          <div style="background:#fff;border-radius:18px;padding:12px 14px;font-size:14px;line-height:1.6;font-weight:500">友だち追加ありがとうございます。<br>まずは無料診断をどうぞ</div>
        </div>
        <div style="margin:12px 16px 0 58px;background:#fff;border-radius:18px;overflow:hidden">
          <div style="height:88px;background:${C.p};color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 16px"><span class="en" style="font-size:10px;opacity:.75">Free Diagnosis</span><b style="font-size:20px">無料診断</b></div>
          <div style="padding:12px"><div style="background:${C.p};color:#fff;border-radius:999px;text-align:center;font-size:13px;font-weight:700;padding:8px">はじめる</div></div>
        </div>
        <div style="position:absolute;left:0;right:0;bottom:0;display:flex;gap:1px;background:${C.line};border-top:1px solid ${C.line}">
          ${tile('compass', '診断')}${tile('calendar', '予約')}${tile('question', '質問')}
        </div>
      </div>
    </div>
    <div class="card" style="left:540px;top:250px;width:410px;padding:34px">
      <p class="en" style="font-size:16px;color:${C.p}">Booking</p>
      <p style="margin-top:10px;font-size:28px;font-weight:900">日にちを選ぶ</p>
      <div style="margin-top:22px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${['17', '18', '19', '20', '21', '24', '25', '26'].map((d, i) => `<div style="height:60px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:Outfit;font-weight:600;font-size:22px;${i === 1 ? `background:${C.p};color:#fff` : `background:${C.paper};color:${C.ink}`}">${d}</div>`).join('')}
      </div>
      <div style="margin-top:24px;background:${C.p};color:#fff;border-radius:999px;text-align:center;font-size:20px;font-weight:700;padding:16px">この日時で予約する</div>
    </div>
  </div></body></html>`;
}

(async () => {
  const ic = {
    calendar: await iconSvg('calendar', 32, C.p),
    check: await iconSvg('check', 18, '#fff', 'bold'),
    sparkle: await iconSvg('sparkle', 26, C.p),
    compass: await iconSvg('compass', 26, C.p),
    question: await iconSvg('question', 26, C.p),
  };
  ic.calendar_s = ic.calendar;
  const b = await chromium.launch();
  const items = { experience, production, marketing };
  for (const [name, fn] of Object.entries(items)) {
    const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
    let html = fn(ic);
    if (name === 'marketing') html = html.replace(/\$\{ic\.calendar\}/g, ic.calendar);
    await p.setContent(html, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const png = path.join(out, `${name}.png`);
    await p.screenshot({ path: png });
    await p.close();
    console.log(png);
  }
  await b.close();
})();
