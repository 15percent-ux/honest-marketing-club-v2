/**
 * 販売LP用のデモ画像を、オミ塾のテストサイトから撮る（予約の送信は横取りして本番に記録しない）。
 * 使い方: node brands/funnelbuild/tools/capture-demo.cjs <出力フォルダ>（DEMO_BASE=http://localhost:4173 で手元のビルドから撮る）
 */
const { chromium, devices } = require('playwright');
const path = require('path');
const out = process.argv[2];
const B = process.env.DEMO_BASE || 'https://omijuku-funnel-test.vercel.app';
const pad = (n) => String(n).padStart(2, '0');
const day = (o) => { const d = new Date(Date.now() + o * 86400000); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const mk = (o) => ({ rid: 'R' + Math.random().toString(36).slice(2, 8).toUpperCase(), createdAt: new Date().toISOString(), status: 'active', email: '', tel: '', intent: '', message: '', survey: {}, utm: {}, line: false, source: 'lp', note: '', ...o });
const sample = [
  mk({ date: day(0), time: '13:00-13:45', name: '佐藤 陽子', source: 'line', line: true, survey: { '診断結果': ['集客を仕組みにする'] } }),
  mk({ date: day(0), time: '20:00-20:45', name: '山田 花子', email: 'h@example.com', tel: '090-0000-0000', line: true, survey: { '診断結果': ['経験を商品にする'] }, note: 'Instagram歴2年' }),
  mk({ date: day(2), time: '10:00-10:45', name: '鈴木 恵', email: 's@example.com', survey: { '診断結果': ['AIで制作をサポートする'] } }),
  mk({ date: day(3), time: '13:00-13:45', name: '田中 美咲', source: 'line', line: true, survey: { '診断結果': ['まずは棚卸しから'] } }),
];

(async () => {
  const b = await chromium.launch();
  const ctx = async () => {
    const c = await b.newContext({ ...devices['iPhone 13'], locale: 'ja-JP', reducedMotion: 'reduce' });
    await c.route('**/script.google.com/**', (r) => {
      const req = r.request();
      if (req.method() === 'GET') return r.continue();
      const body = JSON.parse(req.postData() || '{}');
      if (body.action === 'admin_list') return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, reservations: sample }) });
      return r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, rid: 'R2611250001' }) });
    });
    return c.newPage();
  };
  const shot = (p, name) => p.screenshot({ path: path.join(out, name + '.png') });

  let p = await ctx();
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  await shot(p, 'survey');
  await p.getByRole('radio').first().click(); await p.waitForTimeout(900);
  await p.getByRole('radio').nth(2).click(); await p.waitForTimeout(900);
  await p.getByRole('checkbox').nth(1).click();
  await p.getByRole('button', { name: '回答して結果を見る' }).click();
  await p.waitForURL('**/lp**'); await p.waitForTimeout(800);
  await p.evaluate(() => window.scrollTo(0, 60));
  await shot(p, 'result');
  await p.getByRole('button', { name: /無料で相談する/ }).first().click();
  // 空き枠の読み込み（Apps Script）が終わってから操作する
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(1200);
  const d = p.getByRole('dialog');
  await d.locator('button[aria-pressed]:not([disabled])').nth(2).click();
  await p.waitForTimeout(500);
  const firstTime = await d.locator('#cf-time option:not([disabled])').evaluateAll((os) => os.map((o) => o.value).find((v) => v));
  await d.locator('#cf-time').selectOption(firstTime);
  await p.waitForTimeout(400);
  await shot(p, 'form');
  const next = async () => {
    const btn = d.getByRole('button', { name: '次へ', exact: true }).last();
    for (let i = 0; i < 50 && !(await btn.isEnabled()); i++) await p.waitForTimeout(100);
    await btn.click();
    await p.waitForTimeout(1000);
  };
  await next();
  await d.getByRole('combobox', { name: /いまのお気持ち/ }).selectOption({ index: 2 }); await next();
  await d.getByLabel('姓').fill('山田'); await d.getByLabel('名', { exact: true }).fill('花子'); await next();
  await d.locator('#cf-email').fill('hanako@example.com');
  await d.locator('#cf-tel0').fill('090'); await d.locator('#cf-tel1').fill('0000'); await d.locator('#cf-tel2').fill('0000'); await next();
  await next();
  await d.getByRole('button', { name: '内容を確認する' }).click(); await p.waitForTimeout(300);
  const m = p.getByRole('dialog', { name: '内容確認' });
  for (const cb of await m.getByRole('checkbox').all()) await cb.check();
  await m.getByRole('button', { name: '申し込みを完了する' }).click();
  await p.waitForURL('**/thanks**'); await p.waitForTimeout(600);
  await p.evaluate(() => window.scrollTo(0, 250));
  await shot(p, 'thanks');
  await p.context().close();

  p = await ctx();
  await p.goto(B + '/admin#key=demo', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await shot(p, 'admin');
  await p.getByRole('button', { name: /山田 花子/ }).click(); await p.waitForTimeout(400);
  await shot(p, 'admin-detail');
  await b.close();
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
