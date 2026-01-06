import React from 'react';

const HWD: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: '価値の言語化',
      desc: '商品が持つ「本当の価値」を深掘りし、あなたの知性に相応しい適正価格の方程式を構築します。',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '02',
      title: '唯一無二の設計',
      desc: '“あの人といえばこれ”と呼ばれる必殺技を定義。情報に振り回されない、強くブレない代表作を創ります。',
      image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '03',
      title: '実績の資産化',
      desc: '代表作で具体的な数字と信憑性を作り上げ、セールスに直結する社会的証明へと昇華させます。',
      image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '04',
      title: '熱量の同期',
      desc: '月1回のオフライン会。直接顔を合わせることでしか生まれない深い対話が、基準値を引き上げます。',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb11c1?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section id="hwd" className="bg-[#ece6e4] py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Side Title Area */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-brand-black"></span>
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-brand-black">Step to Weapon</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-black leading-tight">
                Honest Weapon <br />Design™
              </h2>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light max-w-sm">
              まだ自信を持って提供できるサービスがない方へ。広告に頼らず、あなたの知性を「売れる武器」へと変える4つのプロセス。
            </p>
            <div className="hidden lg:flex items-center justify-center aspect-square w-32 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
               <span className="text-3xl font-display font-bold text-brand-black">HWD</span>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className="group bg-white/40 hover:bg-white transition-all duration-700 p-8 md:p-10 rounded-[2rem] border border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex flex-col h-full space-y-8">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-bold text-brand-gold">{step.id}</span>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                        <img src={step.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-sans font-bold text-brand-black">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HWD;