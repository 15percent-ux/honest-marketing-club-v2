import React from 'react';

const TableOfContents: React.FC = () => {
  const contents = [
    { id: '01', title: '自分の伸び代は一人じゃ伸ばせない', subtitle: '視点と伸び代' },
    { id: '02', title: 'なぜ、価格を上げることを提案したのか。', subtitle: '価格の戦略' },
    { 
      id: '03', 
      title: '価格の適正とは', 
      subtitle: '価値の定義',
      important: true,
      desc: 'ここが最も重要な本質です。サービスではなく「人の魅力」に見合っているか。'
    },
    { id: '04', title: '僕の経験値と裏の顔', subtitle: '経歴と背景' },
    { 
      id: '05', 
      title: 'セルフブランディングの本質', 
      subtitle: 'アイデンティティ',
      children: [
        'プロフィールの設計と商品設計の逆算',
        'セルフブランディングの最適解'
      ]
    },
    { id: '06', title: '300人のオンラインサロン', subtitle: '歩みとコミュニティ' },
    { id: '07', title: '値段を上げられない本当の理由', subtitle: '心理的障壁' }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-white overflow-hidden relative border-t border-neutral-100">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-100 -z-0" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2 -z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-black tracking-tight uppercase">
            価値の作り方
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-widest font-bold uppercase">思考の目次</p>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6" />
        </div>

        <div className="space-y-0 border border-neutral-100 bg-white shadow-2xl shadow-neutral-100">
          {contents.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative p-6 md:p-8 transition-all duration-500 hover:bg-neutral-50 border-b border-neutral-100 last:border-0 ${item.important ? 'bg-neutral-50/30' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-4xl md:text-5xl font-display font-bold text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors duration-500">
                    {item.id}
                  </span>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-mono text-brand-gold tracking-[0.2em] font-bold uppercase">{item.subtitle}</span>
                    {item.important && (
                      <span className="px-3 py-1 bg-brand-black text-white text-[8px] font-bold tracking-widest uppercase rounded-full">最重要項目</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-sans font-bold text-brand-black leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  
                  {item.desc && (
                    <p className="text-sm text-brand-gold font-sans font-medium leading-relaxed italic border-l-2 border-brand-gold/30 pl-4">
                      {item.desc}
                    </p>
                  )}

                  {item.children && (
                    <div className="pt-2 space-y-2">
                      {item.children.map((child, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-4 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                          <span className="w-4 h-px bg-neutral-200 group-hover:bg-brand-gold transition-all" />
                          <span className="text-[13px] font-sans font-medium">{child}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-400 font-sans font-light mb-8 tracking-widest">
            本編はnoteにて全文公開しております。
          </p>
          <a 
            href="https://note.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-6 px-16 py-6 bg-brand-black text-white text-[10px] font-bold tracking-[0.5em] uppercase overflow-hidden shadow-2xl hover:shadow-brand-gold/20 transition-all"
          >
            <span className="relative z-10">全文をnoteで読む</span>
            <div className="absolute inset-0 bg-brand-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TableOfContents;