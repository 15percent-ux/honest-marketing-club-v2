import React from 'react';

const InteractiveIntro: React.FC = () => {
  const items = [
    { title: "集客に疲弊しないために", subtitle: "Quantity to Quality", desc: "不特定多数へのアプローチを止め、価値の共鳴者だけが集まる仕組みへ。" },
    { title: "売込みで疲弊しないために", subtitle: "Push to Pull", desc: "説得という名の疲弊から卒業し、独自の思想で「選ばれる」必然を創る。" },
    { title: "高単価で売れるサービスをつくる。", subtitle: "The Ultimate Goal", desc: "安売りは誠実さの欠如。あなたの知性に相応しい対価を受け取る権利。" }
  ];

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-neutral-100 border border-neutral-100 overflow-hidden shadow-2xl">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="group relative bg-white p-8 md:p-10 h-[320px] flex flex-col justify-center transition-all duration-700 hover:bg-brand-black"
            >
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-mono text-brand-gold tracking-[0.3em] uppercase block font-bold transition-colors group-hover:text-brand-goldLight">
                  {item.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-brand-black leading-relaxed transition-colors group-hover:text-white">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-brand-gold/30 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-gold" />
                <p className="text-sm text-neutral-400 font-light leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
              
              <span className="absolute bottom-6 right-6 text-7xl font-display font-bold text-neutral-50 transition-colors group-hover:text-white/5 pointer-events-none">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveIntro;