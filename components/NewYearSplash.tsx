import React, { useEffect, useState } from 'react';

interface NewYearSplashProps {
  onComplete: () => void;
}

const NewYearSplash: React.FC<NewYearSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const now = new Date();
    const deadline = new Date('2026-01-06T00:00:00');
    
    if (now < deadline) {
      setShouldRender(true);
      // フェードアウト開始
      const timer = setTimeout(() => setIsVisible(false), 3000);
      // 次のフェーズへ
      const completeTimer = setTimeout(() => onComplete(), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    } else {
      onComplete();
    }
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-brand-black transition-opacity duration-[1000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative text-center space-y-6 px-6">
        <div className="overflow-hidden">
          <span className="block text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase animate-reveal-up">
            Season's Greetings
          </span>
        </div>
        
        <div className="overflow-hidden py-2">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white tracking-widest animate-reveal-up delay-200">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-goldLight to-white bg-[length:200%_auto] animate-shimmer">
              HAPPY NEW YEAR
            </span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <span className="block text-white/40 font-display text-2xl md:text-3xl tracking-[0.4em] font-light animate-reveal-up delay-500">
            2026
          </span>
        </div>
      </div>

      <style>{`
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
        @keyframes reveal-up {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 5s infinite linear;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NewYearSplash;