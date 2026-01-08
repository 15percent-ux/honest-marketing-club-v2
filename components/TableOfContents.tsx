import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TableOfContents: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgLineRef = useRef<HTMLDivElement>(null);
  const bgDecorRef = useRef<HTMLDivElement>(null);

  const contents = [
    { id: '01', title: '自分の伸び代は一人じゃ伸ばせない', subtitle: '視点と伸び代' },
    { id: '02', title: 'なぜ、価格を上げることを提案したのか。', subtitle: '価格の戦略' },
    { 
      id: '03', 
      title: '価格の適正とは', 
      subtitle: '価値の定義',
      important: true,
      desc: 'ここが最も重要な本質です。サービスではなく「人の魅力」に見合っているか。'
    },
    { id: '04', title: '僕の経験値と裏の顔', subtitle: '経歴と背景' },
    { 
      id: '05', 
      title: 'セルフブランディングの本質', 
      subtitle: 'アイデンティティ',
      children: [
        'プロフィールの設計と商品設計の逆算',
        'セルフブランディングの最適解'
      ]
    },
    { id: '06', title: '300人のオンラインサロン', subtitle: '歩みとコミュニティ' },
    { id: '07', title: '値段を上げられない本当の理由', subtitle: '心理的障壁' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title and Header Animation
      gsap.from(".toc-header", {
        scrollTrigger: {
          trigger: ".toc-header",
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      // 2. Content Items Staggered Reveal
      gsap.from(".toc-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out",
        clearProps: "all"
      });

      // 3. Background Parallax
      gsap.to(bgLineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        ease: "none"
      });

      gsap.to(bgDecorRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        x: 50,
        opacity: 0.8,
        ease: "none"
      });

      // 4. Important Tag Pulse
      gsap.to(".toc-badge", {
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-6 bg-white overflow-hidden relative border-t border-neutral-100">
      {/* Background Decor with Parallax */}
      <div ref={bgLineRef} className="absolute top-1/2 left-0 w-full h-px bg-neutral-100 -z-0" />
      <div ref={bgDecorRef} className="absolute top-0 right-0 w-1/4 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2 -z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-28 space-y-6">
          <h2 className="toc-header text-4xl md:text-5xl font-display font-bold text-brand-black tracking-tight uppercase">
            価値の作り方
          </h2>
          <p className="toc-header text-xs text-neutral-400 font-sans tracking-[0.4em] font-bold uppercase">Thinking Index</p>
          <div className="toc-header w-12 h-px bg-brand-gold mx-auto mt-8" />
        </div>

        <div ref={containerRef} className="space-y-0 border border-neutral-100 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] divide-y divide-neutral-100 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          {contents.map((item) => (
            <div 
              key={item.id} 
              className={`toc-item group relative p-8 md:p-12 transition-all duration-700 hover:bg-neutral-50/80 ${item.important ? 'bg-neutral-50/20' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                <div className="flex-shrink-0 relative">
                  <span className="text-5xl md:text-6xl font-display font-bold text-brand-gold/10 group-hover:text-brand-gold/30 transition-all duration-1000 leading-none inline-block transform group-hover:scale-110">
                    {item.id}
                  </span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-mono text-brand-gold tracking-[0.3em] font-bold uppercase">{item.subtitle}</span>
                    {item.important && (
                      <span className="toc-badge px-4 py-1.5 bg-brand-black text-white text-[8px] font-bold tracking-[0.3em] uppercase rounded-full shadow-lg">
                        Essential Section
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-black leading-tight tracking-tight group-hover:text-brand-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  {item.desc && (
                    <p className="text-sm md:text-base text-brand-gold/80 font-sans font-medium leading-relaxed italic border-l-2 border-brand-gold/20 pl-6 mt-4">
                      {item.desc}
                    </p>
                  )}

                  {item.children && (
                    <div className="pt-4 space-y-3">
                      {item.children.map((child, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-5 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                          <span className="w-6 h-px bg-neutral-200 group-hover:bg-brand-gold group-hover:w-10 transition-all duration-700" />
                          <span className="text-[14px] md:text-[15px] font-sans font-light tracking-tight">{child}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center space-y-10">
          <div className="space-y-2">
            <p className="text-sm text-neutral-400 font-sans font-light tracking-[0.2em]">
              本編はnoteにて全文公開しております。
            </p>
            <div className="w-8 h-px bg-neutral-200 mx-auto" />
          </div>
          
          <a 
            href="https://note.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-8 px-16 py-7 bg-brand-black text-white text-[11px] font-bold tracking-[0.6em] uppercase overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-brand-gold/30 transition-all duration-500 hover:-translate-y-1"
          >
            <span className="relative z-10">Read the Full Story on note</span>
            <div className="absolute inset-0 bg-brand-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2 text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TableOfContents;
