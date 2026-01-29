
import React from 'react';

interface RichProfileProps {
  onNavigateToSelfProduce?: () => void;
}

const RichProfile: React.FC<RichProfileProps> = ({ onNavigateToSelfProduce }) => {
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
                セルフプロデュース
              </span>
              <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-sans font-bold leading-tight tracking-tight [word-break:keep-all] font-feature-palt">
                リッチプロフィール /<br className="hidden md:block" /> コミュニティ限定特典
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-[14px] md:text-[15px] leading-[1.6] font-light font-sans text-justify font-feature-palt tracking-[-0.01em]">
                商品のクオリティは代表者のプロフィールに比例すると考えています、サービスの価値を言語化してリッチプロフィールを制作。
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 md:gap-10">
              <div className="space-y-0.5">
                <span className="text-[8px] font-sans text-neutral-500 tracking-[0.2em] uppercase block font-bold">一般価格</span>
                <p className="text-sm font-sans font-bold text-white/40 line-through lining-nums">33万円</p>
              </div>
              
              <button 
                onClick={onNavigateToSelfProduce}
                className="group relative flex items-center gap-4 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-brand-black rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] hover:-translate-y-0.5 active:scale-95"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-[11px] font-bold tracking-[0.2em] uppercase">詳細はこちら</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Visual Column - More compact */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] group cursor-pointer" onClick={onNavigateToSelfProduce}>
              <img 
                src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png" 
                alt="Rich Profile Mockup" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
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
