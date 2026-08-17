<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1N46sjH1c28osHKCHpjrYf3mZPWON_5hc

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Zoom予約自動化

サイトには「BOOK A SESSION」予約セクションが組み込まれており、日時を選ぶだけで Zoomミーティングの発行・Googleカレンダーへの自動登録（相手への招待つき）・確認メール・前日/1時間前のリマインドメールまで全自動で行われます。

- セットアップ手順: [docs/ZOOM_BOOKING_SETUP.md](docs/ZOOM_BOOKING_SETUP.md)
- バックエンドは Netlify Functions（`netlify/functions/`）。ローカルで動かす場合は `npx netlify dev` を使用してください（`npm run dev` 単体では予約APIは動きません）。
