
import React, { useEffect } from 'react';
import PortfolioGallery from './PortfolioGallery';

interface SelfProduceProps {
  onBack: () => void;
  onOpenModal: () => void;
}

const SelfProduce: React.FC<SelfProduceProps> = ({ onBack, onOpenModal }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { id: '01', title: '3ヶ月間の壁打ち', desc: 'なぜあなたがそれをやっているのか。誰のために？といった本質的な問いを繰り返し、あなたの真の価値を抽出します。' },
    { id: '02', title: '実績づくり', desc: '抽出された価値を社会的な信頼へと変換。具体的な実績として形にし、選ばれる根拠を構築します。' },
    { id: '03', title: 'リッチプロフィールの完結', desc: 'プロデュースの最終形として、あなたのブランドストーリーをリッチプロフィールへと昇華させます。' }
  ];

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans">
      {/* ① Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center px-6 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(175,150,98,0.1),transparent_70%)]" />
        <div className="relative z-10 text-center space-y-8 max-w-[1000px]">
          <span className="text-[#AF9662] font-mono text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase block animate-reveal-up">
            HONEST MARKETING CLUB MEMBERS ONLY
          </span>
          <h1 className="text-[clamp(2.5rem,8vw,80px)] font-sans font-bold text-white tracking-tight leading-none [word-break:keep-all] animate-reveal-up delay-200">
            セルフプロデュース
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light tracking-[0.2em] animate-reveal-up delay-500">
            選ばれる理由を作り出す
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-[#AF9662]/40" />
        </div>
      </section>

      {/* ② Philosophy Section */}
      <section className="py-24 md:py-40 px-6 max-w-[1000px] mx-auto text-center">
        <div className="space-y-12">
          <div className="inline-flex items-center gap-4">
            <span className="w-8 h-px bg-[#AF9662]" />
            <span className="text-[#AF9662] font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Philosophy</span>
            <span className="w-8 h-px bg-[#AF9662]" />
          </div>
          <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-brand-black leading-tight [word-break:keep-all] font-feature-palt">
            サービスの価値と代表者のプロフィールは比例する
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.6] font-light text-justify max-w-2xl mx-auto font-feature-palt tracking-[-0.01em]">
            「なぜあなたがそれをやっているのか？」「誰のために？」といった価値の根拠を徹底的に深掘りし、言語化します。単なる経歴の羅列ではない、あなたの使命と想いが詰まったストーリーを、市場で選ばれるブランドへと昇華させます。
          </p>
        </div>
      </section>

      {/* ③ Team Section (one scene) */}
      <section className="py-24 bg-neutral-50 px-6">
        <div className="max-w-[1000px] mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-black tracking-widest uppercase">one scene</h3>
            <div className="w-12 h-px bg-[#AF9662] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { role: 'Director', name: 'Masaomi Sakata' },
              { role: 'Visual', name: 'Imarun' },
              { role: 'Writer', name: 'Miyabi' }
            ].map((member) => (
              <div key={member.name} className="space-y-3">
                <span className="text-[#AF9662] font-mono text-[10px] font-bold tracking-widest uppercase">{member.role}</span>
                <p className="text-lg font-bold text-brand-black">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ Features Section */}
      <section className="py-24 md:py-40 px-6 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 gap-16">
          {features.map((feature, i) => (
            <div key={feature.id} className="group flex flex-col md:flex-row items-start gap-8 md:gap-16 border-b border-neutral-100 pb-12 transition-all">
              <span className="text-5xl md:text-7xl font-display font-bold text-neutral-100 group-hover:text-[#AF9662]/20 transition-colors">
                {feature.id}
              </span>
              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-bold text-brand-black font-feature-palt">{feature.title}</h4>
                <p className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.6] font-light text-justify max-w-xl font-feature-palt tracking-[-0.01em]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⑤ Portfolio Gallery Section (Updated) */}
      <section id="portfolio" className="bg-[#0a0a0a] text-white">
        <PortfolioGallery />
      </section>

      {/* ⑥ Pricing Section */}
      <section className="py-24 md:py-40 px-6 max-w-[1000px] mx-auto">
        <div className="bg-neutral-50 rounded-3xl p-8 md:p-20 text-center space-y-16 border border-neutral-100">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-black uppercase tracking-widest">Price</h3>
            <div className="w-12 h-px bg-[#AF9662] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            <div className="space-y-4 py-8 md:py-0">
              <span className="text-neutral-400 font-mono text-[10px] font-bold tracking-widest uppercase">General</span>
              <p className="text-3xl md:text-4xl font-sans font-bold text-neutral-300">330,000<span className="text-sm ml-2">円（税込）</span></p>
            </div>
            <div className="space-y-4 py-8 md:py-0">
              <span className="text-[#AF9662] font-mono text-[10px] font-bold tracking-widest uppercase">HMC Member</span>
              <div className="flex flex-col items-center">
                <p className="text-5xl md:text-7xl font-sans font-bold text-[#AF9662] tracking-tighter drop-shadow-sm">110,000<span className="text-sm ml-2">円（税込）</span></p>
                <span className="text-[10px] text-[#AF9662] font-bold mt-2 tracking-widest">※特別優待価格</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ CTA Section */}
      <section className="py-24 md:py-40 px-6 bg-[#0a0a0a] text-center">
        <div className="max-w-[1000px] mx-auto space-y-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight [word-break:keep-all]">
            あなたの本質を、ブランドへと昇華させる。
          </h2>
          <div className="flex flex-col items-center gap-8">
            <a 
              href="https://line.me/ti/g2/N_2zQEMoVCr4TZpwtXren7CjLZFY8w-EzUUzLA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-6 bg-white text-brand-black text-xs font-bold tracking-[0.5em] uppercase overflow-hidden transition-all shadow-2xl hover:shadow-[#AF9662]/20 hover:-translate-y-1"
            >
              <span className="relative z-10">オネマクラブへ参加する</span>
              <div className="absolute inset-0 bg-[#AF9662] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </a>
            <button 
              onClick={onBack}
              className="text-neutral-500 hover:text-white transition-colors text-[10px] font-bold tracking-[0.4em] uppercase border-b border-neutral-800 pb-1"
            >
              Back to Top
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .font-feature-palt {
          font-feature-settings: "palt";
        }
        .animate-reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes reveal-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
        .text-justify {
          text-align: justify;
        }
      `}</style>
    </div>
  );
};

export default SelfProduce;
