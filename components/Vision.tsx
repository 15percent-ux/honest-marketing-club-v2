import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="py-32 md:py-48 bg-brand-black text-white px-6 overflow-hidden relative">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(197,160,89,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Label Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="vision-title inline-flex items-center gap-4">
              <span className="w-12 h-px bg-brand-gold"></span>
              <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">The Vision</span>
            </div>
            <h2 className="vision-title text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight">
              なぜ、<br />いまHMCなのか。
            </h2>
          </div>

          {/* Content Column */}
          <div ref={textRef} className="lg:col-span-8 space-y-16">
            <div className="space-y-12">
              <p className="vision-para text-xl md:text-2xl font-sans font-bold text-brand-goldLight leading-relaxed tracking-wide">
                「煽り」や「安売り」で疲弊するマーケティングを、<br className="hidden md:block" />
                私たちの世代で終わりにしたい。
              </p>
              
              <div className="vision-para space-y-8 text-neutral-400 font-sans text-base md:text-lg leading-[2] font-light text-justify">
                <p>
                  SNSを開けば、誰かを煽り、射幸心を煽るような言葉ばかりが溢れています。
                  しかし、そんな小手先のテクニックで得た利益は、果たしてあなたの人生を豊かにするでしょうか。
                </p>
                <p>
                  私がこのコミュニティを作った理由はシンプルです。
                  <span className="text-white font-bold">「誠実であること」と「利益を上げること」を両立させる、強固な個人の武器（Weapon）を共に作りたかったからです。</span>
                </p>
                <p>
                  多くの起業家が、自分の本当の価値に気づかず、市場の相場に自分を合わせようとして苦しんでいます。
                  安売りは、あなたの知性に対する「不誠実」です。
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/10">
              <div className="vision-pillar space-y-4">
                <h4 className="text-brand-gold font-bold text-sm tracking-widest uppercase">01. 孤独からの解放</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  基準の高い20名が集まることで、一人では到底届かなかった視座へと引き上げられます。
                </p>
              </div>
              <div className="vision-pillar space-y-4">
                <h4 className="text-brand-gold font-bold text-sm tracking-widest uppercase">02. 知性の資産化</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  一過性のブームではなく、10年後も通用する「本質的な価値の作り方」を資産として残します。
                </p>
              </div>
            </div>

            <div className="vision-para pt-8">
              <div className="p-8 border border-brand-gold/20 bg-brand-gold/5 rounded-2xl">
                <p className="text-sm md:text-base text-white font-medium italic leading-relaxed text-center">
                  "Marketing is not a battle of products, it's a battle of perceptions — and the most powerful perception is Honesty."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;