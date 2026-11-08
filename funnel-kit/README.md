# funnel-kit

LINE → アンケート（3問＋動画）→ LP → チャット型申込 → 完了＋LINE連携 → 自動メール のファネルを、
**ブランドごとの設定ファイルを差し替えるだけで量産する**キットです。
設計の元になった分析は `../docs/trial-funnel/` にあります。

```
brands/
  demo/      … 全セクション入りの見本（ポップ・ピンク）
  omijuku/   … オミ塾の下書き（落ち着いたテーマ・個別相談型）
    brand.json   … タイトル・説明・OGP（ビルド時にHTMLへ埋め込む）
    config.ts    … 文言・設問・セクション構成・フォーム・LINE・予約データの保存先
    public/      … このブランドの画像・動画（他ブランドの出力には含まれない）
src/          … 共通のコード（ブランドに依存しない）
backend/gas/  … 予約の保存・確認メール・リマインド・LINEログインのGoogle Apps Script
```

## 動かす

```bash
npm install
npm run dev                 # demo
BRAND=omijuku npm run dev   # オミ塾
BRAND=omijuku npm run build # dist/ に出力
```

## 新しいクライアントを追加する

1. `cp -r brands/demo brands/<クライアントid>`
2. `brand.json` のタイトル・説明・OGP画像を書き換える
3. `config.ts` を書き換える（`../docs/trial-funnel/02_prompts.md` の **P10** に、ヒアリングの議事録から下書きを作るプロンプトがあります）
4. 画像を `public/` に置き、`config.ts` の `image: { src: '/xxx.webp', alt: '...' }` に指定する
   （`src` を省略した画像は、差し替え箇所の説明付きのプレースホルダーになります）
5. `BRAND=<id> npm run dev` で確認する

### テーマ
`theme.preset` で `pop`（元LP風・ポップ）／`calm`（繊細さん向け・静か）／`natural`（サロン・暮らし系）を選びます。
色を個別に変えるときは `theme.overrides` に `{ 'c-primary': '#xxxxxx' }` のように書きます（トークンは `src/types.ts` の `ThemeToken`）。

### LPのセクション
`lp.sections` の配列の順に表示されます。並べ替え・削除は自由です。

| type | 元LPでの位置 | 内容 |
|---|---|---|
| `thanksBand` | S01 | アンケート回答のお礼（アンケート経由のときだけ表示） |
| `campaignHero` | S02 | 特典のFV |
| `invite` | S03 | 体験への招待＋スキルのアイコン3つ |
| `badges` | S04 | 円バッジ3つ |
| `cta` | S05・S13 | CTAボタン（見出し・マイクロコピー・↓↓↓・「さらに」付き） |
| `steps` | S06 | 手順のカルーセル |
| `futures` | S07 | 目指せる姿のカルーセル |
| `cases` | S08 | 事例のカルーセル |
| `priceBenefit` | S09 | 価格メリット |
| `support` | S10 | 不安の解消 |
| `offerDetail` | S11 | 体験の中身 |
| `schedule` | S12 | 開催時間帯 |
| `campaignDetail` | S14 | 特典の詳細と条件 |
| `profile` | 追加 | 担当者のプロフィール（個人事業のクライアント向け） |
| `faq` | 追加 | よくある質問 |
| `closing` | S15 | クロージング（恐怖訴求ではなく事実ベース） |

### 自動で守られるルール（誠実さ）
- `campaign.deadline` を過ぎると、カウントダウンバーと `campaignOnly: true` のセクションが**自動で消えます**（アクセスごとにリセットされる偽タイマーは作れません）
- `form.proof`（満足度など）は `footnote`（出典）が無いと表示されません
- パスワードは確認画面でも伏せ字にし、GAS側には保存しません

## 公開する（1クライアント＝1サイト）

Netlify・Vercel のどちらでも、**ベースディレクトリを `funnel-kit`**、**環境変数 `BRAND=<id>`** にして新しいサイトを作ります
（`netlify.toml`・`vercel.json` 設定済み）。同じリポジトリから、クライアントの数だけサイトを作れます。

### Vercel にコマンドで公開する（Git連携なし）
1. Vercel で新しいプロジェクトを作り、環境変数 `BRAND=<id>` を設定する（Framework は Vite、Build Command は `npm run build`、Output は `dist`）
2. `VERCEL_TOKEN=<トークン> python3 scripts/deploy-vercel.py . <teamId> <projectId> <プロジェクト名>`

ソースを Vercel にアップロードし、Vercel 上でビルドして本番に公開します（`node_modules` と `dist` は送りません）。

テスト公開中のサイト：オミ塾 https://omijuku-funnel-test.vercel.app （検索エンジンに載らない設定・予約は demo モードで保存されません）

## 予約データの保存先（GAS）

`config.ts` の `backend` が `{ type: 'demo' }` の間は、予約はどこにも保存されません（画面の確認用）。本番は次の手順です。

1. クライアント用のGoogleスプレッドシートを作る →「拡張機能」→「Apps Script」
2. `brands/<id>/gas.json` に設定（定員・Zoom・LINE・完了ページのURL・スプレッドシートID）を書き、
   `python3 scripts/build-gas.py <id>` で生成した `brands/<id>/apps-script.gs` の中身を貼り付ける
3. `setup` を1回実行する（シートと、1時間ごとのリマインドのトリガーが作られる）
4. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」、アクセス「全員」でデプロイし、URLを控える
5. `config.ts` を `backend: { type: 'gas', endpoint: '<控えたURL>' }` にする

確認メール（予約直後）と、前日20時・1時間前のリマインドがGmailから送られます。

## LINE連携の方式（`line.mode`）

| mode | 仕組み | 必要なもの | 向いているケース |
|---|---|---|---|
| `B`（既定） | 完了画面から、予約番号入りのメッセージを公式LINEに送ってもらう | 公式LINEのベーシックID（`oaId`）。拡張ツール（Lステップ等）のキーワード応答があれば自動でタグ付けできる | まず動かしたい／サーバーを持たない |
| `A` | LINEログインで、予約とLINEのIDを自動で紐付ける（元LPと同じ方式） | LINEログインのチャネル、Messaging APIのトークン、GASのコールバック | 完全に再現したい／自動のリマインドをLINEで送りたい |
| `C` | LIFFで開き、最初からLINEのIDを取得する | LIFFアプリ | 流入がLINEからだけ |
| `none` | LINEを使わない | — | メールだけで運用する |

## 公式LINEボット（トーク内で診断・予約を完結）

`brands/<id>/line-bot.ts` を置くと、`/api/line` に LINE の Webhook が入ります（設問・診断結果・FAQは LP の設定を流用）。

- 友だち追加 → 写真入りカード＋「無料診断をはじめる」
- 診断：3問をカードのボタンで回答 → 結果カード（タイプ別の画像）
- 予約：日にち→時間をボタンで選ぶ → 確認 → 完了。スプレッドシートに `source=line` で記録、オーナーに通知メール
- LPで予約した人が「相談予約:R…」を送ると、予約とLINEを自動で紐付け
- リッチメニュー：大きな「無料診断」＋「稼ぎ方を見る／個別相談を予約／よくある質問」

画像は `node scripts/make-line-assets.cjs <id>`（`brands/<id>/line-assets.json` から生成）。
公開は `python3 scripts/deploy-vercel.py . <teamId> <projectId> <名前> <id>`（ボットも一緒に作って送る）。
Vercel の環境変数に `LINE_CHANNEL_SECRET` と `LINE_CHANNEL_ACCESS_TOKEN` が必要です。

## 管理画面（/admin）

予約の一覧（今日／これから／過去／キャンセル）、状態の変更（予約中・完了・キャンセル・無断欠席）、メモ、検索ができます。
Apps Script の `setup` を実行すると、スプレッドシートに「管理画面」シートができ、合言葉つきのリンクが入ります。
そのリンクを一度開けば、その端末では次回から自動で開けます（合言葉は他の人に教えないこと）。

## 計測
GA4 と Meta ピクセルのIDを `tracking` に入れると、次のイベントが送られます（`dataLayer` にも積まれます）。
`survey_view` `survey_answer` `video_start` `video_complete` `survey_complete` `lp_view` `section_view` `cta_click`
`form_open` `form_step` `form_close` `form_submit`（Metaでは Lead）`form_error` `thanks_view` `line_link_click` `line_link_complete`

## 確認済みの範囲
- demo と omijuku の両方を、iPhone相当の画面サイズで、アンケートから完了画面まで通しで操作して確認済み（コンソールエラーなし、上記イベントの発火も確認）
- GAS は構文と、入力チェック・予約番号・メール本文などの関数単体の動作のみ確認済み。**実際のGoogleアカウントでのデプロイ、LINEログイン（mode A）、LIFF（mode C）は未検証**です
