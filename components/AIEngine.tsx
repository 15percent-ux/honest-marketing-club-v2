import React, { useState, useRef, useEffect } from 'react';
import { getGeminiInspiration } from '../services/gemini.ts';
import { Message, AIStatus } from '../types.ts';

const AIEngine: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AIStatus>(AIStatus.IDLE);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === AIStatus.THINKING) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStatus(AIStatus.THINKING);

    try {
      const response = await getGeminiInspiration(input);
      const aiMessage: Message = {
        role: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setStatus(AIStatus.IDLE);
    } catch (error) {
      setStatus(AIStatus.ERROR);
      const errorMessage: Message = {
        role: 'ai',
        content: "戦略プロセッサが一時的に混雑しています。会員様専用ラインにて再試行してください。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <section id="ai" className="py-32 px-6 bg-brand-white border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold leading-none tracking-tight text-brand-black">
              思考の<span className="text-brand-gold">検証エンジン</span>
            </h2>
            <p className="text-neutral-400 mt-4 font-mono text-[10px] tracking-[0.25em] uppercase font-bold">集合知による仮説の答え合わせ</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-sans font-bold text-neutral-400 border border-neutral-100 px-6 py-2.5 bg-white">
            <div className={`w-1.5 h-1.5 rounded-full ${status === AIStatus.THINKING ? 'bg-brand-gold animate-pulse' : 'bg-neutral-200'}`} />
            {status === AIStatus.THINKING ? '検証中' : '準備完了'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit">
            <div className="p-10 border border-neutral-100 bg-white relative shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold" />
              <h4 className="text-xs font-bold mb-5 font-sans tracking-[0.1em] uppercase text-brand-black">答え合わせの習慣</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light font-sans">
                一人では気づけない「価値」の自覚。このエンジンは、オネマの哲学に基づき、あなたの仮説を共に読み解くためのツールです。
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-widest">問い合わせテンプレート</p>
              {[
                "高単価商品のストーリー設計について",
                "顧客との距離を縮めるコミュニケーション",
                "自分の使命をプロフィールに落とし込む"
              ].map((p, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(p)}
                  className="w-full text-left p-4 hover:bg-white hover:text-brand-gold text-[12px] text-neutral-500 transition-all font-light border-b border-neutral-100 flex items-center justify-between group"
                >
                  {p}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-neutral-100 flex flex-col h-[650px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] relative">
            <div className="absolute inset-x-0 top-0 h-14 bg-white/80 backdrop-blur-md border-b border-neutral-50 flex items-center px-8 justify-between z-10">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold/20" />
                <div className="w-2 h-2 rounded-full bg-brand-gold/20" />
              </div>
              <span className="text-[10px] font-sans font-bold text-neutral-300 tracking-[0.2em] uppercase">プライベート会員専用接続</span>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-10 pt-24 space-y-12 scroll-smooth"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-12 opacity-10 grayscale">
                   <h2 className="text-4xl font-sans font-bold uppercase mb-4 tracking-wider">入力待ち</h2>
                   <p className="text-[10px] font-sans font-bold tracking-widest">検証したい戦略を送信してください...</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] md:max-w-[80%] px-8 py-6 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-black text-brand-white font-medium shadow-xl' 
                        : 'bg-white text-brand-black font-light border border-neutral-100'
                    }`}>
                      <div className={`text-[9px] font-sans font-bold mb-3 uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-neutral-500' : 'text-brand-gold'}`}>
                        {msg.role === 'user' ? 'メンバー' : 'アドバイザー'}
                      </div>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {status === AIStatus.THINKING && (
                <div className="flex justify-start">
                  <div className="bg-neutral-50 border border-neutral-100 px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" />
                      <span className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-widest">戦略を分析中...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 border-t border-neutral-50 bg-white">
              <div className="flex gap-6">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="検証したい戦略をどうぞ..."
                  className="flex-1 bg-neutral-50 border border-neutral-100 py-4 px-8 text-sm font-light focus:outline-none focus:border-brand-gold transition-all placeholder:text-neutral-300"
                />
                <button 
                  type="submit"
                  disabled={status === AIStatus.THINKING || !input.trim()}
                  className="px-10 bg-brand-black text-brand-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-brand-gold transition-all disabled:opacity-30"
                >
                  検証する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEngine;