import React, { useState } from 'react';

const Letter: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const achievements = [
    { year: '2020-2025', title: 'マーケティングサロン開設', detail: 'Honest Marketing', highlight: 'メンバー成長率2,000％を達成' },
    { year: 'Founder', title: '植物乳酸菌生あまざけ開発者', detail: 'AMAZAKECAMP', highlight: '発売開始30分で200万円を完売' },
    { year: 'Achievement', title: 'クラウドファンディング', detail: '調達額記録', highlight: 'カテゴリー部門歴代2位' },
    { year: 'Award', title: 'ICC food & award', detail: '初出場入賞', highlight: '初出場3部門入賞' },
    { year: 'Media', title: 'Voicyパーソナリティ / SNSフォロワー3万', highlight: '独自のマーケティング論を発信' },
    { year: '2025', title: 'HORIEXPO 2025 登壇', highlight: '次世代のマーケターとして登壇' }
  ];

  const careerPath = [
    'アパレル業界',
    '広告代理店',
    '楽天株式会社',
    '起業（創業融資の希望満額獲得：福岡支店史上初）'
  ];

  return (
    <section id="letter" className="pt-24 pb-32 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          
          {/* Representative Profile Column */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start space-y-4 w-full md:w-auto relative group">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="relative p-1 rounded-full outline-none focus:ring-2 focus:ring-brand-gold transition-all"
            >
              <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="transparent" />
                  <text className="text-[7px] font-mono fill-brand-gold font-bold tracking-[0.2em] uppercase">
                    <textPath xlinkHref="#circlePath">CLICK TO VIEW PROFILE • CLICK TO VIEW PROFILE • </textPath>
                  </text>
                </svg>
              </div>

              <div className="absolute -inset-3 bg-brand-gold/10 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-28 h-28 md:w-36 md:h-36 bg-neutral-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden grayscale border-4 border-white shadow-2xl transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 group-hover:border-brand-gold/40">
                 <img 
                   src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815412/profile_hjsv2t.jpg" 
                   alt="代表 阪田真臣" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500">
                <span className="text-[10px] font-bold">INFO</span>
              </div>
            </button>
            
            <div className="text-center md:text-left cursor-pointer group" onClick={() => setIsProfileOpen(true)}>
              <h3 className="text-lg font-sans font-bold text-brand-black uppercase tracking-widest group-hover:text-brand-gold transition-colors">阪田真臣</h3>
              <p className="text-[10px] text-brand-gold font-mono tracking-widest uppercase mt-1 font-bold">Masaomi Sakata</p>
              <div className="h-px w-8 bg-brand-gold/30 mt-3 mx-auto md:mx-0 transition-all group-hover:w-16 group-hover:bg-brand-gold" />
            </div>
          </div>

          {/* Message Speech Bubble */}
          <div className="relative flex-1">
            <div className="hidden md:block absolute -left-3 top-10 w-6 h-6 bg-white border-l border-t border-neutral-100 rotate-[-45deg] z-10" />
            
            <div className="relative bg-white border border-neutral-100 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
              <div className="space-y-6 text-neutral-600 leading-[1.8] md:leading-[2] font-sans font-light">
                {/* Unified font size (text-sm md:text-base) for all intro paragraphs */}
                <p className="text-sm md:text-base text-brand-black font-medium">
                  Honest Marketing Clubの阪田真臣です。
                </p>
                <p className="text-sm md:text-base">
                  このWebページには直接招待させていただいた方、紹介で辿り着いた方が大半かと思います。
                </p>
                <p className="text-sm md:text-base">
                  これから僕たちが始める
                  <span className="relative inline-block mx-1 group">
                    <span className="relative z-10 text-brand-black font-bold px-1">
                      セルフブランディングプロデュース/マーケティングコミュニティ
                    </span>
                    <span className="absolute bottom-0.5 left-0 w-full h-1.5 bg-brand-gold/20 -rotate-1 z-0 group-hover:h-full transition-all duration-500" />
                  </span>
                  についてご案内させていただければと思います。
                </p>
              </div>

              <div className="absolute bottom-8 right-12 opacity-5 pointer-events-none">
                <span className="text-8xl font-display font-bold text-brand-gold">”</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 px-4">
              <span className="w-6 h-px bg-neutral-200" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">CEO of Honest Marketing Club Stars.</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-neutral-50 border-l-4 border-brand-gold">
            <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">Core Philosophy</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans font-light">
              私たちの哲学は「単価は高くあるべきだ」という確信です。それは搾取ではなく、提供する価値とあなたの知性に対する正当な対価であるべきだと考えています。
            </p>
          </div>
          <div className="p-8 bg-brand-black text-white">
            <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-4">Exclusive Access</h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
              このコミュニティは、単なる知識の共有の場ではありません。互いの事業を磨き合い、高め合える20名だけの「戦友」と出会うための特別な環境です。
            </p>
          </div>
        </div>
      </div>

      {/* Profile Modal Overlay */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-brand-black/98 backdrop-blur-2xl transition-opacity animate-fade-in"
            onClick={() => setIsProfileOpen(false)}
          />
          
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-brand-black border border-neutral-800 shadow-[0_0_100px_rgba(197,160,89,0.3)] overflow-hidden rounded-3xl animate-spring-up">
            
            {/* Unified & Clear Close Button */}
            <div className="absolute top-6 right-6 z-[160] flex flex-col items-center gap-1">
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="w-12 h-12 bg-white text-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all shadow-xl group"
              >
                <span className="text-xl font-bold transition-transform group-hover:rotate-90">✕</span>
              </button>
              <span className="text-[9px] font-mono text-white/50 font-bold tracking-[0.2em] uppercase">Close</span>
            </div>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto custom-scrollbar">
              <div className="lg:w-1/3 bg-neutral-900/50 p-10 border-r border-neutral-800">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-brand-gold mb-8 mx-auto shadow-2xl">
                  <img src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815412/profile_hjsv2t.jpg" className="w-full h-full object-cover" alt="Sakata" />
                </div>
                <div className="text-center space-y-2 mb-10">
                  <h3 className="text-2xl font-sans font-bold text-white tracking-widest">阪田 真臣</h3>
                  <p className="text-[10px] text-brand-gold font-mono tracking-[0.4em] uppercase font-bold">Masaomi Sakata</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[8px] text-neutral-500 font-mono tracking-[0.4em] uppercase font-bold border-b border-neutral-800 pb-2">Career Path</h4>
                  <div className="space-y-4">
                    {careerPath.map((path, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <span className="text-brand-gold font-mono text-[9px] mt-1 opacity-50">0{i+1}</span>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed group-hover:text-white transition-colors">{path}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 p-8 md:p-14 space-y-12">
                <div className="space-y-2 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tighter">実績</h2>
                  <div className="h-px w-8 bg-brand-gold/50 mx-auto lg:mx-0" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {achievements.map((ach, i) => (
                    <div key={i} className="space-y-1 group relative p-5 bg-white/[0.03] border border-white/5 rounded-xl hover:border-brand-gold/30 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest">{ach.year}</span>
                        <div className="h-px w-4 bg-brand-gold/20" />
                        <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest leading-none">{ach.title}</span>
                      </div>
                      <p className="text-lg md:text-xl font-display font-bold text-white tracking-tight leading-tight group-hover:text-brand-goldLight transition-colors">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-goldLight via-brand-gold to-white bg-[length:200%_auto] animate-shimmer">
                          {ach.highlight}
                        </span>
                      </p>
                      {ach.detail && <p className="text-[8px] text-neutral-600 font-sans tracking-widest uppercase mt-1">{ach.detail}</p>}
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-neutral-900/40 rounded-2xl border border-neutral-800/50">
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed italic text-center lg:text-left">
                    「創業融資の希望満額獲得が福岡支店では史上初」という異例のキャリアを皮切りに、アパレル、広告代理店、楽天、および起業。現場の熱量とプラットフォームの論理、その両方を知るからこそ辿り着いた独自のブランディング理論を武器に、現在は多くの起業家の価値最大化をプロデュースしている。
                  </p>
                </div>

                <div className="pt-4 flex justify-center lg:hidden">
                   <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full py-5 bg-white text-brand-black text-[10px] font-bold tracking-[0.4em] uppercase rounded-xl transition-all shadow-xl active:scale-95"
                   >
                     実績画面を閉じる
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 5s infinite linear;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spring-up {
          0% { opacity: 0; transform: translateY(60px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }
        .animate-spring-up {
          animation: spring-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5a059;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default Letter;