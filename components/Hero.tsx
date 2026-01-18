
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-line span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
      })
      .from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
      }, "-=1.0")
      .from(".scroll-indicator", {
        opacity: 0,
        y: -20,
        duration: 1,
      }, "-=0.5");

      // Watermark subtle movement
      gsap.to(watermarkRef.current, {
        opacity: 0.02,
        duration: 2,
      });
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-40 pb-12 overflow-hidden bg-white">
      {/* Background Watermark Layers */}
      <div 
        ref={watermarkRef}
        className="absolute inset-0 pointer-events-none opacity-0 select-none flex items-center justify-center transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.1)` }}
      >
        <span className="text-[60vw] font-display font-bold leading-none uppercase tracking-tighter">Honest</span>
      </div>
      
      {/* Subtle Luxury Gradient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-7xl w-full">
        {/* Main Title Section */}
        <div 
          className="mb-12 md:mb-16 transition-transform duration-700 ease-out"
          style={{ 
            transform: `perspective(1000px) rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg) translateZ(20px)` 
          }}
        >
          <h1 ref={titleRef} className="flex flex-col items-center font-display font-bold leading-[1.1] tracking-[0.05em] uppercase">
            <span className="hero-line text-2xl md:text-4xl lg:text-[2.7rem] text-brand-black block overflow-hidden">
              <span className="block">Honest</span>
            </span>
            <span className="hero-line text-2xl md:text-4xl lg:text-[2.7rem] text-brand-gold block py-1 overflow-hidden">
              <span className="block">Marketing</span>
            </span>
            <span className="hero-line text-2xl md:text-4xl lg:text-[2.7rem] text-brand-black block overflow-hidden">
              <span className="block">Club Stars.</span>
            </span>
          </h1>
        </div>
        
        {/* Info Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.04)] overflow-hidden bg-white"
        >
          <div className="group relative p-5 md:p-7 bg-white transition-all duration-700 hover:bg-neutral-50 border-r border-neutral-100 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] font-sans text-neutral-400 uppercase tracking-[0.4em] block mb-3 font-bold">カテゴリー</span>
            <div className="space-y-1">
              <p className="text-brand-black text-sm md:text-base font-sans font-bold tracking-tight">
                審査制コミュニティ
              </p>
              <p className="text-brand-gold font-display text-[9px] tracking-[0.1em] italic opacity-80">Honest Marketing Club Stars</p>
            </div>
          </div>

          <div className="group relative p-5 md:p-7 bg-white transition-all duration-700 hover:bg-neutral-50 border-r border-neutral-100 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] font-sans text-neutral-400 uppercase tracking-[0.4em] block mb-3 font-bold">スケジュール</span>
            <div className="space-y-1">
              <p className="text-brand-black text-sm md:text-base font-sans font-bold tracking-tight">
                1月26日（月）開塾
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-2 bg-brand-gold/20"></span>
                <p className="text-brand-gold font-sans text-[8px] tracking-[0.2em] font-medium">一粒万倍日・月徳日</p>
                <span className="h-px w-2 bg-brand-gold/20"></span>
              </div>
            </div>
          </div>

          <div className="group relative p-5 md:p-7 bg-brand-black transition-all duration-1000 overflow-hidden flex flex-col items-center justify-center text-center">
            <div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(197,160,89,0.18),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ '--x': `${mousePos.x * 50 + 50}%`, '--y': `${mousePos.y * 50 + 50}%` } as any}
            />
            <span className="text-[7px] font-sans text-neutral-500 uppercase tracking-[0.4em] block mb-3 font-bold relative z-10">募集要項</span>
            <div className="space-y-1 relative z-10">
              <p className="text-brand-goldLight text-[6px] font-sans font-bold tracking-widest opacity-60 uppercase mb-0.5">20名限定のマーケティングトレーニング</p>
              <p className="text-white text-sm md:text-base font-sans font-bold tracking-tight">
                第0期メンバー募集開始
              </p>
              <p className="text-brand-gold font-sans text-[8px] tracking-[0.3em] font-bold mt-0.5">※1月25日締切※</p>
            </div>
          </div>
        </div>

        {/* Dynamic Scroll Indicator */}
        <div className="scroll-indicator mt-16 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-[1px] h-10 bg-neutral-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-brand-gold animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
