
import React, { useEffect, useState } from 'react';

interface AiReviewSessionProps {
  onBack: () => void;
  onOpenEntry?: () => void;
}

const AiReviewSession: React.FC<AiReviewSessionProps> = ({ onBack, onOpenEntry }) => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bubbles = [
    { 
      id: 1, 
      text: '分からないことはどんどん皆んなに聞いていこう！', 
      gradient: 'from-blue-50/80 to-indigo-100/80',
      icon: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767550438/profile2_tpej5o.jpg'
    },
    { 
      id: 2, 
      text: 'プロセスの共有が嬉しい♪', 
      gradient: 'from-rose-50/80 to-pink-100/80',
      icon: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.27.10_rhbxup.png'
    },
    { 
      id: 3, 
      text: '言語化できるだけで幅が広くなった！', 
      gradient: 'from-emerald-50/80 to-teal-100/80',
      icon: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518385/rectangle_large_type_2_c53794ac4a74726b7f5847245dd337b3_xjxntr.webp'
    },
    { 
      id: 4, 
      text: '苦手より得意を伸ばせるようになる', 
      gradient: 'from-orange-50/80 to-amber-100/80',
      icon: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.33.57_qnxh0m.png'
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-48 px-6 animate-fade-in relative selection:bg-brand-gold selection:text-white overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[-5%] right-[-5%] w-[70%] h-[70%] bg-brand-gold/5 rounded-full blur-[160px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${scrolled * 0.08}px, ${scrolled * 0.05}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-brand-black/5 rounded-full blur-[160px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${scrolled * -0.04}px, ${scrolled * -0.06}px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-[10px] md:text-[11px] font-bold text-neutral-400 hover:text-brand-gold transition-all tracking-[0.4em] uppercase mb-16 md:mb-24"
        >
          <span className="transition-transform group-hover:-translate-x-2">←</span> 
          Back to Home
        </button>

        {/* Hero Section */}
        <section className="text-center mb-40 md:mb-60 space-y-12 md:space-y-16">
          <div className="space-y-4 md:space-y-6">
            <span className="text-brand-gold font-mono text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.8em] uppercase block animate-reveal-up whitespace-nowrap">
              AI × 事業改善 × 言語化ブランディング
            </span>
            <div className="overflow-hidden">
              <h1 className="text-[clamp(2rem,6vw,5rem)] font-display font-bold text-brand-black tracking-tighter leading-[1.1] md:leading-[0.9] uppercase animate-reveal-up [word-break:keep-all]">
                公開<span className="text-brand-gold relative inline-block">添削会<span className="absolute bottom-2 md:bottom-3 left-0 w-full h-2 md:h-3 bg-brand-gold/10 -z-10 animate-grow-x"></span></span>.
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <div className="h-16 md:h-24 w-px bg-gradient-to-b from-brand-gold to-transparent" />
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              <h2 className="text-xl md:text-4xl lg:text-5xl font-sans font-bold text-brand-black tracking-[0.1em] md:tracking-[0.15em] leading-[1.3] md:leading-[1.2] [word-break:keep-all]">
                改善改善改善、<br className="md:hidden" />価値を磨き上げる。
              </h2>
              <p className="text-base md:text-2xl text-neutral-400 font-sans tracking-[0.05em] md:tracking-[0.1em] leading-[1.6] md:leading-[1.2] font-light italic">
                唯一無二になるために、<br className="md:hidden" />圧倒的な試行錯誤と答え合わせを。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Reason */}
        <section className="relative mb-60 md:mb-80 group">
          <div className="absolute -inset-x-6 md:-inset-x-8 -inset-y-12 md:-inset-y-16 bg-neutral-50/40 rounded-[3rem] md:rounded-[5rem] -z-10 transition-all duration-1000 group-hover:bg-neutral-50/60" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start p-2 md:p-8">
            <div className="lg:col-span-7 space-y-10 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="w-8 md:w-12 h-[2px] bg-brand-gold" />
                  <span className="text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase">The Reason</span>
                </div>
                <h2 className="text-xl md:text-4xl font-sans font-bold text-brand-black tracking-tight leading-[1.3] md:leading-[1.2] [word-break:keep-all]">
                  売れるクリエイティブを、<br />
                  <span className="text-brand-gold">無駄にしないために。</span>
                </h2>
              </div>
              
              <div className="max-w-2xl">
                <p className="text-base md:text-xl text-brand-black/90 leading-[1.6] md:leading-[1.7] font-light text-justify hyphens-auto">
                  商品の魅力を伝える為には、<br />
                  <span className="font-bold text-brand-black relative inline-block">
                    ２つの要素が必須です。
                    <span className="absolute bottom-1 left-0 w-full h-1.5 bg-brand-gold/20 -z-10" />
                  </span>
                  <br /><br />
                  一つ目はビジュアル、二つ目は言語化です。高いセンスが必要だというイメージがありますが、トレーニングで上達が可能です。実践〜評価〜復習を、メンバーと一緒に磨いていきます。
                </p>
              </div>

              {/* Integrated Member Voices */}
              <div className="pt-12 md:pt-16 border-t border-neutral-200">
                <h4 className="text-brand-gold font-mono text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase mb-6 md:mb-8">Community Feedback</h4>
                <div className="grid grid-cols-1 gap-8 md:gap-10 relative">
                  {bubbles.map((bubble, idx) => (
                    <div 
                      key={bubble.id} 
                      className={`flex items-center gap-4 md:gap-6 group/bubble transition-all duration-700 ${idx % 2 === 1 ? 'md:pl-12' : ''}`}
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-xl transition-all duration-700 group-hover/bubble:scale-110 group-hover/bubble:border-brand-gold">
                        <img src={bubble.icon} alt="Member" className="w-full h-full object-cover grayscale opacity-80 group-hover/bubble:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className={`relative px-6 md:px-8 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-r ${bubble.gradient} shadow-sm border border-black/5 backdrop-blur-sm transition-all duration-500 group-hover/bubble:shadow-lg group-hover/bubble:-translate-y-1`}>
                        <p className="text-[13px] md:text-[15px] font-bold text-brand-black leading-relaxed tracking-tight">
                          {bubble.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
               <div className="relative aspect-[4/3] lg:aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none">
                  <div className="absolute inset-0 bg-brand-black rounded-[2rem] md:rounded-[3rem] rotate-[2deg] lg:rotate-[3deg] transition-all duration-1000 group-hover:rotate-[4deg] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767546753/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3_1_vnhiu1.png" 
                      alt="Strategic Design"
                      className="w-full h-full object-cover opacity-80 transition-all duration-[2s] group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: What is Public Review? */}
        <section className="mb-60 md:mb-80 relative">
          <div className="text-center space-y-6 md:space-y-8 mb-16 md:mb-24">
            <h2 className="text-3xl md:text-[clamp(1.5rem,5vw,5rem)] font-display font-bold text-brand-black tracking-tight uppercase">What is Public Review?</h2>
            <div className="w-16 md:w-20 h-px bg-brand-gold mx-auto" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 max-w-5xl mx-auto">
            <div className="flex-shrink-0 relative group">
              <div className="absolute -inset-4 bg-brand-gold/15 rounded-full blur-2xl group-hover:bg-brand-gold/25 transition-all duration-1000" />
              <div className="relative w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-4 md:border-6 border-white shadow-2xl transition-all duration-700 group-hover:scale-105">
                <img 
                  src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815412/profile_hjsv2t.jpg" 
                  alt="Masaomi Sakata" 
                  className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 md:mt-6 text-center space-y-1">
                <span className="block text-lg md:text-xl font-bold text-brand-black tracking-widest font-sans">阪田 真臣</span>
                <span className="block text-[9px] md:text-[10px] text-brand-gold font-mono uppercase tracking-[0.3em] font-bold">Representative</span>
              </div>
            </div>

            <div className="relative flex-1 animate-reveal-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-l-[6px] border-b-[6px] border-brand-black rotate-[45deg] z-10 hidden md:block" />
              
              <div className="relative bg-white border-4 md:border-[6px] border-brand-black p-8 md:p-14 shadow-[12px_12px_0px_rgba(197,160,89,0.2)]">
                <div className="space-y-6 md:space-y-8">
                  <p className="text-lg md:text-2xl font-bold text-brand-black leading-snug font-sans tracking-tight border-l-4 md:border-l-6 border-brand-gold pl-4 md:pl-6 text-justify">
                    ここ1年でAIを毎日触ってきましたが、使い方でパフォーマンスが劇的に変わるというのが面白いところです。それと実際の経験値をもとにAIに課題を与えるとリアルな改善策が出たりする有益さには驚きます。添削会では質問の投げ方を身につけていただけると思います。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Flow */}
        <section className="mb-60 md:mb-80 bg-neutral-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(197,160,89,0.1),transparent_60%)]" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {[
              { id: '01', label: '資料提出', desc: '自社EC、Webページ、LP、チラシ、提案資料などを事務局へ。' },
              { id: '02', label: 'グループ添削', desc: 'オンライン上で公開実施。AIの分析結果をもとに全員で検証。' },
              { id: '03', label: 'フィードバック', desc: '主観では気づけない改善点を抽出し、次への具体策を言語化。' },
              { id: '04', label: '知の横展開', desc: '他人の課題を自分事へ。一人の改善が全員のノウハウとして蓄積。' }
            ].map((step, i) => (
              <div key={i} className="group/step relative pt-10 md:pt-14 pb-4 border-t border-white/10 hover:border-brand-gold transition-all duration-700">
                <span className="absolute top-3 left-0 text-5xl md:text-6xl font-display font-bold text-brand-gold/10 group-hover/step:text-brand-gold/30 transition-all duration-1000 leading-none">{step.id}</span>
                <h4 className="text-lg md:text-xl font-sans font-bold text-white mb-2 md:mb-4 tracking-widest relative z-10 group-hover/step:text-brand-gold transition-colors">{step.label}</h4>
                <p className="text-[13px] text-neutral-400 leading-relaxed font-light relative z-10 group-hover/step:text-neutral-200 transition-colors text-justify">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Target */}
        <section className="mb-60 md:mb-80">
           <div className="bg-brand-black text-white p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[180px] group-hover:bg-brand-gold/10 transition-all duration-[3000ms]" />
              
              <div className="relative z-10 space-y-12 md:space-y-20">
                <div className="space-y-6 md:space-y-8">
                  <div className="inline-flex items-center gap-3 md:gap-4">
                    <span className="w-10 md:w-16 h-[2px] bg-brand-gold" />
                    <span className="text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase">Shortest Path to Mastery</span>
                  </div>
                  <h2 className="text-2xl md:text-5xl font-sans font-bold tracking-tight leading-[1.2] md:leading-[1.1] [word-break:keep-all]">
                    セミナー依存は、<br /><span className="text-brand-gold">もう終わりにしましょう。</span>
                  </h2>
                  <p className="text-base md:text-2xl text-neutral-300 font-light leading-relaxed max-w-4xl">
                    HMCは「実践」と「振り返り」で、<br />最短距離の成長を目指します。
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 pt-10 md:pt-16 border-t border-white/10">
                   <div className="space-y-6 md:space-y-8">
                      <h4 className="text-brand-gold font-bold text-lg md:text-xl tracking-[0.3em] uppercase flex items-center gap-3 md:gap-4">
                        <span className="w-8 md:w-10 h-[2px] bg-brand-gold" />
                        こんな方へ
                      </h4>
                      <ul className="space-y-4 md:space-y-5 text-sm md:text-lg text-neutral-400 font-light">
                        {[
                          "自社WebやLPからの反応が低い",
                          "デザインや分析が苦手",
                          "言語化が苦手",
                          "文章作成が苦手",
                          "効果的な販促物が欲しい",
                          "AIツールを学びたい"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 md:gap-4 group/list hover:text-white transition-all transform hover:translate-x-1 md:hover:translate-x-2">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-gold/40 group-hover/list:bg-brand-gold transition-all" />
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                   <div className="space-y-6 md:space-y-8">
                      <h4 className="text-brand-gold font-bold text-lg md:text-xl tracking-[0.3em] uppercase flex items-center gap-3 md:gap-4">
                        <span className="w-8 md:w-10 h-[2px] bg-brand-gold" />
                        得られるもの
                      </h4>
                      <ul className="space-y-4 md:space-y-5 text-sm md:text-lg text-neutral-400 font-light">
                        {[
                          "メンバーの成功/失敗事例",
                          "課題を克服する「改善力」",
                          "価値を正しく伝える「言語化力」",
                          "クリエイティブを模倣する感性"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 md:gap-4 group/list hover:text-white transition-all transform hover:translate-x-1 md:hover:translate-x-2">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-gold/40 group-hover/list:bg-brand-gold transition-all" />
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <div className="mt-40 md:mt-80 text-center space-y-16 md:space-y-24">
           <div className="space-y-6 md:space-y-8">
             <h2 className="text-4xl md:text-[clamp(2rem,5vw,5rem)] font-display font-bold text-brand-black tracking-tighter leading-none uppercase">Ready to Refine?</h2>
             <p className="text-[10px] md:text-xs text-neutral-400 font-sans tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold">
               Refine your intelligence. Refine your value.
             </p>
           </div>
           
           <div className="flex flex-col items-center gap-12 md:gap-16 pt-4 md:pt-8">
             <div className="space-y-8 md:space-y-12 w-full max-w-2xl">
               <div className="space-y-6 md:space-y-8 flex flex-col items-center">
                  <h3 className="text-2xl md:text-4xl font-sans font-bold text-brand-black tracking-tight [word-break:keep-all]">
                    次は、あなたの番です。
                  </h3>
                  
                  <div className="pt-6 md:pt-8 flex flex-col items-center gap-4">
                    <p className="text-[10px] md:text-[11px] text-brand-gold font-bold tracking-widest uppercase">募集締切：2月5日(水) 23:59まで</p>
                    <button 
                      onClick={onOpenEntry}
                      className="group relative w-full md:w-auto px-10 md:px-16 py-6 md:py-7 bg-brand-black text-white text-[12px] md:text-[13px] font-bold tracking-[0.6em] md:tracking-[0.8em] uppercase overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:shadow-brand-gold/40 hover:-translate-y-1"
                    >
                      <span className="relative z-10">参加する</span>
                      <div className="absolute inset-0 bg-brand-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
                    </button>
                  </div>
               </div>
               
               <div className="pt-8 md:pt-12">
                  <button 
                    onClick={onBack}
                    className="text-[10px] md:text-[11px] font-bold text-neutral-400 hover:text-brand-black border-b border-neutral-200 transition-all pb-1 tracking-[0.4em] uppercase"
                  >
                    トップページへ戻る
                  </button>
               </div>
             </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes reveal-up {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal-up {
          animation: reveal-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes grow-x {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-grow-x {
          animation: grow-x 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .text-justify {
          text-align: justify;
          text-justify: inter-character;
        }
      `}</style>
    </div>
  );
};

export default AiReviewSession;
