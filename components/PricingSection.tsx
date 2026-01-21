
import React, { useState, useEffect } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  unit?: string;
  desc: string;
  link: string;
  isRecommended?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'web',
    name: 'Branding Web site',
    price: '¥300,000',
    desc: 'ブランドの本質を視覚化するWebサイト制作。個人の知性を武器に変える、最初の強力な接点を構築します。',
    link: 'https://buy.stripe.com/dRm4gtdSKdSU9vGelE8og09'
  },
  {
    id: 'club',
    name: 'Honest Marketing Club (一括)',
    price: '¥480,000',
    desc: '6ヶ月間の徹底的なトレーニングとコミュニティ。価値の言語化から実績の見える化まで、全てのプロセスを網羅。',
    link: 'https://buy.stripe.com/00wdR37um7uw7ny91k8og08'
  },
  {
    id: 'full',
    name: 'Full Branding',
    price: '¥500,000',
    desc: 'プロフィール設計、商品設計、コピーライティング。あなたのアイデンティティを市場価値へ100%変換します。',
    link: 'https://buy.stripe.com/dRm00d3e6eWY23e4L48og07'
  },
  {
    id: 'CLUB',
    name: 'Honest Marketing Club（月額）',
    price: '¥80,000',
    unit: '/ 月(税込)',
    desc: '継続的な事業成長を伴走サポート。定期的な壁打ちと、実行フェーズでの具体的な戦略アドバイスを提供します。',
    link: 'https://buy.stripe.com/6oUdR32a20248rC1yS8og06',
    isRecommended: true
  }
];

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

      {/* Custom Redesigned Pricing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-brand-black/98 backdrop-blur-2xl animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-[1280px] max-h-[92vh] bg-white rounded-xl shadow-[0_0_120px_rgba(0,0,0,0.5)] overflow-hidden animate-spring-up flex flex-col">
            
            {/* STICKY HEADER: Fixed on top */}
            <div className="sticky top-0 z-[1020] bg-white border-b border-neutral-100 px-6 py-4 md:px-10 md:py-6 flex justify-between items-center shrink-0">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-brand-gold font-bold tracking-[0.2em] uppercase">Investment Plans</span>
                <h3 className="text-sm md:text-lg font-sans font-bold text-brand-black">HMC Stars. 参加プラン一覧</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-brand-black text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-all shadow-xl active:scale-90"
              >
                <span className="text-2xl font-light">✕</span>
              </button>
            </div>

            {/* SCROLLABLE GRID: 4 Columns Desktop, 1 Column Mobile */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#f8f8f8]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-full mx-auto">
                {PRICING_PLANS.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`relative bg-white border rounded-lg p-5 md:p-6 flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group/card
                      ${plan.isRecommended ? 'border-brand-gold shadow-[0_4px_12px_rgba(197,160,89,0.1)]' : 'border-neutral-200'}`}
                  >
                    {/* RECOMMENDED TOP LINE */}
                    {plan.isRecommended && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold rounded-t-lg" />
                    )}

                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded
                          ${plan.isRecommended ? 'bg-brand-gold/10 text-brand-gold' : 'bg-neutral-100 text-neutral-400'}`}>
                          {plan.id}
                        </span>
                        {plan.isRecommended && (
                          <span className="text-[9px] font-sans font-bold text-brand-gold tracking-widest uppercase">人気</span>
                        )}
                      </div>
                      <h4 className="text-[15px] md:text-[16px] font-sans font-bold text-brand-black leading-tight min-h-[44px]">
                        {plan.name}
                      </h4>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl md:text-3xl font-sans font-bold text-brand-black tracking-tighter">
                          {plan.price}
                        </span>
                        {plan.unit && <span className="text-[11px] text-neutral-400 font-sans">{plan.unit}</span>}
                      </div>
                    </div>

                    <div className="flex-1 mb-8">
                      <p className="text-[12px] md:text-[13px] text-neutral-500 font-sans leading-relaxed text-justify">
                        {plan.desc}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <a 
                        href={plan.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3.5 bg-brand-black text-white text-[12px] font-bold tracking-[0.2em] rounded-[4px] transition-all hover:bg-neutral-800 active:scale-[0.98] shadow-md text-center uppercase"
                      >
                        支払う
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER NOTE */}
              <div className="mt-12 text-center pb-4">
                <p className="text-[10px] text-neutral-400 font-sans tracking-[0.2em] uppercase">
                  All transactions are secure and encrypted via Stripe.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        /* Desktop zoom/compact adjustment */
        @media (min-width: 1024px) {
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
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
        .text-justify {
          text-align: justify;
          text-justify: inter-character;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
