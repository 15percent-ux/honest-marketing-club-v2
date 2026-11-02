import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// ビルドするブランドは環境変数 BRAND で切り替える（例：BRAND=omijuku npm run build）
// 1回のビルドに含まれるのは選んだブランドの設定と画像だけ（他クライアントの情報は出力に混ざらない）
const brand = process.env.BRAND || 'demo';
const brandDir = path.resolve(__dirname, 'brands', brand);
if (!fs.existsSync(path.join(brandDir, 'config.ts'))) {
  throw new Error(`brands/${brand}/config.ts が見つかりません`);
}
const meta = JSON.parse(fs.readFileSync(path.join(brandDir, 'brand.json'), 'utf8')) as {
  title: string;
  description: string;
  ogImage?: string;
  themeColor?: string;
  siteUrl?: string;
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// LINEのリンクプレビューはOGPを静的HTMLから読むため、ビルド時に埋め込む
function brandMeta(): Plugin {
  return {
    name: 'brand-meta',
    transformIndexHtml(html) {
      const og = meta.ogImage && meta.siteUrl ? new URL(meta.ogImage, meta.siteUrl).href : meta.ogImage;
      const tags = [
        `<title>${esc(meta.title)}</title>`,
        `<meta name="description" content="${esc(meta.description)}" />`,
        `<meta property="og:title" content="${esc(meta.title)}" />`,
        `<meta property="og:description" content="${esc(meta.description)}" />`,
        `<meta property="og:type" content="website" />`,
        og ? `<meta property="og:image" content="${esc(og)}" />` : '',
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="theme-color" content="${esc(meta.themeColor || '#ffffff')}" />`,
      ].filter(Boolean).join('\n    ');
      return html.replace('<!--brand-meta-->', tags);
    },
  };
}

export default defineConfig({
  plugins: [react(), brandMeta()],
  publicDir: path.join(brandDir, 'public'),
  resolve: {
    alias: {
      '@brand': path.join(brandDir, 'config.ts'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
