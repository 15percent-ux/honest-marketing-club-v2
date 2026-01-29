
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
    { 
      id: '01', 
      title: '3ヶ月間の壁打ち', 
      desc: 'なぜあなたがそれをやっているのか。誰のために？といった本質的な問いを繰り返し、あなたの真の価値を抽出します。' 
    },
    { 
      id: '02', 
      title: '実績づくり', 
      desc: '抽出された価値を社会的な信頼へと変換。具体的な実績として形にし、選ばれる根拠を構築します。' 
    },
    { 
      id: '03', 
      title: 'リッチプロフィールの完結', 
      desc: 'プロデュースの最終形としてリッチプロフィールページをお渡しします。' 
    }
  ];

  const breakdownItems = [
    "打合せを数回、ヒアリングを実施",
    "カメラマンによる撮影",
    "ディレクターによるブランドプロフィールの設計構築",
    "ライターによるコピーライティング",
    "PC版/Mobile版のレスポンシブ仕様のウェブ構築",
    "納品まで約3ヶ月"
  ];

  return (
    <div id="self-produce" className="min-h-screen bg-white animate-fade-in font-sans selection:bg-brand-gold selection:text-white">
      {/* ① Hero Section */}
      <section className="relative h-[65vh] md:h-[75vh] flex flex-col items-center justify-center px-6 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(175,150,98,0.1),transparent_70%)]" />
        <div className="relative z-10 text-center space-y-6 max-w-[800px]">
          <span className="text-[#AF9662] font-mono text-[9px] md:text-[10px] font-bold tracking-[0.8em] uppercase block animate-reveal-up">
            HMC MEMBERS ONLY
          </span>
          <h1 className="text-[clamp(28px,8vw,60px)] font-sans font-bold text-white tracking-tight leading-tight [word-break:normal] break-words md:[word-break:keep-all] animate-reveal-up delay-200">
            セルフプロデュース
          </h1>
          <p className="text-base md:text-xl text-white/50 font-light tracking-[0.2em] animate-reveal-up delay-500">
            選ばれる理由を、デザインする
          </p>
        </div>
      </section>

      {/* ② Philosophy Section */}
      <section className="py-16 md:py-20 px-6 max-w-[800px] mx-auto text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-px bg-[#AF9662]" />
            <span className="text-[#AF9662] font-mono text-[9px] font-bold tracking-[0.4em] uppercase">Philosophy</span>
            <span className="w-6 h-px bg-[#AF9662]" />
          </div>
          <h2 className="text-[clamp(20px,5vw,2rem)] md:text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-brand-black leading-tight [word-break:normal] break-words md:[word-break:keep-all] font-feature-palt">
            サービスの価値は代表者のプロフィールに比例する
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.6] font-light text-justify max-w-[650px] mx-auto font-feature-palt tracking-[-0.01em]">
            「なぜあなたがそれをやっているのか？」「誰のために？」といった価値の根拠を徹底的に深掘りし、言語化します。単なる経歴の羅列ではない、あなたの使命と想いが詰まったストーリーを、市場で選ばれるブランドへと昇華させます。
          </p>
        </div>
      </section>

      {/* ③ Team Section */}
      <section className="py-12 bg-neutral-50 px-6">
        <div className="max-w-[800px] mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-display font-bold text-brand-black tracking-widest uppercase">one scene</h3>
            <div className="w-8 h-px bg-[#AF9662] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: 'Director', name: 'Masaomi Sakata' },
              { role: 'Visual', name: 'Imarun' },
              { role: 'Writer', name: 'Miyabi' }
            ].map((member) => (
              <div key={member.name} className="space-y-1">
                <span className="text-[#AF9662] font-mono text-[8px] font-bold tracking-widest uppercase">{member.role}</span>
                <p className="text-base font-bold text-brand-black">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ Features Section */}
      <section className="py-16 md:py-20 px-6 max-w-[800px] mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="group flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-neutral-100 pb-10 transition-all">
              <span className="text-4xl md:text-5xl font-display font-bold text-neutral-100 group-hover:text-[#AF9662]/30 transition-colors leading-none">
                {feature.id}
              </span>
              <div className="space-y-3">
                <h4 className="text-lg md:text-xl font-bold text-brand-black font-feature-palt [word-break:keep-all] tracking-tight">{feature.title}</h4>
                <p className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.6] font-light text-justify max-w-2xl font-feature-palt tracking-[-0.01em]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⑤ Portfolio Gallery Section */}
      <section id="portfolio" className="bg-[#0a0a0a] text-white">
        <PortfolioGallery />
      </section>

      {/* ⑥ Pricing Section */}
      <section className="py-20 md:py-32 px-6 max-w-[900px] mx-auto">
        <div className="space-y-6 md:space-y-10">
          <div className="text-center space-y-4 mb-12">
             <div className="inline-flex items-center gap-4">
                <span className="w-8 h-px bg-brand-black/30"></span>
                <span className="text-brand-black font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Pricing Plan</span>
                <span className="w-8 h-px bg-brand-black/30"></span>
             </div>
             <h2 className="text-2xl md:text-3xl font-sans font-bold text-brand-black tracking-tight">リッチプロフィール制作費</h2>
          </div>

          <div className="bg-white rounded-none md:rounded-lg border border-neutral-200 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]">
             {/* Header */}
             <div className="bg-brand-black text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <span className="text-[#AF9662] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Total Branding Package</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-widest mt-2">リッチプロフィール制作</h3>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-4 text-neutral-400">
                      <span className="text-[10px] tracking-widest uppercase line-through decoration-neutral-500/50">一般価格</span>
                      <span className="text-lg font-bold lining-nums line-through decoration-neutral-500/50">¥330,000</span>
                   </div>
                   <div className="flex items-baseline gap-2 text-[#AF9662]">
                      <span className="text-[10px] tracking-widest uppercase font-bold text-white">メンバー限定価格</span>
                      <span className="text-3xl md:text-4xl font-bold lining-nums tracking-tighter">¥110,000</span>
                      <span className="text-xs text-white/60">(税込)</span>
                   </div>
                </div>
             </div>

             {/* Content */}
             <div className="p-6 md:p-10 bg-white">
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-brand-black border-l-2 border-[#AF9662] pl-3 mb-6 tracking-widest uppercase">Included Services / 内訳</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {breakdownItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                        <span className="text-[#AF9662] mt-1.5 w-1.5 h-1.5 bg-[#AF9662] rounded-full flex-shrink-0" />
                        <span className="font-feature-palt">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-brand-black">Webページ運用管理費</p>
                      <p className="text-xs text-neutral-500 font-light">サーバー保守・ドメイン管理・システム更新</p>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                      <p className="text-xl font-bold text-brand-black lining-nums">¥3,300 <span className="text-xs font-normal text-neutral-500">/ 月(税込)</span></p>
                      <p className="text-[10px] text-[#AF9662] font-bold tracking-wide">※完成後の修正・変更なども可能です</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ⑦ CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-[#0a0a0a] text-center">
        <div className="max-w-[800px] mx-auto space-y-12">
          <h2 className="text-[clamp(20px,5vw,2.5rem)] md:text-3xl font-bold text-white tracking-tight leading-tight [word-break:normal] break-words md:[word-break:keep-all] font-feature-palt">
            あなたの本質を、ブランドへと昇華させる。
          </h2>
          <div className="flex flex-col items-center gap-8">
            <a 
              href="https://line.me/ti/g2/N_2zQEMoVCr4TZpwtXren7CjLZFY8w-EzUUzLA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-6 bg-white text-brand-black text-[11px] font-bold tracking-[0.5em] uppercase overflow-hidden transition-all shadow-2xl hover:shadow-[#AF9662]/20 hover:-translate-y-1"
            >
              <span className="relative z-10">Clubへ参加する</span>
              <div className="absolute inset-0 bg-[#AF9662] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </a>
            <button 
              onClick={onBack}
              className="text-neutral-500 hover:text-white transition-colors text-[9px] font-bold tracking-[0.4em] uppercase border-b border-neutral-800 pb-1"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .font-feature-palt { font-feature-settings: "palt"; }
        .text-justify { text-align: justify; }
        .lining-nums { font-variant-numeric: lining-nums; }
        @keyframes reveal-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal-up { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default SelfProduce;
