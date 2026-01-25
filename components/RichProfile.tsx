
import React from 'react';

const RichProfile: React.FC = () => {
  return (
    <section id="rich-profile" className="py-16 md:py-24 bg-brand-black text-white px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase block">
                Exclusive Bonus
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-sans font-bold leading-tight tracking-tight [word-break:keep-all] font-feature-palt">
                セルフプロデュースプラン限定の特典！<br />
                <span className="text-brand-gold">リッチプロフィールの作成</span>
              </h2>
            </div>

            <div className="space-y-6 max-w-2xl">
              <p className="text-[14px] md:text-[15px] leading-[1.6] font-light font-sans text-justify font-feature-palt tracking-[-0.01em]">
                サービスのクオリティを高めるのは代表者のプロフィールに比例する。3ヶ月かけて作り上げるリッチストーリーを一人一人オーダーでディレクターとデザイナーで作り上げます。
              </p>
              
              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-mono font-bold tracking-[0.4em] text-neutral-500 uppercase">Case Examples</p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://rinrin-photo.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full hover:border-brand-gold transition-all"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase">Example A</span>
                    <span className="text-brand-gold transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a 
                    href="https://keichan.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full hover:border-brand-gold transition-all"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase">Example B</span>
                    <span className="text-brand-gold transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase block">Standard Price</span>
                <p className="text-xl font-sans font-bold text-white/40 line-through">33万円（税込）</p>
              </div>
              <div className="space-y-1">
                <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.3em] uppercase block">Member Benefit</span>
                <p className="text-3xl md:text-4xl font-sans font-bold text-brand-gold tracking-tighter">11万円<span className="text-sm ml-1">（税込）</span></p>
              </div>
            </div>
          </div>

          {/* Visual Column - Shrunk by 20% & 1:1 balance */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(197,160,89,0.15)] group">
              <img 
                src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png" 
                alt="Rich Profile Mockup" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-brand-gold/10 backdrop-blur-md border border-brand-gold/20 rounded-2xl">
                <p className="text-xs font-sans font-bold italic tracking-tight text-white/90">
                  "The Story of the Leader defines the Value of the Brand."
                </p>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/10 blur-[80px] -z-10" />
          </div>
        </div>
      </div>

      <style>{`
        .font-feature-palt {
          font-feature-settings: "palt";
        }
        .text-justify {
          text-align: justify;
        }
      `}</style>
    </section>
  );
};

export default RichProfile;
