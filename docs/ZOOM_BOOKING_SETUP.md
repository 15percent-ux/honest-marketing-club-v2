# Zoom予約自動化 セットアップ手順

サイトに組み込まれた予約システムの全体像と、稼働に必要な初期設定（約20分・すべて無料）をまとめています。

## 何が自動化されるか

訪問者がサイトの「BOOK A SESSION」セクションで日時を選んで予約すると、以下がすべて自動で実行されます。

1. **Zoomミーティングの発行** — 有料プランのZoomアカウント（millefield@gmail.com）でミーティングを自動作成
2. **Googleカレンダーへの自動追加** — あなたのカレンダーに予定を登録し、相手にはGoogleカレンダーの招待メールを自動送信（相手が承諾すると相手のカレンダーにも追加されます）
3. **確認メールの自動送信** — 相手にZoomリンク付きの確認メール、あなたに新規予約の通知メール（どちらもmillefield@gmail.comのGmailから送信）
4. **リマインドの自動送信** — 開始の**前日（24時間前）**と**1時間前**に相手へリマインドメールを自動送信
5. **キャンセル・日程変更の自動化** — 各メールに専用のキャンセルリンクが入っており、相手が自分でキャンセルできます（Zoomミーティングとカレンダーの予定を自動削除し、双方に完了メールを送信。枠は自動で再オープン）。日程変更は「キャンセル→再予約」の導線で案内されます
6. **主催者側のキャンセルも簡単** — あなたがGoogleカレンダーから予定を削除するだけで、その予約はキャンセル扱いになりリマインドも自動停止します（Zoomミーティングも自動削除）
7. **ダブルブッキング防止** — Googleカレンダーの既存予定（手動で入れた予定も含む）と重なる枠は予約画面に表示されません

## 構成

- フロントエンド: `components/ZoomBooking.tsx`（予約UI）
- バックエンド: Netlify Functions（`netlify/functions/`）
  - `availability.mts` — `GET /api/availability` 空き枠の算出
  - `book.mts` — `POST /api/book` 予約確定（Zoom発行→カレンダー登録→メール送信）
  - `cancel.mts` — `/api/cancel` 予約者本人によるキャンセル（メール内リンク）
  - `send-reminders.mts` — 15分ごとの定期実行でリマインド送信＋主催者削除分の後片付け
- 予約データ: Netlify Blobs（リマインド送信の管理用）

**このためサイトはNetlifyにデプロイする必要があります**（無料プランでOK。Functions・スケジュール実行・Blobsすべて無料枠内で動きます）。

---

## セットアップ

### STEP 1: Zoom Server-to-Server OAuth アプリの作成（約5分）

1. millefield@gmail.com のZoomアカウントで [Zoom App Marketplace](https://marketplace.zoom.us/) にログイン
2. 右上の **Develop > Build App** をクリック
3. **Server-to-Server OAuth** を選択して作成（アプリ名は任意。例: `HMC Booking`）
4. **App Credentials** 画面に表示される以下の3つを控える
   - `Account ID` → 環境変数 `ZOOM_ACCOUNT_ID`
   - `Client ID` → `ZOOM_CLIENT_ID`
   - `Client Secret` → `ZOOM_CLIENT_SECRET`
5. **Scopes** タブで以下を追加
   - `meeting:write:meeting:admin`（ミーティングの作成）
   - `meeting:delete:meeting:admin`（エラー時のロールバック用）
6. **Activation** タブでアプリを **Activate** する

### STEP 2: Google Cloud でOAuthクライアントを作成（約10分）

1. [Google Cloud Console](https://console.cloud.google.com/) にmillefield@gmail.comでログインし、新しいプロジェクトを作成（名前は任意。例: `hmc-booking`）
2. **APIとサービス > ライブラリ** で以下2つを有効化
   - **Google Calendar API**
   - **Gmail API**
3. **APIとサービス > OAuth同意画面** を設定
   - User Type: **外部**、公開ステータスは**テスト**のままでOK
   - **テストユーザー**に `millefield@gmail.com` を追加（これを忘れるとログインできません）
4. **APIとサービス > 認証情報 > 認証情報を作成 > OAuthクライアントID**
   - アプリケーションの種類: **ウェブアプリケーション**
   - 承認済みのリダイレクトURI: `http://localhost:53682`
   - 作成後に表示される `クライアントID` → `GOOGLE_CLIENT_ID`、`クライアントシークレット` → `GOOGLE_CLIENT_SECRET`

> 補足: 同意画面が「テスト」ステータスの場合、refresh tokenは7日で失効するというGoogleの制限があります。**「アプリを公開」ボタンで本番ステータスに変更する**（審査は不要、警告画面が出るだけ）と無期限になります。自分専用なのでこれで問題ありません。

### STEP 3: Google refresh token の取得（約2分）

手元のPC（Node.js入り）でこのリポジトリを開き、次を実行します。

```bash
GOOGLE_CLIENT_ID=<STEP2のクライアントID> \
GOOGLE_CLIENT_SECRET=<STEP2のシークレット> \
node scripts/get-google-refresh-token.mjs
```

表示されるURLをブラウザで開き、**millefield@gmail.com** でログインして許可すると、ターミナルに `GOOGLE_REFRESH_TOKEN=...` が表示されるので控えます。

### STEP 4: Netlify に環境変数を設定してデプロイ

1. [Netlify](https://app.netlify.com/) でこのリポジトリからサイトを作成（ビルド設定は `netlify.toml` が自動適用）
2. **Site configuration > Environment variables** に以下を設定

| 変数名 | 値 |
|---|---|
| `ZOOM_ACCOUNT_ID` | STEP 1 で取得 |
| `ZOOM_CLIENT_ID` | STEP 1 で取得 |
| `ZOOM_CLIENT_SECRET` | STEP 1 で取得 |
| `GOOGLE_CLIENT_ID` | STEP 2 で取得 |
| `GOOGLE_CLIENT_SECRET` | STEP 2 で取得 |
| `GOOGLE_REFRESH_TOKEN` | STEP 3 で取得 |
| `GEMINI_API_KEY` | （既存機能用・設定済みならそのまま） |

3. **Deploys > Trigger deploy** で再デプロイ

### STEP 5: 動作確認

1. 公開サイトの「BOOK A SESSION」セクションで枠が表示されることを確認
2. テストとして自分の別メールアドレスで1件予約してみる
3. 確認ポイント
   - Zoomアカウントにミーティングが作成されている
   - Googleカレンダーに予定が入り、相手アドレスに招待メールが届いている
   - 相手アドレスに確認メール、millefield@gmail.com に通知メールが届いている
4. 確認メール内の「キャンセル・日程変更はこちら」リンクからキャンセルし、Zoom・カレンダーから自動削除されることを確認
5. （別のテストとして）Googleカレンダーから予定を直接削除した場合も、15分以内にリマインド対象から外れZoomも自動削除されます

---

## カスタマイズ（環境変数）

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `BOOKING_SLOT_MINUTES` | `60` | 1枠の長さ（分） |
| `BOOKING_START_HOUR` | `10` | 受付開始時刻（日本時間・時） |
| `BOOKING_END_HOUR` | `18` | 受付終了時刻（最終枠は終了時刻−枠長に開始） |
| `BOOKING_DAYS_AHEAD` | `14` | 何日先まで予約を受け付けるか |
| `BOOKING_MIN_NOTICE_HOURS` | `12` | 直前予約のブロック（開始◯時間前まで受付） |
| `BOOKING_MEETING_TITLE` | `無料相談（Honest Marketing Club）` | Zoom・カレンダーのタイトル |
| `BOOKING_CALENDAR_ID` | `primary` | 使用するGoogleカレンダー |
| `HOST_NAME` | `Honest Marketing Club` | メールの差出人名 |

変更後は再デプロイで反映されます。

## 予約を受けたくない時間帯の作り方

Googleカレンダーに普通に予定を入れるだけでOKです（「予定あり」の時間帯は自動で予約枠から除外されます）。終日ブロックしたい日は「終日予定」を入れてください。

## ローカルでの動作確認

Functionsを含めて動かすには Netlify CLI を使います。

```bash
npm install
cp .env.example .env   # 値を埋める
npx netlify dev        # http://localhost:8888
```

`npm run dev`（Vite単体）ではAPIが存在しないため、予約セクションはエラー表示になります。

## トラブルシューティング

- **「サーバー設定が未完了です」と表示される** — Netlifyの環境変数が不足しています。エラーメッセージに不足している変数名が表示されます。
- **Google認証エラー（invalid_grant）** — refresh tokenが失効しています。STEP 2の補足を参照して同意画面を「本番」に公開し、STEP 3を再実行してください。
- **Zoomエラー（4700など）** — Server-to-Server OAuthアプリのScopeが不足しているか、アプリがActivateされていません。
- **リマインドが届かない** — Netlifyの **Logs > Functions > send-reminders** で実行ログを確認してください（15分ごとに実行されます）。
