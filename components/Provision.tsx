
import React from 'react';
import PortfolioGallery from './PortfolioGallery';

const Provision: React.FC = () => {
  const provisions = [
    {
      category: "Environment",
      title: "チャットで壁打ち",
      desc: "いつでも壁打ち可能、プライベートな相談から事業計画やセールスライティングの添削など、不安を取り除いて進んでいきましょう。"
    },
    {
      category: "Core Training",
      title: "6ヶ月継続トレーニング",
      desc: "マーケティング脳とセルフブランディング脳に変換していく6ヶ月です、ブレない自分軸を作り上げていく期間をメンバーと共に過ごしていきましょう。",
      featured: true
    },
    {
      category: "Identity",
      title: "自分ストーリーの設計",
      desc: "自分の強みと得意分野を見つけてプロフィールを設計、セルフブランディングに使えるストーリーを設計していきます。"
    },
    {
      category: "Sales Skill",
      title: "顧客接客術",
      desc: "説得力を生み出すセールストークの作り方、コミュニケーションの添削をおこない売る力を上げていきましょう。"
    },
    {
      category: "Review",
      title: "グループミーティング",
      desc: "月2回、オンランでメンバー合同公開添削会をおこないます、主にはウェブサイトや営業資料の添削、SNS、ライティングの添削です。"
    },
    {
      category: "Off-site",
      title: "１泊2日の強化合宿",
      desc: "3ヶ月に一度、メンバー合宿をおこないます、ゲストをお招きし視座を高める強化合宿です。※開催地はメンバー数により検討"
    }
  ];

  return (
    <section id="provision" className="bg-[#fafafa] border-y border-neutral-100 relative overflow-hidden">
      {/* Content Section */}
      <div className="py-16 md:py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">What is provided</span>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-sans font-bold text-brand-black tracking-tight leading-tight [word-break:keep-all]">
            <span className="relative inline-block">
              <span className="relative z-10">６つの成長コンテンツ</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200/40 -z-0" />
            </span>
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24">
          {provisions.map((item, i) => (
            <div 
              key={i} 
              className={`group relative p-8 md:p-10 space-y-4 transition-all duration-500 overflow-hidden bg-white border
                ${item.featured 
                  ? 'border-brand-gold shadow-[0_20px_40px_-10px_rgba(197,160,89,0.1)] z-10 hover:-translate-y-1' 
                  : 'border-neutral-200 hover:border-brand-gold/30 hover:shadow-lg hover:-translate-y-0.5'
                }`}
            >
              {item.featured && (
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#cfb376] group-hover:h-[4px] transition-all duration-500" />
              )}

              <div className="space-y-3 relative z-10">
                <span className={`text-[8px] font-mono tracking-[0.3em] uppercase font-bold px-2 py-0.5 border rounded-full inline-block transition-colors
                  ${item.featured ? 'text-brand-gold border-brand-gold' : 'text-neutral-400 border-neutral-200'}`}>
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-sans font-bold leading-tight text-brand-black [word-break:keep-all]">
                  <span className="relative inline-block">
                    <span className="relative z-10">{item.title}</span>
                    <span className="absolute bottom-0 left-0 w-full h-1.5 bg-yellow-200/30 -z-0 transition-all duration-500 group-hover:h-2" />
                  </span>
                </h3>
              </div>
              <p className={`text-sm leading-[1.6] font-light font-sans text-justify relative z-10
                ${item.featured ? 'text-neutral-700 font-medium' : 'text-neutral-500'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Gallery Integration (Static but visual trigger) */}
      <div className="bg-white border-t border-neutral-100">
        <PortfolioGallery />
      </div>

      <style>{`
        .font-feature-palt {
          font-feature-settings: "palt";
        }
      `}</style>
    </section>
  );
};

export default Provision;
