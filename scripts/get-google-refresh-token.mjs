#!/usr/bin/env node
// Google OAuth の refresh token を取得するヘルパー
//
// 使い方:
//   GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-google-refresh-token.mjs
//
// 1. 表示されるURLをブラウザで開き、millefield@gmail.com でログインして許可する
// 2. リダイレクト後に自動でトークンが表示される（http://localhost:53682 で待ち受け）
// 3. 表示された GOOGLE_REFRESH_TOKEN を Netlify の環境変数に設定する

import http from 'node:http';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/gmail.send',
].join(' ');

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('GOOGLE_CLIENT_ID と GOOGLE_CLIENT_SECRET を環境変数で指定してください。');
  console.error('例: GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-google-refresh-token.mjs');
  process.exit(1);
}

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent', // 毎回 refresh_token を発行させる
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('認可コードがありません。');
    return;
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    }),
  });
  const tokens = await tokenRes.json();

  if (tokens.refresh_token) {
    console.log('\n✅ 取得成功！Netlify に以下の環境変数を設定してください:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<h2>取得成功</h2><p>ターミナルに表示された GOOGLE_REFRESH_TOKEN をコピーしてください。このタブは閉じてOKです。</p>');
  } else {
    console.error('\n❌ refresh_token が返されませんでした:', tokens);
    res.writeHead(500, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<h2>失敗</h2><p>ターミナルのエラーを確認してください。</p>');
  }
  server.close();
});

server.listen(PORT, () => {
  console.log('以下のURLをブラウザで開き、millefield@gmail.com でログインして許可してください:\n');
  console.log(authUrl + '\n');
});
