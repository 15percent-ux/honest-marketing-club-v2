
import React from 'react';
import { Project } from '../types';

const CURRICULUM: Project[] = [
  {
    id: '1',
    title: '価値の再設計',
    category: '分析',
    image: 'https://images.unsplash.com/photo-1551288049-bbb652166ab6?auto=format&fit=crop&q=80&w=1200',
    description: 'サービスの伸び代を判断し、人の魅力と価格を一致させる適正価格の方程式を構築します。'
  },
  {
    id: '2',
    title: 'ブランディングの最適化',
    category: '戦略',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    description: '「なんでそれをやってんの？」という思想と使命を言語化し、一歩抜きん出た存在へと導きます。'
  },
  {
    id: '3',
    title: '仮説と検証',
    category: 'トレーニング',
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=1200',
    description: '圧倒的な検証と答え合わせを繰り返し、価格に対する恐怖を「確信」へと変えていきます。'
  },
  {
    id: '4',
    title: 'エグゼクティブ・コミュニティ',
    category: 'ネットワーク',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    description: '5名の仲間と6ヶ月間。孤独な挑戦を卒業し、互いの知性を研磨し合う特別な社交場。'
  }
];

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-16 md:py-24 px-6 max-w-7xl mx-auto bg-brand-white">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
        <div>
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-sans font-bold leading-tight tracking-tighter text-brand-black [word-break:keep-all]">
            トレーニング・カリキュラム
          </h2>
          <p className="text-neutral-400 mt-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold">サロン・カリキュラム 2025</p>
        </div>
        <div className="text-neutral-400 font-sans text-[10px] font-bold uppercase tracking-[0.2em] border-l border-neutral-200 pl-6 h-10 flex items-center">
          5名限定
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {CURRICULUM.map((item) => (
          <div key={item.id} className="group cursor-default">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center border border-neutral-100">
                   <span className="text-brand-black text-[9px] font-mono font-bold">{item.id.padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-neutral-100 pt-8 flex justify-between items-start">
              <div className="max-w-md">
                <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-brand-gold uppercase">{item.category}</span>
                <h3 className="text-2xl font-sans font-bold mt-2 text-brand-black tracking-tight [word-break:keep-all]">{item.title}</h3>
                <p className="text-neutral-500 mt-4 text-sm font-sans font-light leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
