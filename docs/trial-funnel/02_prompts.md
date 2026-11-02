# 講座LPファネル 再現プロンプト設計

> 前提：`01_analysis.md` の要素分解を「型」として使い、中身（ブランド・コピー・写真・特典）はすべて自社のものに差し替える。
> 構成：**変数シート → P0 マスター → P1 コピー → P2〜P7 各画面 → P8 画像 → P9 計測・バックエンド → P10 クライアント適用 → 受け入れ基準**
> 実装：P0〜P9 の内容は `funnel-kit/` として実装済み（README参照）。新規クライアントは **P10** から始める。
> 使い方：まず変数シートを埋める → P1でコピーを生成して確定 → P0＋該当プロンプトを渡して画面ごとに実装する（Claude Codeならこのファイルを指定するだけでよい）

---

## 変数シート（最初に埋める）

```yaml
BRAND: ""                # ブランド名（例：Honest Marketing Club）
OFFER_NAME: ""           # 無料体験の名称（例：無料体験レッスン）
OFFER_DURATION: ""       # 体験の所要時間（例：90分）
OFFER_FORMAT: ""         # 開催形式（例：Zoom／スマホ参加OK）
TARGET: ""               # ターゲット（例：未経験から在宅で稼ぎたい20〜30代女性）
HERO_PROMISE: ""         # FVで約束すること（例：AIを使いこなして月◯万円）※根拠と注釈が必須
SKILLS: []               # 体験できるスキル3つ（名前＋アイコンのモチーフ）
CAREERS: []              # 目指せる働き方3〜5（職種名／説明3行／業務タグ2つ／単価の目安2行＋注釈）
CASES: []                # 受講生の事例3〜5（名前／before／期間／after2行／写真）※掲載許諾済みのもの
SUPPORT: []              # サポート体制3点
OFFER_CHECKLIST: []      # 体験で得られること4点
TIME_SLOTS: []           # 開催枠（朝／昼／夜。各2枠ずつ）
PROOF:                   # 数値の実績（無ければ空欄＝セクションごと非表示）
  value: ""              # 例：満足度◯%
  footnote: ""           # 例：期間・n・算出方法
PRICE_BENEFIT: ""        # 価格メリット（補助金／早割／分割／返金保証など、自社が実際に使えるもの）
CAMPAIGN:                # 特典（無ければ空欄＝S02・S06・S14を「参加者全員特典」型に切り替え）
  type: "all|lottery"    # all＝全員配布（推奨）／lottery＝抽選（法務確認が必須）
  items: []              # 特典名・画像・締切
  deadline: ""           # ISO形式の日時（例：2026-11-30T21:00:00+09:00）※実在の締切のみ
SURVEY:                  # アンケートの設問（3問）
  q1: { text: "", options: [] }
  q2: { text: "", options: [] }
  q3: { text: "", options: [] }   # 「魅力に感じたポイント」型にする
  video_url: ""                     # Q2とQ3の間に流す動画（30〜60秒）
QUALIFY_OPTIONS: []      # 入会希望度の選択肢5段階
FORM_FIELDS: [date_time, intent, name, email_tel, region, birthdate]   # passwordは会員機能がある場合のみ
LINE_MODE: "B"           # A＝LINEログインで後から連携（完全再現）／B＝友だち追加＋予約番号の自動送信（簡易）／C＝LIFFで最初から取得
LINE_OA_ID: ""           # @から始まるベーシックID
BACKEND: "gas"           # gas（Googleスプレッドシート＋Gmail）／vercel（Functions＋Resend）
TONE: ""                 # 口調（例：やさしい・誠実・煽らない）
```

---

## P0｜マスタープロンプト（全工程の前に必ず渡す）

```
あなたは日本の講座ビジネスのLPを専門とする、シニアのフロントエンドエンジニア兼CROデザイナーです。
docs/trial-funnel/01_analysis.md に記載のファネルを「構造・UX・導線」まで忠実に再現し、
中身はすべて変数シート（docs/trial-funnel/02_prompts.md）の値に差し替えて実装してください。

# 目的
LINE配信 → アンケート（3問＋動画）→ 本LP → チャット型申込（最大8ステップ）→ 完了＋LINE連携 → 自動メール
の流れで、無料体験（{{OFFER_NAME}}）の予約を最大化する。

# 技術
- 既存リポジトリ（React 19 + Vite + Tailwind CDN + framer-motion）に、既存サイトとは別のエントリとして /trial/ を追加する
  （Viteのマルチページ。既存のNavbarや明朝体のテーマは読み込まない）
- ルート：/trial/（アンケート）→ /trial/lp（本LP）→ チャットフォームはLP上のオーバーレイ → /trial/thanks
- アンケートの回答・UTM・流入元は sessionStorage とクエリパラメータでLPとフォームに引き継ぐ
- モバイル優先。コンテンツの最大幅は480pxで中央寄せ。PCでは左右に背景色を敷く
- 画像は /public/trial/ に置く。WebPを使い、2枚目以降は loading="lazy"
- 文字はHTMLで組む（画像に焼き込まない）。写真・イラスト・景品・コース表紙だけを画像にする

# デザイントークン（01_analysis.md §3 を正とする）
pink-bg #F8CDD8 / pink-soft #FBEFF2 / pink-hot #EF5A86 / magenta #E5307A / red-cta #C5282C（影 #8F1C1F）
navy #3D4B5F / teal #2A9FA6 / mustard #E7B93E / yellow #FFF04A / blue-q #2F62D6 / orange #F07A2B
rose #D07A88（disabled #E8B5BE）/ line-green #06C755 / cream #FFFBEA / ink #3A3F4B
フォント：見出し Zen Maru Gothic 700/900、ポップ見出し Mochiy Pop One、本文 Noto Sans JP 500
字間：見出し 0.08〜0.15em。行間：本文 1.8

# 共通コンポーネント（先に作ってから各セクションで使い回す）
BubbleLabel（しっぽ付きピル）, InvertTag（反転ブロック文字）, Marker（下半分の蛍光マーカー）, SlashHeading（\ ◯◯ /）,
CircleBadge×3, CheckList, Carousel（左右の丸ボタン＋ドット＋スワイプ）, StepCard, TripleArrow（↓↓↓）, ConnectorPill（「さらに」）,
Sparkle（✦）, CtaPill（赤ピル＋上にマイクロコピー＋▸）, CountdownBar, GridBg（方眼）, AuroraBg, WarnStripe

# 絶対ルール（誠実さ）
- カウントダウンは {{CAMPAIGN.deadline}} が実在する場合だけ表示する。過ぎたらバーを消し、締切に関する文言も消す
- 数値（満足度・単価・収入）は PROOF.footnote が無ければセクションごと非表示にする
- 「検索しても出てきません」「閉じる際はご注意」などの恐怖訴求は使わない（S15は事実ベースの文言に置き換える）
- パスワードなどの機密情報は確認画面でもマスクする
- 景品が lottery の場合は、締切・当選人数・応募条件・当選発表の方法を必ず明記する

# 品質基準
- Lighthouse（モバイル）：Performance 85以上、Accessibility 95以上
- タップ領域は44px以上。コントラストはAA以上
- 横スクロールを発生させない（overflow-x: clip）
- 計測イベントは P9 の定義どおりに発火させる
```

---

## P1｜コピー生成プロンプト（実装前にコピーを確定する）

```
変数シートの値だけを使い、01_analysis.md のセクション表（S00〜S15）とフォーム表（Step0〜9）の
「構成要素」の型に合わせて、日本語のコピーを書いてください。

制約：
- 型（文字数・行数・強調の位置・スラッシュ囲み・反転ブロック）は元の構成に合わせる。言い回しは元LPから流用しない
- 各見出しは1行15文字以内、最大3行。改行位置も指定する
- 強調箇所は [反転]…[/反転]、[マーカー]…[/マーカー]、[ピンク]…[/ピンク] で示す
- 数値や約束には、出典の注釈（※）を必ずセットで付ける。根拠が変数シートに無いものは書かずに「要データ」と記載する
- 口調：{{TONE}}。煽り表現・恐怖訴求・断定的な収入保証は禁止
- 出力形式：セクションIDごとに YAML で（id, eyebrow, heading[], body[], items[], cta, footnote）

最後に、LINE配信のテキスト（3〜4行）とカード画像の文言、完了メールの件名3案（損失回避型／ベネフィット型／リマインド型）も出してください。
```

---

## P2｜LINE配信（テキスト＋カード画像）

```
LINE公式アカウントから送る、無料体験への誘導メッセージを作成してください。

1) テキストの吹き出し（3〜4行）
   型：結論の一言 → 次の一歩（{{OFFER_NAME}}）→ 何が分かるか → 絵文字1〜2個で締め

2) カード画像（1040×1300px、PNG。HTMLで組んで書き出す。/public/trial/line-card.png）
   - 外枠：角丸24pxのオレンジの太枠（#F07A2B）。内側はクリーム地にドットの装飾
   - 見出し3行：「◯◯でも [反転]キーワード1[/反転] 使いこなして」「[大きな反転]キーワード2[/大きな反転]」「で◯◯したい◯◯探してます」
   - 左上に丸バッジ「初心者歓迎」、帯「今さら聞けない！◯◯のあれこれが知れる！」
   - 表形式：開催日（大きな数字）／料金：完全無料／内容：2行／特典：1行（ラベルは緑の四角）
   - 下部：「\ ◯◯が分かる無料イベント /」＋ピル型ボタン「お申し込みはこちら ▶」＋右下にキャラクター
   - 開催日は画像に入れず「毎日開催」「平日夜も開催」など、使い回せる表現にする

3) 配信設定
   - タップ時の遷移先：/trial/?utm_source=line&utm_medium=message&utm_campaign={{campaign}}
   - LINE_MODE が C の場合は、遷移先をLIFFのURL（https://liff.line.me/{{LIFF_ID}}）にする
```

---

## P3｜アンケートページ（/trial/）

```
アンケートページを実装してください。01_analysis.md の「② アンケートLP」を忠実に再現します。

構成：
1. FV：人物写真（左寄せ）＋右側に縦積みのコピー4段
   - 1段目：濃紺の反転帯（スキル名）
   - 2段目：白い箱に濃紺の文字
   - 3段目：白い箱にピンクの太字（約束の数値）
   - 4段目：白い箱に濃紺の文字（「叶えませんか?」型の問いかけ）
   - 写真の上に職種タグ（黄色の小ラベル）を2つ配置
2. 報酬予告ボックス：BubbleLabel「アンケート回答後」→ ピンク帯2段 → 特典のサムネ3点（ギザギザの円背景＋画像＋ピル型ラベル）
   ※CAMPAIGN が空の場合は「回答後に◯◯をプレゼント」など、全員配布の特典1点に差し替える
3. 設問エリア（背景 #F8CDD8）
   - ステッパー：Q1–Q2–Q3（小丸。現在地は塗りつぶし）＋右側に現在の設問の大丸（#2F62D6、白文字）
   - 設問文（2行・中央揃え・太字）→ 丸枠のキャラクター（設問ごとに表情を変える）
   - 選択肢カード：白地、角丸8px、下辺4pxの #EF5A86 の影。左に四角のチェックボックス
     タップすると、カードがピンク塗り＋白文字＋青のチェックに変わる
   - Q1・Q2：選んだら0.3秒後に自動で次へ。Q3：複数選択可＋オレンジの「回答する」ボタン
4. 動画インタースティシャル（Q2の後）
   - 「[マーカー]動画再生後に最後の設問に遷移[/マーカー]します」
   - 16:9の動画（muted / playsinline / autoplay。音声ONのボタン付き）。ended でQ3へ進む
   - 10秒戻し・10秒送りは表示するが、シークバーで終盤まで飛ばしても ended までは進めない
   - 動画が読み込めない場合は、15秒後に「次へ進む」ボタンを出す（ユーザーを閉じ込めない）
5. 設問間の遷移：#2F62D6 の全面ワイプ（左から右へ、400ms、framer-motion）
6. 「回答する」→ 回答を sessionStorage に保存 → /trial/lp?from=survey&q2=…&q3=… へ遷移

計測：survey_view / survey_answer(q, value) / video_start / video_complete / survey_complete
```

---

## P4｜本LP（/trial/lp）— セクション別プロンプト

> P4は1回で全部作らず、**S00〜S05 → S06〜S09 → S10〜S15** の3回に分けて渡す（品質が安定する）。

### P4-1（S00〜S05）
```
01_analysis.md の S00〜S05 を実装してください。コピーは P1 で確定したYAMLを使います。

S00 CountdownBar：position: sticky、top 0、背景 #3D4B5F。左に2行のラベル（「◯◯終了まで」）、右に［DD］日［HH］時間［MM］分［SS］秒
    数字は白い角丸の箱（Roboto Mono系の等幅数字）。1秒ごとに更新。締切を過ぎたらバーをアンマウントする
S01 サンクス帯：背景 #C8282D、白文字2行（字間0.2em）、右下にキャラクター。?from=survey のときだけ表示する
S02 FV：BubbleLabel（濃紺の縁取り、「あなたに」だけ黄色）→ ポップ見出し（Mochiy Pop One、白フチ3px、紫の影 4px 4px #6B3FA0）
    → ラベル2つ（「予約で」濃紺／「さらに参加で」ピンク）→ 特典のサムネ3点（日付の丸バッジ付き）→ 黄色の締切帯 → 小さな注記リンク
    背景：ピンク／黄／水色の三角形を重ね、集中線をSVGで描く
S03 ConnectorPill「さらに」＋縦線の矢印 → ピンク帯の見出し → 2行のリード（「0円」だけピンク）→ 白カードにスキルアイコン3点（ティールのラベル）
    → 「＋」の丸 → CheckList 2点 → 手書き風の下線付き「が知れる!」＋右下にイラスト。背景は GridBg
S04 CircleBadge×3（ピンク／ティール／マスタード、直径96px、中にアイコン）＋注釈。PROOF が空なら数値バッジを「◯◯OK」型に差し替える
S05 SlashHeading（\ と / の斜線を左右に）＋反転タグ2つ → CtaPill「ギフトを受け取る」（赤、影 0 4px 0 #8F1C1F、押すと影が縮む）

全CTAは onClick で ChatForm を開く（P5）。計測：cta_click(section_id)
```

### P4-2（S06〜S09）
```
01_analysis.md の S06〜S09 を実装してください。

S06 濃紺の吹き出し（「\◯◯/」の手書き風ラベル＋2行の見出し。キーワードは黄色地の反転）→ StepCard のカルーセル（3枚＋完了カード1枚）
    STEP番号は濃紺の丸（STEP／1）。カードには、スマホUIのイラストと説明2行（キーワードはピンク＋下線）
    完了カードは「応募条件達成!」（ピンクの大きな文字）＋ギフトのアイコン
S07 見出し3行（1行目はピンク、3行目は最大サイズ＋ピンクのマーカー下線＋✦）→ 職種カルーセル（CAREERS）
    各スライド：ピル型の職種名（#E5307A）→ 説明3行（行ごとに点線の区切り）→ 写真2枚とイラスト1枚のコラージュ（角に業務タグ2つ）
    → ピンク地に単価リスト（チェック付き）→ ※注釈
S08 SlashHeading＋傍点付きの「未経験」＋反転タグ3つ → 事例カルーセル（CASES）
    各カード：クリップ装飾、「case 0N」（Nだけ特大のピンク）、名前、写真（右側）、ティール帯の白文字でbefore・期間、
    after 2行（ティールの太帯）。背景は AuroraBg＋✦
S09 BubbleLabel「しかも今なら」（ティール）→ 白カード「◯◯で [ピンク反転]◯◯[/ピンク反転]」→ ピンク地に特大の白数字（PRICE_BENEFIT）
    → 注釈（リンク付き）→ 二重スラッシュで囲んだ3行「◯◯は先着順…」→ CtaPill「{{OFFER_NAME}}に参加する」
    ※PRICE_BENEFIT が空ならS09ごと非表示
```

### P4-3（S10〜S15）
```
01_analysis.md の S10〜S15 を実装してください。

S10 濃紺の帯に引用符付きの「"気になるけど私にもできるかな…"」＋「と思った方」→ ピンクのピル見出し
    → CircleBadge×3（パステルの縁取りの円、中に2〜3行の文字）→ TripleArrow（濃紺）→ 「\ 一人で頑張らなくて大丈夫! /」
S11 ポップ見出し「{{OFFER_NAME}}とは?」（グラデーション文字）→ ラベル「◯◯を完全無料で体験できる{{OFFER_DURATION}}」（黄色の角丸）
    → 白カードに CheckList 4点（キーワードはピンク）＋猫などのキャラクター → ラベル「人気の3大スキルが体験できる」→ コース表紙3点
S12 ラベル「[ピンク]朝[/ピンク]から[青]夜[/青]まで開催中」→ 写真3枚を横並び（各写真の下に、時間帯の色帯＋時刻2行）、☀と🌙のアイコン
S13 CtaPill＋TripleArrow＋ConnectorPill「\さらに/ 今なら◯◯で」
S14 キャンペーン詳細（CAMPAIGN が空ならS14ごと非表示）
    ティールの背景＋紙吹雪 → 見出し2段 → 「申し込みで」グループ（特典2点＋人数）＆「さらに参加で」グループ（特典1点＋日付バッジ）
    → 実施期間・応募条件・注意事項 → アコーディオン「応募方法（詳細は必ずご確認ください）」
S15 クロージング：WarnStripe の上下の枠は残し、中身は事実ベースに置き換える
    例：⚠の代わりに📌、「このページは{{流入元}}経由の方だけのご案内です」「次回の開催枠は◯日から埋まり始めています（残り枠数を実数で表示）」
    → CtaPill。※実数の残り枠を取れない場合は、残り枠の文言を出さない

最後にフッター（運営会社・特商法の表記・プライバシーポリシー・お問い合わせ）を追加してください。
```

---

## P5｜チャット型申込フォーム

```
LP上の全画面オーバーレイとして、チャット型の申込フォーム <ChatForm /> を実装してください。
01_analysis.md「④ チャット型申込フォーム」の表を正とします。

レイアウト：
- 背景 #FBEFF2。上部に固定ヘッダー（くすんだピンク地、✦付きの2行「{{BRAND}}{{OFFER_NAME}}／お申込みはこちら」（rose色・字間広め）、線画のスタッフアイコン、右に×）
- ヘッダー直下に進捗表示：左に「n/N」、中央に「お申込み最短60秒」、下にプログレスバー（rose色、幅のアニメーション300ms）
- 本文はチャット履歴型：ボットの吹き出し（左にアイコン、白地、角丸12px）→ その下に入力UI → 「次へ」ボタン（rose色、全幅、角丸4px）
- 新しいステップを追加するときは、タイピングのインジケーターを0.6秒表示 → 吹き出しをフェードイン → 自動で入力UIまでスクロール
- 回答済みのステップは上に残し、タップすれば再編集できる
- 開いたときに body のスクロールをロックする。×で閉じるときは、入力途中なら「入力内容は保持されます」とトーストで知らせる（sessionStorage に保存）

ステップ（FORM_FIELDS の順。password は会員機能がある場合のみ）：
0 挨拶＋既存の申込者向けリンクカード（「以前お申し込みいただいた方はこちら」→ マイページ、またはLINE）
1 PROOF があれば円グラフ（conic-gradient、数値を中央に特大表示）＋注釈 → 予約の案内 → カレンダー（月送り、今日より前はグレーで選択不可、
  枠が満席の日はグレー、選択した日は #EF5A86）→ 時間のセレクト（TIME_SLOTS。満席の枠は disabled で「満席」と表示）
2 入会希望度のセレクト（QUALIFY_OPTIONS）
3 お名前（姓・名の2カラム、autocomplete=family-name / given-name）
4 メール（type=email、キャリアメールの場合は赤字で注意を出す）＋電話（3分割、inputmode=numeric、自動でフォーカス移動）
5 居住地（地方アコーディオン → 都道府県のラジオボタン）
6 生年月日（年・月・日のセレクト。うるう年を考慮）
7 パスワード（会員機能がある場合のみ。6文字以上、表示切替、リアルタイムの検証メッセージ）
8 「最後に、入力内容をご確認ください」→ 確認モーダル（表。パスワードは●で表示）＋規約リンク＋同意チェック（すべてチェックするまで送信不可）→「申し込み完了」
9 完了の吹き出し（🎉）→ 0.8秒後に /trial/thanks へ遷移（予約番号をクエリで渡す）

バリデーション：入力のたびに検証し、有効になるまで「次へ」を disabled にする。エラーは入力欄の直下に赤字で表示する
送信：P9 の submitReservation() を呼ぶ。失敗した場合は再送ボタンを出し、入力値は保持する
計測：form_open / form_step(n) / form_back(n) / form_close(n) / form_submit / form_error(code)
```

---

## P6｜完了画面＋LINE連携（/trial/thanks）

```
/trial/thanks を実装してください。

1. 上部：🎉「ご予約ありがとうございます」＋予約内容のカード（日時・形式・予約番号）
2. LINE連携カード（このページで最も目立たせる要素）
   - 「当日参加の準備完了まで あと一歩です！」＋人物イラスト
   - 「{{OFFER_NAME}}の参加には [緑の極太]LINE連携[/緑の極太] が必要です」
   - 連携のメリット3点（参加URLの事前送付／前日のリマインド／予約者限定の特典）
   - ボタン：#06C755「LINEで参加準備を完了する」
3. LINE_MODE に応じてボタンの挙動を切り替える
   A（完全再現）：LINEログイン（OAuth 2.1）。bot_prompt=aggressive で友だち追加を同時に促す。state に予約番号を入れ、
      コールバック（サーバー関数）で LINEのuserId と予約を紐付けて、本人宛てに予約確認をプッシュ送信する
   B（簡易）：https://line.me/R/oaMessage/{{LINE_OA_ID}}/?{{encodeURIComponent("予約番号:XXXX")}} を開き、
      予約番号入りのメッセージを送ってもらう → 拡張ツール（Lステップ等）のキーワード応答でタグ付けと紐付けを行う
      ※友だち未追加の場合に備え、先に友だち追加ボタン（lin.ee）も表示する
   C（LIFF）：LIFFで開いている場合は、すでに userId が分かっているのでカードを「連携済み✓」表示にする
4. 下部：当日の準備（Zoomアプリを入れる／サインインを済ませる）を2ステップで案内＋カレンダー登録ボタン（.ics・Googleカレンダー）

計測：thanks_view / line_link_click / line_link_complete（Aのコールバック、またはBのWebhookで発火）
```

---

## P7｜自動メール（HTMLメール）

```
予約完了メールのHTMLテンプレートを作成してください（テーブルレイアウト、幅600px、インラインCSS、ダークモード対応）。

件名：P1で作った3案のうち、損失回避型を採用（例：【必読】{{OFFER_NAME}}お申込み完了✅ 参加準備のご案内🎁）。煽りすぎない表現にする
構成（01_analysis.md ⑥ の順番どおり）：
1 「{{name}} 様、ご予約ありがとうございます！」
2 ヘッダー画像（600×300）
3 ⚠ 当日の参加が必要な条件（あれば）を赤字で
4 LINE連携ブロック（薄緑の地、緑ボタン「LINE連携して参加準備を完了する」）※すでに連携済みの人には非表示（差し込み変数で分岐）
5 予約内容の表（コース・日時・集合時刻）
6 「たった3分で完了！」Zoomの準備（2ステップ）
7 青ボタン「体験に参加する（Zoom）」＋ミーティングIDとパスコード（黄色のマーカーで強調）
8 担当者からの一言（「{{name}}様専用の内容を用意してお待ちしています」）
9 特典（あれば）＋2回目のLINE連携CTA
10 締め：「当日お会いできるのを楽しみにしています！」＋安心のチェック3点（オンライン・スマホOK／無理な勧誘なし／完全無料）
11 フッター：SNSアイコン、運営会社、プライバシーポリシー、送信専用の旨、問い合わせ先、配信停止の案内
あわせて、前日20時と当日1時間前に送るリマインドメールの件名・本文も作成してください。
```

---

## P8｜画像生成プロンプト（サムネ群）

> 元LPの「サムネが多くて見やすい」は、ここで決まる。**全画像のトーンをそろえる**ため、共通のスタイル指定を先頭に付ける。

```
共通スタイル：
bright, airy, Japanese lifestyle photography, soft natural window light, pastel pink and mint palette,
clean background, friendly and approachable, no text in image, high resolution

1) FVの人物（4:5）：
   a smiling Japanese woman in her late 20s sitting at a wooden desk with a laptop, chin resting on hand,
   modern casual outfit, cozy home office, looking at camera, shallow depth of field
2) 職種コラージュ用（1:1を各職種2枚）：
   close-up of hands {{業務}} on a smartphone/laptop, flat lay, pastel desk props
3) 開催時間の3枚（3:4）：
   morning: woman with coffee and phone, warm sunlight / noon: woman at laptop in bright office /
   night: woman relaxing with tablet, soft lamp light — same model, consistent wardrobe colors (pink, yellow, blue)
4) 特典のサムネ（1:1、背景透過）：
   product shot of {{特典}}, floating, soft shadow, isolated on transparent background
5) キャラクター（線画、背景透過、表情違いを6種類）：
   simple flat illustration of a young Japanese woman with long black hair, teal sweater, thick outline,
   expressions: thinking / pointing & winking / clapping / surprised / waving / bowing
6) コース表紙（3:4×3）：
   minimal notebook cover mockup, soft pastel texture, small line icon of {{スキル}}, elegant

注意：実在の人物・他社のロゴ・他社キャラクターに似せない。事例（CASES）の写真は必ず本人の実際の写真を使い、生成しない。
```

---

## P9｜計測・バックエンド

```
1) 計測：dataLayer.push({event, ...}) で統一する（GA4とMeta Pixelの両方へ送る）
   イベント：survey_view, survey_answer, video_start, video_complete, survey_complete, lp_view, section_view(id),
   cta_click(section_id), form_open, form_step(n), form_back(n), form_close(n), form_submit, form_error,
   thanks_view, line_link_click, line_link_complete
   すべてのイベントに、utm_* と、アンケートの回答（q1〜q3）と、ABテストの variant を付与する

2) 予約の送信 submitReservation(payload)：
   BACKEND=gas：Google Apps Script のウェブアプリへ POST（Content-Type: text/plain で CORS を回避）
     → スプレッドシートに行を追加 → 予約番号を発行 → 枠の残数を減らす → P7 のメールを Gmail で送信 → JSON {ok, reservationId}
   BACKEND=vercel：/api/reserve（Edge Function）→ データベース（Supabase など）→ Resend でメール送信
   どちらの場合も、同じメールアドレス・同じ枠への二重予約を防ぐ。電話番号とメールは正規化してから保存する

3) 予約枠の取得 getSlots(month)：日付ごとに {time, remaining} を返す → カレンダーとセレクトの disabled 表示に使う

4) LINE（LINE_MODE=A の場合）：/api/line/callback でトークンを交換 → userId を取得 → 予約番号と紐付け
   → Messaging API で確認メッセージをプッシュ送信 → /trial/thanks?linked=1 にリダイレクト
```

---

## P10｜クライアント適用プロンプト（議事録 → config.ts）

> 実装は `funnel-kit/` に完成済み。新しいクライアントは、このプロンプトで `brands/<id>/config.ts` の下書きを作り、確認して差し替えるだけでよい。
> 入力に使うもの：個別セッションの議事録・文字起こし、既存のLPやプロフィール、価格表。

```
あなたは、講座・サービスの申込ファネルを設計するコンサルタントです。
添付した資料（ヒアリングの議事録・文字起こし・既存の資料）だけを根拠に、
funnel-kit/brands/demo/config.ts と同じ形式で、このクライアント用の config.ts を書いてください。
型は funnel-kit/src/types.ts の BrandConfig に従うこと。

手順：
1. 資料から次を抜き出し、出典（資料名と該当箇所）付きで一覧にする
   ターゲット／悩み（本人の言葉）／提供内容／無料の入口（体験・相談）の形式と時間／開催できる曜日と時間帯／
   実績の数値（根拠があるものだけ）／掲載許諾のある事例／価格のメリット／世界観・口調
2. テーマを決める：pop（若い女性向け・にぎやか）／calm（繊細さん・落ち着き）／natural（サロン・暮らし）。理由も1行で
3. アンケート3問を作る：Q1＝いまの状態、Q2＝いちばん変えたいこと（1つ選ぶ）、Q3＝このサービスの魅力（複数選択）。
   選択肢は、資料に出てくる本人の言葉を使う
4. LPのセクションを選んで並べる。根拠が無い要素（数値・事例・締切・価格メリット）のセクションは入れない
5. フォームのステップを選ぶ。個別相談型なら schedule / intent / name / contact / message を基本にし、
   生年月日・居住地・パスワードは、使い道がはっきりしている場合だけ入れる
6. config.ts を出力する。資料に無くて仮置きした箇所には、必ず「// 要確認：…」のコメントを付ける

禁止：資料に無い数値・実績・受講生の声を作ること／恐怖訴求／成果や収入を保証する表現／他社のブランド名やコピーの流用
最後に「公開前にクライアントに確認すること」を箇条書きで出してください。
```

---

## 受け入れ基準（Definition of Done）

- [ ] iPhone（LINEアプリ内ブラウザ）で、LINE → アンケート → LP → フォーム → 完了 → LINE連携 まで一気通貫で動く
- [ ] Q2の後の動画が終わるまでQ3に進めない。ただし読み込みに失敗した場合は15秒後に先へ進める
- [ ] カウントダウンが実在の締切と一致しており、締切を過ぎると関連する要素がすべて消える
- [ ] CTAが4か所あり、すべてフォームを開く。フォームを閉じて開き直しても入力内容が残る
- [ ] フォームの各ステップのバリデーション・満席の枠の無効化・二重予約の防止が効いている
- [ ] 確認画面でパスワード（あれば）がマスクされている
- [ ] 完了メールが届き、LINE連携ボタンが LINE_MODE どおりに動作する
- [ ] P9 のイベントがすべて発火している（GA4 の DebugView で確認）
- [ ] 01_analysis.md §4 の誠実さチェックをすべて満たしている
- [ ] Lighthouse（モバイル）：Performance 85以上、Accessibility 95以上
