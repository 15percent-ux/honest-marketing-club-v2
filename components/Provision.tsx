
import React from 'react';

const Provision: React.FC = () => {
  const provisions = [
    {
      category: "Environment",
      title: "チャットで壁打ち",
      desc: "いつでも壁打ち可能、プライベートな相談から事業計画やセールスライティングの添削など、推進力を強くします。"
    },
    {
      category: "Core Training",
      title: "6ヶ月継続トレーニング",
      desc: "マーケティング脳とセルフブランディング脳に変換していく6ヶ月です、ブレない自分軸を作り上げていく期間をメンバーと共に過ごしていきます。",
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
    <section id="provision" className="py-32 bg-[#fafafa] px-6 border-y border-neutral-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(197,160,89,0.03),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-6">
          <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">What is provided</span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-brand-black tracking-tight leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">６つの成長コンテンツ</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-yellow-200/60 -z-0" />
            </span>
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provisions.map((item, i) => (
            <div 
              key={i} 
              className={`group relative p-10 md:p-12 space-y-6 transition-all duration-500 overflow-hidden bg-white border
                ${item.featured 
                  ? 'border-brand-gold shadow-[0_30px_60px_-15px_rgba(197,160,89,0.15)] z-10 hover:-translate-y-2' 
                  : 'border-neutral-200 hover:border-brand-gold/30 hover:shadow-xl hover:-translate-y-1'
                }`}
            >
              {/* Featured Top Line Accent */}
              {item.featured && (
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#cfb376] group-hover:h-[6px] transition-all duration-500" />
              )}

              <div className="space-y-4 relative z-10">
                <span className={`text-[9px] font-mono tracking-[0.3em] uppercase font-bold px-3 py-1 border rounded-full inline-block transition-colors
                  ${item.featured ? 'text-brand-gold border-brand-gold' : 'text-neutral-400 border-neutral-200'}`}>
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-sans font-bold leading-tight text-brand-black">
                  <span className="relative inline-block">
                    <span className="relative z-10">{item.title}</span>
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-200/40 -z-0 transition-all duration-500 group-hover:h-3" />
                  </span>
                </h3>
              </div>
              <p className={`text-sm leading-[1.8] font-light font-sans text-justify relative z-10
                ${item.featured ? 'text-neutral-700 font-medium' : 'text-neutral-500'}`}>
                {item.desc}
              </p>

              {/* Bottom Decorative Element for featured */}
              {item.featured && (
                <div className="pt-4">
                  <div className="h-[1px] w-12 bg-brand-gold/40 group-hover:w-full transition-all duration-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[11px] text-neutral-400 font-sans tracking-[0.2em] uppercase font-bold">
            All elements are designed to transform your intelligence into weapons.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Provision;
