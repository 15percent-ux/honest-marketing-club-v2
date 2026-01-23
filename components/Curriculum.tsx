
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Curriculum: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      id: '01',
      tag: 'Re-Design',
      title: '既存サービスの価値見直し',
      desc: '既存サービスの価格を見直し値上げをする。価値の言語化をおこない本当の価値を洗い出します。価値と価格のズレが合えば、自信をもって値上げすることができます。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815368/2_eolhcq.png',
      accent: '自分の伸び代は、自分では見えない。'
    },
    {
      id: '02',
      tag: 'Consultation',
      title: 'セカンドオピニオンへの相談',
      desc: '大事を決断するとき、迷っている時、自信がないとき。答え合わせをしたり、常に壁打ちを出来る相手をもつことは最大のリスクヘッジになります。代表の阪田への相談は回数制限なし。メンバー全員があなたの相談役です。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767214958/s-1024x768_v-fs_webp_ce41d516-b5f6-4a40-9d8d-5ae7ff48f3cd_pbqni5.png',
      accent: '孤独な決断を、卒業する。'
    },
    {
      id: '03',
      tag: 'Environment',
      title: '同じベクトルの戦友と刺激し合う',
      desc: '近い価値観をもった人と繋がる事ができるのも魅力の一つ。ビジネスを共に始めることもあり、プライベートでも交流が生まれたり、助け合いながら成長していける環境づくりをコンセプトにしています。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767214957/s-1024x768_v-fs_webp_f1d44356-7dd9-405f-aa02-0376e9141d1c_hpvmhz.jpg',
      accent: '基準値が、強制的に引き上がる。'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".curr-header", {
        scrollTrigger: {
          trigger: ".curr-header",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Items Animation
      items.forEach((_, i) => {
        const itemClass = `.curr-item-${i}`;
        const imgClass = `.curr-img-${i}`;
        
        gsap.from(itemClass, {
          scrollTrigger: {
            trigger: itemClass,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        });

        gsap.from(imgClass, {
          scrollTrigger: {
            trigger: imgClass,
            start: "top 90%",
            scrub: 1.5
          },
          scale: 1.05,
          duration: 2
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-16 md:py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="curr-header text-center mb-20 md:mb-28 space-y-4">
          <div className="inline-flex items-center gap-4">
            <span className="w-10 h-px bg-brand-gold"></span>
            <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">The Value of Us</span>
            <span className="w-10 h-px bg-brand-gold"></span>
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-display font-bold text-brand-black tracking-tight leading-tight [word-break:keep-all]">
            コミュニティのいいところ
          </h2>
          <p className="text-neutral-400 font-sans text-[10px] md:text-xs tracking-[0.2em] font-medium">
            一人では辿り着けない場所に、最高の環境で。
          </p>
        </div>

        <div ref={containerRef} className="space-y-24 md:space-y-32">
          {items.map((item, i) => (
            <div 
              key={item.id} 
              className={`curr-item-${i} flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-20 relative`}
            >
              {/* Massive Background ID - Shrunk for compactness */}
              <div className={`absolute -top-12 ${i % 2 === 1 ? '-left-6' : '-right-6'} text-[18vw] font-display font-bold text-neutral-50 pointer-events-none select-none z-0 opacity-40`}>
                {item.id}
              </div>

              {/* Image Container - Reduced Width */}
              <div className="w-full lg:w-[38%] relative z-10">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 bg-neutral-50">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`curr-img-${i} w-full h-full object-cover will-change-transform`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/20 via-transparent to-transparent opacity-30" />
                </div>
                
                {/* Accent Badge - Smaller padding and text */}
                <div className={`absolute -bottom-4 ${i % 2 === 1 ? 'md:-left-10' : 'md:-right-10'} bg-brand-black text-white p-4 md:p-6 rounded-2xl shadow-xl max-w-[220px] hidden md:block animate-pulse-slow`}>
                  <p className="text-xs md:text-sm font-sans font-bold leading-relaxed tracking-tight italic">
                    "{item.accent}"
                  </p>
                </div>
              </div>
              
              {/* Content Container - Better balance */}
              <div className="w-full lg:w-[50%] space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono font-bold text-brand-gold tracking-[0.4em] uppercase">{item.tag}</span>
                    <div className="flex-1 h-px bg-neutral-100"></div>
                  </div>
                  <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-sans font-bold text-brand-black tracking-tight leading-[1.2] [word-break:keep-all]">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-neutral-500 text-base md:text-lg leading-[1.7] font-sans font-light text-justify">
                    {item.desc}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-6">
                    <div className="h-px w-12 bg-brand-gold/30"></div>
                    <span className="text-[9px] font-mono text-neutral-300 font-bold tracking-[0.4em] uppercase">Honest Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Curriculum;
