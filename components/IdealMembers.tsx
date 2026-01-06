import React from 'react';

const IdealMembers: React.FC = () => {
  const qualities = [
    "「安売り」や「煽り」のマーケティングに違和感がある",
    "自分のサービスの『本当の価値』がまだ言語化できていない",
    "スキルの安売りから脱却し、適正な高単価で勝負したい",
    "孤独な挑戦ではなく、高い視座を持つ『戦友』が欲しい",
    "小手先のテクニックではなく、10年続くブランドを築きたい"
  ];

  const occupations = [
    { title: "Consultant / Coach", labels: ["コンサルタント", "コーチ", "カウンセラー"] },
    { title: "Creative / Design", labels: ["デザイナー", "フォトグラファー", "映像制作"] },
    { title: "Specialist", labels: ["講師", "士業", "セラピスト"] },
    { title: "Brand Owner", labels: ["自社商品開発者", "D2Cオーナー", "発酵起業家"] }
  ];

  return (
    <section id="ideal-members" className="py-32 md:py-48 bg-[#0a0a0a] px-6 relative overflow-hidden">
      {/* Decorative Text in background */}
      <div className="absolute top-0 left-10 text-[20vw] font-display font-bold text-white/[0.02] select-none pointer-events-none">
        TARGET
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left Column: Qualities */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold"></span>
                <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Who we seek</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight">
                私たちが、<br />共に歩みたい方。
              </h2>
            </div>
            
            <ul className="space-y-6">
              {qualities.map((q, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="text-brand-gold font-mono text-xs mt-1 transition-transform group-hover:translate-x-1">→</span>
                  <p className="text-neutral-400 text-sm md:text-base font-sans font-light leading-relaxed group-hover:text-white transition-colors">
                    {q}
                  </p>
                </li>
              ))}
            </ul>

            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-2xl">
              <p className="text-[10px] text-neutral-500 font-sans tracking-[0.2em] leading-relaxed italic">
                ※年商1,000万円以下のフェーズから、自らの知性で次なるステージを目指す方を対象としています。
              </p>
            </div>
          </div>

          {/* Right Column: Specific Occupations */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-20 rounded-[3rem] space-y-16">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-brand-black">
                  阪田が特に力を<br className="md:hidden" />発揮できる領域。
                </h3>
                <p className="text-sm text-neutral-500 font-sans leading-relaxed">
                  これまでのプロデュース実績に基づき、以下の職種の方には、より具体的で即効性のある「武器の設計」が可能です。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {occupations.map((occ, i) => (
                  <div key={i} className="space-y-4 group">
                    <h4 className="text-[10px] font-mono font-bold text-brand-gold tracking-[0.3em] uppercase border-b border-neutral-100 pb-2">
                      {occ.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {occ.labels.map(label => (
                        <span key={label} className="text-sm font-sans font-bold text-brand-black group-hover:text-brand-gold transition-colors">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">
                  上記に当てはまらない場合でも、「一貫した誠実さ」と「商品へのこだわり」をお持ちであれば、歓迎いたします。
                  まずはエントリーシートにて、あなたの想いをお聞かせください。
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