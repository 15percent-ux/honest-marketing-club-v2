import React, { useState, useEffect } from 'react';

const LineNavigator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "審査結果の通知",
      desc: "5営業日以内にメールにて招待状をお送りします。",
      messages: [
        { type: "date", text: "2025年1月20日(月)" },
        { type: "system", text: "Honest Marketing Clubへ招待されました" },
        { sender: "事務局", text: "ご入会おめでとうございます！まずはこのリンクから秘密のオープンチャットへ参加してください。", time: "10:25", side: "left" }
      ]
    },
    {
      label: "コミュニティ参加",
      desc: "LINEオープンチャットの秘密のグループへ。匿名での参加も可能です。",
      messages: [
        { type: "system", text: "新しいメンバーが参加しました" },
        { sender: "Member A", text: "よろしくお願いします！ずっと気になっていたので嬉しいです。", time: "11:02", side: "left" },
        { sender: "Strategist Omi", text: "歓迎します。ここでは『答え合わせ』を習慣にしていきましょう！", time: "11:05", side: "left" },
        { sender: "自分", text: "これからよろしくお願いします！🔥", time: "11:08", side: "right" }
      ]
    },
    {
      label: "事業の壁打ち",
      desc: "戦略エンジンの活用、メンバー間での仮説共有が始まります。",
      messages: [
        { type: "date", text: "2025年1月26日(日)" },
        { sender: "Member D", text: "新規サービスの価格を3倍に再設計してみました。このロジックでいこうと思います。", time: "14:15", side: "left" },
        { sender: "Strategist Omi", text: "その『価値の言語化』、非常に鋭いですね。顧客視点でも納得感があります。Goです！", time: "14:20", side: "left" },
        { sender: "Member A", text: "Dさんの仮説、めちゃくちゃ勉強になります...！", time: "14:22", side: "left" }
      ]
    },
    {
      label: "ノウハウの共有",
      desc: "SNS運用、セールスコピー、最新のマーケティング手法をリアルタイムに。",
      messages: [
        { sender: "Admin", text: "今月のSNS運用レポートを共有します。インサイトのこの部分に注目してください。", time: "19:00", side: "left" },
        { sender: "Member B", text: "ありがとうございます！早速自分のアカウントでも試してみます。", time: "19:05", side: "left" },
        { sender: "自分", text: "この添削, 本当に助かります...！", time: "19:10", side: "right" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // ステップ切り替えを3秒に加速（以前は5秒）
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 md:py-48 bg-[#fbfbfb] px-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Text Contents */}
        <div className="lg:col-span-5 space-y-12 relative z-10 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-brand-gold" />
              <span className="text-[10px] font-mono tracking-[0.5em] text-brand-gold uppercase font-bold">限定された環境</span>
            </div>
            <h2 className="text-[1.65rem] md:text-[2.2rem] font-sans font-bold text-brand-black leading-[1.3] tracking-tight">
              メンバーとリアルな<br />悩みやノウハウをシェア
            </h2>
            <p className="text-sm text-neutral-500 font-sans leading-relaxed max-w-md font-medium">
              クローズドオープンチャットで毎日コミュニケーション、事業の壁打ち、セールスコピーの添削、SNSの運用ノウハウ、グループミーティングなど
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-6 border transition-all duration-700 flex items-start gap-6 group rounded-2xl ${activeStep === i ? 'bg-white border-brand-gold/40 shadow-[0_30px_60px_-15px_rgba(197,160,89,0.12)] scale-[1.03] z-10' : 'bg-transparent border-transparent opacity-40 hover:opacity-100'}`}
              >
                <div className={`text-lg font-display font-bold transition-colors duration-500 ${activeStep === i ? 'text-brand-gold' : 'text-neutral-300'}`}>0{i + 1}</div>
                <div className="space-y-1">
                  <h4 className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${activeStep === i ? 'text-brand-black' : 'text-neutral-400'}`}>{step.label}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Smartphone Simulation */}
        <div className="lg:col-span-7 flex justify-center relative order-1 lg:order-2">
          <div className="relative w-[256px] h-[554px] md:w-[288px] md:h-[622px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-[2px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]">
            
            <div className="absolute inset-0 rounded-[3rem] border-[6px] border-[#252525] pointer-events-none z-40" />
            
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-black rounded-[0.9rem] z-50 flex items-center justify-end px-2">
               <div className="w-1 h-1 bg-[#1a1a1a] rounded-full ring-1 ring-white/5" />
            </div>

            <div className="relative w-full h-full bg-[#7494c0] rounded-[2.6rem] overflow-hidden flex flex-col shadow-inner select-none">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/[0.08] pointer-events-none z-30" />

              <div className="h-10 px-8 flex justify-between items-end pb-1.5 text-black font-sans font-bold text-[9px] relative z-20">
                <span className="tracking-tight">9:41</span>
                <div className="flex gap-1 items-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L1 10.5L2.5 9L12 18L21.5 9L23 10.5L12 21Z"/></svg>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22L24 7.25C20.85 4.85 17.05 3 12 3Z"/></svg>
                  <div className="w-5 h-2.5 border border-black/30 rounded-[2px] relative flex items-center p-[0.5px]">
                    <div className="h-full w-[85%] bg-black rounded-[0.5px]" />
                  </div>
                </div>
              </div>

              <div className="h-12 bg-[#ffffff]/95 backdrop-blur-2xl border-b border-black/5 flex items-center px-4 gap-2.5 z-10">
                <div className="w-8 h-8 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0 text-brand-gold text-[8px] font-bold shadow-sm ring-1 ring-black/5">HMC</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-bold text-black truncate leading-tight tracking-tight">HMC | 本質マーケティング</h5>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1 h-1 bg-[#00b900] rounded-full" />
                    <span className="text-[8px] text-neutral-400 font-bold tracking-tight">20 Online</span>
                  </div>
                </div>
                <div className="flex gap-3 opacity-30 scale-90">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <div className="w-4 h-4 flex flex-col gap-0.5 justify-center">
                    <div className="w-full h-[1.5px] bg-black rounded-full" />
                    <div className="w-full h-[1.5px] bg-black rounded-full" />
                    <div className="w-full h-[1.5px] bg-black rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-3 pb-8 flex flex-col gap-3 overflow-y-auto relative custom-scrollbar" key={activeStep}>
                {steps[activeStep].messages.map((msg, idx) => {
                  if (msg.type === "date") {
                    return (
                      <div key={idx} className="flex justify-center my-2 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="bg-black/5 text-black/40 text-[8px] px-3 py-0.5 rounded-full font-bold">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }
                  if (msg.type === "system") {
                    return (
                      <div key={idx} className="flex justify-center my-1 animate-spring-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                        <div className="bg-black/10 text-white text-[8px] px-4 py-1 rounded-full font-bold shadow-sm backdrop-blur-sm text-center">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }
                  
                  const isRight = msg.side === 'right';
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col animate-spring-up ${isRight ? 'items-end' : 'items-start'}`}
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      <div className={`flex items-start gap-2 max-w-[88%] ${isRight ? 'flex-row-reverse' : ''}`}>
                        {!isRight && (
                          <div className="w-7 h-7 rounded-[10px] bg-neutral-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-neutral-500 shadow-sm border border-black/5 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                              {msg.sender.charAt(0)}
                            </div>
                          </div>
                        )}
                        <div className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}>
                          {!isRight && (
                            <span className="text-[8px] text-black/50 font-bold ml-1 mb-1 tracking-tight">{msg.sender}</span>
                          )}
                          <div className={`flex items-end gap-1 ${isRight ? 'flex-row-reverse' : ''}`}>
                            <div className={`relative px-3 py-2 rounded-[0.9rem] text-[10px] font-sans font-medium leading-[1.4] shadow-[0_1px_2px_rgba(0,0,0,0.08)]
                              ${isRight 
                                ? 'bg-[#95eb6a] text-[#000000] rounded-tr-[3px]' 
                                : 'bg-[#ffffff] text-[#000000] rounded-tl-[3px]'}`}
                            >
                              <svg 
                                className={`absolute top-0 w-2 h-2 ${isRight ? '-right-[4px] text-[#95eb6a]' : '-left-[4px] text-[#ffffff]'}`} 
                                viewBox="0 0 10 10" 
                                fill="currentColor"
                              >
                                {isRight 
                                  ? <path d="M0 0 L10 0 L0 10 Z" /> 
                                  : <path d="M0 0 L10 0 L10 10 Z" />
                                }
                              </svg>
                              {msg.text}
                            </div>
                            <div className="flex flex-col items-end gap-0 pb-0.5">
                               {isRight ? (
                                 <span className="text-[6px] text-[#ffffff] font-bold leading-none mb-0.5 drop-shadow-sm">既読</span>
                               ) : (
                                 idx === 2 && <span className="text-[6px] text-[#00b900] font-bold leading-none mb-0.5">既読</span>
                               )}
                               <span className="text-[7px] text-[#000000]/30 font-bold leading-none">{msg.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-16 bg-[#f9f9f9]/95 backdrop-blur-xl border-t border-black/5 flex flex-col pt-1.5">
                <div className="flex items-center px-3 gap-3 flex-1 pb-3">
                  <div className="flex gap-3 opacity-20 scale-90">
                     <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center font-bold text-[14px] leading-none">+</div>
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>
                  <div className="flex-1 bg-white h-8 rounded-full border border-black/5 px-4 flex items-center justify-between shadow-inner">
                    <span className="text-neutral-300 text-[10px] font-medium tracking-tight">メッセージを入力</span>
                  </div>
                  <div className="w-7 h-7 bg-[#00b900] rounded-full flex items-center justify-center text-white text-[14px] opacity-15">▲</div>
                </div>
                <div className="h-4 flex justify-center items-center">
                  <div className="w-24 h-1 bg-black/10 rounded-full" />
                </div>
              </div>

            </div>
          </div>

          <div className="absolute -inset-10 bg-brand-gold/15 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
        </div>
      </div>

      <style>{`
        @keyframes spring-up {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          50% { opacity: 1; transform: translateY(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-spring-up {
          animation: spring-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </section>
  );
};

export default LineNavigator;