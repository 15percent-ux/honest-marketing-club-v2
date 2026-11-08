/**
 * オミ塾 の設定（テスト運用中）。打ち出し：「AIで、自分らしく稼ぐ力をつける」
 * 「要確認」「要入力」のコメントがある箇所は、実際の情報に差し替えてから本番公開すること。
 * 数値・実績・受講生の事例は、根拠と掲載許諾がそろうまで載せない。収入を保証する表現は使わない。
 */
import { defineBrand } from '../../src/define';

// 診断結果は Q2 の回答で出し分ける（選択肢の文言と results のキーを一致させること）
const Q2 = {
  experience: '経験や知識を、相談・講座にしたい',
  production: '文章・画像・資料づくりで稼ぎたい',
  marketing: 'いまの仕事の集客をAIで楽にしたい',
  unknown: 'まだ分からない。一緒に考えたい',
};

export default defineBrand({
  id: 'omijuku',
  brand: {
    name: 'オミ塾',
    tagline: 'AIで、自分らしく稼ぐ力を',
    operator: '株式会社麹王子',
    staffName: 'オミ',
    staffIcon: '🍵', // 要入力：オミさんの顔写真かアイコン（{ src: '/staff.png', alt: 'オミ' }）
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
      tags: ['繊細さん歓迎', 'Zoom個別'],
    },
    teaser: {
      label: '3つの質問に答えると',
      lines: ['あなたに合う', '稼ぎ方が分かります'],
      items: [
        { image: { alt: '経験を商品にする', label: '画像：経験を商品に' }, label: '経験を商品に' },
        { image: { alt: 'AIで制作する', label: '画像：AIで制作' }, label: 'AIで制作' },
        { image: { alt: '集客の仕組み', label: '画像：集客の仕組み' }, label: '集客の仕組み' },
      ],
    },
    questions: [
      {
        id: 'q1',
        text: 'いまの働き方・収入について\nいちばん近いものは？',
        options: [
          '本業の収入だけでは少し不安',
          '副業したいが、何をすればいいか迷う',
          '個人で働いているが、収入が不安定',
          '人と関わりすぎる働き方に疲れた',
        ],
        character: '🌿',
      },
      {
        id: 'q2',
        text: 'AIを使って、どんな形で\n稼いでみたいですか？',
        options: [Q2.experience, Q2.production, Q2.marketing, Q2.unknown],
        character: '🍃',
      },
      {
        id: 'q3',
        text: 'オミ塾で魅力に感じたところを\n教えてください（複数OK）',
        options: ['自分のペースで進められる', '一緒に手を動かして形にできる', '押し売りをしない', 'AIの使い方が仕事につながる'],
        multiple: true,
        character: '☕',
      },
    ],
    // 動画を挟む場合：public/ に mp4 を置いて設定する
    // video: { src: '/intro.mp4', note: '[m]動画のあとに最後の質問[/m]へ進みます', afterQuestion: 2 },
    submitLabel: '回答して結果を見る',
  },

  lp: {
    sections: [
      { type: 'thanksBand', text: 'ご回答ありがとうございました', character: '🍵' },
      {
        type: 'surveyResult',
        questionId: 'q2',
        kicker: 'あなたに合いそうな稼ぎ方は…',
        results: {
          [Q2.experience]: {
            name: '経験を商品にする',
            icon: '🎁',
            desc: [
              'これまでの経験や知識を、[p]相談・講座[/p]の形にして届ける稼ぎ方です。',
              '伝わる言葉づくり、資料やページづくりはAIと一緒に進めるので、ひとりで抱え込まずに形にできます。',
            ],
            step: 'あなたの経験を棚卸しして、最初の商品の形を一緒に考えます。',
          },
          [Q2.production]: {
            name: 'AIで制作をサポートする',
            icon: '✍️',
            desc: [
              '文章・画像・資料づくりなど、[p]AIを道具にした制作のお手伝い[/p]で稼ぐ方法です。',
              '人と長い時間話し続けなくても進めやすく、自分のペースを守りやすい働き方です。',
            ],
            step: '得意なことと、AIに任せられる作業を一緒に洗い出します。',
          },
          [Q2.marketing]: {
            name: '集客を仕組みにする',
            icon: '🧭',
            desc: [
              'いまのお店やサービスに、[p]ページと公式LINEの導線[/p]をつくって、申込みが入りやすい状態を整える方法です。',
              '投稿や案内文づくりもAIに手伝ってもらえるので、毎日の負担を減らせます。',
            ],
            step: 'いまの集客の流れを一緒に見て、どこから整えるかを決めます。',
          },
          [Q2.unknown]: {
            name: 'まずは棚卸しから',
            icon: '🌱',
            desc: [
              'あなたの経験・好きなこと・苦手なことを整理するところから始めましょう。',
              '[p]合う稼ぎ方は、整理したあとに見えてきます[/p]。急いで決めなくて大丈夫です。',
            ],
            step: '45分で、あなたに合いそうな稼ぎ方の候補を一緒に出します。',
          },
        },
        note: '※ 3つの質問への回答から表示しています。収入や成果を保証するものではありません。',
      },
      {
        type: 'invite',
        title: '無料個別相談のご案内',
        lead: 'あなたに合う[p]稼ぎ方[/p]と\n最初の一歩を一緒に決めます',
        icons: [
          { icon: '🗂️', label: '経験の棚卸し' },
          { icon: '🤖', label: 'AIの使いどころ' },
          { icon: '👣', label: '最初の一歩' },
        ],
        checks: ['あなたに合いそうな稼ぎ方', 'AIに任せられる作業'],
        checksSuffix: 'が分かる',
        illustration: '🌿',
      },
      {
        type: 'badges',
        items: [
          { title: '顔出し\nなしOK', icon: '🙂', tone: 'teal' },
          { title: '1対1で\nじっくり', icon: '🤝', tone: 'primary' },
          { title: '押し売り\nしません', icon: '🍵', tone: 'mustard' },
        ],
      },
      { type: 'cta', heading: 'まずは[a]話してみる[/a]ところから\n[invt]あなたに合う稼ぎ方[/invt]を一緒に考える', label: '無料で相談する' },
      {
        type: 'futures',
        title: ['AIを道具にすると', '稼ぎ方の選択肢が', 'こんなふうに広がります'],
        items: [
          {
            role: '経験を商品にする',
            desc: ['これまでの経験を、', '相談や講座の形にして', '必要な人に届ける。'],
            images: [
              { alt: '個別相談', label: '画像：個別相談' },
              { alt: '講座資料', label: '画像：講座資料' },
            ],
            tags: ['個別相談', 'ミニ講座'],
          },
          {
            role: 'AIで制作する',
            desc: ['文章・画像・資料を', 'AIと一緒につくって、', '制作のお手伝いをする。'],
            images: [
              { alt: '文章づくり', label: '画像：文章づくり' },
              { alt: '資料づくり', label: '画像：資料づくり' },
            ],
            tags: ['文章', 'スライド'],
          },
          {
            role: '集客を仕組みにする',
            desc: ['ページから公式LINEまで、', '申込みにつながる道を', '用意しておく。'],
            images: [
              { alt: 'LP', label: '画像：LP' },
              { alt: '公式LINE', label: '画像：公式LINE' },
            ],
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
        character: '🍵',
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
        icon: '🍵',
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
    completeMessage: 'お申込みありがとうございます。\n当日お話しできるのを楽しみにしています🍵',
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
    prep: { title: '当日までのご準備', steps: ['Zoomアプリを入れておく', '相談したいことをメモしておく（なくても大丈夫です）'] },
  },

  // テスト用の公式LINE（LPファネル運用）。本番では本番アカウントに差し替える
  line: { mode: 'B', oaId: '@203nrsnd', addFriendUrl: 'https://lin.ee/o0UYNIM', messageTemplate: '相談予約:{rid}' },
  // 予約の保存先：Googleドライブ「オミ塾 LPファネル（テスト）」の「オミ塾 予約管理（テスト）」に紐づく Apps Script
  backend: { type: 'gas', endpoint: 'https://script.google.com/macros/s/AKfycby8vVZrdRn-Pv_AteBsQQDwwhXU9Zrvgv2FBwuTdIElM9f7bDoFGlEeR9F69IaW8_PTqQ/exec' },
});
