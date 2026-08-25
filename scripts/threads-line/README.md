# Threads → LINE 毎日配信

@4610_hotel など、指定した Threads アカウントの新着投稿を毎日 1 回、自分の LINE に届ける仕組み。
GitHub Actions の定期実行で動くので、サーバーの用意は不要。

```
Threads アカウント
      │  (RSS)
      ▼
GitHub Actions (毎日 08:00 JST)
      │  scripts/threads-line/notify.mjs
      ▼
LINE Messaging API (push)
      │
      ▼
自分の LINE トーク
```

## 前提として知っておくこと

- **Threads の公式 API では他人のアカウントの投稿は取得できない**（読めるのは自分のアカウントのみ）。
  そのため他人のアカウントを追うには RSS 変換サービスを経由する。
- **LINE Notify は 2025/3/31 で終了済み**。代わりに LINE Messaging API の
  「自分だけが友だちになった Bot」から自分に push する。無料枠で月 200 通まで送れるので、
  1 日 1 通の用途なら十分収まる。

---

## セットアップ手順

### 1. Threads の RSS フィード URL を用意する

次のどちらかを選ぶ。

**A. RSS.app（推奨）**

1. https://rss.app/ にログイン
2. `New Feed` → Threads を選び、`https://www.threads.com/@4610_hotel` を入力
3. 生成された RSS の URL（`https://rss.app/feeds/xxxxx.xml`）を控える

**B. RSSHub をセルフホスト**

RSSHub には Threads 用のルート（`/threads/:user`）があるが、**公開インスタンスの `rsshub.app` は使えない**。
実際にアクセスすると 403 が返り、「テスト目的専用であり本番の RSS ソースとして使わないこと。
安定運用にはセルフホストを強く推奨する」と明示されている。
使うなら Docker などで自分の環境に立てて、その URL を指定する。

どちらの場合も、得られた URL を `THREADS_FEED_URL` に設定する（**必須**。既定値はない）。

### 2. LINE の Bot チャネルを作る

1. https://developers.line.biz/console/ にログイン
2. プロバイダーを作成（例: `personal`）
3. `Messaging API` チャネルを作成
4. **Messaging API 設定** タブ
   - `チャネルアクセストークン（長期）` を発行 → 控える（= `LINE_CHANNEL_ACCESS_TOKEN`）
   - `応答メッセージ` を **オフ**（自動応答が邪魔になるため）
   - QR コードを自分の LINE で読み取り、Bot を **友だち追加**（これをしないと push が届かない）
5. **チャネル基本設定** タブの `あなたのユーザーID`（`U` で始まる 33 文字）を控える（= `LINE_TO`）

### 3. GitHub に登録する

リポジトリの `Settings` → `Secrets and variables` → `Actions`。

**Secrets**（機密。必ずこちらに入れる）

| 名前 | 値 |
| --- | --- |
| `LINE_CHANNEL_ACCESS_TOKEN` | 手順 2 のチャネルアクセストークン |
| `LINE_TO` | 手順 2 のユーザー ID |
| `THREADS_FEED_URL` | 手順 1 の RSS URL（必須） |

**Variables**（任意。未設定ならカッコ内の既定値）

| 名前 | 説明 |
| --- | --- |
| `THREADS_USERNAME` | 追いかけるアカウント名（`4610_hotel`） |
| `MAX_POSTS_PER_RUN` | 1 回に配信する最大件数（`5`） |
| `LOOKBACK_HOURS` | 何時間前までの投稿を新着とみなすか（`26`） |
| `NOTIFY_WHEN_EMPTY` | `true` にすると新着 0 件の日も「新着なし」を通知する（`false`） |

### 4. 定期実行を有効にする

GitHub Actions の `schedule` は **デフォルトブランチ（main）にあるワークフローしか起動しない**。
`.github/workflows/threads-line-daily.yml` を main にマージするまで、毎日の自動実行は始まらない。

マージ前に動作確認したい場合は、`Actions` タブ →
`Threads → LINE 毎日配信` → `Run workflow` で対象ブランチを選んで手動実行する。

---

## 手元での動作確認

```bash
# 送信せず、配信予定の文面をログに出すだけ
DRY_RUN=1 THREADS_FEED_URL='https://rss.app/feeds/xxxxx.xml' npm run threads:notify

# 実際に自分の LINE へ送る
LINE_CHANNEL_ACCESS_TOKEN='...' LINE_TO='U...' \
THREADS_FEED_URL='https://rss.app/feeds/xxxxx.xml' npm run threads:notify

# パーサ・整形のテスト
npm run threads:test
```

## 配信される文面

```
📌 @4610_hotel の新着スレッド（2件）

① ショート動画を使って商品を売るずるい裏技↓
もともと大赤字ホテルの"ド素人Tシャツ"を…
8/25 07:22
https://www.threads.com/@4610_hotel/post/xxxx

② …

── 全投稿を見る
https://www.threads.com/@4610_hotel
```

## 二重配信の防止

配信済みの投稿 ID は `scripts/threads-line/state.json` に記録され、
GitHub Actions が実行のたびにリポジトリへコミットして戻す。
手動実行と定期実行が重なっても同じ投稿は 2 回届かない。

初回実行時は `state.json` が空なので、`LOOKBACK_HOURS`（既定 26 時間）以内の投稿だけが対象になる。
フィードの過去分をまとめて受け取りたい場合は、一時的に `LOOKBACK_HOURS` を大きくする。

## うまく動かないとき

| 症状 | 確認すること |
| --- | --- |
| `フィードから投稿を1件も取得できませんでした` | `THREADS_FEED_URL` をブラウザで開いて XML が返るか |
| `フィード取得に失敗しました (403 ...)` | `rsshub.app` を指していないか（公開インスタンスは 403 を返す）。RSS.app に切り替える |
| `LINE push failed (403)` | Bot を自分の LINE で友だち追加したか |
| `LINE push failed (400)` | `LINE_TO` が `U` で始まるユーザー ID か（LINE の表示名や ID 検索用の ID ではない） |
| 何も届かないがエラーも出ない | ログの「新着として配信する投稿数」が 0。`LOOKBACK_HOURS` 内に新規投稿がないだけ |
| 定期実行されない | ワークフローが main にマージされているか（手順 4） |
