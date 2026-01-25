
import React, { useState } from 'react';

const Consultation: React.FC = () => {
  const [isEligible, setIsEligible] = useState(false);
  const goldColor = "#D4AF37";
  const LINE_CHAT_URL = "https://line.me/ti/g2/N_2zQEMoVCr4TZpwtXren7CjLZFY8w-EzUUzLA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";

  return (
    <section id="consultation" className="py-32 md:py-56 px-6 bg-[#000] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="mb-24 text-center space-y-8">
          <div className="inline-flex items-center gap-4">
             <span className="h-px w-8" style={{ backgroundColor: goldColor }}></span>
             <span className="font-mono text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: goldColor }}>Private Application</span>
             <span className="h-px w-8" style={{ backgroundColor: goldColor }}></span>
          </div>
          <h2 
            className="font-display font-bold leading-tight uppercase tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)', wordBreak: 'keep-all' }}
          >
            JOIN THE CLUB
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-sans tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
            現在、第0期メンバーを募集中です。<br />
            参加条件をご確認の上、オープンチャットへご参加ください。
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-12">
          
          {/* Eligibility Checkbox */}
          <div className="bg-neutral-900/20 p-8 rounded-2xl border border-neutral-800">
            <label className="flex items-start gap-6 cursor-pointer group">
              <div className="relative mt-1">
                <input 
                  type="checkbox" 
                  checked={isEligible}
                  onChange={e => setIsEligible(e.target.checked)}
                  className="peer hidden" 
                />
                <div className="w-7 h-7 border-2 border-neutral-700 rounded transition-all peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] flex items-center justify-center">
                  <span className={`text-black text-sm font-bold transition-opacity ${isEligible ? 'opacity-100' : 'opacity-0'}`}>✓</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-base md:text-lg font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                  参加条件：年商1,000万円以下である
                </p>
                <p className="text-xs text-neutral-500 mt-2 font-sans leading-relaxed">
                  ※起業予定・準備中・会社員の方も含みます。本条件に該当することを確認し、チェックを入れてください。
                </p>
              </div>
            </label>
          </div>

          <div className="pt-8 flex flex-col items-center gap-8">
            <a
              href={isEligible ? LINE_CHAT_URL : "#"}
              target={isEligible ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`group relative w-full md:w-auto px-20 py-7 text-[12px] font-bold tracking-[0.6em] uppercase overflow-hidden transition-all shadow-[0_20px_50px_rgba(255,255,255,0.05)]
                ${isEligible ? 'bg-white text-black hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'}`}
              onClick={(e) => !isEligible && e.preventDefault()}
            >
              <span className="relative z-10 transition-colors group-hover:text-white">
                Clubへ参加する
              </span>
              {isEligible && <div className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />}
            </a>
            
            <div className="text-center space-y-4">
              <p className="text-[9px] text-neutral-700 font-mono tracking-[0.4em] uppercase">
                Redirect to: LINE OPENCHAT "HONEST CLUB"
              </p>
              <div className="h-px w-12 bg-neutral-900 mx-auto" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-900/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default Consultation;
