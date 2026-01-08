import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const coreTransforms = [
    { 
      id: "01", 
      title: "集客に疲弊しないために", 
      subtitle: "Quantity to Quality", 
      desc: "不特定多数へのアプローチを止め、価値の共鳴者だけが集まる仕組みへ。" 
    },
    { 
      id: "02", 
      title: "売込みで疲弊しないために", 
      subtitle: "Push to Pull", 
      desc: "説得という名の疲弊から卒業し、独自の思想で「選ばれる」必然を創る。" 
    },
    { 
      id: "03", 
      title: "高単価で売れるサービスをつくる。", 
      subtitle: "The Ultimate Goal", 
      desc: "安売りは誠実さの欠如。あなたの知性に相応しい対価を受け取る権利。" 
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".vision-title", {
        scrollTrigger: {
          trigger: ".vision-title",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Transform Boxes reveal
      gsap.from(".transform-box", {
        scrollTrigger: {
          trigger: ".transform-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Paragraph reveal
      gsap.from(".vision-para", {
        scrollTrigger: {
          trigger: ".vision-para",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
      });

      // Pillars reveal
      gsap.from(".vision-pillar", {
        scrollTrigger: {
          trigger: ".vision-pillar",
          start: "top 90%",
        },
        x: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vision" className="py-32 md:py-56 bg-brand-black text-white px-6 overflow-hidden relative">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(197,160,89,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start mb-32">
          
          {/* Label Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="vision-title inline-flex items-center gap-4">
              <span className="w-12 h-px bg-brand-gold"></span>
              <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">The Vision</span>
            </div>
            <h2 className="vision-title text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              なぜ、<br />いまHMCなのか。
            </h2>
          </div>

          {/* Content Column */}
          <div ref={textRef} className="lg:col-span-8 space-y-12">
            <p className="vision-para text-xl md:text-3xl font-sans font-bold text-brand-goldLight leading-relaxed tracking-wide">
              誰でもできるテンプレートより、<br className="hidden md:block" />
              自分にしかできない唯一無二を。
            </p>
            
            <div className="vision-para space-y-8 text-neutral-400 font-sans text-base md:text-lg leading-[2] font-light text-justify">
              <p>
                SNSを開けば、誰かを煽り、射幸心を煽るような言葉ばかりが溢れています。
                しかし、そんな小手先のテクニックで得た利益は、果たしてあなたの人生を豊かにするでしょうか。
              </p>
              <p>
                <span className="text-white font-medium">私がこのコミュニティを作った理由はシンプルです。</span><br />
                <span className="text-white font-bold">「誠実であること」と「利益を上げること」を両立させる、強固な個人の武器（Weapon）を共に作りたかったからです。</span>
              </p>
            </div>
          </div>
        </div>

        {/* Core Transformation Grid */}
        <div className="transform-grid grid grid-cols-1 md:grid-cols-3 gap-1px bg-neutral-800 border border-neutral-800 mb-32 shadow-2xl overflow-hidden rounded-2xl">
          {coreTransforms.map((item, i) => (
            <div 
              key={i} 
              className="transform-box group relative bg-neutral-900/50 backdrop-blur-sm p-10 md:p-12 h-full flex flex-col justify-center transition-all duration-700 hover:bg-brand-gold/10"
            >
              <div className="relative z-10 space-y-5">
                <span className="text-[10px] font-mono text-brand-gold tracking-[0.3em] uppercase block font-bold transition-colors group-hover:text-brand-goldLight">
                  {item.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-white leading-relaxed">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-brand-gold/30 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-gold" />
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="absolute bottom-6 right-8 text-7xl font-display font-bold text-white/5 transition-colors group-hover:text-brand-gold/5 pointer-events-none">
                {item.id}
              </span>
            </div>
          ))}
        </div>

        {/* Pillars & Conclusion */}
        <div className="space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 pt-16 border-t border-white/10">
            <div className="vision-pillar space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-display text-2xl font-bold">01.</span>
                <h4 className="text-brand-gold font-bold text-lg tracking-widest uppercase">孤独からの解放</h4>
              </div>
              <p className="text-base text-neutral-500 leading-relaxed font-light">
                基準の高い20名が集まることで、一人では到底届かなかった視座へと引き上げられます。
              </p>
            </div>
            <div className="vision-pillar space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-display text-2xl font-bold">02.</span>
                <h4 className="text-brand-gold font-bold text-lg tracking-widest uppercase">知性の資産化</h4>
              </div>
              <p className="text-base text-neutral-500 leading-relaxed font-light">
                一過性のブームではなく、10年後も通用する「本質的な価値の作り方」を資産として残します。
              </p>
            </div>
          </div>

          <div className="vision-para max-w-3xl mx-auto">
            <div className="p-10 md:p-14 border border-brand-gold/20 bg-brand-gold/5 rounded-3xl relative">
              <div className="absolute top-0 left-10 -translate-y-1/2 bg-brand-black px-4">
                <span className="text-4xl font-display text-brand-gold opacity-50">”</span>
              </div>
              <p className="text-lg md:text-xl text-white font-medium italic leading-relaxed text-center">
                Marketing is not a battle of products, it's a battle of perceptions — and the most powerful perception is Honesty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;