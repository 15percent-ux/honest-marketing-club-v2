
import React, { useState, useEffect, useRef } from 'react';

const Letter: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringIcon, setIsHoveringIcon] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  // Background Scroll Lock & Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };

    if (isProfileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  // Cursor tracking for "VIEW" indicator
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHoveringIcon) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };

    if (isHoveringIcon) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoveringIcon]);

  const achievements = [
    { year: '2020-2025', title: 'Marketing Salon', highlight: 'メンバー成長率2,000％' },
    { year: 'Founder', title: 'AMAZAKE', highlight: '開始30分で200万円完売' },
    { year: 'Achievement', title: 'Cloud Funding', highlight: 'カテゴリー歴代2位' },
    { year: 'Award', title: 'ICC Food Award', highlight: '初出場で3部門入賞' },
    { year: 'Media', title: 'SNS', highlight: 'フォロワー3万人' },
    { year: '2025', title: 'HORIEXPO 登壇', highlight: '発酵起業家として選出' },
    { year: 'Innovation', title: 'Ice Cream', highlight: '原料開発による革命' },
    { year: 'Strategy', title: 'Production', highlight: '起業家の価値最大化' }
  ];

  const careerPath = [
    'Apparel Industry',
    'Ad Agency',
    'Rakuten Group',
    'Founder & CEO'
  ];

  return (
    <section id="letter" className="pt-24 pb-32 px-6 bg-white overflow-hidden">
      {/* Custom Floating Cursor (Desktop Only) */}
      <div 
        className={`fixed top-0 left-0 z-[300] pointer-events-none transition-all duration-300 ease-out flex items-center justify-center rounded-full bg-brand-gold shadow-lg
          ${isHoveringIcon ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        style={{ 
          width: '70px', 
          height: '70px',
          transform: `translate(${cursorPos.x - 35}px, ${cursorPos.y - 35}px)`,
          display: 'none' // Hidden by default, shown by media query
        }}
        id="custom-view-cursor"
      >
        <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em] uppercase">View</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          
          {/* Representative Profile Column */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start space-y-4 w-full md:w-auto relative group">
            <button 
              ref={iconRef}
              onClick={() => setIsProfileOpen(true)}
              onMouseEnter={() => setIsHoveringIcon(true)}
              onMouseLeave={() => setIsHoveringIcon(false)}
              className="relative p-1 rounded-full outline-none transition-all cursor-none"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 bg-neutral-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden grayscale border-4 border-white shadow-2xl transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:border-brand-gold/20">
                 <img 
                   src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815412/profile_hjsv2t.jpg" 
                   alt="代表 阪田真臣" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </button>
            
            <div className="text-center md:text-left cursor-pointer group" onClick={() => setIsProfileOpen(true)}>
              <h3 className="text-lg font-sans font-bold text-brand-black uppercase tracking-widest group-hover:text-brand-gold transition-colors">阪田真臣</h3>
              <p className="text-[10px] text-brand-gold font-mono tracking-widest uppercase mt-1 font-bold">Masaomi Sakata</p>
              <div className="h-px w-6 bg-brand-gold/30 mt-3 mx-auto md:mx-0 transition-all group-hover:w-10 group-hover:bg-brand-gold" />
            </div>
          </div>

          {/* Message Speech Bubble */}
          <div className="relative flex-1">
            <div className="hidden md:block absolute -left-3 top-10 w-6 h-6 bg-white border-l border-t border-neutral-100 rotate-[-45deg] z-10" />
            
            <div className="relative bg-white border border-neutral-100 p-8 md:p-12 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
              <div className="space-y-6 text-neutral-600 leading-[1.8] md:leading-[2] font-sans font-light">
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
                    <span className="absolute bottom-0.5 left-0 w-full h-1 bg-brand-gold/20 -rotate-1 z-0 group-hover:h-full transition-all duration-500" />
                  </span>
                  についてご案内させていただければと思います。
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 px-4">
              <span className="w-6 h-px bg-neutral-200" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">CEO of Honest Marketing Club Stars.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal Overlay */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          <div 
            className="absolute inset-0 bg-brand-black/98 backdrop-blur-xl animate-fade-in"
            onClick={() => setIsProfileOpen(false)}
          />
          
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-brand-black border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden rounded-2xl animate-spring-up flex flex-col">
            
            <button 
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[250] group flex items-center gap-3 py-2.5 px-4 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hover:border-brand-gold hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all active:scale-90"
              aria-label="Close profile"
            >
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-white group-hover:text-brand-gold transition-colors uppercase">Exit</span>
              <span className="w-px h-3 bg-white/20 group-hover:bg-brand-gold transition-colors" />
              <span className="text-lg font-light text-white group-hover:text-brand-gold transition-colors leading-none">✕</span>
            </button>

            <div className="flex-1 flex flex-col md:flex-row overflow-y-auto custom-scrollbar">
              
              <div className="md:w-[35%] bg-white/[0.02] px-6 pb-10 pt-20 md:pt-24 md:px-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col items-center md:items-stretch shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-brand-gold/40 mb-6 mx-auto grayscale shadow-xl">
                  <img src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815412/profile_hjsv2t.jpg" className="w-full h-full object-cover" alt="Sakata" />
                </div>
                
                <div className="text-center space-y-1 mb-10">
                  <h3 className="text-xl font-sans font-bold text-white tracking-widest">阪田 真臣</h3>
                  <p className="text-[8px] text-brand-gold font-mono tracking-[0.3em] uppercase font-bold">Masaomi Sakata</p>
                  <div className="h-px w-6 bg-brand-gold/30 mx-auto mt-3" />
                </div>
                
                <div className="space-y-6 w-full">
                  <h4 className="text-[8px] text-white/30 font-mono tracking-[0.3em] uppercase font-bold border-b border-white/5 pb-2">Experience</h4>
                  <div className="space-y-3">
                    {careerPath.map((path, i) => (
                      <div key={i} className="flex gap-3 items-center group/item">
                        <span className="text-[8px] font-mono text-brand-gold/40">0{i+1}</span>
                        <p className="text-[10px] text-white/60 font-sans tracking-wide">{path}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-[65%] p-6 pt-10 md:p-10 md:pt-20 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">Achievements</h2>
                  <div className="h-px w-8 bg-brand-gold/40" />
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {achievements.map((ach, i) => (
                    <div key={i} className="p-3 bg-white/[0.04] border border-white/5 rounded-xl flex flex-col justify-center space-y-1 transition-all duration-700 hover:bg-white/[0.07]">
                      <div className="flex flex-col gap-0.5 mb-1">
                        <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter">{ach.year}</span>
                        <span className="text-[7px] font-bold text-brand-gold/60 uppercase tracking-widest leading-none truncate">{ach.title}</span>
                      </div>
                      <p className="text-[10px] md:text-[12px] font-sans font-medium text-white/90 tracking-tight leading-snug min-h-[2.4em] flex items-center">
                        {ach.highlight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-white/[0.01] rounded-2xl border border-white/5">
                  <p className="text-[10px] md:text-[12px] text-white/40 font-sans leading-relaxed text-justify hyphens-auto font-light">
                    アパレル、広告、IT大手での経験を経て独立。創業融資の希望満額獲得を皮切りに、現場の熱量とプラットフォームの論理を融合させた独自のブランディング理論を提唱。
                  </p>
                </div>

                <div className="pt-2 md:hidden">
                   <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full py-4 bg-white/[0.05] border border-white/10 text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase rounded-xl transition-all"
                   >
                     Close
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spring-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }
        .animate-spring-up {
          animation: spring-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.2);
          border-radius: 10px;
        }
        .text-justify {
          text-align: justify;
        }

        /* Custom View Cursor Desktop Only */
        @media (hover: hover) {
          #custom-view-cursor {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Letter;
