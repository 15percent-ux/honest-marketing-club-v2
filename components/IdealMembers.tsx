
import React from 'react';

const IdealMembers: React.FC = () => {
  const qualities = [
    "「安売り」や「煽り」のマーケティングに違和感がある",
    "起業したい気持ちがあるので背中を押されたい",
    "自分のサービスの『本当の価値』がまだ言語化できていない",
    "スキルの安売りから脱却し、適正な高単価で勝負したい",
    "孤独な挑戦ではなく、高い視座を持つ『戦友』が欲しい",
    "小手先のテクニックではなく、10年続くブランドを築きたい",
    "商品に自信がある、でも伝えれていない"
  ];

  const produceResults = [
    "料理家", "アパレル", "アクセサリー作家", "飲食店",
    "カウンセラー", "セラピスト", "エステティシャン", "ネイリスト",
    "美容師", "フォトグラファー", "講師業", "D2Cブランド"
  ];

  return (
    <section id="ideal-members" className="py-20 md:py-32 bg-[#0a0a0a] px-6 relative overflow-hidden">
      {/* Decorative Text in background */}
      <div className="absolute top-0 left-10 text-[20vw] font-display font-bold text-white/[0.02] select-none pointer-events-none">
        CRITERIA
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Entry Conditions */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold"></span>
                <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Entry Criteria</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight">
                参加条件
              </h2>
            </div>

            {/* Essential Revenue Condition Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold/50 to-brand-goldLight/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative p-6 md:p-8 bg-neutral-900/80 border border-white/10 rounded-2xl space-y-4">
                <div className="flex flex-col gap-1">
                  <p className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                    年商 <span className="text-brand-gold text-4xl md:text-5xl lining-nums">1,000</span>万円以下
                  </p>
                  <p className="text-[11px] text-neutral-500 font-sans tracking-wider">
                    ※起業予定・準備中・会社員の方も含みます。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-sans font-bold text-white/90 tracking-widest border-l-2 border-brand-gold pl-4 uppercase">
                参加してほしい方
              </h3>
              <ul className="space-y-3">
                {qualities.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="text-brand-gold font-mono text-[10px] mt-1 transition-transform group-hover:translate-x-1">→</span>
                    <p className="text-neutral-400 text-xs md:text-sm lg:text-base font-sans font-light leading-relaxed group-hover:text-white transition-colors">
                      {q}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Industry Focus (Compact 2-Column Grid) */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-white p-6 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-brand-black leading-tight">
                  特に力を発揮できる領域。
                </h3>
                <p className="text-[11px] md:text-xs text-neutral-500 font-sans leading-relaxed">
                  これまでの実績から以下の職種の方には、より具体的で即効性のある提案が可能だと思います。
                </p>
              </div>

              {/* Occupation Grid: 2 columns on all devices */}
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-0.5 border-t border-neutral-50 pt-4">
                {produceResults.map((result, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 md:py-2 border-b border-neutral-50 group cursor-default">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold transition-all shrink-0" />
                    <span className="text-[11px] md:text-sm lg:text-base font-sans font-bold text-brand-black group-hover:text-brand-gold transition-colors truncate">
                      {result}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-[10px] md:text-[11px] text-neutral-400 leading-relaxed font-sans font-light bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  上記に当てはまらない場合でも、「一貫した誠実さ」と「商品へのこだわり」をお持ちであれば歓迎いたします。
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IdealMembers;
