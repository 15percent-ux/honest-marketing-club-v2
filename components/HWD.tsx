
import React from 'react';

const HWD: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: '価値の言語化',
      desc: '「本当の価値」を深掘りして翻訳する力をつける。あなたの知性に相応しい適正価格の土台を構築します。'
    },
    {
      id: '02',
      title: '唯一無二の設計',
      desc: '“あの人といえばこれ”と呼ばれる代名詞をつくる。情報に振り回されない、強くブレない代表作を創ります。'
    },
    {
      id: '03',
      title: '実績の見える化',
      desc: '具体的な数字を作るための目標を設定。説得力を高くして成約率を上げる仕組みを構築します。'
    }
  ];

  return (
    <section id="hwd" className="bg-[#ece6e4] py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Side Title Area */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-brand-black text-white text-[9px] font-bold tracking-widest uppercase rounded-sm">
                  審査制
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-brand-black/60">Step to Weapon</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-black leading-tight">
                Honest Weapon <br className="hidden md:block" />Design™
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-bold text-brand-black leading-relaxed">
                既存のサービスがあるか、すでにサービスの下準備ができている方が対象です。
              </p>
              <p className="text-[11px] md:text-xs text-neutral-600 leading-relaxed font-sans font-light max-w-sm">
                まだ自信を持って提供できるサービスがない方へ。広告に頼らず、あなたの個性を「売れる武器」へと変える３つのプロセス。
              </p>
            </div>
          </div>

          {/* Steps Grid: Extremely Compact */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className="group bg-white/60 hover:bg-white transition-all duration-500 p-5 md:p-7 rounded-2xl border border-white/40 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 pt-1">
                      <span className="text-[10px] md:text-xs font-mono font-bold text-brand-gold border-b border-brand-gold/30 pb-0.5">
                        {step.id}
                      </span>
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base md:text-lg font-sans font-bold text-brand-black group-hover:text-brand-gold transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      <span className="text-brand-gold text-lg">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Minimal Footer Note */}
            <div className="mt-8 pl-1">
              <p className="text-[9px] text-neutral-400 font-mono tracking-[0.3em] uppercase">
                &copy; Honest Marketing Club Stars / Strategic Methodology
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HWD;
