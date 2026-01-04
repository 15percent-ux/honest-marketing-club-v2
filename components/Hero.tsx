import React, { useEffect, useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-40 pb-12 overflow-hidden bg-white">
      {/* Background Watermark Layers */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] select-none flex items-center justify-center transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.1)` }}
      >
        <span className="text-[60vw] font-display font-bold leading-none uppercase tracking-tighter">Honest</span>
      </div>
      
      {/* Subtle Luxury Gradient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-7xl w-full">
        {/* Main Title Section - Font size reduced by 40% */}
        <div 
          className="mb-12 md:mb-16 transition-transform duration-700 ease-out"
          style={{ 
            transform: `perspective(1000px) rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg) translateZ(20px)` 
          }}
        >
          <h1 className="flex flex-col items-center font-display font-bold leading-[1.1] tracking-[0.05em] uppercase">
            <span className="text-2xl md:text-4xl lg:text-[2.7rem] text-brand-black animate-reveal-up block overflow-hidden">
              <span className="block">Honest</span>
            </span>
            <span className="text-2xl md:text-4xl lg:text-[2.7rem] text-brand-gold animate-reveal-up block py-1 overflow-hidden" style={{ animationDelay: '0.15s' }}>
              <span className="block">Marketing</span>
            </span>
            <span className="text-2xl md:text-4xl lg:text-[2.7rem] text-brand-black animate-reveal-up block overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <span className="block">Club Stars.</span>
            </span>
          </h1>
        </div>
        
        {/* Info Cards Grid - 30% padding reduction, 20% font reduction */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.04)] animate-fade-in opacity-0 overflow-hidden"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          {/* Card 1: Category */}
          <div className="group relative p-5 md:p-7 bg-white transition-all duration-700 hover:bg-neutral-50 border-r border-neutral-100 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] font-sans text-neutral-400 uppercase tracking-[0.4em] block mb-3 font-bold">カテゴリー</span>
            <div className="space-y-1">
              <p className="text-brand-black text-sm md:text-base font-sans font-bold tracking-tight">
                審査制コミュニティ
              </p>
              <p className="text-brand-gold font-display text-[9px] tracking-[0.1em] italic opacity-80">Honest Marketing Club Stars</p>
            </div>
          </div>

          {/* Card 2: Schedule */}
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

          {/* Card 3: Requirements */}
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
              <p className="text-brand-gold font-sans text-[8px] tracking-[0.3em] font-bold mt-0.5">※1月10日締切※</p>
            </div>
          </div>
        </div>

        {/* Dynamic Scroll Indicator */}
        <div className="mt-16 animate-fade-in opacity-0 flex flex-col items-center" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-[1px] h-10 bg-neutral-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-brand-gold animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes reveal-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal-up > span {
          animation: reveal-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
};

export default Hero;