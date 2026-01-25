
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-xl transition-opacity duration-700"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full h-full max-w-[1400px] max-h-[900px] bg-brand-black border border-brand-gold/30 shadow-[0_0_100px_rgba(197,160,89,0.2)] flex flex-col overflow-hidden animate-spring-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/10 bg-brand-black/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-brand-gold font-bold tracking-[0.4em] uppercase">Live Preview</span>
            <h3 className="text-sm md:text-base font-sans font-bold text-white tracking-widest font-feature-palt">{title}</h3>
          </div>
          
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold transition-all active:scale-95"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/40 group-hover:text-brand-gold">CLOSE</span>
            <span className="text-xl font-light text-white group-hover:text-brand-gold">✕</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 bg-white">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-black z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-px bg-brand-gold/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-gold animate-shimmer-fast" />
                </div>
                <span className="text-[9px] font-mono text-brand-gold tracking-[0.5em] uppercase font-bold animate-pulse">Synchronizing Intelligence</span>
              </div>
            </div>
          )}
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
            title={title}
          />
        </div>

        {/* iOS Safe Area Padding */}
        <div className="h-[env(safe-area-inset-bottom)] bg-brand-black" />
      </div>

      <style>{`
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s infinite linear;
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .font-feature-palt {
          font-feature-settings: "palt";
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spring-up {
          0% { opacity: 0; transform: scale(0.95) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default GalleryModal;
