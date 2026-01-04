import React, { useEffect, useState } from 'react';

interface HmcSplashProps {
  onComplete: () => void;
}

const HmcSplash: React.FC<HmcSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3000);
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[190] flex items-center justify-center overflow-hidden transition-opacity duration-[1000ms] ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient-flow 15s ease infinite'
      }}
    >
      {/* 柔らかなオーバーレイレイヤー */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

      {/* パステル・パーティクル */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-container">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="prism-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              filter: 'blur(4px)',
              transform: `scale(${Math.random()})`
            }} />
          ))}
        </div>
      </div>

      <div className="relative text-center flex flex-col items-center w-full px-4 z-10">
        <div className="space-y-4 md:space-y-6 w-full">
          {/* HONEST */}
          <div className="overflow-hidden">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-lg uppercase whitespace-nowrap transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 tracking-[0.2em] md:tracking-[0.4em] translate-y-0' : 'opacity-0 tracking-[0.1em] translate-y-full'}`}>
              HONEST
            </h2>
          </div>
          
          {/* MARKETING */}
          <div className="overflow-hidden">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-lg uppercase whitespace-nowrap transition-all duration-[1000ms] delay-200 ease-out ${isVisible ? 'opacity-100 tracking-[0.2em] md:tracking-[0.4em] translate-y-0' : 'opacity-0 tracking-[0.1em] translate-y-full'}`}>
              MARKETING
            </h2>
          </div>

          <div className="flex flex-col items-center">
            {/* CLUB */}
            <div className="overflow-hidden">
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-display font-bold text-white/80 uppercase whitespace-nowrap transition-all duration-[1000ms] delay-400 ease-out ${isVisible ? 'opacity-100 tracking-[0.2em] md:tracking-[0.3em] translate-y-0' : 'opacity-0 tracking-[0.1em] translate-y-full'}`}>
                CLUB
              </h2>
            </div>
            
            {/* STARS. */}
            <div className="overflow-hidden py-4">
              <h2 className={`text-5xl md:text-8xl lg:text-[10rem] font-display font-bold text-white uppercase whitespace-nowrap transition-all duration-[1500ms] delay-600 ease-out ${isVisible ? 'opacity-100 tracking-[0.1em] md:tracking-[0.2em] scale-100 translate-y-0' : 'opacity-0 tracking-[0.05em] scale-90 translate-y-full'}`}>
                STARS.
              </h2>
            </div>
          </div>
        </div>
        
        {/* パステルカラーの★マーク */}
        <div className="flex gap-6 md:gap-10 mt-6 md:mt-10">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`text-2xl md:text-4xl text-white transition-all duration-700 ease-out transform drop-shadow-md ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-4'}`}
              style={{ transitionDelay: `${1200 + (i * 300)}ms` }}
            >
              ★
            </div>
          ))}
        </div>

        <div className={`h-px bg-white/40 mt-12 transition-all duration-[2000ms] delay-[2200ms] ${isVisible ? 'w-32 md:w-64 opacity-100' : 'w-0 opacity-0'}`} />
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .prism-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: float-prism 4s infinite ease-in-out;
        }
        @keyframes float-prism {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          50% { opacity: 0.8; transform: translateY(-30px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default HmcSplash;