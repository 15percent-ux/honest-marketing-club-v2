import React, { useEffect, useState } from 'react';

interface HmcSplashProps {
  onComplete: () => void;
}

const HmcSplash: React.FC<HmcSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3500);
    const completeTimer = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[190] flex items-center justify-center overflow-hidden transition-opacity duration-[1200ms] ease-in-out bg-brand-black ${isFadingOut ? 'opacity-0 scale-110' : 'opacity-100'}`}
    >
      {/* 深みのある背景グラデーション */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000000_100%)]" />

      {/* ゴールドダスト効果（静かに舞う金粉） */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dust-container">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="gold-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              background: `linear-gradient(135deg, #c5a059, #e2cf9f)`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.5,
              filter: 'blur(0.5px)',
            }} />
          ))}
        </div>
      </div>

      <div className="relative text-center flex flex-col items-center w-full px-4 z-10">
        <div className="space-y-4 md:space-y-6 w-full">
          {/* サブテキスト: Establish 2025 */}
          <div className="overflow-hidden mb-4">
            <span className={`block text-brand-gold font-mono text-[9px] md:text-[11px] font-bold tracking-[0.8em] uppercase transition-all duration-[1500ms] delay-300 ${isVisible ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Established 2025
            </span>
          </div>

          {/* HONEST MARKETING */}
          <div className="overflow-hidden">
            <h2 className={`text-2xl md:text-4xl lg:text-5xl font-display font-medium text-white uppercase whitespace-nowrap transition-all duration-[1800ms] ease-out ${isVisible ? 'opacity-100 tracking-[0.6em] md:tracking-[0.8em] translate-y-0' : 'opacity-0 tracking-[0.2em] translate-y-full'}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-goldLight to-white bg-[length:200%_auto] animate-shimmer">
                HONEST MARKETING
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            {/* CLUB */}
            <div className="overflow-hidden">
              <h2 className={`text-lg md:text-xl lg:text-2xl font-display font-light text-brand-goldLight/60 uppercase whitespace-nowrap transition-all duration-[1500ms] delay-500 ease-out ${isVisible ? 'opacity-100 tracking-[1em] translate-y-0' : 'opacity-0 tracking-[0.5em] translate-y-full'}`}>
                CLUB
              </h2>
            </div>
            
            {/* STARS. */}
            <div className="overflow-hidden py-4 md:py-8">
              <h2 className={`text-6xl md:text-8xl lg:text-[11rem] font-display font-bold text-white uppercase whitespace-nowrap transition-all duration-[2200ms] delay-700 ease-out ${isVisible ? 'opacity-100 tracking-[0.15em] md:tracking-[0.25em] scale-100 translate-y-0' : 'opacity-0 tracking-[0.05em] scale-95 translate-y-full'}`}>
                STARS.
              </h2>
            </div>
          </div>
        </div>
        
        {/* 三つ星のエンブレム */}
        <div className="flex gap-8 md:gap-14 mt-4 md:mt-8 items-center">
          <div className={`h-[1px] bg-gradient-to-r from-transparent to-brand-gold/40 transition-all duration-[2000ms] delay-[1800ms] ${isVisible ? 'w-24 md:w-48 opacity-100' : 'w-0 opacity-0'}`} />
          <div className="flex gap-4 md:gap-8">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className={`text-lg md:text-2xl text-brand-gold transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'}`}
                style={{ transitionDelay: `${1500 + (i * 250)}ms` }}
              >
                ★
              </div>
            ))}
          </div>
          <div className={`h-[1px] bg-gradient-to-l from-transparent to-brand-gold/40 transition-all duration-[2000ms] delay-[1800ms] ${isVisible ? 'w-24 md:w-48 opacity-100' : 'w-0 opacity-0'}`} />
        </div>

        {/* 下部のタグライン */}
        <div className="overflow-hidden mt-12 md:mt-16">
          <p className={`text-[8px] md:text-[10px] text-white/30 font-sans tracking-[0.5em] uppercase transition-all duration-[2000ms] delay-[2200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
            For those who pursue the essence of value
          </p>
        </div>
      </div>

      <style>{`
        .gold-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: drift-gold 6s infinite ease-in-out;
        }
        @keyframes drift-gold {
          0%, 100% { opacity: 0; transform: translate(0, 0) rotate(0deg); }
          50% { opacity: 0.6; transform: translate(20px, -40px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 8s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default HmcSplash;