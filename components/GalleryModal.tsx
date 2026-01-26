
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
        className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl transition-opacity duration-700 cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* モーダル本体 */}
      <div className="relative w-full h-full md:w-[90vw] md:h-[85vh] md:max-w-[1400px] md:max-h-[900px] bg-brand-black md:border md:border-brand-gold/30 md:shadow-[0_0_100px_rgba(197,160,89,0.2)] flex flex-col overflow-hidden animate-spring-up">
        
        {/* ヘッダー UI */}
        <div className="flex items-center justify-between px-6 py-4 md:py-5 border-b border-brand-gold/10 bg-brand-black/90 backdrop-blur-md sticky top-0 z-[10000] pt-[calc(1rem+env(safe-area-inset-top))] md:pt-5">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-brand-gold font-bold tracking-[0.4em] uppercase">Archive View</span>
            <h3 className="text-sm md:text-base font-sans font-bold text-white tracking-widest font-feature-palt truncate max-w-[200px] md:max-w-none">
              {title}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 min-w-[44px] min-h-[44px] px-5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold transition-all active:scale-90"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/60 group-hover:text-brand-gold hidden sm:inline">CLOSE</span>
            <span className="text-2xl font-light text-white group-hover:text-brand-gold leading-none">✕</span>
          </button>
        </div>

        {/* iframe コンテンツエリア */}
        <div className="relative flex-1 bg-white">
          {/* 読み込み中演出 */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-[#111111] z-20 transition-all duration-1000 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute w-32 h-32 border border-brand-gold/5 rounded-full animate-spin-slow" />
              <div className="absolute w-32 h-32 border-t border-brand-gold/40 rounded-full animate-spin-fast" />
              <div className="w-10 h-10 bg-brand-black border border-brand-gold/30 flex items-center justify-center mb-4">
                <span className="text-brand-gold font-mono text-[10px] font-bold tracking-widest">HMC</span>
              </div>
              <span className="text-[9px] font-mono text-brand-gold/60 tracking-[0.5em] uppercase font-bold">Synchronizing...</span>
            </div>
          </div>

          <iframe 
            src={url} 
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
            title={title}
          />
        </div>

        {/* 下部余白対応 */}
        <div className="h-[env(safe-area-inset-bottom)] bg-brand-black" />
      </div>

      {/* モバイル版：閉じ込め防止用 強制CLOSEボタン */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#c5a059',
          border: '1px solid #c5a059',
          padding: '12px 30px',
          borderRadius: '30px',
          fontFamily: '"Zen Old Mincho", serif',
          backdropFilter: 'blur(8px)',
          display: 'block',
          boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
        className="md:hidden animate-fab-up"
      >
        × CLOSE
      </button>

      <style>{`
        .font-feature-palt { font-feature-settings: "palt"; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spring-up { 0% { opacity: 0; transform: scale(0.95) translateY(40px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fab-up { 0% { opacity: 0; transform: scale(0.95) translateY(60px) translateX(-50%); } 100% { opacity: 1; transform: scale(1) translateY(0) translateX(-50%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-fast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-fast { animation: spin-fast 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out both; }
        .animate-spring-up { animation: spring-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-fab-up { animation: fab-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>
    </div>
  );
};

export default GalleryModal;
