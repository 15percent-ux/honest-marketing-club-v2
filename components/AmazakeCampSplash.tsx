import React, { useEffect, useState } from 'react';

interface AmazakeCampSplashProps {
  onComplete: () => void;
}

const AmazakeCampSplash: React.FC<AmazakeCampSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 登場
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    // 退場開始
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 2500);
    // 完了
    const completeTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[190] flex items-center justify-center bg-brand-black transition-opacity duration-[1000ms] ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]" />
        {/* Animated Particles */}
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${Math.random()})`
            }} />
          ))}
        </div>
      </div>

      <div className="relative text-center">
        {/* 以前の tracking-[1em]/[1.2em] から tracking-[0.6em]/[0.75em] に縮小 */}
        <h2 className={`text-2xl md:text-4xl font-display font-bold text-white tracking-[0.6em] uppercase transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 tracking-[0.75em] scale-100' : 'opacity-0 tracking-[0.3em] scale-95'}`}>
          AMAZAKECAMP
        </h2>
        <div className={`w-12 h-px bg-brand-gold mx-auto mt-8 transition-all duration-[1500ms] delay-500 ${isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'}`} />
      </div>

      <style>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #c5a059;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 3s infinite ease-in-out;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default AmazakeCampSplash;