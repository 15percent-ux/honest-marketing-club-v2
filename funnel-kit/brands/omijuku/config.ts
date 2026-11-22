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
      tokushoho: '#', // 要入力
      contact: '#', // 要入力
    },
    sns: { line: 'https://lin.ee/o0UYNIM' },
  },
  theme: { preset: 'calm' },
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
      tags: ['AI未経験OK', '繊細さん歓迎', 'Zoom個別'],
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
              [WORRY.follow]: '1対1なので、[p]あなたのペースに合わせて[/p]進めます。分からないところは、そのつど聞けます。',
              [WORRY.time]: '[p]自分のペースで進められる[/p]形です。取れる時間を聞いたうえで、無理のない進め方を一緒に決めます。',
              [WORRY.income]: '収入をお約束することはできません。そのかわり、あなたの経験から[p]現実的な稼ぎ方の候補[/p]を出し、最初の一歩まで一緒に決めます。',
              [WORRY.cost]: 'まずは[p]無料相談で内容と費用を確かめて[/p]ください。押し売りはしません。合わないと感じたら、それで大丈夫です。',
            },
          },
        ],
        // 要確認：「合わない場合は正直に伝える」はオミさんの方針として書いています
        note: '※ 3つの質問への回答から表示しています。無料相談で、オミ塾が合わないと感じた場合は正直にお伝えします。収入や成果を保証するものではありません。',
      },
      {
        type: 'invite',
        title: '無料個別相談のご案内',
        lead: 'あなたに合う[p]稼ぎ方[/p]と\n最初の一歩を一緒に決めます',
        icons: [
          { icon: 'book', label: '経験の棚卸し' },
          { icon: 'robot', label: 'AIの使いどころ' },
          { icon: 'steps', label: '最初の一歩' },
        ],
        checks: ['あなたに合いそうな稼ぎ方', 'AIに任せられる作業'],
        checksSuffix: 'が分かる',
      },
      {
        type: 'badges',
        items: [
          { title: '顔出し\nなしOK', icon: 'user', tone: 'teal' },
          { title: '1対1で\nじっくり', icon: 'handshake', tone: 'primary' },
          { title: '押し売り\nしません', icon: 'coffee', tone: 'mustard' },
        ],
      },
      { type: 'cta', heading: 'まずは話してみるところから\n[p]あなたに合う稼ぎ方[/p]を一緒に考える', label: '無料で相談する' },
      {
        type: 'futures',
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
        type: 'support',
        quote: '稼ぐって、私にもできるのかな…',
        quoteSub: 'と思った方へ',
        title: 'ひとりで抱えなくて大丈夫',
        items: ['事前の\n質問で\n整理', '顔出し\nなしで\n参加OK', 'あとで\n見返せる\nメモ付き'], // 要確認：実際の提供内容
        conclusion: 'ゆっくり、あなたのペースで',
      },
      {
        type: 'offerDetail',
        title: '無料個別相談とは？',
        label: 'あなたに合う稼ぎ方を一緒に考える\nZoomでの45分', // 要確認
        checks: [
          'いまの[p]働き方と収入[/p]の棚卸し',
          'あなたの[p]経験・得意なこと[/p]の洗い出し',
          '[p]AIに任せられる作業[/p]の見つけ方',
          '[p]最初の一歩[/p]の提案',
        ],
      },
      {
        type: 'profile',
        title: '相談を担当する人',
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
        title: 'よくあるご質問',
        items: [
          {
            q: 'AIで本当に稼げるようになりますか？',
            a: '収入をお約束することはできません。相談では、あなたの経験や得意なことから、現実的な稼ぎ方の候補と最初の一歩を一緒に考えます。',
          },
          { q: 'AIをまったく使ったことがなくても大丈夫ですか？', a: 'はい。使ったことがない方を前提にお話しします。' },
          { q: '相談のあとに売り込まれませんか？', a: '押し売りはしません。必要な方にだけ、続け方をご案内します。' },
          { q: '顔出しは必要ですか？', a: 'カメラはオフのままで大丈夫です。' },
        ],
      },
      {
        type: 'closing',
        icon: 'leaf',
        lines: ['一人で抱えずに', 'まずは[p]話してみませんか[/p]'],
        cta: '無料で相談する',
        micro: '顔出しなしOK',
      },
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
