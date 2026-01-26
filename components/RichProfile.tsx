
import React from 'react';

const RichProfile: React.FC = () => {
  return (
    <section id="rich-profile" className="py-12 md:py-16 bg-brand-black text-white px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-brand-gold font-mono text-[9px] font-bold tracking-[0.5em] uppercase block">
                Exclusive Bonus
              </span>
              <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-sans font-bold leading-tight tracking-tight [word-break:keep-all] font-feature-palt">
                セルフプロデュースプラン限定特典<br />
                <span className="text-brand-gold">リッチプロフィールの作成</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-[14px] md:text-[15px] leading-[1.6] font-light font-sans text-justify font-feature-palt tracking-[-0.01em]">
                サービスのクオリティを高めるのは代表者のプロフィールに比例する。3ヶ月かけて作り上げるリッチストーリーを一人一人オーダーでディレクターとデザイナーで作り上げます。
              </p>
              
              <div className="space-y-3 pt-2">
                <p className="text-[9px] font-mono font-bold tracking-[0.4em] text-neutral-500 uppercase">Case Examples</p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://rinrin-photo.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full hover:border-brand-gold transition-all"
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase">Example A</span>
                  </a>
                  <a 
                    href="https://keichan.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full hover:border-brand-gold transition-all"
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase">Example B</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-8">
              <div className="space-y-0.5">
                <span className="text-[8px] font-sans text-neutral-500 tracking-[0.2em] uppercase block font-bold">一般価格</span>
                <p className="text-sm font-sans font-bold text-white/40 line-through lining-nums">33万円</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-brand-gold font-sans text-[8px] font-bold tracking-[0.2em] uppercase block">メンバー限定価格</span>
                <p className="text-xl md:text-2xl font-sans font-bold text-brand-gold tracking-tighter lining-nums">11万円<span className="text-[10px] ml-1">（税込）</span></p>
              </div>
            </div>
          </div>

          {/* Visual Column - More compact */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] group">
              <img 
                src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png" 
                alt="Rich Profile Mockup" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-feature-palt { font-feature-settings: "palt"; }
        .text-justify { text-align: justify; }
        .lining-nums { font-variant-numeric: lining-nums; }
      `}</style>
    </section>
  );
};

export default RichProfile;
