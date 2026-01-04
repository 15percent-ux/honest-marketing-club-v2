import React, { useState } from 'react';

interface ReviewItem {
  id: string;
  name: string;
  role: React.ReactNode;
  image: string;
  gradient: string;
  tailColor: string;
  highlight: React.ReactNode;
  content: React.ReactNode;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'ayami',
    name: 'AYAMI',
    role: 'fashion designer',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815319/0hYRkn7WqnBn1GFxQ2Ahh4AjZHBRdlZl9vaHFAHXBHDR14JxZ7OXIZSCcUXEovI0EpaXAeTnQUD01KBHEbWEH6SUEnWEp_IEgtaXdImQ_gwe8qo.jpg',
    gradient: 'from-indigo-100 via-purple-100 to-pink-100',
    tailColor: 'bg-indigo-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        特に印象的だったのは、<br />
        ビジュアルづくりへの<br />
        徹底したこだわりです。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          私がオンラインサロンに参加したのは、フリーランスでODM・OEMのアパレルデザイナーをしていて、<span className="text-brand-black font-bold border-b-2 border-brand-gold/20">「このままでは終わりたくない」</span>と漠然と感じていた時でした。自分の得意分野やできること、お客様から見た価値が分からず、方向性に迷っていたのです。
        </p>
        <p>
          サロンには異なる業種のメンバーが集まり、オーナーのオミさんが壁打ち相手となって公開コンサルをしてくれる時間がありました。知らない世界を知り、一緒に考えてみる体験を通じて、自分の視点が少しずつ広がっていきました。
        </p>
        <p>
          特に印象的だったのは、<span className="text-brand-black font-bold">ビジュアルづくりへの徹底したこだわり</span>です。アイコンひとつ変えるにも「どこがポイントでどう改善すべきか」を具体的に教えてくださり、ときには実際に加工編集を加えて言語化して伝えてくれました。
        </p>
        
        {/* 強調デザインセクション */}
        <div className="relative my-10 p-8 bg-gradient-to-br from-brand-gold/5 to-transparent border border-brand-gold/20 rounded-2xl shadow-sm">
          <div className="absolute -top-4 -left-2 text-4xl text-brand-gold/20 font-display">“</div>
          <p className="text-brand-black font-bold text-lg md:text-xl leading-relaxed tracking-tight relative z-10">
            自分では気づかない魅力や魅せ方をストレートに示していただけたことで、<span className="text-brand-gold">照れずにブランディングできるようになったのは大きな収穫でした。</span>
          </p>
          <div className="absolute -bottom-6 -right-2 text-4xl text-brand-gold/20 font-display rotate-180">“</div>
        </div>

        <p>
          このたびリニューアル化されたことで、きっと良い商品やサービスを持っているのに魅力が伝わりきらない方にとって、大きな武器になると思います。オミさんの繊細でどこまでもこだわり抜く姿勢は、自分では気づけない強みを発掘し、丁寧に伝えてくれる力になります。特に個人や小規模でビジネスをされている方にとって、強い味方になるはずです。
        </p>
        <p>
          自分の視野では気づけない魅力を見つけ、不安や迷いを解消してくれる伴走スタイルがオネマの最大の魅力だと思います。特にビジュアル面のセンスは<span className="text-brand-black font-bold italic">「そばで見て、聞いて、学ぶ」</span>ことでしか得られない価値です。外注して終わりではなく、「どう作るのか」を一緒に理解できるのは、他ではなかなか得られない貴重な体験です。
        </p>
      </div>
    )
  },
  {
    id: 'keichan',
    name: '@keichan_rebase',
    role: (
      <span className="block leading-relaxed">
        ママのおうち起業をサポート /"私らしく”働きたいあなたへ<br />
        ✴︎セールス歴25年 / ✴︎個性心理学コーチ<br />
        ✴︎3人育児中｜13歳・7歳・5歳
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/559719606_18082260113488480_9103706004784034476_n_tnbj3h.jpg',
    gradient: 'from-rose-100 via-orange-100 to-purple-100',
    tailColor: 'bg-rose-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        物腰の穏やかさとは対照的に、<br />
        物事を論理的に整理し成果に直結する<br />
        提案をしてくれる頼もしさがあります。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          実はオミとは小学生時代からの長い付き合いなのですが、同じ時に、それぞれアパレル業界で過ごしていたこともあり、オミの発信や起業後の活動も陰ながら見させてもらっていました。
        </p>
        <p>
          オミが持つ<span className="text-brand-black font-bold border-b-2 border-brand-gold/20">“本質を見抜く力”</span>にはいつも学ぶところがあり、友人の立場ではありますが、オンラインサロンにも在籍していた経験もあります。オミは 物腰の穏やかさとは対照的に、物事を論理的に整理し成果に直結する提案をしてくれる頼もしさがあります。
        </p>
        <p>
          私が初めて高額講座をローンチする際、オミに価格の相談をしたところ<span className="text-brand-black font-bold text-lg underline decoration-brand-gold">「その価格設定では安すぎる」</span>と指摘されました。
        </p>
        <p>
          長年のマーケティングの知識と顧客心理の視点から率直に伝えてくれたそのアドバイスに、起業初期の私にはまだ少し戸惑いもありましたが、思い切って価格を見直した結果、<span className="text-brand-black font-bold">講座は即日満席になりました。</span>
        </p>
        <p>
          その経験を通して、私自身が提供している価値の本当の大きさに気づくことができました。思い返せば <span className="text-brand-black font-bold">あのオミのアドバイスが人生のターニングポイント</span>であり、私が一気に飛躍するきっかけになった出来事でした。
        </p>
        <p>
          オミは表面的なアドバイスではなく、自身の経験と顧客心理の知識、両方の面を兼ね備えた戦略が練られる信頼できるコンサルタントだと断言できます。
        </p>
      </div>
    )
  },
  {
    id: 'coco',
    name: '@coco_chieco',
    role: (
      <span className="block leading-relaxed">
        ▶ director／copywriter<br />
        ▶︎ graphic design／illustration／advertisement／
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133201/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.19.50_ky3txe.png',
    gradient: 'from-sky-100 via-blue-100 to-violet-100',
    tailColor: 'bg-sky-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        自分が必要としているタイミングに、<br />
        似たような課題意識や、近い熱量を持った<br />
        方々と対話を重ねる機会を持てたことが、<br />
        ありがたい時間でした。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          オミさんは、先生ではありません。おごらず、背伸びせず、比較もせず、自分のサイズを素直に受け入れて、成長できる場だと思います。
        </p>
        <p>
          ビジネスとは遠いかもしれませんが、そこから年に一度でもお茶をする縁ができたり、会わなくとも、遠くからでもそれぞれの活動を応援し合える仲になったり、<span className="text-brand-black font-bold border-b-2 border-brand-gold/20">そうした縁が生まれることも大きな財産</span>だと思います。
        </p>
        <p>
          自分が必要としているタイミングに、似たような課題意識や、近い熱量を持った方々と対話を重ねる機会を持てたことが、ありがたい時間でした。
        </p>
        <p>
          孤独な挑戦者が多い中、ここでは心からの対話ができる。それが何よりの強みです。
        </p>
      </div>
    )
  },
  {
    id: 'kofumi',
    name: '@kofumi.branding',
    role: (
      <span className="block leading-relaxed">
        ブランディングプロデュースチーム<br />
        Branding Magic 主宰
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518385/rectangle_large_type_2_c53794ac4a74726b7f5847245dd337b3_xjxntr.webp',
    gradient: 'from-emerald-100 via-teal-100 to-cyan-100',
    tailColor: 'bg-emerald-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        学んだ知識と「価値の方程式」を<br />
        愚直に活かした結果、起業2年後には、<br />
        年商2000万円を突破することができました。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          起業初期、趣味起業程度の専業主婦だった私は、マーケティングとブランディングを学ぶために入会しました。
        </p>
        <p>
          サロンでは、オミさんが参加者のビジネスの悩みを丁寧にヒアリングし、壁打ちを通して悩みを解決していく公開コンサルが開催されていました。
        </p>
        <p>
          学んだ知識と「価値の方程式」を愚直に活かした結果、<span className="text-brand-black font-bold text-xl block mt-4 border-l-4 border-brand-gold pl-4">起業2年後には、年商2000万円を突破することができました。</span>
        </p>
        <p>
          ただのノウハウではなく「生き残るための戦略」を学べたことが、今の私の基盤になっています。
        </p>
      </div>
    )
  },
  {
    id: 'rinrin',
    name: '金山由佳里',
    role: (
      <span className="block leading-relaxed">
        ・お洒落な女性のためのブランディングフォト<br />
        ・フォトコミュニティー『me』共同主催<br />
        ・過去3,000名以上撮影経験あり
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.59.16_xedy7u.png',
    gradient: 'from-orange-100 via-amber-100 to-yellow-100',
    tailColor: 'bg-orange-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        会社員から個人事業主に！人生の転機は<br />
        まさに「オネマ」でした。そしてついに、<br />
        ずっと手放せなかった会社員を卒業！
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          会社員から個人事業主に！私の人生の転機は、まさに「オネマ」でした。当時の私は会社員で、「自分のビジネスを始めたいけど、何から始めればいいのか…」と模索していました。
        </p>
        <p>
          特に印象的だったのは、夜にZoomで集まりオミさんを中心に語り合う<span className="text-brand-black font-bold underline decoration-brand-gold/40">「スナックオミ」</span>の時間。メンバー同士の信頼関係が深まり、次第にお仕事を頂く機会も増えていきました。
        </p>
        <p>
          仲間の活躍に背中を押され、ついに長年勤めた会社を退職。今はフォトグラファーとして自分の足で歩んでいます。
        </p>
        <p>
          そして気づけば、<span className="text-brand-black font-bold">「もっと自分のビジネスの時間がほしい！」</span>と思うようになり、ついにずっと手放せなかった会社員を卒業しました！
        </p>
      </div>
    )
  },
  {
    id: 'reii',
    name: '@craft creator_reii',
    role: (
      <span className="block leading-relaxed">
        レザークラフト作家
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png',
    gradient: 'from-stone-200 via-orange-100 to-neutral-200',
    tailColor: 'bg-stone-200',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block text-[13px] md:text-sm">
        サロンに入ってオンライン壁打ちや<br />
        他の参加者の方々も交えた意見交換を<br />
        おこなっているうちに、気付けば<br />
        1週間のポップアップショップで<br />
        200%の売上が出るようになりました。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <p>
          オンラインでの壁打ちや意見交換を行っているうちに、自身の強み、価格の付け方などあやふやになっていた所が整理されたことが結果に繋がったように思います。
        </p>
        <p>
          それまでは良い時で売上150万に届かないくらいだったので、<span className="text-brand-black font-bold text-lg">一週間で300万円を売り上げた時は震えました。</span>
        </p>
        <p>
          サロンに入ってオンライン壁打ちや他の参加者の方々も交えた意見交換をおこなっているうちに、気付けば1週間のポップアップショップで200%の売上が出るようになりました。
        </p>
        <p>
          自分自身の潜在意識が「価値」に追いついたとき、現実これほどまでに変わるのだと実感しています。
        </p>
      </div>
    )
  },
  {
    id: 'aoki',
    name: '青木竣平',
    role: (
      <span className="block leading-relaxed">
        ZEROinc.５歳でヒーローに憧れ20歳で消防士に。<br />
        消防職員意見発表に長野県代表で出場、県知事表彰。<br />
        「こだわると稼げない」を覆すべくプロデューサーの道へ。<br />
        『クイーンルージュ®︎』で世界一へ。時々シェフ
      </span>
    ),
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518135/143205-14-e0e21d8a880f15d24a668e3da39ff7d7-735x735_ubxz6j.webp',
    gradient: 'from-blue-100 via-indigo-100 to-slate-200',
    tailColor: 'bg-blue-100',
    highlight: (
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        常に “顧客視点の本質” を<br />
        突くものでした。
      </span>
    ),
    content: (
      <div className="space-y-6">
        <div className="mb-6 p-5 bg-white/60 border-l-4 border-brand-gold shadow-sm">
          <p className="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase mb-1">Impact Result</p>
          <p className="text-sm font-bold text-brand-black leading-snug">日本最大級のビジネスカンファレンス初出場で２部門第２位を獲得</p>
        </div>
        <p>
          日本の食の価値を<span className="text-brand-black font-bold border-b-2 border-brand-gold/20">“最適化し、最大化し、届け切る”</span>。これがオミさんの真骨頂なんだと感じています。
        </p>
        <p>
          日本最大級のビジネスカンファレンス初出場で２部門第２位を獲得できたのも、オミさんの客観的な視点があったからです。
        </p>
        <p>
          アドバイスは常に具体的で、かつ感情に流されない論理的なもの。
          <span className="text-brand-black font-bold underline decoration-brand-gold/40">常に “顧客視点の本質” を突くものでした。</span>
        </p>
        <p>
          本質的なマーケティングを学びたいなら、これ以上の環境はありません。
        </p>
      </div>
    )
  }
];

const MemberReview: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleReview = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="reviews" className="bg-white py-32 md:py-48 px-6 overflow-visible relative">
      {/* 1. Background Decor (Z-0) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
      </div>

      {/* 2. Content Container (Z-50) */}
      <div className={`max-w-7xl mx-auto relative transition-all duration-500 ${expandedId ? 'z-[50]' : 'z-10'}`}>
        <div className="text-center mb-24 space-y-4">
          <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">Voices</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-black tracking-tight uppercase">
            Member Review
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-widest uppercase font-bold">メンバーの体験談</p>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className={`relative flex flex-col items-center text-center transition-all duration-500 
                ${expandedId === review.id ? 'z-[60] scale-[1.02]' : (expandedId ? 'opacity-10 grayscale blur-[4px] z-0' : 'z-10')}`}
            >
              {/* Profile Card */}
              <button 
                onClick={() => toggleReview(review.id)}
                className="group relative flex flex-col items-center space-y-6 w-full cursor-pointer outline-none"
              >
                <div className="relative">
                  <div className={`absolute -inset-3 bg-gradient-to-tr ${review.gradient} rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-neutral-100 transition-all duration-500 ${expandedId === review.id ? 'ring-4 ring-brand-gold shadow-brand-gold/20' : 'hover:scale-105 shadow-neutral-200'}`}>
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className={`w-full h-full object-cover transition-all duration-700 ${expandedId === review.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                    />
                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-brand-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Open Review</span>
                      <span className="text-white text-lg">＋</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 px-4 w-full">
                  <div className="space-y-1">
                    <p className={`text-xl font-sans font-bold transition-colors ${expandedId === review.id ? 'text-brand-black' : 'text-neutral-700'}`}>{review.name}</p>
                    <div className="text-[10px] font-sans text-brand-gold tracking-widest font-bold uppercase min-h-[40px] flex items-center justify-center">
                      {review.role}
                    </div>
                  </div>
                  
                  {/* Highlight */}
                  <div className="relative py-2 overflow-hidden min-h-[6rem] flex items-center justify-center">
                    <p className="text-sm md:text-md leading-relaxed tracking-tight italic text-brand-black px-2 font-sans font-medium">
                      {review.highlight}
                    </p>
                  </div>

                  {/* Enhanced Button-like UI for "Read Full Review" */}
                  <div className={`mt-4 inline-flex items-center gap-3 px-6 py-3 border rounded-full transition-all duration-500 
                    ${expandedId === review.id 
                      ? 'bg-brand-black border-brand-black text-white' 
                      : 'border-brand-gold/30 text-brand-gold group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold shadow-sm hover:shadow-brand-gold/20'}`}
                  >
                    <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
                      {expandedId === review.id ? '閉じる' : 'レビュー全文を読む'}
                    </span>
                    <span className={`text-xs transition-transform duration-500 ${expandedId === review.id ? 'rotate-45' : 'group-hover:translate-x-1'}`}>
                      {expandedId === review.id ? '✕' : '→'}
                    </span>
                  </div>
                </div>
              </button>

              {/* Collapsible Speech Bubble */}
              {expandedId === review.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 z-[70] w-[90vw] max-w-[550px] animate-bubble-in">
                   <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-neutral-100 text-left overflow-hidden">
                      
                      {/* Inner light gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-10 pointer-events-none`} />

                      {/* Bubble Arrow */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-l border-t border-neutral-100" />
                      
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-4xl font-display text-brand-gold leading-none">“</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setExpandedId(null); }} 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-brand-black hover:bg-brand-gold hover:text-white transition-all shadow-md font-bold"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="space-y-6 text-brand-black font-sans text-sm md:text-[16px] leading-[2.2] font-medium max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                          {review.content}
                        </div>

                        <div className="flex justify-end pt-4">
                          <span className="text-4xl font-display text-brand-gold leading-none rotate-180">“</span>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Global Overlay (Z-40) */}
      {expandedId && (
        <div 
          className="fixed inset-0 z-[40] bg-brand-black/60 backdrop-blur-[4px] cursor-zoom-out animate-fade-in"
          onClick={() => setExpandedId(null)}
        />
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 6s infinite linear;
        }
        @keyframes bubble-in {
          from { opacity: 0; transform: translate(-50%, 40px) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-bubble-in {
          animation: bubble-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5a059;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default MemberReview;