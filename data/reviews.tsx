
import React from 'react';

export interface ReviewItem {
  id: string;
  name: string;
  role: React.ReactNode;
  image: string;
  gradient: string;
  highlight: React.ReactNode;
  content: React.ReactNode;
  // Extended fields for SuccessStories
  storyTitle: string;
  result: string;
  tags: string[];
  shortDescription: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'ayami',
    name: 'AYAMI',
    role: (
      <div className="flex flex-col gap-0.5">
        <span>fashion designer</span>
        <span>original brand / He’nai</span>
      </div>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815319/0hYRkn7WqnBn1GFxQ2Ahh4AjZHBRdlZl9vaHFAHXBHDR14JxZ7OXIZSCcUXEovI0EpaXAeTnQUD01KBHEbWEH6SUEnWEp_IEgtaXdImQ_gwe8qo.jpg',
    gradient: 'from-indigo-100 via-purple-100 to-pink-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        特に印象的だったのは、<br />
        ビジュアルづくりへの<br />
        徹底したこだわりです。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>私がオンラインサロンに参加したのは、フリーランスでODM・OEMのアパレルデザイナーをしていて、「このままでは終わりたくない」と漠然と感じていた時でした。自分の得意分野やできること、お客様から見た価値が分からず、方向性に迷っていたのです。</p>
        <p>サロンには異なる業種のメンバーが集まり、オーナーのオミさんが壁打ち相手となって公開コンサルをしてくれる時間がありました。知らない世界を知り、一緒に考えてみる体験を通じて、自分の視点が少しずつ広がっていきました。</p>
        <p>特に印象的だったのは、ビジュアルづくりへの徹底したこだわりです。アイコンひとつ変えるにも「どこがポイントでどう改善すべきか」を具体的に教えてくださり、ときには実際に加工編集を加えて言語化して伝えてくれました。自分では気づかない魅力や魅せ方をストレートに示していただけたことで、照れずにブランディングできるようになったのは大きな収穫でした。</p>
        <p>このたびリニューアル化されたことで、きっと良い商品やサービスを持っているのに魅力が伝わりきらない方にとって、大きな武器になると思います。オミさんの繊細でどこまでもこだわり抜く姿勢は、自分では気づけない強みを発掘し、丁寧に伝えてくれる力になります。特に個人や小規模でビジネスをされている方にとって、強い味方になるはずです。</p>
        <p>自分の視野では気づけない魅力を見つけ、不安や迷いを解消してくれる伴走スタイルがオネマの最大の魅力だと思います。特にビジュアル面のセンスは「そばで見て、聞いて、学ぶ」ことでしか得られない価値です。外注して終わりではなく、「どう作るのか」を一緒に理解できるのは、他ではなかなか得られない貴重な体験です。</p>
      </div>
    ),
    storyTitle: "アパレルブランドの再定義",
    result: "自分自身の『価値の方程式』を確立",
    tags: ["セルフブランディング", "ビジュアル設計"],
    shortDescription: "フリーランスデザイナーとして、アイコンひとつから世界観を再構築。自分の視点では気づけなかった「本来の価値」を言語化し、照れずに堂々とブランディングできる体制を確立。"
  },
  {
    id: 'keichan',
    name: '@keichan_rebase',
    role: (
      <div className="flex flex-col gap-0.5 text-[9px]">
        <span>ママのおうち起業をサポート / "私らしく”働きたいあなたへ</span>
        <span>✴︎セールス歴25年 ✴︎個性心理学コーチ</span>
        <span>✴︎3人育児中｜13歳・7歳・5歳</span>
      </div>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/559719606_18082260113488480_9103706004784034476_n_tnbj3h.jpg',
    gradient: 'from-rose-100 via-orange-100 to-purple-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        物腰の穏やかさとは対照的に、<br />
        成果に直結する論理的な提案を<br />
        してくれる頼もしさがあります。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>実はオミとは小学生時代からの長い付き合いなのですが、同じ時に、それぞれアパレル業界で過ごしていたこともあり、オミの発信や起業後の活動も陰ながら見させてもらっていました。</p>
        <p>オミが持つ“本質を見抜く力”にはいつも学ぶところがあり、友人の立場ではありますが、オンラインサロンにも在籍していた経験もあります。オミは 物腰の穏やかさとは対照的に、物事を論理的に整理し成果に直結する提案をしてくれる頼もしさがあります。</p>
        <p>私が初めて高額講座をローンチする際、オミに価格の相談をしたところ「その価格設定では安すぎる」と指摘されました。</p>
        <p>長年のマーケティングの知識と顧客心理の視点から率直に伝えてくれたそのアドバイスに起業初期の私にはまだ少し戸惑いもありましたが、思い切って価格を見直した結果、講座は即日満席に。</p>
        <p>その経験を通して、私自身が提供している価値の本当の大きさに気づくことができました。思い返せば あのオミのアドバイスが人生のターニングポイントであり、私が一気に飛躍するきっかけになった出来事でした。</p>
        <p>オミは表面的なアドバイスではなく、自身の経験と顧客心理の知識、両方の面を兼ね備えた戦略が練られる信頼できるコンサルタントだと断言できます。</p>
      </div>
    ),
    storyTitle: "高額講座の即日満席",
    result: "提供価値に合わせた価格適正化",
    tags: ["価格戦略", "顧客心理"],
    shortDescription: "「安すぎる」という指摘から始まった価格改定。心理的障壁を乗り越え、本来提供すべき価値に見合った価格へ設定し直した結果、顧客満足度を維持したまま即日満席を達成。"
  },
  {
    id: 'chie',
    name: '@chie',
    role: 'copywriter',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133201/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.19.50_ky3txe.png',
    gradient: 'from-sky-100 via-blue-100 to-violet-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        自分が必要としているタイミングに、<br />
        近い課題意識と熱量を持った方々と<br />
        対話を重ねられたことが財産です。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>オミさんは、先生ではありません。教えてもらおうだとか、情報だけ得ようとか、受け身の人にはきっと向きません。おごらず、背伸びせず、比較もせず、自分のサイズを素直に受け入れて、「誰か」や「何か」を純粋に良くしたいと行動できる人なら、成長できる場だと思います。</p>
        <p>わたしは、自分が必要としているタイミングに、似たような課題意識や、近い熱量を持った方々と対話を重ねる機会を持てたことが、ありがたい時間でした。ビジネスとは遠いかもしれませんが、そこから年に一度でもお茶をする縁ができたり、会わなくとも、遠くからでもそれぞれの活動を応援し合える仲になったり、そうした縁が生まれることも財産だと思います。オミさんはそうした場をひらきながら、正直なことに向き合う姿勢をシェアしてくれるはずです。それを成長に変えられるかどうかは、ご自身次第。成功だとか、ハックとか、個人的にはそうしたワードに振り回されないひとが集まれたなら、いい推進力を持って新たな空気を作れるのではないかなと感じています！！</p>
      </div>
    ),
    storyTitle: "孤独な挑戦から『縁の財産』へ",
    result: "等身大の自分を受け入れる成長",
    tags: ["対話", "共創マインド"],
    shortDescription: "おごらず、比較せず、自分のサイズを素直に受け入れる場の重要性。同じ熱量を持つ仲間との対話を通じ、ビジネスの成果を超えた「生涯続く縁」という無形の財産を獲得。"
  },
  {
    id: 'kofumi',
    name: '@kofumi.branding',
    role: (
      <div className="flex flex-col gap-0.5">
        <span>ブランディングプロデュースチーム</span>
        <span>Branding Magic 主宰</span>
      </div>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518385/rectangle_large_type_2_c53794ac4a74726b7f5847245dd337b3_xjxntr.webp',
    gradient: 'from-emerald-100 via-teal-100 to-cyan-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        学んだ知識と「価値の方程式」を<br />
        愚直に活かした結果、起業2年後には、<br />
        年商2000万円を突破することができました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>起業初期、趣味起業程度の専業主婦だった私は、マーケティングとブランディングを学ぶために、阪田 真臣さん(オミさん)のオンラインサロンに入会しました。</p>
        <p>サロンでは、オミさんが参加者のビジネスの悩みを丁寧にヒアリングし、壁打ちを通して悩みを解決していく、公開コンサルが開催されていました。</p>
        <p>この公開コンサルは、公開だからこそ、自分からは出てこない質問が飛び交ったり、オミさんの回答を聞くことにより、自身のビジネスレベルが格段に上がっていきました。オミから学んだマーケティング、ブランディングの知識を活かして、起業2年後には、年商2000万円を突破することができました。</p>
        <p>また、オミさんのどこまでも正直にお客様に向き合う姿勢は、とても信頼がおけます。自分の商品の魅力を言語化できない人、コンセプトがイマイチ定まらない人、センスの良い世界観が作れない人におすすめしたいです。</p>
      </div>
    ),
    storyTitle: "年商2000万円の壁を突破",
    result: "生き残るための本質的戦略の導入",
    tags: ["事業拡大", "マインドセット"],
    shortDescription: "専業主婦からの起業初期段階でHMCの『価値の方程式』を導入. 単なるノウハウではなく「生き残るための戦略」を基盤に据え、2年で年商2000万円を突破する事業へ成長。"
  },
  {
    id: 'rinrin',
    name: '金山由佳里(りんりん)',
    role: (
      <div className="flex flex-col gap-0.5 text-[9px]">
        <span>フォトグラファー / @rinrin_photo.yk/</span>
        <span>お洒落な女性のためのブランディングフォト</span>
        <span>フォトコミュニティー『me』共同主催</span>
        <span>過去3,000名以上撮影経験あり</span>
      </div>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.59.16_xedy7u.png',
    gradient: 'from-orange-100 via-amber-100 to-yellow-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        会社員から個人事業主に！人生の転機は<br />
        まさに「オネマ」でした。そしてついに、<br />
        ずっと手放せなかった会社員を卒業！
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>会社員から個人事業主に！私の人生の転機は、まさに「オネマ」でした。当時の私は会社員で、「自分のビジネスを始めたいけど、何から始めればいいのか…」と模索していました。</p>
        <p>そんな時に出会ったオネマには、私の周りにはいなかった同世代の個人事業主の方がたくさんいて、知見を広げたり刺激をもらえたりと、毎回ワクワクが止まらない場所でした。メンバーさんはオミさんに似て人柄がよく、真面目で、ちょっとポンコツな（？）愛されキャラの方ばかり。すぐに打ち解けて安心できる、温かいコミュニティーでした。</p>
        <p>特に印象的だったのは「スナックオミ」。夜にZoomで集まり、オミさんを中心に語り合う時間が本当に楽しくて、面白すぎて寝不足になるほど（笑）。</p>
        <p>あの時間を通じてメンバー同士の信頼関係が深まり、なんと次第にお仕事を頂く機会も増えていきました。そして気づけば、「もっと自分のビジネスの時間がほしい！」と思うようになり、ついにずっと手放せなかった会社員を卒業！オネマ在籍中に念願の脱サラを叶えることができました。</p>
        <p>今でも当時の仲間と繋がり続けていて、お仕事をご一緒することもあります。かけがえのない繋がりを作ってくださったオミさんに、心から感謝しています。</p>
      </div>
    ),
    storyTitle: "会社員卒業、個人事業主への転身",
    result: "仲間の背中が変えた人生の選択",
    tags: ["キャリアシフト", "コミュニティ"],
    shortDescription: "会社員を続けながらの模索期。「スナックオミ」など密な交流を通じて信頼関係と仕事を獲得。仲間の活躍に勇気をもらい、長年手放せなかった会社員を卒業し独立を果たした。"
  },
  {
    id: 'reii',
    name: '@craft creator_reii',
    role: 'レザークラフト作家',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png',
    gradient: 'from-stone-200 via-orange-100 to-neutral-200',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        1週間のポップアップショップで<br />
        200%の売上（300万円）が<br />
        出るようになりました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>自身でハンドメイドから販売をしていた個人事業主です。オミさんのサロンに入ってオンライン壁打ちや他の参加者の方々も交えた意見交換をおこなっているうちに、気付けば1週間のポップアップショップで300万円の売上が出るようになりました。</p>
        <p>それまでは良い時で150万いかないくらいだったので、2倍になったのは自身の滞在意識が変わった事が大きいと感じていますが、そのキッカケとしてサロンで自身の強みは何か、他社と違うサービスは何か、価格の付け方などあやふやになっていた所が整理されたことが結果に繋がったように思います。</p>
        <p>サービスを始めて間も無い方や世界観が定ってない方はとても学べる場だと思います。オミさんは本音で話してくれるのでこのような意見を交わせる場は特に自分のような個人事業主の方には貴重だと思います。</p>
      </div>
    ),
    storyTitle: "ポップアップで週間300万を達成",
    result: "潜在意識と価値が一致した瞬間の飛躍",
    tags: ["プロダクト価値", "対面販売戦略"],
    shortDescription: "自身の強みと価格設定のあやふやさを壁打ちで整理。潜在意識が「価値」に追いついたとき、1週間のポップアップでこれまでの2倍となる300万円という驚異的な売上を記録。"
  },
  {
    id: 'aoki',
    name: '青木竣平',
    role: (
      <div className="flex flex-col gap-0.5 text-[9px]">
        <span>ZEROinc. / 消防士からプロデューサーへ</span>
        <span>『クイーンルージュ®︎』プロデューサー</span>
        <span>時々シェフ / 県知事表彰</span>
      </div>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518135/143205-14-e0e21d8a880f15d24a668e3da39ff7d7-735x735_ubxz6j.webp',
    gradient: 'from-blue-100 via-cyan-100 to-indigo-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        感情に流されない論理的なアドバイスが、<br />
        プレゼンの精度と事業の説得力を<br />
        極限まで高めてくれました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>【日本最大級のビジネスカンファレンス初出場で２部門第２位を獲得】</p>
        <p>僕がオミさんの頭脳をお借りし始めたのは、日本最大級のビジネスカンファレンスのアワード部門への挑戦が決まった瞬間からでした。</p>
        <p>日本を代表する “本当に美味しい食・飲料” が推薦制で選抜され、18社が競い合う場、85名の審査員を前に、ただ「美味しい」を語るだけでは届かない。食材の価値をどう伝えるか、どんな体験を設計すれば心が動くのか、僕たちは言葉と体験価値の両側から何度も仮説と検証を重ねました。</p>
        <p>オミさんのアドバイスは、常に “顧客視点の本質” を突くものでした。 審査員がどこで「おっ？」と心を動かすのか、どうすれば、食の世界で差別化が難しい中でも「唯一無二」を感じてもらえるか、 一つひとつが鋭く、核心を突いていて、当日の僕は、手応えと自信を持ってプレゼンに臨むことができました。 そして結果は、初出場で２部門２位。</p>
        <p>食というレッドオーシャンで、この評価をいただけた瞬間、胸の奥から込み上げるものがあって涙が止まりませんでした。</p>
        <p>日本の食の価値を“最適化し、最大化し、届け切る”これがオミさんの真骨頂なんだと感じています。</p>
      </div>
    ),
    storyTitle: "日本最大級アワードで2部門入賞",
    result: "客観的視点が導いた社会的証明",
    tags: ["実績構築", "プロデュース論"],
    shortDescription: "ビジネスカンファレンス（ICC）初出場で2部門2位を獲得. オミ氏の感情に流されない論理的かつ具体的なアドバイスが、プレゼンの精度と事業の説得力を極限まで高めた。"
  }
];
