
import React, { useEffect } from 'react';
import PortfolioGallery from './PortfolioGallery';

interface SelfProduceProps {
  onBack: () => void;
  onOpenModal: () => void;
  onNavigateToStory: () => void;
}

const SelfProduce: React.FC<SelfProduceProps> = ({ onBack, onOpenModal, onNavigateToStory }) => {
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
            「何を買うか」から「誰から買うか」へ
          </h2>
          <p className="text-[14px] md:text-[15px] text-neutral-500 leading-[1.6] font-light text-justify max-w-[650px] mx-auto font-feature-palt tracking-[-0.01em]">
            AIの登場によって良くも悪くも、差別化の均衡を破壊されました。文章が苦手でも優れた言葉を紡ぎ、デザイン経験がなくとも美しいビジュアルを生成できる現在。「表現の質」だけで差別化を図るのは、もはや博打に近いと言わざるを得ない、、<br/><br/>
            <span className="bg-[#FFF450] text-black px-1 font-bold">最後に残る差別化できる唯一の価値は「在り方」</span>です。なぜ、その仕事を選ぶのか。なぜ、それを届けるのか。なぜ、あなたでなければならないのか。<span className="bg-[#FFF450] text-black px-1 font-bold">「選ばれる理由」</span>が無ければ、これからの時代の<span className="bg-[#FFF450] text-black px-1 font-bold">「差別化」</span>で生き残ることが難しくなるかもしれません。スペックや価格の競争からいち早く抜け出して、消費者が最後に選ぶ決め手となる「理由づくり」にコミットして欲しい。<span className="bg-[#FFF450] text-black px-1 font-bold">理由があなたの単価を上げることに繋がります、必ず。</span>
          </p>
        </div>
      </section>

      {/* NEW: Director Profile Section */}
      <section className="py-20 px-6 bg-[#fafafa] border-y border-neutral-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Image */}
            <div className="w-full md:w-5/12">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl">
                 <div className="absolute inset-0 bg-[#AF9662]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                 <img 
                   src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1769273848/profile2_yfeic4.jpg" 
                   alt="Masaomi Sakata"
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute bottom-6 left-6 z-20">
                   <p className="text-white text-[10px] font-mono tracking-[0.3em] uppercase opacity-80 font-bold">Director Profile</p>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-7/12 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-px bg-[#AF9662]"></span>
                  <span className="text-[#AF9662] font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Representative</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-black tracking-tight leading-tight">
                  阪田 真臣 <span className="text-lg md:text-xl font-normal text-neutral-400 ml-3 font-display">Masaomi Sakata</span>
                </h2>
                <p className="text-xs font-bold text-brand-black/40 uppercase tracking-widest font-mono">
                  Brand Director / Producer
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-[14px] md:text-[15px] text-neutral-800 leading-[1.8] text-justify font-feature-palt tracking-tighter font-medium">
                  アパレル、広告代理店、楽天グループを経て独立。「良いものを高く売る」を信条に、<span className="bg-[#FFF450] text-black px-1 font-bold">相場の8倍</span>の価格帯の甘酒『AMAZAKE』をプロデュースし、<span className="bg-[#FFF450] text-black px-1 font-bold">広告費ゼロで6ヶ月で1,500万円の売上</span>を達成。アイスクリーム業界初の砂糖96％削減した無添加アイスクリームを開発、 国内最大級のピッチイベントICCサミットにてフードアワード<span className="bg-[#FFF450] text-black px-1 font-bold">3部門入賞</span>など、実績に裏打ちされた<span className="bg-[#FFF450] text-black px-1 font-bold">「言語化セルフプロデュース」</span>で、起業家やメーカーのアドバイザーもおこなっています、見栄えだけのデザインだけでなく、ヒト・モノの本質的な価値を掘り起こして選ばれる<span className="bg-[#FFF450] text-black px-1 font-bold">「売れる理由」</span>を設計することが得意。
                </p>

                <div className="pt-2">
                   <button 
                     onClick={onNavigateToStory}
                     className="group relative inline-flex items-center gap-3 px-8 py-3 bg-brand-black text-white text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden transition-all hover:shadow-xl"
                   >
                     <span className="relative z-10">View Full Story</span>
                     <div className="absolute inset-0 bg-[#AF9662] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                     <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                   </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-200">
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-1">
                       <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">Career</p>
                       <p className="text-xs font-sans font-bold text-brand-black">Rakuten Group Award</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">Achievement</p>
                       <p className="text-xs font-sans font-bold text-brand-black">ICC Summit 3部門入賞</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ Team Section */}
      <section className="py-12 bg-white px-6">
        <div className="max-w-[800px] mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-display font-bold text-brand-black tracking-widest uppercase">one scene</h3>
            <div className="w-8 h-px bg-[#AF9662] mx-auto" />
            <p className="text-[10px] text-neutral-400 font-sans tracking-widest pt-2">
              プロジェクトごとに編成される、<br className="md:hidden" />スペシャリストチーム
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: 'Visual', name: 'Imarun' },
              { role: 'Writer', name: 'Miyabi' },
              { role: 'Design', name: 'Kouji' }
            ].map((member) => (
              <div key={member.name} className="space-y-1 p-4 border border-neutral-100 rounded-lg">
                <span className="text-[#AF9662] font-mono text-[8px] font-bold tracking-widest uppercase">{member.role}</span>
                <p className="text-sm font-bold text-brand-black">{member.name}</p>
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
