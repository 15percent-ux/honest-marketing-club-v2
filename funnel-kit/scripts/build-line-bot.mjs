/**
 * LINEボットを1ファイルにまとめ、api/line.js（Vercel Functions）として書き出す。
 * 使い方: BRAND=<ブランドid> node scripts/build-line-bot.mjs
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = process.env.BRAND || 'demo';
const botFile = path.join(root, 'brands', brand, 'line-bot.ts');
if (!fs.existsSync(botFile)) {
  console.log(`brands/${brand}/line-bot.ts が無いので、LINEボットは作りません`);
  fs.rmSync(path.join(root, 'api', 'line.js'), { force: true });
  process.exit(0);
}
await build({
  entryPoints: [path.join(root, 'src', 'line-bot', 'vercel.ts')],
  outfile: path.join(root, 'api', 'line.js'),
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  alias: { '@line-bot': botFile, '@brand': path.join(root, 'brands', brand, 'config.ts') },
  banner: { js: `// 自動生成：BRAND=${brand} node scripts/build-line-bot.mjs（編集しないこと）` },
  logLevel: 'warning',
});
console.log(`api/line.js（${brand}）を書き出しました`);
