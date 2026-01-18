
import React, { useState, useEffect } from 'react';

const PricingSection: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'honest') {
      setIsUnlocked(true);
      setIsModalOpen(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-brand-black text-white px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-brand-gold"></span>
            <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">Investment</span>
            <span className="w-8 h-px bg-brand-gold"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight">参加費用のご案内</h2>
          <p className="text-neutral-500 font-sans text-xs md:text-sm tracking-[0.2em] font-medium max-w-lg mx-auto">
            価格情報の閲覧には専用のパスワードが必要です。
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {!isUnlocked ? (
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-700 animate-reveal-up">
              <div className="text-center mb-8 space-y-4">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
                   <span className="text-brand-gold text-xl">🔒</span>
                </div>
                <h3 className="text-sm font-sans font-bold text-white tracking-widest uppercase">Authentication</h3>
                <p className="text-[10px] text-neutral-400 font-sans tracking-[0.2em]">
                  パスワードを入力してください
                </p>
              </div>
              
              <form onSubmit={handleUnlock} className="space-y-8">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className={`w-full bg-transparent border-b-2 py-4 px-4 text-center font-mono tracking-[0.4em] outline-none transition-all duration-500 text-lg ${error ? 'border-red-500 text-red-400 animate-shake' : 'border-neutral-800 text-white focus:border-brand-gold'}`}
                  autoComplete="off"
                />
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-gold text-white text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-brand-goldLight transition-all active:scale-95"
                >
                  認証して表示
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center animate-reveal-up">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-6 px-12 py-5 bg-white text-brand-black text-[11px] font-bold tracking-[0.5em] uppercase overflow-hidden shadow-2xl transition-all hover:-translate-y-1"
              >
                <span className="relative z-10">価格表を表示</span>
                <div className="absolute inset-0 bg-brand-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optimized Two-Section Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-6">
          <div 
            className="absolute inset-0 bg-brand-black/98 backdrop-blur-2xl animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-[1100px] max-h-[85vh] bg-white rounded-2xl md:rounded-[2rem] shadow-[0_0_120px_rgba(0,0,0,0.5)] overflow-hidden animate-spring-up flex flex-col">
            
            {/* STICKY HEADER: Always visible on top */}
            <div className="sticky top-0 z-[1010] bg-white border-b border-neutral-100 px-6 py-4 md:px-10 md:py-6 flex justify-between items-center shrink-0">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-brand-gold font-bold tracking-[0.2em] uppercase">Investment Plans</span>
                <h3 className="text-sm md:text-lg font-sans font-bold text-brand-black">HMC Stars. 参加プラン一覧</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 md:w-11 md:h-11 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-all shadow-xl active:scale-90"
                aria-label="Close"
              >
                <span className="text-2xl font-light">✕</span>
              </button>
            </div>

            {/* SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar bg-[#fcfcfc] space-y-12">
              
              {/* SECTION 01: Stripe Pricing Table */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                  <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-[0.3em] uppercase">Section 01 / 一括プラン</span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
                <div className="stripe-container overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
                  {React.createElement('stripe-pricing-table', {
                    'pricing-table-id': "prctbl_1Sqoum7lPpjyEl3MaDkitNcp",
                    'publishable-key': "pk_live_51Sm7Co7lPpjyEl3MT37uknGfgtzgBtSHyBEe2lyEUDXV7TjQBWSSPdZp2E4R7CO4odiF8qzhQy5xwd3cVR3suqXg00HLOsbm7Y"
                  } as any)}
                </div>
              </div>

              {/* SECTION 02: Custom Card (Monthly) */}
              <div className="space-y-6 pb-6">
                <div className="flex items-center gap-4 px-2">
                  <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-[0.3em] uppercase">Section 02 / 月額プラン</span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
                
                <div className="flex justify-center">
                  {/* Custom card matching Stripe UI: Border-radius 8px, white bg, thin border */}
                  <div className="w-full max-w-[420px] bg-white border border-neutral-200 rounded-[8px] p-6 md:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-500 group/card">
                    <div className="flex flex-col h-full">
                      <div className="w-full aspect-[16/10] bg-neutral-50 rounded-md overflow-hidden mb-6 border border-neutral-100">
                        <img 
                          src="https://res.cloudinary.com/dxr2aeoze/image/upload/v1767214957/s-1024x768_v-fs_webp_f1d44356-7dd9-405f-aa02-0376e9141d1c_hpvmhz.jpg" 
                          alt="Honest Marketing Club（月額）"
                          className="w-full h-full object-cover grayscale opacity-70 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-700"
                        />
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <span className="inline-block px-2 py-0.5 bg-neutral-100 text-[9px] font-bold text-neutral-500 rounded uppercase tracking-wider">Recurring</span>
                        <h4 className="text-xl font-sans font-bold text-brand-black leading-tight tracking-tight">Honest Marketing Club（月額）</h4>
                        <p className="text-[12px] text-neutral-400 font-sans leading-relaxed">
                          継続的な事業成長を伴走サポート。定期的な壁打ちと、実行フェーズでの具体的な戦略アドバイスを提供します。
                        </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-neutral-50">
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-3xl font-sans font-bold text-brand-black">¥80,000</span>
                          <span className="text-[11px] text-neutral-400 font-sans">/ 月(税込)</span>
                        </div>
                        
                        <a 
                          href="https://buy.stripe.com/6oUdR32a20248rC1yS8og06"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-4 bg-[#000000] text-white text-[13px] font-bold tracking-[0.2em] rounded-[4px] transition-all hover:bg-neutral-800 active:scale-[0.98] shadow-md text-center"
                        >
                          支払う
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Safe Area */}
            <div className="h-6 bg-white shrink-0" />
          </div>
        </div>
      )}

      <style>{`
        /* PC版の80%縮小感を出すための微調整 */
        @media (min-width: 768px) {
          .stripe-container {
            transform-origin: top center;
          }
        }

        .stripe-container {
          min-height: 480px;
          width: 100%;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out both;
        }
        @keyframes spring-up {
          0% { opacity: 0; transform: scale(0.98) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-spring-up {
          animation: spring-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5a059;
          border-radius: 10px;
        }
        
        stripe-pricing-table {
          --stripe-pricing-table-max-width: 100%;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
