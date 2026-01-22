
import React, { useState, useEffect } from 'react';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  
  const LINE_CHAT_URL = "https://line.me/ti/g2/N_2zQEMoVCr4TZpwtXren7CjLZFY8w-EzUUzLA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className={`absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`relative w-full max-w-xl transition-all duration-1000 transform ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}>
        <div className="relative bg-[#0a0a0a] border border-neutral-800 shadow-[0_0_80px_rgba(197,160,89,0.1)] overflow-hidden rounded-2xl">
          
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-neutral-900 text-center relative bg-neutral-950/50">
            <button onClick={onClose} className="absolute top-8 right-8 text-neutral-600 hover:text-brand-gold transition-colors text-xl z-20">✕</button>
            <span className="text-[10px] font-mono tracking-[0.6em] text-brand-gold uppercase block mb-4">Official Join Protocol</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-[0.1em]">オネストマーケティングクラブへ参加する</h2>
          </div>

          <div className="bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:30px_30px] p-8 md:p-12">
            <div className="space-y-12">
              
              {/* Eligibility Checkbox */}
              <div className="bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-1">
                    <input 
                      required 
                      type="checkbox" 
                      checked={isEligible}
                      onChange={e => setIsEligible(e.target.checked)}
                      className="peer hidden" 
                    />
                    <div className="w-6 h-6 border-2 border-neutral-700 rounded transition-all peer-checked:bg-brand-gold peer-checked:border-brand-gold flex items-center justify-center">
                      <span className={`text-black text-sm font-bold transition-opacity ${isEligible ? 'opacity-100' : 'opacity-0'}`}>✓</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-bold text-white tracking-wide group-hover:text-brand-gold transition-colors">
                      参加条件：年商1,000万円以下である
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1 font-sans leading-relaxed">
                      ※起業予定・準備中・会社員の方も含みます。本条件に該当することを確認し、チェックを入れてください。
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-4">
                <a 
                  href={isEligible ? LINE_CHAT_URL : "#"}
                  target={isEligible ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`block w-full py-5 text-[11px] font-bold tracking-[0.6em] uppercase transition-all relative overflow-hidden group rounded-lg text-center
                    ${isEligible ? 'bg-white text-brand-black hover:bg-brand-gold' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed opacity-50'}`}
                  onClick={(e) => !isEligible && e.preventDefault()}
                >
                  <span className="relative z-10">Clubへ参加する</span>
                  {isEligible && <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
                </a>
                
                <p className="text-[9px] text-neutral-600 font-mono tracking-[0.2em] uppercase text-center mt-6">
                  Redirecting to LINE OpenChat "Honest Club"
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-neutral-900 bg-neutral-950/50 flex justify-between items-center px-10">
             <span className="text-[8px] font-mono text-neutral-700 tracking-[0.4em] uppercase">Honest Marketing Club 2025</span>
             <span className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest italic">Secure Access Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityModal;
