import React from 'react';

const Provision: React.FC = () => {
  const provisions = [
    {
      category: "Environment",
      title: "24/7 プライベートチャット",
      desc: "代表・阪田および精鋭メンバーとの24時間壁打ち環境。迷いをその場で解消し、実行速度を最大化させます。"
    },
    {
      category: "Training",
      title: "6ヶ月集中カリキュラム",
      desc: "価値の再設計から言語化、デリバリーまで。一生モノのマーケティングスキルを実践を通して習得します。"
    },
    {
      category: "Technology",
      title: "AI戦略エンジン利用権",
      desc: "HMC独自のロジックを学習させたAIによる、市場分析とコピーライティングのサポート。"
    },
    {
      category: "Community",
      title: "審査制メンバーシップ",
      desc: "近い価値観と高い志を持つ20名限定の社交場。孤独な経営から卒業し、高め合える戦友を得られます。"
    },
    {
      category: "Event",
      title: "月例グループコンサルティング",
      desc: "月1回、オンライン/オフラインでの公開添削会. 他者の課題を自分事として捉え、視座を引き上げます。"
    },
    {
      category: "Asset",
      title: "HWD ブランド設計図",
      desc: "自分だけの「必殺技」を定義した独自のブランド設計図。これがあれば、もう競合との比較に怯えることはありません。"
    }
  ];

  return (
    <section id="provision" className="py-32 bg-[#fafafa] px-6 border-y border-neutral-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(197,160,89,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-6">
          <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">What is provided</span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-brand-black tracking-tight leading-tight">
            提供するすべてが、<br className="md:hidden" />あなたの武器になる。
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200 shadow-xl">
          {provisions.map((item, i) => (
            <div 
              key={i} 
              className="group bg-white p-10 md:p-12 space-y-6 transition-all duration-700 hover:bg-neutral-50"
            >
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-brand-gold tracking-[0.3em] uppercase font-bold px-3 py-1 border border-brand-gold/20 rounded-full inline-block">
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-sans font-bold text-brand-black leading-tight group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-500 leading-[1.8] font-light font-sans text-justify">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[11px] text-neutral-400 font-sans tracking-[0.2em] uppercase font-bold">
            All elements are designed to maximize your ROI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Provision;