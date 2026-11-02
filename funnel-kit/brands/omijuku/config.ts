/**
 * オミ塾 の設定（下書き）。
 * 「要確認」「要入力」のコメントがある箇所は、実際の情報に差し替えてから公開すること。
 * 数値・実績・受講生の事例は、根拠と掲載許諾がそろうまで載せない方針。
 */
import { defineBrand } from '../../src/define';

export default defineBrand({
  id: 'omijuku',
  brand: {
    name: 'オミ塾',
    tagline: '繊細さんのためのAIマーケティング',
    operator: '株式会社麹王子',
    staffName: 'オミ',
    staffIcon: '🍵', // 要入力：オミさんの顔写真かアイコン（{ src: '/staff.png', alt: 'オミ' }）
    links: {
      privacy: '#', // 要入力
      tokushoho: '#', // 要入力
      contact: '#', // 要入力
    },
    sns: {},
  },
  theme: { preset: 'calm' },
  offer: { name: '無料個別相談', duration: '45分', format: 'Zoom（顔出しなしOK）', priceLabel: '無料' }, // 要確認：時間

  // 実在の締切がある募集のときだけ campaign を設定する（いまは無し＝カウントダウンは出ない）

  survey: {
    enabled: true,
    hero: {
      image: { alt: 'オミ塾の個別セッションの様子', label: '写真：Zoomで話すオミさん（4:5）' },
      lines: [
        { text: 'AIと一緒に', style: 'inverse' },
        { text: '発信も、導線も', style: 'box' },
        { text: '自分らしく', style: 'boxAccent' },
        { text: '整えませんか？', style: 'box' },
      ],
      tags: ['繊細さん歓迎', 'Zoom個別'],
    },
    teaser: {
      label: '3つの質問に答えると',
      lines: ['あなたに合う', '整え方が分かります'],
      items: [
        { image: { alt: '発信', label: '画像：発信' }, label: '発信の言葉' },
        { image: { alt: 'ページ', label: '画像：LP' }, label: 'ページ' },
        { image: { alt: '公式LINE', label: '画像：LINE' }, label: '公式LINE' },
      ],
    },
    questions: [
      {
        id: 'q1',
        text: 'いまの発信・集客について\nいちばん近いものは？',
        options: ['何を発信すればいいか分からない', '発信しているが申込みにつながらない', 'やることが多くて手が回らない', 'これから事業を始めたい'],
        character: '🌿',
      },
      {
        id: 'q2',
        text: 'いちばん整えたいことを\n1つ教えてください',
        options: ['自分の言葉で伝える文章', '申込みまでの導線（ページ・LINE）', 'AIを使った作業の時短', '商品や価格の考え方'],
        character: '🍃',
      },
      {
        id: 'q3',
        text: 'オミ塾で魅力に感じたところを\n教えてください（複数OK）',
        options: ['自分のペースで進められる', '一緒に手を動かして形にできる', '押し売りをしない', 'AIの使い方がそのまま身につく'],
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
        type: 'invite',
        title: '無料個別相談のご案内',
        lead: 'あなたの事業に合わせて\n[p]整える順番[/p]を一緒に決めます',
        icons: [
          { icon: '✍️', label: '発信の言葉' },
          { icon: '🧭', label: 'ページ' },
          { icon: '💬', label: '公式LINE' },
        ],
        checks: ['いま手をつけるべきこと', 'AIに任せられる作業'],
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
      { type: 'cta', heading: 'まずは[a]話してみる[/a]ところから\n[invt]整える順番[/invt]を一緒に決める', label: '無料で相談する' },
      {
        type: 'futures',
        title: ['AIと一緒に整えると', '日々の発信が', 'こう変わります'],
        items: [
          {
            role: '伝わる言葉',
            desc: ['自分の経験を、', 'AIと一緒に言葉にして', '無理なく発信できる。'],
            images: [
              { alt: '文章づくり', label: '画像：文章づくり' },
              { alt: '投稿', label: '画像：投稿' },
            ],
            tags: ['プロフィール', '投稿文'],
          },
          {
            role: '申込みの導線',
            desc: ['ページから公式LINEまで、', '迷わず進める道を', '用意しておける。'],
            images: [
              { alt: 'LP', label: '画像：LP' },
              { alt: 'LINE', label: '画像：LINE' },
            ],
            tags: ['LP', 'リッチメニュー'],
          },
          {
            role: '作業の時短',
            desc: ['文字起こしや資料づくりを', 'AIに任せて、', '考える時間を残せる。'],
            images: [
              { alt: '資料', label: '画像：資料' },
              { alt: '自動化', label: '画像：自動化' },
            ],
            tags: ['議事録', 'スライド'],
          },
        ],
        footnote: '※ 内容は一例です。成果を保証するものではありません。',
      },
      // 要入力：受講生の事例（本人の掲載許諾が取れたものだけ）
      // { type: 'cases', title: '...', items: [ ... ] },
      {
        type: 'support',
        quote: '気になるけど、うまく話せるかな…',
        quoteSub: 'と思った方へ',
        title: '話すのが苦手でも大丈夫',
        items: ['事前の\n質問で\n整理', '顔出し\nなしで\n参加OK', 'あとで\n見返せる\nメモ付き'], // 要確認：実際の提供内容
        conclusion: 'ゆっくり、あなたのペースで',
      },
      {
        type: 'offerDetail',
        title: '無料個別相談とは？',
        label: 'あなたの事業を一緒に整理する\nZoomでの45分', // 要確認
        checks: ['いまの[p]発信と集客[/p]の棚卸し', '[p]AIに任せられる作業[/p]の洗い出し', '[p]ページ・公式LINE[/p]の導線チェック', 'これからの[p]進め方の提案[/p]'],
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
          '繊細さんのための、AIを使ったマーケティングの伴走をしています。',
          '発信の言葉づくりから、ページ・公式LINEの導線まで、一緒に手を動かして形にします。',
        ],
      },
      {
        type: 'faq',
        title: 'よくあるご質問',
        items: [
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
      options: [
        'すぐにでも一緒に進めたい',
        '話を聞いて前向きに考えたい',
        'まずは相談だけしてみたい',
      ],
    },
    message: {
      prompt: '相談したいことがあれば、自由に書いてください（空欄でも大丈夫です）。',
      placeholder: '例：Instagramは続けているけれど、申込みにつながらない',
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

  // 要入力：公式LINEのベーシックID（@xxxx）と友だち追加URL
  line: { mode: 'B', oaId: '', addFriendUrl: '', messageTemplate: '相談予約:{rid}' },
  backend: { type: 'demo' }, // 本番は { type: 'gas', endpoint: 'https://script.google.com/macros/s/.../exec' }
});
