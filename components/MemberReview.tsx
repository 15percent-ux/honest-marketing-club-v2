import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ReviewItem {
  id: string;
  name: string;
  role: React.ReactNode;
  image: string;
  gradient: string;
  highlight: React.ReactNode;
  content: React.ReactNode;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'aoki',
    name: '青木竣平',
    role: (
      <>
        ZEROinc.プロデューサー<br />
        発酵起業家 / シェフ
      </>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133557/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.25.46_yy388h.png',
    gradient: 'from-amber-200 via-brand-gold to-yellow-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        日本最大級のビジネス<br />
        カンファレンス初出場で<br />
        2部門第2位を獲得しました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2">
          PROFILE: 5歳でヒーローに憧れ20歳で消防士に。消防職員意見発表に長野県代表で出場、県知事表彰。「こだわると稼げない」を覆すべくプロデューサーの道へ。『クイーンルージュ®︎』で世界一へ。
        </p>
        <p>僕がオミさんの頭脳をお借りし始めたのは、日本最大級のビジネスカンファレンスのアワード部門への挑戦が決まった瞬間からでした。</p>
        <p>日本を代表する “本当に美味しい食・飲料” が推薦制で選抜され、18社が競い合う場、85名の審査員を前に、ただ「美味しい」を語るだけでは届かない。食材の価値をどう伝えるか、どんな体験を設計すれば心が動くのか、僕たちは言葉と体験価値の両側から何度も仮説と検証を重ねました。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            オミさんのアドバイスは、常に “顧客視点の本質” を突くものでした。審査員がどこで「おっ？」と心を動かすのか、どうすれば、食の世界で差別化が難しい中でも「唯一無二」を感じてもらえるか、 一つひとつが鋭く、核心を突いていて、当日の僕は、手応えと自信を持ってプレゼンに臨むことができました。
          </p>
        </div>
        <p>結果は、初出場で2部門2位。食というレッドオーシャンで、この評価をいただけた瞬間、胸の奥から込み上げるものがあって涙が止まりませんでした。日本の食の価値を“最適化し、最大化し、届け切る”これがオミさんの真骨頂なんだと感じています。</p>
      </div>
    )
  },
  {
    id: 'ayami',
    name: 'AYAMI',
    role: 'fashion designer',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815319/0hYRkn7WqnBn1GFxQ2Ahh4AjZHBRdlZl9vaHFAHXBHDR14JxZ7OXIZSCcUXEovI0EpaXAeTnQUD01KBHEbWEH6SUEnWEp_IEgtaXdImQ_gwe8qo.jpg',
    gradient: 'from-indigo-100 via-purple-100 to-pink-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        特に印象的だったのは、<br />
        ビジュアルづくりへの<br />
        徹底したこだわりです。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>@henai_official | Designer / Director | ファッションと旅、美しいものがすきです。 | Exhibition & Order-based</span>
        </div>
        <p>私がオンラインサロンに参加したのは、フリーランスでODM・OEMのアパレルデザイナーをしていて、「このままでは終わりたくない」と漠然と感じていた時でした。自分の得意分野やできること、お客様から見た価値が分からず、方向性に迷っていたのです。</p>
        <p>サロンには異なる業種のメンバーが集まり、オーナーのオミさんが壁打ち相手となって公開コンサルをしてくれる時間がありました。知らない世界を知り、一緒に考えてみる体験を通じて、自分の視点が少しずつ広がっていきました。</p>
        <p>特に印象的だったのは、ビジュアルづくりへの徹底したこだわりです。アイコンひとつ変えるにも「どこがポイントでどう改善すべきか」を具体的に教えてくださり、ときには実際に加工編集を加えて言語化して伝えてくれました。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            自分では気づかない魅力や魅せ方をストレートに示していただけたことで、照れずにブランディングできるようになったのは大きな収穫でした。
          </p>
        </div>
        <p>このたびリニューアル化されたことで、きっと良い商品やサービスを持っているのに魅力が伝わりきらない方にとって、大きな武器になると思います。オミさんの繊細でどこまでもこだわり抜く姿勢は、自分では気づけない強みを発掘し、丁寧に伝えてくれる力になります。特に個人や小規模でビジネスをされている方にとって、強い味方になるはずです。</p>
        <p>自分の視野では気づけない魅力を見つけ、不安や迷いを解消してくれる伴走スタイルがオネマの最大の魅力だと思います。特にビジュアル面のセンスは「そばで見て、聞いて、学ぶ」ことでしか得られない価値です。外注して終わりではなく、「どう作るのか」を一緒に理解できるのは、他ではなかなか得られない貴重な体験です。</p>
      </div>
    )
  },
  {
    id: 'keichan',
    name: '@keichan_rebase',
    role: 'ママのおうち起業をサポート',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/559719606_18082260113488480_9103706004784034476_n_tnbj3h.jpg',
    gradient: 'from-rose-100 via-orange-100 to-purple-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        思い切って価格を<br />
        見直した結果、<br />
        講座は即日満席に。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>@keichan_rebase | ママのおうち起業をサポート / ”私らしく”働きたいあなたへ</span>
          <span>✴︎セールス歴25年 | ✴︎個性心理学コーチ | ✴︎3人育児中｜13歳・7歳・5歳</span>
        </div>
        <p>実はオミとは小学生時代からの長い付き合いなのですが、同じ時に、それぞれアパレル業界で過ごしていたこともあり、オミの発信や起業後の活動も陰ながら見させてもらっていました。</p>
        <p>オミが持つ“本質を見抜く力”にはいつも学ぶところがあり、友人の立場ではありますが、オンラインサロンにも在籍していた経験もあります。オミは 物腰の穏やかさとは対照的に、物事を論理的に整理し成果に直結する提案をしてくれる頼もしさがあります。</p>
        <p>私が初めて高額講座をローンチする際、オミに価格の相談をしたところ「その価格設定では安すぎる」と指摘されました。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            長年のマーケティングの知識と顧客心理の視点から率直に伝えてくれたそのアドバイスに起業初期の私にはまだ少し戸惑いもありましたが、思い切って価格を見直した結果、講座は即日満席に。
          </p>
        </div>
        <p>その経験を通して、私自身が提供している価値の本当の大きさに気づくことができました。思い返せば あのオミのアドバイスが人生のターニングポイントであり、私が一気に飛躍するきっかけになった出来事でした。</p>
        <p>オミは表面的なアドバイスではなく、自身の経験と顧客心理の知識、両方の面を兼ね備えた戦略が練られる信頼できるコンサルタントだと断言できます。</p>
      </div>
    )
  },
  {
    id: 'coco',
    name: '@coco_chieco',
    role: 'director / copywriter',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133201/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.19.50_ky3txe.png',
    gradient: 'from-sky-100 via-blue-100 to-violet-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        自分が必要としているタイミングに、<br />
        近い課題意識と熱量を持った方々と<br />
        対話を重ねられたことが財産です。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>@coco_chieco | director／copywriter | graphic design／illustration／advertisement／</span>
        </div>
        <p>オミさんは、先生ではありません。教えてもらおうだとか、情報だけ得ようとか、受け身の人にはきっと向きません。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            おごらず、背伸びせず、比較もせず、自分のサイズを素直に受け入れて、「誰か」や「何か」を純粋に良くしたいと行動できる人なら、成長できる場だと思います。
          </p>
        </div>
        <p>わたしは、自分が必要としているタイミングに、似たような課題意識や、近い熱量を持った方々と対話を重ねる機会を持てたことが、ありがたい時間でした。</p>
        <p>ビジネスとは遠いかもしれませんが、そこから年に一度でもお茶をする縁ができたり、会わなくとも、遠くからでもそれぞれの活動を応援し合える仲になったり、そうした縁が生まれることも財産だと思います。</p>
        <p>オミさんはそうした場をひらきながら、正直なことに向き合う姿勢をシェアしてくれるはずです。それを成長に変えられるかどうかは、ご自身次第。成功だとか、ハックとか、個人的にはそうしたワードに振り回されないひとが集まれたなら、いい推進力を持って新たな空気を作れるのではないかなと感じています！！</p>
      </div>
    )
  },
  {
    id: 'kofumi',
    name: '@kofumi.branding',
    role: 'Branding Magic 主宰',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518385/rectangle_large_type_2_c53794ac4a74726b7f5847245dd337b3_xjxntr.webp',
    gradient: 'from-emerald-100 via-teal-100 to-cyan-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        学んだ知識と「価値の方程式」を<br />
        愚直に活かした結果、起業2年後には、<br />
        年商2000万円を突破することができました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>@kofumi.branding | ブランディングプロデュースチーム Branding Magic 主宰</span>
        </div>
        <p>起業初期、趣味起業程度の専業主婦だった私は、マーケティングとブランディングを学ぶために、阪田 真臣さん(オミさん)のオンラインサロンに入会しました。サロンでは、オミさんが参加者のビジネスの悩みを丁寧にヒアリングし、壁打ちを通して悩みを解決していく、公開コンサルが開催されていました。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            この公開コンサルは、公開だからこそ、自分からは出てこない質問が飛び交ったり、オミさんの回答を聞くことにより、自身のビジネスレベルが格段に上がっていきました。オミさんから学んだマーケティング、ブランディングの知識を活かして、起業2年後には、年商2000万円を突破することができました。
          </p>
        </div>
        <p>また、オミさんのどこまでも正直にお客様に向き合う姿勢は、とても信頼がおけます。自分の商品の魅力を言語化できない人、コンセプトがイマイチ定まらない人、センスの良い世界観が作れない人におすすめしたいです。</p>
      </div>
    )
  },
  {
    id: 'rinrin',
    name: '金山由佳里(りんりん)',
    role: 'フォトグラファー / me 共同主催',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.59.16_xedy7u.png',
    gradient: 'from-orange-100 via-amber-100 to-yellow-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        信頼関係が深まり、次第に<br />
        お仕事を頂く機会も増加。<br />
        念願の脱サラを叶えました！
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>フォトグラファー | 金山由佳里(りんりん) | @rinrin_photo.yk/</span>
          <span>お洒落な女性のためのブランディングフォト / フォトコミュニティー『me』共同主催 / 過去3,000名以上撮影経験あり</span>
        </div>
        <p>会社員から個人事業主に！私の人生の転機は、まさに「オネマ」でした。当時の私は会社員で、「自分のビジネスを始めたいけど、何から始めればいいのか…」と模索していました。そんな時に出会ったオネマには、私の周りにはいなかった同世代の個人事業主の方がたくさんいて、知見を広げたり刺激をもらえたりと、毎回ワクワクが止まらない場所でした。</p>
        <p>メンバーさんはオミさんに似て人柄がよく、真面目で、ちょっとポンコツな（？）愛されキャラの方ばかり。すぐに打ち解けて安心できる、温かいコミュニティーでした。特に印象的だったのは「スナックオミ」。夜にZoomで集まり、オミさんを中心に語り合う時間が本当に楽しくて、面白すぎて寝不足になるほど（笑）。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            あの時間を通じてメンバー同士の信頼関係が深まり、なんと次第にお仕事を頂く機会も増えていきました。そして気づけば、「もっと自分のビジネスの時間がほしい！」と思うようになり、ついにずっと手放せなかった会社員を卒業！オネマ在籍中に念願の脱サラを叶えることができました。
          </p>
        </div>
        <p>今でも当時の仲間と繋がり続けていて、お仕事をご一緒することもあります。かけがえのない繋がりを作ってくださったオミさんに、心から感謝しています。</p>
      </div>
    )
  },
  {
    id: 'reii',
    name: '@craft creator_reii',
    role: 'レザークラフト作家',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png',
    gradient: 'from-stone-200 via-orange-100 to-neutral-200',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-justify">
        1週間のポップアップで<br />
        300万円の売上が<br />
        出るようになりました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <div className="text-[10px] text-brand-gold font-bold border-b border-brand-gold/20 pb-2 flex flex-col gap-0.5">
          <span className="text-[8px] opacity-70">PROFILE:</span>
          <span>@craft creator_reii | レザークラフト作家</span>
        </div>
        <p>自身でハンドメイドから販売をしていた個人事業主です。</p>
        <div className="border-l-2 border-brand-gold pl-4 py-2 my-6 bg-brand-gold/5 rounded-r-lg">
          <p className="text-brand-black font-bold leading-relaxed">
            オミさんのサロンに入ってオンライン壁打ちや他の参加者の方々も交えた意見交換をおこなっているうちに、気付けば1週間のポップアップショップで300万円の売上が出るようになりました。
          </p>
        </div>
        <p>それまでは良い時で150万いかないくらいだったので、2倍になったのは自身の滞在意識が変わった事が大きいと感じていますが、そのキッカケとしてサロンで自身の強みは何か、他社と違うサービスは何か、価格の付け方などあやふやになっていた所が整理されたことが結果に繋がったように思います。</p>
        <p>サービスを始めて間も無い方や世界観が定ってない方はとても学べる場だと思います。オミさんは本音で話してくれるのでこのような意見を交わせる場は特に自分のような個人事業主の方には貴重だと思います。</p>
      </div>
    )
  }
];

const MemberReview: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".review-item-wrapper", { opacity: 0, y: 80 });

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.to(".review-item-wrapper", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      });

      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? "20%" : "-20%",
          x: i % 3 === 0 ? "15%" : "-15%",
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="bg-white py-32 md:py-48 px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={el => orbRefs.current[0] = el} className="absolute top-[5%] -left-[5%] w-[55vw] h-[55vw] bg-indigo-50/50 rounded-full blur-[130px]" />
        <div ref={el => orbRefs.current[1] = el} className="absolute bottom-[5%] -right-[5%] w-[55vw] h-[55vw] bg-brand-gold/5 rounded-full blur-[130px]" />
        <div ref={el => orbRefs.current[2] = el} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[45vw] h-[45vw] bg-rose-50/25 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-24 space-y-4">
          <span className="text-brand-gold font-mono text-[11px] font-bold tracking-[0.5em] uppercase block">Member Reviews</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-black tracking-tight uppercase">
            Voices of Wisdom
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto mt-8" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className={`review-item-wrapper relative transition-all duration-700 
                ${expandedId && expandedId !== review.id ? 'opacity-20 blur-[2px] scale-95' : 'opacity-100'}`}
            >
              <div 
                onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                className="group relative flex flex-col items-center p-10 bg-white/70 backdrop-blur-xl border border-neutral-100 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-2xl hover:border-brand-gold/40 hover:-translate-y-2 transition-all duration-500 w-full"
              >
                <div className="relative mb-10">
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${review.gradient} rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-neutral-100 ring-1 ring-black/5"
                    style={{ isolation: 'isolate' }}
                  >
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out" />
                  </div>
                </div>
                
                <div className="text-center space-y-5 flex-1">
                  <div>
                    <p className="text-xl font-sans font-bold text-brand-black mb-1">{review.name}</p>
                    <div className="text-[10px] font-sans text-brand-gold tracking-[0.25em] font-bold uppercase min-h-[30px] leading-relaxed">
                      {review.role}
                    </div>
                  </div>
                  <div className="h-px w-10 bg-neutral-100 mx-auto" />
                  <div className="min-h-[120px] flex items-center justify-center px-2">
                    {review.highlight}
                  </div>
                  <div className="pt-6">
                    <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full border text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 
                      ${expandedId === review.id ? 'bg-brand-black text-white' : 'bg-transparent border-neutral-200 text-neutral-400 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                      {expandedId === review.id ? 'Close' : 'Full Story'}
                      <span className="text-xs transition-transform duration-700 group-hover:translate-x-1">{expandedId === review.id ? '✕' : '→'}</span>
                    </div>
                  </div>
                </div>

                {expandedId === review.id && (
                  <div className="mt-10 pt-10 border-t border-neutral-100 animate-slide-up text-left w-full">
                    <div className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
                      {review.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer { animation: shimmer 6s infinite linear; }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .text-justify { text-align: justify; text-justify: inter-character; }
      `}</style>
    </section>
  );
};

export default MemberReview;