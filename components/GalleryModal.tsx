
import React, { useEffect, useState } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, url, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-fade-in overflow-hidden">
      {/* 背景オーバーレイ */}
      <div 
        className="absolute inset-0 bg-brand-black transition-opacity duration-700 cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Desktop Close Button (Floating Center) - Only visible on md+ */}
      <button 
        onClick={onClose}
        className="hidden md:flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] items-center gap-5 px-10 py-4 rounded-full bg-brand-black/90 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-black hover:scale-105 hover:border-brand-gold hover:shadow-brand-gold/20 cursor-pointer group animate-fade-in"
      >
        <span className="text-xs font-mono font-bold tracking-[0.4em] text-white/80 group-hover:text-brand-gold uppercase transition-colors">Exit Showcase</span>
        <span className="text-2xl font-light text-white group-hover:text-brand-gold leading-none transition-colors">✕</span>
      </button>

      {/* モーダル本体 */}
      <div className="relative w-screen h-screen bg-brand-black flex flex-col overflow-hidden animate-reveal-up">
        
        {/* ヘッダー UI */}
        <div className="relative flex items-center justify-between px-6 py-3 md:px-10 md:py-4 border-b border-brand-gold/10 bg-brand-black/95 backdrop-blur-md sticky top-0 z-[10000] pt-[calc(0.5rem+env(safe-area-inset-top))] md:pt-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-brand-gold font-bold tracking-[0.5em] uppercase">Product Review Mode</span>
            <h3 className="text-sm md:text-base font-sans font-bold text-white tracking-widest font-feature-palt truncate max-w-[200px] md:max-w-none">
              {title}
            </h3>
          </div>
          
          {/* Mobile Close Button (Header Right) - Only visible on mobile */}
          <button 
            onClick={onClose}
            className="md:hidden relative z-[9999] cursor-pointer group flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/5 transition-all active:scale-95"
          >
            <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-white/60 group-hover:text-brand-gold hidden sm:inline uppercase">Exit</span>
            <span className="text-xl font-light text-white group-hover:text-brand-gold leading-none">✕</span>
          </button>
        </div>

        {/* iframe コンテンツエリア */}
        <div className="relative flex-1 bg-white">
          {/* 読み込み中演出 */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-brand-black z-20 transition-all duration-1000 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute w-24 h-24 border border-brand-gold/5 rounded-full animate-spin-slow" />
              <div className="absolute w-24 h-24 border-t border-brand-gold/40 rounded-full animate-spin-fast" />
              <div className="w-8 h-8 bg-brand-black border border-brand-gold/30 flex items-center justify-center mb-6">
                <span className="text-brand-gold font-mono text-[9px] font-bold tracking-widest">HMC</span>
              </div>
              <span className="text-[8px] font-mono text-brand-gold/40 tracking-[0.6em] uppercase font-bold animate-pulse">Establishing Connection...</span>
            </div>
          </div>

          <iframe 
            src={url} 
            className="w-full h-full border-none shadow-2xl"
            onLoad={() => setIsLoading(false)}
            title={title}
            allow="fullscreen"
            allowFullScreen
          />
        </div>

        {/* 下部余白 */}
        <div className="h-[env(safe-area-inset-bottom)] bg-brand-black" />
      </div>

      <style>{`
        .font-feature-palt { font-feature-settings: "palt"; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes reveal-up { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-fast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-fast { animation: spin-fast 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out both; }
        .animate-reveal-up { animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>
    </div>
  );
};

export default GalleryModal;
