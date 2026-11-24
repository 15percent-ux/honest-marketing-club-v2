/**
 * オミ塾 の設定（テスト運用中）。打ち出し：「AIで、自分らしく稼ぐ力をつける」
 * 「要確認」「要入力」のコメントがある箇所は、実際の情報に差し替えてから本番公開すること。
 * 数値・実績・受講生の事例は、根拠と掲載許諾がそろうまで載せない。収入を保証する表現は使わない。
 */
import { defineBrand } from '../../src/define';

// 診断は「受講前チェック」：経験（Q1）・AIの経験（Q2）・気になること（Q3）を聞き、
// どの回答でも「安心して進められる理由」を返す。結果の本文は Q2、補足は Q1 と Q3 の回答で出し分ける。
// 選択肢の文言と results / extras のキーを一致させること。
export const SKILL = {
  service: '接客・販売など、人と話す仕事',
  office: '事務・経理などのパソコン作業',
  creative: '文章・写真・SNSでの発信',
  teach: '教える・相談にのる仕事',
  none: '特にスキルと呼べるものはない',
};
export const AI_LEVEL = {
  zero: 'ほとんど使ったことがない',
  tried: '何度か試したことがある',
  sometimes: 'ときどき使っている',
  daily: '毎日のように使っている',
};
export const WORRY = {
  follow: 'ついていけるか不安',
  time: 'まとまった時間が取れない',
  income: '収入につながるか分からない',
  cost: '費用に見合うか知りたい',
};

export default defineBrand({
  id: 'omijuku',
  brand: {
    name: 'オミ塾',
    tagline: 'AIで、自分らしく稼ぐ力を',
    operator: '株式会社麹王子',
    staffName: 'オミ',
    staffIcon: 'オ', // 要入力：オミさんの顔写真（{ src: '/staff.png', alt: 'オミ' }）。文字1つならイニシャルの丸アイコン
    links: {
      privacy: '#', // 要入力
      tokushoho: '/legal',
      contact: '#', // 要入力
    },
    sns: { line: 'https://lin.ee/o0UYNIM' },
  },
  theme: { preset: 'premium' },
  shell: {
    header: { title: 'オミ塾 AI講座', cta: { label: '料金を見る', href: '#plans' } },
    aside: {
      title: 'AI COURSE',
      sub: 'Omi Juku / AI Marketing',
      nav: [
        { en: 'Check', ja: '受講前チェック', href: '/' },
        { en: 'Concept', ja: 'オミ塾とは', href: '#concept' },
        { en: 'Price & Plan', ja: '料金プラン', href: '#plans' },
        { en: 'Consultation', ja: '無料相談', href: '#consult' },
        { en: 'FAQ', ja: 'よくある質問', href: '#faq' },
      ],
      card: { title: 'オミ塾を始めても大丈夫？', image: '/art/production.webp', label: '3つの質問で確かめる', href: '/' },
    },
    promo: {
      badge: 'LINEで\n無料診断できます',
      title: 'Work with AI.',
      sub: 'AIを、自分らしく稼ぐ味方に。',
      button: { label: 'LINEで友だち追加', href: 'https://lin.ee/o0UYNIM' },
    },
    backdrop: '/backdrop.webp',
  },
  offer: { name: '無料個別相談', duration: '45分', format: 'Zoom（顔出しなしOK）', priceLabel: '無料' }, // 要確認：時間

  // 実在の締切がある募集のときだけ campaign を設定する（いまは無し＝カウントダウンは出ない）

  survey: {
    enabled: true,
    hero: {
      image: { src: '/hero.webp', alt: 'カフェでくつろぐ女性' },
      imageNote: '※画像はイメージです',
      lines: [
        { text: 'AIを味方に', style: 'inverse' },
        { text: '自分らしく', style: 'box' },
        { text: '稼ぐ力', style: 'boxAccent' },
        { text: 'つけませんか？', style: 'box' },
      ],
      tags: ['AI未経験OK', '繊細さん歓迎', 'Zoomで受講'],
    },
    teaser: {
      label: '3つの質問に答えると',
      lines: ['オミ塾を安心して', '始められるか分かります'],
      items: [
        { image: { src: '/art/experience.webp', alt: '講座スライドと予約の画面のイメージ' }, label: '経験を商品に' },
        { image: { src: '/art/production.webp', alt: 'AIと文章をつくる画面のイメージ' }, label: 'AIで制作' },
        { image: { src: '/art/marketing.webp', alt: '公式LINEと予約ページのイメージ' }, label: '集客の仕組み' },
      ],
    },
    questions: [
      {
        id: 'q1',
        text: 'これまでのお仕事や得意なことに\nいちばん近いものは？',
        options: [SKILL.service, SKILL.office, SKILL.creative, SKILL.teach, SKILL.none],
        character: 'user',
      },
      {
        id: 'q2',
        text: 'AI（ChatGPTなど）は\nどれくらい使っていますか？',
        options: [AI_LEVEL.zero, AI_LEVEL.tried, AI_LEVEL.sometimes, AI_LEVEL.daily],
        character: 'robot',
      },
      {
        id: 'q3',
        text: 'オミ塾を始めるとしたら\nいちばん気になることは？',
        options: [WORRY.follow, WORRY.time, WORRY.income, WORRY.cost],
        character: 'leaf',
      },
    ],
    // 動画を挟む場合：public/ に mp4 を置いて設定する
    // video: { src: '/intro.mp4', note: '[m]動画のあとに最後の質問[/m]へ進みます', afterQuestion: 2 },
    submitLabel: '回答して結果を見る',
  },

  lp: {
    sections: [
      { type: 'thanksBand', text: 'ご回答ありがとうございました' },
      {
        type: 'surveyResult',
        questionId: 'q2',
        kicker: 'オミ塾を始めても大丈夫？ 診断の結果は…',
        verdict: '安心して進められます',
        results: {
          [AI_LEVEL.zero]: {
            name: 'AIゼロからでも大丈夫です',
            icon: 'plant',
            desc: [
              'オミ塾は、AIを使ったことがない方を前提に[p]最初の一歩から一緒に[/p]進めます。',
              '分からないところはその場で聞けるので、ひとりで置いていかれることはありません。',
            ],
            step: 'AIで何ができるかを実際に見ながら、あなたの最初の一歩を決めます。',
          },
          [AI_LEVEL.tried]: {
            name: '試したことがあれば十分です',
            icon: 'steps',
            desc: [
              '一度でも触ったことがあれば、[p]使い方の土台はもうできています[/p]。',
              'オミ塾では「何に使えば稼ぐ力になるか」を、あなたの経験に合わせて具体的にしていきます。',
            ],
            step: '試したときに困ったことを聞きながら、仕事に使える使い方を一緒に見つけます。',
          },
          [AI_LEVEL.sometimes]: {
            name: 'いまの使い方を、稼ぐ力に変えられます',
            icon: 'compass',
            desc: [
              'ふだん使っているなら、[p]あとは使いどころを仕事に向けるだけ[/p]です。',
              '商品づくりや発信など、収入につながる場面での使い方に絞って進めます。',
            ],
            step: 'いまの使い方を聞いて、収入につながる使いどころを一緒に決めます。',
          },
          [AI_LEVEL.daily]: {
            name: '使いこなす力を、すぐ形にできます',
            icon: 'sparkle',
            desc: [
              'AIに慣れている方は、[p]商品づくりから集客の仕組みまで[/p]一気に進められます。',
              '操作の説明は最小限にして、あなたの商品を形にする時間に使います。',
            ],
            step: 'あなたの得意とAIの使い方から、最初に形にする商品を一緒に決めます。',
          },
        },
        extras: [
          {
            questionId: 'q1',
            label: 'あなたの経験は、こう活かせます',
            answers: {
              [SKILL.service]: 'お客さまの気持ちを想像できる力は、[p]伝わる文章や商品づくり[/p]にそのまま活きます。言葉を整えるのはAIに手伝ってもらいます。',
              [SKILL.office]: 'パソコン作業に慣れていれば、AIの操作もすぐに覚えられます。[p]資料づくりや作業の効率化[/p]は、AIと特に相性のいい分野です。',
              [SKILL.creative]: '発信の経験があれば、AIで[p]文章や画像を形にする速さ[/p]がぐんと上がります。',
              [SKILL.teach]: '教えたり相談にのったりしてきた経験は、[p]講座や個別相談という商品[/p]になります。資料づくりはAIと一緒に進めます。',
              [SKILL.none]: 'スキルがないと感じていても、これまでの仕事や暮らしの中に[p]商品の種[/p]はあります。最初に一緒に棚卸しします。',
            },
          },
          {
            questionId: 'q3',
            label: '気になっていることへの答え',
            answers: {
              [WORRY.follow]: 'Zoomで[p]一緒に手を動かしながら[/p]進めます。受講中は、分からないところを[p]チャットで質問し放題[/p]です。',
              [WORRY.time]: '受講期間は1ヶ月。[p]Zoom1回（3時間）から[/p]のプランもあるので、取れる時間に合わせて選べます。',
              [WORRY.income]: '収入をお約束することはできません。そのかわり、あなたの経験から[p]現実的な稼ぎ方の候補[/p]を出し、最初の一歩まで一緒に決めます。',
              [WORRY.cost]: '料金は[p]このページで先に確認できます[/p]（29,700円から・カードの分割払いもOK）。迷ったら無料相談もどうぞ。押し売りはしません。',
            },
          },
        ],
        stepLabel: 'オミ塾で最初にやること',
        note: '※ 3つの質問への回答から表示しています。収入や成果を保証するものではありません。',
      },
      { type: 'cta', heading: '診断の結果をふまえて\n[p]目的に合うプラン[/p]を選べます', label: '受講プランと料金を見る', href: '#plans' },
      {
        type: 'invite',
        id: 'concept',
        eyebrow: 'CONCEPT',
        title: 'オミ塾とは',
        lead: 'AIを道具にして、[p]自分らしく稼ぐ力[/p]をつける講座です。\n目的に合わせて、5つのプランから選べます。',
        icons: [
          { icon: 'video', label: 'Zoomで一緒に実践' },
          { icon: 'calendar', label: '1ヶ月で集中' },
          { icon: 'compass', label: '目的別に選べる' },
        ],
        checks: ['仕事でAIを使う基本', '文章・画像・動画・アプリなど目的別のスキル'],
        checksSuffix: 'を学べる',
      },
      {
        type: 'badges',
        items: [
          { title: 'AI未経験OK', icon: 'plant', tone: 'teal' },
          { title: 'Zoomで受講', icon: 'video', tone: 'primary' },
          { title: 'カード分割OK', icon: 'card', tone: 'mustard' },
        ],
      },
      {
        type: 'futures',
        eyebrow: 'POSSIBILITY',
        title: ['AIを道具にすると', '稼ぎ方の選択肢が', 'こんなふうに広がります'],
        items: [
          {
            role: '経験を商品にする',
            desc: ['これまでの経験を、', '相談や講座の形にして', '必要な人に届ける。'],
            images: [{ src: '/art/experience.webp', alt: '講座スライドと予約の画面のイメージ' }],
            tags: ['個別相談', 'ミニ講座'],
          },
          {
            role: 'AIで制作する',
            desc: ['文章・画像・資料を', 'AIと一緒につくって、', '制作のお手伝いをする。'],
            images: [{ src: '/art/production.webp', alt: 'AIと文章をつくる画面のイメージ' }],
            tags: ['文章', 'スライド'],
          },
          {
            role: '集客を仕組みにする',
            desc: ['ページから公式LINEまで、', '申込みにつながる道を', '用意しておく。'],
            images: [{ src: '/art/marketing.webp', alt: '公式LINEと予約ページのイメージ' }],
            tags: ['LP', '公式LINE'],
          },
        ],
        footnote: '※ 内容は一例です。収入や成果を保証するものではありません。',
      },
      // 要入力：受講生の事例（本人の掲載許諾が取れたものだけ）
      // { type: 'cases', title: '...', items: [ ... ] },
      {
        type: 'plans',
        id: 'plans',
        eyebrow: 'PRICE & PLAN',
        title: '目的に合わせて選べる5つのプラン',
        lead: '料金はすべて税込です。このページから、そのままお申込みいただけます。クレジットカードなら[p]分割払い[/p]もできます。',
        // 要確認：各プランの「どんな方向け」の一文。checkoutUrl に Stripe の支払いリンクを入れると「決済ページへ進む」が有効になる
        plans: [
          {
            name: 'AI実務基本プラン',
            price: '29,700円',
            priceNote: '税込',
            amount: 29700,
            target: '仕事でAIを使う基本を身につけたい方',
            features: [
              { label: '受講期間 1ヶ月', included: true },
              { label: 'Zoom 1回（3時間）', included: true },
              { label: 'チャットで質問し放題', included: true },
            ],
          },
          {
            name: 'AIクリエイタープラン',
            price: '55,000円',
            priceNote: '税込',
            amount: 55000,
            target: 'AIで文章や画像などの制作物をつくりたい方',
            features: [
              { label: '受講期間 1ヶ月', included: true },
              { label: 'Zoom 1回（3時間）', included: true },
              { label: 'チャットで質問し放題', included: true },
            ],
          },
          {
            name: '動画編集クリエイタープラン',
            price: '165,000円',
            priceNote: '税込',
            amount: 165000,
            target: 'AIを使った動画編集を身につけたい方',
            features: [
              { label: '受講期間 1ヶ月', included: true },
              { label: 'Zoom 4回（各2時間）', included: true },
              { label: 'チャットで質問し放題', included: true },
            ],
          },
          {
            name: 'アプリ開発プラン',
            price: '165,000円',
            priceNote: '税込',
            amount: 165000,
            target: 'AIを使ってアプリをつくりたい方',
            features: [
              { label: '受講期間 1ヶ月', included: true },
              { label: 'Zoom 4回（各2時間）', included: true },
              { label: 'チャットで質問し放題', included: true },
            ],
          },
          {
            name: '法人AI導入支援研修プラン',
            price: '要お見積もり',
            target: '社内でAIを使えるようにしたい企業の方',
            features: [{ label: '研修 半日', included: true }],
            action: 'consult',
            ctaLabel: '見積もりを相談する',
          },
        ],
        installments: {
          counts: [2, 3, 6, 12, 24],
          note: '※ 分割払いはクレジットカードのみです（一部対象外のカードブランドがあります）。1回あたりの金額は分割手数料を含まない目安で、手数料や端数の扱いはカード会社の規定によります。',
        },
        checkout: {
          title: 'お申込み内容の確認',
          rows: [
            { label: 'お支払い方法', value: 'クレジットカード（一括・分割払い）' }, // 要確認：ほかの支払い方法があれば追記
            { label: 'お支払い時期', value: 'お申込み時に決済されます。分割払いの引き落とし日は、カード会社の規定によります。' },
            { label: '受講開始', value: '決済の確認後、受講開始のご案内をお送りします。' },
            { label: 'キャンセル', value: '商品の性質上、決済完了後の返金・キャンセルはお受けできません。' },
          ],
          agree: '上記の内容を確認しました',
          legalHref: '/legal',
          button: '決済ページへ進む',
          pending: '決済ページは準備中です',
        },
        cta: 'このプランで申し込む',
      },
      {
        type: 'offerDetail',
        id: 'consult',
        eyebrow: 'CONSULTATION',
        title: 'どのプランにするか迷ったら',
        label: '無料個別相談（Zoom・45分・顔出しなしOK）', // 要確認：時間
        checks: ['いまの働き方と、[p]AIでやりたいこと[/p]の整理', 'あなたに[p]合うプラン[/p]のご提案', '受講前の[p]不安や質問[/p]へのお答え'],
      },
      { type: 'cta', label: '無料で相談する', micro: '押し売りはしません' },
      {
        type: 'profile',
        eyebrow: 'INSTRUCTOR',
        title: '講師',
        name: 'オミ',
        role: 'オミ塾 主宰／株式会社麹王子',
        image: { alt: 'オミのプロフィール写真', label: '写真：オミさん（正方形）' },
        body: [
          // 要入力：経歴・想い・実績（根拠のあるもの）
          '繊細さんが、AIを道具にして自分らしく稼ぐための伴走をしています。',
          '商品づくりから、ページ・公式LINEの導線まで、一緒に手を動かして形にします。',
        ],
      },
      {
        type: 'faq',
        id: 'faq',
        eyebrow: 'FAQ',
        title: 'よくあるご質問',
        items: [
          { q: 'AIをまったく使ったことがなくても大丈夫ですか？', a: 'はい。使ったことがない方を前提に進めます。' },
          {
            q: 'どのプランを選べばいいですか？',
            a: '仕事でAIを使う基本から始めたい方はAI実務基本プラン、文章や画像などの制作物をつくりたい方はAIクリエイタープランが目安です。迷ったら、無料個別相談でご相談ください。',
          },
          {
            q: '分割払いはできますか？',
            a: 'クレジットカードの場合のみ、2回・3回・6回・12回・24回の分割払いができます（一部対象外のカードブランドがあります）。分割手数料はカード会社の規定によります。',
          },
          {
            q: '申し込んだあとに返金やキャンセルはできますか？',
            a: '商品の性質上、決済完了後の返金・キャンセルはお受けできません。迷っている方は、お申込みの前に無料個別相談をご利用ください。',
          },
          {
            q: 'AIで本当に稼げるようになりますか？',
            a: '収入をお約束することはできません。オミ塾では、あなたの経験や得意なことから、AIを使った現実的な稼ぎ方と最初の一歩を一緒に考えます。',
          },
          { q: '無料個別相談で売り込まれませんか？', a: '押し売りはしません。お申込みは、ご自身のタイミングでどうぞ。' },
        ],
      },
      {
        type: 'closing',
        icon: 'leaf',
        lines: ['AIを味方にする一歩を', '[p]このページから[/p]始めませんか'],
        cta: '受講プランを見る',
        micro: 'カードの分割払いもOK',
        href: '#plans',
      },
    ],
  },

  legal: {
    title: '特定商取引法に基づく表記',
    rows: [
      { label: '販売事業者', value: '株式会社麹王子' },
      { label: '代表者', value: '阪田 真臣' }, // 要確認
      { label: '所在地', value: '請求があった場合には、遅滞なく開示いたします。' },
      { label: '電話番号', value: '請求があった場合には、遅滞なく開示いたします。' },
      { label: 'お問い合わせ', value: '公式LINE（https://lin.ee/o0UYNIM）からお問い合わせください。' }, // 要入力：本番の公式LINE・メールアドレス
      {
        label: '販売価格（税込）',
        value: 'AI実務基本プラン 29,700円\nAIクリエイタープラン 55,000円\n動画編集クリエイタープラン 165,000円\nアプリ開発プラン 165,000円\n法人AI導入支援研修プラン お見積もり',
      },
      { label: '商品代金以外の必要料金', value: 'インターネットの接続料金・通信料金はお客さまのご負担となります。分割払いの手数料は、カード会社の規定によります。' },
      { label: 'お支払い方法', value: 'クレジットカード（一括・分割払い）\n分割払いは2回・3回・6回・12回・24回からお選びいただけます（一部対象外のカードブランドがあります）。' },
      { label: 'お支払い時期', value: 'お申込み時に決済されます。引き落とし日は、カード会社の規定によります。' },
      {
        label: '役務の提供時期',
        value: '決済の確認後、受講開始のご案内をお送りします。受講期間は1ヶ月です。\n法人AI導入支援研修プランは、日程を調整のうえ半日で実施します。',
      },
      { label: '返品・キャンセル', value: '商品の性質上、決済完了後の返金・キャンセルはお受けできません。' },
      { label: '受講に必要な環境', value: 'Zoomを利用できるパソコンまたはスマートフォンと、インターネット環境が必要です。' },
    ],
  },

  form: {
    headerTitle: 'オミ塾 無料個別相談',
    headerSub: 'お申込みはこちら',
    speedLabel: 'お申込み最短60秒',
    steps: ['greeting', 'schedule', 'intent', 'name', 'contact', 'message'],
    greeting: 'このたびは【オミ塾】に興味を持っていただき、ありがとうございます。いくつか教えてくださいね。',
    scheduleIntro: ['ご希望の日にちと時間を選んでください。'],
    schedule: {
      // 要確認：実際に相談を受けられる曜日と時間
      daysAhead: 21,
      leadHours: 24,
      weekdays: [1, 2, 3, 4, 5],
      times: ['10:00-10:45', '13:00-13:45', '20:00-20:45'],
    },
    intent: {
      prompt: 'いまのお気持ちにいちばん近いものを教えてください。',
      options: ['すぐにでも一緒に進めたい', '話を聞いて前向きに考えたい', 'まずは相談だけしてみたい'],
    },
    message: {
      prompt: '相談したいことがあれば、自由に書いてください（空欄でも大丈夫です）。',
      placeholder: '例：会社員を続けながら、これまでの経験を活かして副業を始めたい',
    },
    agreements: [{ text: 'プライバシーポリシーに同意します。', links: [{ label: 'プライバシーポリシー', href: '#' }] }],
    completeMessage: 'お申込みありがとうございます。\n当日お話しできるのを楽しみにしています。',
  },

  thanks: {
    title: 'お申込みありがとうございます',
    lead: '確認メールをお送りしました。\nあとひとつだけ、準備をお願いします。',
    lineCard: {
      kicker: '当日の準備まで あと一歩です',
      title: '参加URLとリマインドは\n公式LINEでお届けします',
      benefits: ['参加URLを前日にお送りします', '前日にリマインドをお送りします', '事前の質問もLINEで受け付けます'],
      button: 'LINEで準備を完了する',
      character: 'chat',
    },
    prep: { title: '当日までのご準備', steps: ['Zoomアプリを入れておく', '相談したいことをメモしておく（なくても大丈夫です）'] },
  },

  // テスト用の公式LINE（LPファネル運用）。本番では本番アカウントに差し替える
  line: { mode: 'B', oaId: '@203nrsnd', addFriendUrl: 'https://lin.ee/o0UYNIM', messageTemplate: '相談予約:{rid}' },
  // 予約の保存先：Googleドライブ「オミ塾 LPファネル（テスト）」の「オミ塾 予約管理（テスト）」に紐づく Apps Script
  backend: { type: 'gas', endpoint: 'https://script.google.com/macros/s/AKfycby8vVZrdRn-Pv_AteBsQQDwwhXU9Zrvgv2FBwuTdIElM9f7bDoFGlEeR9F69IaW8_PTqQ/exec' },
});
