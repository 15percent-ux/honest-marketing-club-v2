/**
 * 販売LP：LINE完結ファネル ゼロイチ構築（オミ塾）
 * 商品設計は docs/funnel-service/01_offer.md。【要決定】の価格・期間は、決まったら書き換える。
 * このLP自体が、販売している仕組み（funnel-kit）で動いている。
 */
import { defineBrand } from '../../src/define';

const DEMO = 'https://omijuku-funnel-test.vercel.app';
const demoLink = (path: string) => `${DEMO}${path}${path.includes('?') ? '&' : '?'}demo=1&utm_source=funnelbuild&utm_medium=demo`;

// 診断結果は Q2 の回答で出し分ける
const Q2 = {
  manual: '電話やDMで、ひとつずつやりとりしている',
  portal: 'ポータルサイトや予約サイトに頼っている',
  line: '公式LINEはあるが、うまく使えていない',
  none: 'まだ予約・申込の仕組みがない',
};

const included = (labels: string[], off: string[] = []) => [
  ...labels.map((label) => ({ label, included: true })),
  ...off.map((label) => ({ label, included: false })),
];

export default defineBrand({
  id: 'funnelbuild',
  brand: {
    name: 'LINE完結ファネル構築',
    tagline: '予約まで、自動で回る仕組みを',
    operator: '株式会社麹王子',
    staffName: 'オミ',
    staffIcon: '🍵', // 要入力：オミさんのアイコン
    links: {
      privacy: '#', // 要入力
      tokushoho: '#', // 要入力
      contact: '#', // 要入力
    },
    sns: { line: 'https://lin.ee/o0UYNIM' },
  },
  theme: { preset: 'calm' },
  offer: { name: '無料相談', duration: '45分', format: 'Zoom（顔出しなしOK）', priceLabel: '無料' },

  survey: {
    enabled: true,
    hero: {
      image: { src: '/hero.webp', alt: '公式LINEのトーク画面と予約の管理画面' },
      lines: [
        { text: 'LINEだけで', style: 'inverse' },
        { text: '集客から予約まで', style: 'box' },
        { text: '自動で回る', style: 'boxAccent' },
        { text: '仕組みをつくります', style: 'box' },
      ],
      tags: ['サロン・飲食', '講座・教室'],
    },
    teaser: {
      label: '3つの質問に答えると',
      lines: ['あなたのお店に合う', '始め方が分かります'],
      items: [
        { image: { src: '/demo/result.webp', alt: '診断LP' }, label: '診断LP' },
        { image: { src: '/demo/line.webp', alt: '公式LINE' }, label: '公式LINE' },
        { image: { src: '/demo/admin.webp', alt: '予約管理' }, label: '予約管理' },
      ],
    },
    questions: [
      {
        id: 'q1',
        text: 'お店・お仕事の業種を\n教えてください',
        options: ['美容院・ヘアサロン', 'エステ・ネイル・リラク', '飲食店', '講座・スクール・コーチ', 'その他のお店・サービス'],
        character: '🏠',
      },
      {
        id: 'q2',
        text: 'いまの予約・申込の受け方に\nいちばん近いものは？',
        options: [Q2.manual, Q2.portal, Q2.line, Q2.none],
        character: '📅',
      },
      {
        id: 'q3',
        text: 'いちばん解決したいことを\n教えてください（複数OK）',
        options: ['問い合わせ対応に時間を取られる', '新しいお客さまが増えない', '当日キャンセル・無断キャンセル', 'リピートにつながらない'],
        multiple: true,
        character: '💡',
      },
    ],
    submitLabel: '回答して結果を見る',
  },

  lp: {
    sections: [
      { type: 'thanksBand', text: 'ご回答ありがとうございました', character: '🍵' },
      {
        type: 'surveyResult',
        questionId: 'q2',
        kicker: 'あなたのお店に合う始め方は…',
        stepLabel: '無料相談でやること',
        results: {
          [Q2.manual]: {
            name: '予約対応を自動にする',
            icon: '📅',
            desc: [
              'お客さまが[p]自分で日時を選んで予約[/p]できる形にして、日程調整のやりとりをなくします。',
              '確認メールと前日のリマインドも自動で届くので、うっかり忘れも減らせます。',
            ],
            step: 'いまのやりとりの流れを一緒に書き出し、自動にできるところを決めます。',
          },
          [Q2.portal]: {
            name: '自分の予約導線をつくる',
            icon: '🧭',
            desc: [
              '予約サイトとは別に、[p]お店の公式LINEとページ[/p]から予約できる道をつくります。',
              '予約したお客さまの記録がお店のGoogleアカウントに残るので、次のご案内にも使えます。',
            ],
            step: 'いまの集客の入口を見て、自分の導線に寄せる順番を一緒に決めます。',
          },
          [Q2.line]: {
            name: '公式LINEを接客係にする',
            icon: '💬',
            desc: [
              'URLを流すだけの公式LINEを、[p]診断から予約までトークの中で進む[/p]接客係に変えます。',
              'リッチメニューとカードのデザインも含めてつくります。',
            ],
            step: 'いまの公式LINEの設定と配信を一緒に見て、どこから変えるかを決めます。',
          },
          [Q2.none]: {
            name: '入口づくりから始める',
            icon: '🌱',
            desc: [
              'まずは[p]お店の魅力が伝わるページと予約フォーム[/p]から。小さく始めて、必要に応じて公式LINEにつなげます。',
              '月額のツール費がかからない構成なので、始めるときの負担を抑えられます。',
            ],
            step: 'お店の強みとお客さまを整理して、最初に用意するページを一緒に決めます。',
          },
        },
        note: '※ 3つの質問への回答から表示しています。成果を保証するものではありません。',
      },
      {
        type: 'support',
        quote: 'その予約対応、毎日ひとりで抱えていませんか？',
        title: 'その手間、仕組みに任せられます',
        items: ['問い合わせ\nへの返信', '日程の\nやりとり', '前日の\nリマインド'],
        conclusion: '予約まで、自動で回る形に',
      },
      {
        type: 'invite',
        title: 'LINE完結ファネル構築',
        lead: 'ページ・公式LINE・予約管理を\n[p]まるごと[/p]つくって納品します',
        icons: [
          { icon: '🧭', label: '診断LP' },
          { icon: '💬', label: '公式LINE' },
          { icon: '📅', label: '予約管理' },
        ],
        checks: ['お客さまが迷わない導線', '手が空く予約対応'],
        checksSuffix: 'が手に入る',
        illustration: '🍵',
      },
      {
        type: 'badges',
        items: [
          { title: '月額の\nツール費0円', icon: '🔧', tone: 'teal' },
          { title: 'スマホで\n予約管理', icon: '📱', tone: 'primary' },
          { title: '煽らない\n誠実な設計', icon: '🤝', tone: 'mustard' },
        ],
        footnote: '※ LINE公式アカウントの利用料（配信数による）と、独自ドメイン代は実費です。',
      },
      {
        type: 'demos',
        kicker: '実際に触れるデモ',
        title: 'この仕組みで動いている\n[p]本物のデモ[/p]を触ってください',
        lead: 'オミ塾で実際に使っている仕組みです。体験モードなので、最後まで進んでも予約は入りません。',
        items: [
          { title: '診断LP', desc: '3つの質問に答えると、その人に合う提案が出ます。', image: { src: '/demo/survey.webp', alt: '診断LPの画面' }, link: { label: '診断を試す', href: demoLink('/') } },
          { title: '診断結果', desc: '回答によって結果が変わり、相談の予約につながります。', image: { src: '/demo/result.webp', alt: '診断結果の画面' } },
          { title: 'チャット型の予約フォーム', desc: 'カレンダーから日時を選ぶだけ。満席の枠は自動で選べなくなります。', image: { src: '/demo/form.webp', alt: '予約フォームの画面' }, link: { label: '予約フォームを試す', href: demoLink('/lp?open=form') } },
          { title: '公式LINE', desc: 'リッチメニューとカードで、トークの中で診断から予約まで進みます。', image: { src: '/demo/line.webp', alt: '公式LINEのトーク画面' } },
          { title: '予約完了と自動の案内', desc: '確認メール、前日・1時間前のリマインド、LINE連携の案内まで自動です。', image: { src: '/demo/thanks.webp', alt: '予約完了の画面' } },
          { title: 'スマホの管理画面', desc: '今日・これからの予約、状態の変更、メモ、検索がスマホで完結します。', image: { src: '/demo/admin.webp', alt: '管理画面' } },
        ],
        footnote: '※ 画面はオミ塾のデモです。管理画面の予約は見本のデータです。',
      },
      { type: 'cta', heading: 'まずは[a]無料相談[/a]で\n[invt]お店に合う導線[/invt]を一緒に考える', label: '無料で相談する' },
      {
        type: 'futures',
        title: ['お店や教室に合わせて', '診断と予約の流れを', '設計します'],
        items: [
          {
            role: '美容院・ヘアサロン',
            desc: ['髪の悩みとなりたい雰囲気から、', 'おすすめのメニューを提案して', 'そのまま予約へ。'],
            images: [{ src: '/cards/salon.jpg', alt: '美容院' }, { src: '/demo/line.webp', alt: '公式LINEの画面' }],
            tags: ['メニュー提案', '指名予約'],
          },
          {
            role: 'エステ・ネイル',
            desc: ['肌や爪の悩みと通える頻度から、', '合うコースを提案して', '初回の予約へ。'],
            images: [{ src: '/cards/esthe.jpg', alt: 'エステ・ネイル' }, { src: '/demo/result.webp', alt: '診断結果の画面' }],
            tags: ['コース提案', '初回予約'],
          },
          {
            role: '飲食店',
            desc: ['人数と用途（記念日・会食）から、', 'コースを提案して', '席の予約へ。'],
            images: [{ src: '/cards/restaurant.jpg', alt: '飲食店' }, { src: '/demo/form.webp', alt: '予約フォーム' }],
            tags: ['コース予約', '記念日'],
          },
          {
            role: '講座・スクール・コーチ',
            desc: ['いまの状態と目指す姿から', 'タイプ診断の結果を出して、', '体験会・相談の予約へ。'],
            images: [{ src: '/cards/school.jpg', alt: '講座・スクール' }, { src: '/demo/survey.webp', alt: '診断LP' }],
            tags: ['タイプ診断', '体験会'],
          },
        ],
        footnote: '※ 業種ごとの流れは一例です。ヒアリングをもとに設計します。',
      },
      {
        type: 'offerDetail',
        title: 'つくるもの',
        label: 'ヒアリングから公開まで\nまるごとお任せください',
        checks: [
          '[p]導線設計書[/p]（診断3問と結果の出し分け）',
          '[p]診断LP[/p]とチャット型の予約フォーム',
          '[p]公式LINE[/p]のリッチメニュー・カード・トーク内予約',
          '[p]予約の自動化[/p]（確認メール・前日リマインド）',
          '[p]管理画面[/p]（スマホで予約一覧・状態・メモ）',
          '共有用の画像と[p]アクセス計測[/p]の設定',
        ],
        character: '🧰',
        subLabel: '納品物のイメージ',
        covers: [
          { image: { src: '/demo/line.webp', alt: '公式LINE' }, label: '公式LINE' },
          { image: { src: '/demo/result.webp', alt: '診断結果' }, label: '診断LP' },
          { image: { src: '/demo/admin.webp', alt: '管理画面' }, label: '管理画面' },
        ],
      },
      {
        type: 'plans',
        kicker: 'PLAN',
        title: '料金プラン',
        lead: 'すべて買い切りです。月額のツール費はかからない構成でつくります。',
        // 【要決定】価格と範囲（docs/funnel-service/01_offer.md §4）
        plans: [
          {
            name: 'ライト',
            price: '198,000円',
            priceNote: '税込',
            target: 'まずはページと予約を自動にしたい',
            features: included(['導線設計書', '診断LP・予約フォーム', '予約の自動化・管理画面', '公開後1ヶ月の修正サポート'], ['公式LINEの接客（リッチメニュー・トーク内予約）', '数字を見た改善（月1回）']),
          },
          {
            name: 'スタンダード',
            price: '398,000円',
            priceNote: '税込',
            target: '公式LINEで接客まで任せたい',
            recommended: true,
            features: included(['導線設計書', '診断LP・予約フォーム', '予約の自動化・管理画面', '公式LINEの接客（リッチメニュー・トーク内予約）', '公開後1ヶ月の修正サポート'], ['数字を見た改善（月1回）']),
          },
          {
            name: '伴走',
            price: '598,000円',
            priceNote: '税込',
            target: '公開後の改善まで一緒にやりたい',
            features: included(['導線設計書', '診断LP・予約フォーム', '予約の自動化・管理画面', '公式LINEの接客（リッチメニュー・トーク内予約）', '公開後3ヶ月の修正サポート', '数字を見た改善（月1回×3回）']),
          },
        ],
        footnote: '※ LINE公式アカウントの利用料（配信数による）と独自ドメイン代は実費です。※ 集客や売上の成果を保証するものではありません。',
        cta: 'このプランで相談する',
      },
      {
        type: 'steps',
        kicker: '＼公開まで／',
        title: '最短[hl]2〜3週間[/hl]で公開', // 【要確認】期間
        steps: [
          { title: '[p]無料相談[/p]\nいまの流れを一緒に見る' },
          { title: '[p]ヒアリング[/p]\n商品・お客さま・強み' },
          { title: '[p]導線設計書[/p]を\nご確認いただく' },
          { title: '[p]制作[/p]\nページ・LINE・予約' },
          { title: 'スマホで\n[p]確認・修正[/p]' },
        ],
        finale: { title: '公開！', body: '管理画面の使い方もお伝えします' },
      },
      {
        type: 'profile',
        title: 'つくる人',
        name: 'オミ',
        role: 'オミ塾 主宰／株式会社麹王子',
        image: { alt: 'オミのプロフィール写真', label: '写真：オミさん（正方形）' }, // 要入力
        body: [
          'AIを道具にして、個人のお店や講座の集客を「仕組み」にする伴走をしています。',
          'このページも、販売しているファネルと同じ仕組みで動いています。気になるところは、無料相談で何でも聞いてください。',
        ],
      },
      {
        type: 'faq',
        title: 'よくあるご質問',
        items: [
          { q: 'パソコンが苦手でも大丈夫ですか？', a: '管理画面はスマホで完結します。使い方もお渡しします。' },
          { q: '公式LINEを持っていません', a: '開設からお手伝いします。' },
          { q: '写真がありません', a: '撮影の段取り、またはイメージ画像の作成をご相談ください。イメージ画像には「イメージです」と表記します。' },
          { q: '月額の費用はかかりますか？', a: 'この仕組み自体の月額ツール費はかからない構成です。LINE公式アカウントの利用料と、独自ドメインを使う場合のドメイン代は実費です。' },
          { q: '集客が増えることを保証してくれますか？', a: '成果の保証はしていません。予約までの手間を減らし、取りこぼしを防ぐ仕組みをつくります。伴走プランでは、数字を見ながら一緒に改善します。' },
          { q: 'どんな業種でも使えますか？', a: '予約や申込みがある業種（サロン・飲食・教室・講座・個人のサービス）に向いています。合うかどうかは無料相談で判断します。' },
        ],
      },
      {
        type: 'closing',
        icon: '🍵',
        lines: ['予約対応は', '[p]仕組みに任せて[/p]', '本業に集中しませんか'],
        cta: '無料で相談する',
        micro: 'Zoom・45分',
      },
    ],
  },

  form: {
    headerTitle: 'LINE完結ファネル構築 無料相談',
    headerSub: 'お申込みはこちら',
    speedLabel: 'お申込み最短60秒',
    steps: ['greeting', 'schedule', 'intent', 'name', 'contact', 'message'],
    greeting: 'ご興味を持っていただき、ありがとうございます。いくつか教えてくださいね。',
    scheduleIntro: ['ご希望の日にちと時間を選んでください。'],
    // オミ塾の相談と同じ予定表を使う（同じ時間に重ならない）
    schedule: { daysAhead: 21, leadHours: 24, weekdays: [1, 2, 3, 4, 5], times: ['10:00-10:45', '13:00-13:45', '20:00-20:45'] },
    intent: {
      prompt: 'いまのご検討状況を教えてください。',
      options: ['すぐにでも依頼したい', '見積もりがほしい', '話を聞いて検討したい', 'まずは情報収集'],
    },
    message: {
      prompt: 'お店・教室の名前や業種、いまのページやInstagramがあれば教えてください（空欄でも大丈夫です）。',
      placeholder: '例：〇〇サロン（美容院）／Instagram @xxxx',
    },
    agreements: [{ text: 'プライバシーポリシーに同意します。', links: [{ label: 'プライバシーポリシー', href: '#' }] }],
    completeMessage: 'お申込みありがとうございます。\n当日、お店のことを聞かせてください🍵',
  },

  thanks: {
    title: 'お申込みありがとうございます',
    lead: '確認メールをお送りしました。\nあとひとつだけ、準備をお願いします。',
    lineCard: {
      kicker: '当日の準備まで あと一歩です',
      title: '参加URLとリマインドは\n公式LINEでお届けします',
      benefits: ['参加URLを前日にお送りします', '前日にリマインドをお送りします', '事前の質問もLINEで受け付けます'],
      button: 'LINEで準備を完了する',
      character: '💬',
    },
    prep: { title: '当日までのご準備', steps: ['Zoomアプリを入れておく', 'いまのページやInstagramを開ける状態にしておく（なくても大丈夫です）'] },
  },

  // テスト用の公式LINE（本番では本番アカウントに差し替える）
  line: { mode: 'B', oaId: '@203nrsnd', addFriendUrl: 'https://lin.ee/o0UYNIM', messageTemplate: '相談予約:{rid}' },
  // オミ塾と同じ予約の保存先（スプレッドシートの「申込ページ」で見分けられる）
  backend: { type: 'gas', endpoint: 'https://script.google.com/macros/s/AKfycby8vVZrdRn-Pv_AteBsQQDwwhXU9Zrvgv2FBwuTdIElM9f7bDoFGlEeR9F69IaW8_PTqQ/exec' },
});
