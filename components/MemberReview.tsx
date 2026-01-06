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
    id: 'ayami',
    name: 'AYAMI',
    role: 'fashion designer',
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
        <p>特に印象的だったのは、ビジュアルづくりへの徹底したこだわりです。アイコンひとつ変えるにも「どこがポイントでどう改善すべきか」を具体的に教えてくださり、ときには実際に加工編集を加えて言語化して伝えてくれました。</p>
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
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        物腰の穏やかさとは対照的に、<br />
        成果に直結する論理的な提案を<br />
        してくれる頼もしさがあります。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>オミが持つ“本質を見抜く力”にはいつも学ぶところがあり、友人の立場ではありますが、オンラインサロンにも在籍していました。オミは 物腰の穏やかさとは対照的に、物事を論理的に整理し成果に直結する提案をしてくれる頼もしさがあります。</p>
        <p>私が初めて高額講座をローンチする際、オミに価格の相談をしたところ「その価格設定では安すぎる」と指摘されました。その経験を通して、私自身が提供している価値の本当の大きさに気づくことができました。</p>
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
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        自分が必要としているタイミングに、<br />
        近い課題意識と熱量を持った方々と<br />
        対話を重ねられたことが財産です。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>オミさんは、先生ではありません。おごらず、背伸びせず、比較もせず、自分のサイズを素直に受け入れて、成長できる場だと思います。</p>
        <p>自分が必要としているタイミングに、似たような課題意識や、近い熱量を持った方々と対話を重ねる機会を持てたことが、ありがたい時間でした。</p>
      </div>
    )
  },
  {
    id: 'kofumi',
    name: '@kofumi.branding',
    role: 'ブランディングプロデュース主宰',
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
        <p>起業初期、趣味起業程度の専業主婦だった私は、マーケティングとブランディングを学ぶために入会しました。サロンでは、オミさんが参加者のビジネスの悩みを丁寧にヒアリングし、壁打ちを通して悩みを解決していく公開コンサルが開催されていました。</p>
        <p>学んだ知識と「価値の方程式」を愚直に活かした結果、起業2年後には、年商2000万円を突破することができました。</p>
      </div>
    )
  },
  {
    id: 'rinrin',
    name: '金山由佳里',
    role: 'フォトグラファー / me 共同主催',
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
        <p>特に印象的だったのは、夜にZoomで集まりオミさんを中心に語り合う「スナックオミ」の時間。メンバー同士の信頼関係が深まり、次第にお仕事を頂く機会も増えていきました。</p>
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
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-black via-brand-gold to-brand-black bg-[length:200%_auto] animate-shimmer font-bold leading-relaxed block">
        1週間のポップアップショップで<br />
        200%の売上（300万円）が<br />
        出るようになりました。
      </span>
    ),
    content: (
      <div className="space-y-4">
        <p>オンラインでの壁打ちや意見交換を行っているうちに、自身の強み、価格の付け方などあやふやになっていた所が整理されたことが結果に繋がったように思います。</p>
        <p>それまでは良い時で売上150万に届かないくらいだったので、一週間で300万円を売り上げた時は震えました。</p>
      </div>
    )
  },
  {
    id: 'aoki',
    name: 'AOKI',
    role: '事業主 / アワード入賞者',
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
        <p>ビジネスカンファレンス（ICC）初出場で2部門2位を獲得できたのは、オミ氏の客観的かつ鋭いフィードバックがあったからです。自分一人では見落としていた強みを引き出し、社会的証明へと繋げることができました。</p>
        <p>感情論ではなく、成果に基づいた具体的な改善案を提示してくれるため、迷いなく実行に移すことができました。まさに本質を追求する場だと確信しています。</p>
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
      // 1. Initial State
      gsap.set(".review-item-wrapper", { opacity: 0, y: 80 });

      // 2. Title Entrance
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

      // 3. Staggered Entrance
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

      // 4. Background Orbs Animation
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

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const onCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto"
    });
  };

  return (
    <section ref={sectionRef} id="reviews" className="bg-white py-32 md:py-48 px-6 overflow-hidden relative">
      {/* Background Orbs */}
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

        {/* Reviews Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className={`review-item-wrapper relative transition-all duration-700 
                ${expandedId && expandedId !== review.id ? 'opacity-20 blur-[2px] scale-95' : 'opacity-100'}`}
            >
              <div 
                onMouseMove={onCardMouseMove}
                onMouseLeave={onCardMouseLeave}
                onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                className="group relative flex flex-col items-center p-10 bg-white/70 backdrop-blur-xl border border-neutral-100 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-2xl hover:border-brand-gold/40 transition-all duration-500 w-full preserve-3d"
                style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
              >
                {/* Profile Photo - FIXED CLIPPING BUG */}
                <div className="relative mb-10 transform-gpu" style={{ transform: 'translateZ(60px)' }}>
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${review.gradient} rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  
                  {/* Container with forced clipping fix for Safari/3D */}
                  <div 
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-neutral-100 ring-1 ring-black/5"
                    style={{ 
                      maskImage: '-webkit-radial-gradient(white, black)', 
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      isolation: 'isolate' 
                    }}
                  >
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out will-change-transform" 
                    />
                  </div>
                </div>
                
                <div className="text-center space-y-5 transform-gpu flex-1" style={{ transform: 'translateZ(30px)' }}>
                  <div>
                    <p className="text-xl font-sans font-bold text-brand-black mb-1">{review.name}</p>
                    <p className="text-[10px] font-sans text-brand-gold tracking-[0.25em] font-bold uppercase min-h-[30px]">{review.role}</p>
                  </div>
                  
                  <div className="h-px w-10 bg-neutral-100 mx-auto" />
                  
                  <div className="min-h-[120px] flex items-center justify-center px-2">
                    <p className="text-sm md:text-base leading-relaxed tracking-tight italic text-brand-black font-sans font-medium">
                      {review.highlight}
                    </p>
                  </div>

                  <div className="pt-6">
                    <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full border text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 
                      ${expandedId === review.id ? 'bg-brand-black text-white' : 'bg-transparent border-neutral-200 text-neutral-400 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                      {expandedId === review.id ? 'Close' : 'Full Story'}
                      <span className="text-xs transition-transform duration-700 group-hover:translate-x-1">{expandedId === review.id ? '✕' : '→'}</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                {expandedId === review.id && (
                  <div className="mt-10 pt-10 border-t border-neutral-100 animate-slide-up text-left w-full transform-gpu" style={{ transform: 'translateZ(10px)' }}>
                    <div className="text-sm text-neutral-600 leading-relaxed space-y-5 font-sans font-light">
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
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 6s infinite linear;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default MemberReview;