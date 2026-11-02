/**
 * デモ用ブランド。元LPの全セクションを「型」として並べた見本。
 * 新しいクライアントを作るときは、このフォルダごと複製して中身を書き換える。
 * 画像の src を省略するとプレースホルダー（差し替え箇所の説明付き）が表示される。
 */
import { defineBrand } from '../../src/define';

export default defineBrand({
  id: 'demo',
  brand: {
    name: 'AIはじめて塾',
    tagline: '未経験から、AIを仕事の道具に',
    operator: 'サンプル株式会社',
    staffName: 'スタッフ',
    staffIcon: '🙋‍♀️',
    links: {
      privacy: '#privacy',
      terms: '#terms',
      tokushoho: '#tokushoho',
      contact: '#contact',
      company: '#company',
    },
    sns: { line: '#line', instagram: '#instagram' },
  },
  theme: { preset: 'pop' },
  offer: { name: '無料体験レッスン', duration: '60分', format: 'Zoom（スマホ参加OK）', priceLabel: '完全無料' },

  // 実在の締切だけを入れる。過ぎるとカウントダウンと campaignOnly のセクションが自動で消える
  campaign: {
    label: '参加者全員プレゼントの\n受付終了まで',
    deadline: '2026-11-30T21:00:00+09:00',
    type: 'all',
  },

  survey: {
    enabled: true,
    hero: {
      image: { alt: 'PCを前に笑顔の受講生', label: '写真：PCを前に笑顔の受講生（4:5）' },
      lines: [
        { text: 'ChatGPT・Canva', style: 'inverse' },
        { text: 'を味方につけて', style: 'box' },
        { text: '自分の仕事', style: 'boxAccent' },
        { text: 'つくりませんか？', style: 'box' },
      ],
      tags: ['AIライター', 'SNS運用'],
    },
    teaser: {
      label: 'アンケート回答後',
      lines: ['参加者全員に', 'プレゼントをご用意'],
      items: [
        { image: { alt: 'プロンプト集', label: '特典画像①' }, label: 'プロンプト集' },
        { image: { alt: '作業テンプレート', label: '特典画像②' }, label: 'テンプレート' },
        { image: { alt: '解説動画', label: '特典画像③' }, label: '解説動画' },
      ],
    },
    questions: [
      {
        id: 'q1',
        text: 'いまの働き方を\n変えたいと思いますか？',
        options: ['すぐにでも変えたい', 'いずれは変えたい', 'まだ迷っている'],
        character: '🤔',
      },
      {
        id: 'q2',
        text: '働き方について変えたいことを\n1つ教えてください',
        options: ['家で働けるようになりたい', '収入の柱をもう1本ほしい', '好きなことを仕事にしたい', '将来の不安を減らしたい'],
        character: '💭',
      },
      {
        id: 'q3',
        text: 'AIはじめて塾の魅力に感じた\nポイントを教えてください',
        options: ['未経験でも始められる', 'AIの使い方を実務で学べる', 'ひとりで悩まず相談できる', '自分のペースで進められる'],
        multiple: true,
        character: '☝️',
      },
    ],
    video: {
      src: '/survey-video.mp4',
      note: '[m]動画の再生後に最後の質問[/m]へ進みます',
      afterQuestion: 2,
      fallbackSeconds: 15,
    },
    submitLabel: '回答する',
  },

  lp: {
    sections: [
      { type: 'thanksBand', text: 'アンケートへのご回答\nありがとうございました！', character: '🙌' },
      {
        type: 'campaignHero',
        campaignOnly: true,
        bubble: '回答してくれた[hl]あなたに[/hl]お知らせ',
        kicker: '参加者全員に',
        headline: ['体験レッスン参加で', '実務テンプレート', 'をプレゼント！'],
        groups: [
          { label: '予約で', tone: 'dark' },
          { label: 'さらに参加で', tone: 'accent' },
        ],
        items: [
          { image: { alt: 'プロンプト集', label: '特典画像①' }, label: 'プロンプト集', badge: '予約で' },
          { image: { alt: '作業テンプレート', label: '特典画像②' }, label: 'テンプレート', badge: '予約で' },
          { image: { alt: '解説動画', label: '特典画像③' }, label: '解説動画', badge: '参加で' },
        ],
        deadlineBand: 'プレゼントの受付は\n[p]11/30（月）21時[/p] まで',
        note: { label: '※特典の内容と受け取り方法はこちら', href: '#campaign' },
      },
      {
        type: 'invite',
        connector: 'さらに',
        title: '無料体験レッスンにご招待！',
        lead: 'AIの使い方を\n[p]0円[/p]で体験できる',
        icons: [
          { icon: '✍️', label: '文章づくり' },
          { icon: '🎨', label: '画像づくり' },
          { icon: '📱', label: 'SNS運用' },
        ],
        checks: ['AIで目指せる働き方', 'あなたに合う学び方'],
        checksSuffix: 'が分かる！',
        illustration: '👩‍💻',
      },
      {
        type: 'badges',
        items: [
          { title: 'スマホ\n参加OK', icon: '📱', tone: 'primary' },
          { title: '顔出し\nなしOK', icon: '🙈', tone: 'teal' },
          { title: '無理な\n勧誘なし', icon: '🤝', tone: 'mustard' },
        ],
      },
      {
        type: 'cta',
        heading: '無料体験に[a]参加[/a]して\n[invt]AIのプチ体験[/invt]と\n[invt]参加特典[/invt]を受け取る',
        label: '特典を受け取る',
        icon: '🎁',
        arrows: true,
      },
      {
        type: 'steps',
        campaignOnly: true,
        kicker: '＼参加者全員／',
        title: 'プレゼントの受け取りは\nレッスンに[hl]参加[/hl]するだけ！',
        steps: [
          { title: '[p]無料体験レッスン[/p]を\n予約する', image: { alt: '予約画面', label: 'イラスト：予約画面' } },
          { title: '予約完了メールの\n[p]LINE連携[/p]を済ませる', image: { alt: 'LINE連携', label: 'イラスト：LINE連携' } },
          { title: '[p]オンラインレッスン[/p]に\n参加する', image: { alt: 'オンライン参加', label: 'イラスト：Zoom参加' } },
        ],
        finale: { title: '受け取り準備完了！', body: 'レッスン終了後にLINEでお届けします' },
      },
      {
        type: 'futures',
        title: ['ChatGPT・Canvaを', 'どちらも学べるから', 'こんな働き方を目指せる'],
        items: [
          {
            role: 'AIライター',
            desc: ['下書きや調べものはAIに任せて、', '自分は構成と仕上げに集中する', '効率的な働き方。'],
            images: [
              { alt: '執筆する手元', label: '写真：執筆する手元' },
              { alt: '記事のイメージ', label: '写真：記事のイメージ' },
            ],
            tags: ['記事作成', '取材まとめ'],
            points: ['ブログ記事の作成', 'メルマガの下書き'],
          },
          {
            role: 'AIデザイナー',
            desc: ['画像生成AIで素材をつくり、', 'Canvaで仕上げる', '新しいデザインのお仕事。'],
            images: [
              { alt: 'バナー制作', label: '写真：バナー制作' },
              { alt: 'Canva画面', label: '写真：Canva画面' },
            ],
            tags: ['バナー', 'SNS画像'],
            points: ['SNS投稿の画像', 'イベントの告知バナー'],
          },
          {
            role: 'SNS運用サポート',
            desc: ['企画・投稿文・画像までを', 'AIと一緒に回す', '発信のお手伝い。'],
            images: [
              { alt: '投稿画面', label: '写真：投稿画面' },
              { alt: '分析画面', label: '写真：分析画面' },
            ],
            tags: ['投稿づくり', '分析'],
            points: ['投稿カレンダーの作成', '反応の分析とレポート'],
          },
        ],
        footnote: '※ 収入や受注を保証するものではありません。業務内容は一例です。',
      },
      {
        type: 'cases',
        title: '[dots]未経験[/dots]から\n[inv]在宅ワーク[/inv][inv]副業[/inv][inv]転職[/inv]を\nかなえた受講生',
        items: [
          {
            name: 'Aさん（30代）',
            image: { alt: '受講生Aさん', label: '写真：受講生（掲載許諾済み）' },
            before: ['元・事務職', '半年で習得'],
            after: ['在宅のライターとして', '家族との時間が増えた'],
          },
          {
            name: 'Bさん（40代）',
            image: { alt: '受講生Bさん', label: '写真：受講生（掲載許諾済み）' },
            before: ['元・販売職', '4ヶ月で習得'],
            after: ['副業でSNS運用を受託', '本業と両立中'],
          },
        ],
        footnote: '※ 個人の体験談であり、成果を保証するものではありません。',
      },
      {
        type: 'priceBenefit',
        kicker: 'しかもいまなら',
        label: '早期申込で[invp]受講料[/invp]が',
        bigPrefix: '最大',
        big: '20',
        bigSuffix: '%OFF',
        footnote: '※ 体験レッスン参加日から7日以内のお申し込みが対象です（実際の条件に合わせて書き換えてください）。',
        urgency: '割引は[p]体験日から7日間[/p]\n迷ったら、まずは体験で\n確かめてください',
      },
      { type: 'cta', micro: 'AIの使い方をプチ体験！', label: '無料体験レッスンに参加する' },
      {
        type: 'support',
        quote: '気になるけど、私にもできるかな…',
        quoteSub: 'と思った方へ',
        title: 'サポートがあるから安心！',
        items: ['質問し\nほうだい', '1対1の\n個別相談', '仲間と\n学べる場'],
        conclusion: 'ひとりで頑張らなくて大丈夫！',
        footnote: '※ 質問への回答は営業日内に順次お返しします。',
      },
      {
        type: 'offerDetail',
        title: '無料体験レッスンとは？',
        label: 'AIの使い方を\n完全無料で体験できる60分',
        checks: ['[p]AIで文章・画像[/p]をつくってみる', '未経験から[p]仕事にする道筋[/p]', '[p]在宅・副業[/p]のはじめ方', 'あなたに合う[p]学び方の相談[/p]'],
        character: '🐱',
        subLabel: '体験できる3つのスキル',
        covers: [
          { image: { alt: '文章コース', label: 'コース表紙①' }, label: '文章' },
          { image: { alt: '画像コース', label: 'コース表紙②' }, label: '画像' },
          { image: { alt: 'SNSコース', label: 'コース表紙③' }, label: 'SNS' },
        ],
      },
      {
        type: 'schedule',
        title: '[p]朝[/p]から[a]夜[/a]まで開催中',
        slots: [
          { label: '朝の', sub: '家事の前に', times: ['10:00〜'], image: { alt: '朝', label: '写真：朝' }, tone: 'morning' },
          { label: 'お昼の', sub: 'スキマ時間に', times: ['13:00〜', '15:00〜'], image: { alt: '昼', label: '写真：昼' }, tone: 'noon' },
          { label: '夜の', sub: 'お仕事の後に', times: ['20:00〜'], image: { alt: '夜', label: '写真：夜' }, tone: 'night' },
        ],
      },
      { type: 'cta', micro: 'AIの使い方をプチ体験！', label: '無料体験レッスンに参加する', arrows: true, connector: '＼さらに／ いまなら参加で' },
      {
        type: 'campaignDetail',
        id: 'campaign',
        campaignOnly: true,
        kicker: '参加者全員にお届け',
        title: '秋のプレゼント',
        groups: [
          {
            label: '予約で',
            items: [
              { image: { alt: 'プロンプト集', label: '特典画像①' }, name: 'プロンプト集', note: '予約者全員' },
              { image: { alt: 'テンプレート', label: '特典画像②' }, name: 'テンプレート', note: '予約者全員' },
            ],
          },
          {
            label: 'さらに参加で',
            deadline: '11/30\n21時まで',
            items: [{ image: { alt: '解説動画', label: '特典画像③' }, name: '解説動画（30分）', note: '参加者全員' }],
          },
        ],
        period: '11月30日 21時まで',
        conditions: ['期間内に無料体験レッスンを予約し、当日参加された方', 'LINE連携を済ませた方（特典はLINEでお届けします）'],
        howTo: ['このページから無料体験レッスンを予約', '予約完了画面またはメールからLINE連携', 'レッスン終了後、LINEに特典が届きます'],
      },
      { type: 'faq', title: 'よくあるご質問', items: [
        { q: 'パソコンがなくても参加できますか？', a: 'はい。スマホから参加できます。' },
        { q: '体験のあとに勧誘されますか？', a: '無理な勧誘は一切しません。ご質問があればお答えします。' },
      ] },
      {
        type: 'closing',
        icon: '📌',
        lines: ['このページは', '[p]LINEの友だち限定[/p]の', 'ご案内です'],
        box: 'あとで見返せるよう\nブックマークしておくと安心です',
        cta: '無料体験レッスンに参加する',
        micro: 'AIの使い方をプチ体験！',
      },
    ],
  },

  form: {
    headerTitle: 'AIはじめて塾 無料体験レッスン',
    headerSub: 'お申込みはこちら',
    speedLabel: 'お申込み最短60秒',
    steps: ['greeting', 'schedule', 'intent', 'name', 'contact', 'region', 'birthdate'],
    greeting: 'このたびは【AIはじめて塾】に興味を持っていただき、ありがとうございます！',
    existingLink: { label: '以前に体験レッスンへ参加したことがある方はこちら', href: '#line' },
    // 実際のアンケート結果がある場合だけ設定する（footnote が無いと表示されない）
    proof: undefined,
    scheduleIntro: ['それでは、ご予約を始めます！', 'ご希望の日にちと時間を選んでください。'],
    schedule: {
      daysAhead: 21,
      leadHours: 3,
      weekdays: [1, 2, 3, 4, 5, 6],
      times: ['10:00-11:00', '13:00-14:00', '15:00-16:00', '20:00-21:00'],
    },
    intent: {
      prompt: 'いまのご検討状況を教えてください。',
      options: [
        '受講をほぼ決めていて、気になる点を解消したい',
        '前向きに検討していて、詳しく聞きたい',
        '迷っているので、話を聞いて決めたい',
        'まずはAIを体験してみたい',
      ],
    },
    agreements: [
      { text: 'プライバシーポリシーと利用規約に同意します。', links: [{ label: 'プライバシーポリシー', href: '#privacy' }, { label: '利用規約', href: '#terms' }] },
      { text: '無断キャンセルが続いた場合、次回以降のご予約をお断りすることがあります。' },
    ],
    completeMessage: 'ご予約ありがとうございます🎉\nスタッフ一同、当日お話しできるのを楽しみにしています✨',
  },

  thanks: {
    title: 'ご予約ありがとうございます',
    lead: '確認メールをお送りしました。\n当日の準備まで、あと一歩です。',
    lineCard: {
      kicker: '当日の準備完了まで あと一歩です！',
      title: '参加URLと特典は\n[p]LINE[/p]でお届けします',
      benefits: ['参加URLを前日にお送りします', '前日・1時間前にリマインドします', '参加者特典もLINEで受け取れます'],
      button: 'LINEで参加準備を完了する',
      character: '📲',
    },
    prep: { title: '（3分で完了）Zoomのご準備', steps: ['Zoomアプリをダウンロードする', 'アプリを開いてサインインまで済ませておく'] },
  },

  line: { mode: 'B', oaId: '@demo', addFriendUrl: '#line', messageTemplate: '予約番号:{rid}' },
  backend: { type: 'demo' },
});
