
import React from 'react';

const ValueProposition: React.FC = () => {
  const values = [
    {
      number: "01",
      title: "価格決定権の掌握",
      subtitle: "Price Autonomy",
      desc: "競合の顔色をうかがう「比較」の世界から脱却。あなたの知性と誠実さに裏打ちされた『適正な高単価』を、自信を持って提示できる心理的・戦略的基盤を構築します。"
    },
    {
      number: "02",
      title: "思考の完全自立",
      subtitle: "Strategic Intelligence",
      desc: "流行のノウハウや外部コンサルに依存するフェーズは終わります。価値の本質を見抜き、自ら戦略を組み立て、検証し続ける『一生モノのマーケティング脳』を自らのものにします。"
    },
    {
      number: "03",
      title: "基準値の劇的な同期",
      subtitle: "Standard Synchronization",
      desc: "一人で戦っていると、いつの間にか下がってしまう「当たり前」の基準。選ばれた5名の熱量に触れ続けることで、あなたの日常の質、思考の深さ、行動スピードが強制的に引き上げられます。"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-6 relative overflow-hidden">
      {/* Abstract Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/4 -z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.6em] uppercase">The Future You Acquire</span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-sans font-bold text-brand-black tracking-tight leading-tight [word-break:keep-all]">
            あなたが手にする、一生モノの資産。
          </h2>
          <div className="w-10 h-px bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
          {values.map((val, i) => (
            <div key={i} className="group space-y-6 p-4 transition-all duration-500">
              <div className="relative">
                <span className="text-6xl md:text-7xl font-display font-bold text-neutral-100 group-hover:text-brand-gold/10 transition-colors duration-700">
                  {val.number}
                </span>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[9px] font-mono text-brand-gold tracking-[0.3em] uppercase font-bold">
                    {val.subtitle}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-sans font-bold text-brand-black group-hover:text-brand-gold transition-colors [word-break:keep-all]">
                  {val.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-[1.8] font-sans font-light text-justify">
                  {val.desc}
                </p>
              </div>

              <div className="pt-2 overflow-hidden">
                <div className="h-px bg-neutral-100 w-full group-hover:bg-brand-gold transition-all duration-700 transform origin-left scale-x-0 group-hover:scale-x-100" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 md:p-12 bg-brand-black rounded-[2rem] md:rounded-[2.5rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.08),transparent_70%)]" />
          <div className="relative z-10 space-y-4">
            <p className="text-brand-goldLight font-display text-lg md:text-xl italic tracking-wide">
              "Value is not what you sell, but who you become."
            </p>
            <p className="text-neutral-400 text-[10px] md:text-xs font-sans tracking-widest leading-relaxed">
              半年後、あなたはもう今の悩みの中にいません。<br className="md:hidden" />
              自らの価値を、自らの言葉で、自らの価格で届ける。その確信を手に入れてください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
