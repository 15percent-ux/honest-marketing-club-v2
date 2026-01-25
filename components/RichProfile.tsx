import React from 'react';

const RichProfile: React.FC = () => {
  return (
    <section id="rich-profile" className="py-20 md:py-40 bg-brand-black text-white px-6 relative overflow-hidden">
      {/* Background Decor: Deeper contrast for luxury feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(175,150,98,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none opacity-20" />

      {/* Hero-like Wrapper for optimal PC width */}
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-brand-gold/40" />
                <span className="text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase block opacity-80">
                  Exclusive Bonus
                </span>
              </div>
              
              {/* PC版で1〜2行に収まるようclampを最適化（最大80px/5vw） */}
              <h2 className="text-[clamp(1.4rem,4.5vw,80px)] font-sans font-bold leading-[1.25] tracking-tight [word-break:keep-all] font-feature-palt text-shadow-luxury">
                <span className="block lg:inline">セルフプロデュースプラン限定の</span>
                <span className="block lg:inline-block text-luxury-gold lg:ml-2">リッチプロフィールの作成</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <p className="text-[14px] md:text-[16px] leading-[1.8] font-light font-sans text-justify font-feature-palt tracking-[-0.01em] text-white/70 max-w-xl">
                  サービスのクオリティを高めるのは代表者のプロフィールに比例する。3ヶ月かけて作り上げるリッチストーリーを一人一人オーダーでディレクターとデザイナーで作り上げます。
                </p>
                
                <div className="space-y-6">
                  <p className="text-[9px] font-mono font-bold tracking-[0.4em] text-neutral-500 uppercase">Case Portfolio</p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://rinrin-photo.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-6 py-4 border border-white/5 rounded-full hover:border-brand-gold/50 transition-all bg-white/5 backdrop-blur-sm"
                    >
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Example A</span>
                      <span className="text-brand-gold transition-transform group-hover:translate-x-2">→</span>
                    </a>
                    <a 
                      href="https://keichan.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-6 py-4 border border-white/5 rounded-full hover:border-brand-gold/50 transition-all bg-white/5 backdrop-blur-sm"
                    >
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Example B</span>
                      <span className="text-brand-gold transition-transform group-hover:translate-x-2">→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-0 lg:pt-2 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12 flex flex-col md:flex-row lg:flex-col justify-end gap-10 lg:gap-12">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-neutral-500 tracking-[0.3em] uppercase block">Market Valuation</span>
                  <p className="text-xl md:text-2xl font-sans font-bold text-white/20 line-through tracking-tighter">¥330,000</p>
                </div>
                <div className="space-y-2">
                  <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.4em] uppercase block">Special Benefit</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl md:text-7xl font-sans font-bold text-luxury-gold tracking-tighter">110,000</p>
                    <span className="text-sm font-bold text-brand-gold">円（税込）</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Column - Refined with subtle border and depth */}
          <div className="lg:col-span-12 xl:col-span-4 relative mt-16 xl:mt-0 flex justify-center">
            <div className="relative aspect-square w-full max-w-[380px] overflow-hidden rounded-[3rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8),0_0_40px_rgba(175,150,98,0.15)] group border border-white/10">
              <img 
                src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png" 
                alt="Rich Profile Portfolio" 
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 opacity-60"
              />
              {/* Luxury Text Readability Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl">
                <p className="text-[11px] md:text-xs font-sans font-bold italic tracking-tight text-white/90 leading-relaxed text-shadow-luxury">
                  "The narrative of leadership defines the resonance of the brand's soul."
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-8 bg-brand-gold" />
                  <span className="text-[8px] font-mono text-brand-gold uppercase tracking-[0.4em] font-bold">Identity Strategy</span>
                </div>
              </div>
            </div>
            
            {/* Ambient Background Accent */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-gold/10 blur-[140px] -z-10 animate-pulse-slow" />
          </div>
        </div>
      </div>

      <style>{`
        .font-feature-palt {
          font-feature-settings: "palt";
        }
        .text-justify {
          text-align: justify;
          text-justify: inter-character;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default RichProfile;