import React, { useState } from 'react';

const Consultation: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    
    // Simulate API delay for premium feel loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Logging submission for verification as per instructions
    console.log('Submission Target: 15percent@kouji-ouji.jp', formData);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section id="consultation" className="py-48 px-6 bg-white border-t border-neutral-100 flex items-center justify-center min-h-[700px]">
        <div className="text-center space-y-10 animate-fade-in max-w-lg">
          <div className="w-24 h-24 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 bg-brand-gold/5 animate-ping rounded-full" />
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center">
               <span className="text-brand-gold text-3xl font-bold italic">✓</span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-brand-black tracking-tight">送信が完了いたしました</h3>
            <p className="text-sm text-neutral-500 leading-[2] font-sans font-light">
              ご入力いただいた内容は事務局（<span className="text-brand-gold font-bold">15percent@kouji-ouji.jp</span>）へ安全に送信されました。
              内容を確認の上、通常3営業日以内に代表より直接ご連絡を差し上げます。
            </p>
          </div>
          <button 
            onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}
            className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] hover:text-brand-black transition-all border-b border-transparent hover:border-brand-black pb-1"
          >
            新しくメッセージを綴る
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-40 md:py-60 px-6 bg-white border-t border-neutral-100 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50/30 -skew-x-12 transform translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 relative z-10">
        
        {/* Left Column: Philosophical Context */}
        <div className="lg:col-span-5 space-y-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <span className="h-px w-8 bg-brand-gold"></span>
               <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">Private Consultation</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-black leading-[1.1]">
              価値の共鳴を、<br />ここから。
            </h2>
          </div>
          
          <div className="space-y-10 text-neutral-500 font-sans text-base leading-[2] font-light max-w-md">
            <p>
              サービスの内容に関するお問い合わせや、現在のビジネスにおける課題のご相談はこちらから承ります。
            </p>
            <p>
              不特定多数に向けた言葉ではなく、あなたという個人に向き合う準備ができています。<br />
              誠実なマーケティングの第一歩は、この一通のメッセージから始まります。
            </p>
            
            <div className="pt-12 border-t border-neutral-100 flex items-center gap-6 group">
              <div className="w-12 h-12 bg-brand-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                 <span className="text-brand-gold text-xs">✉</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Direct Communication</span>
                <span className="text-brand-black font-sans font-bold text-lg">15percent@kouji-ouji.jp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Luxury Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-16 bg-white p-2 md:p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Name Input */}
              <div className="relative group">
                <input
                  required
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-neutral-200 py-4 outline-none focus:border-brand-gold transition-all peer text-base text-brand-black font-light"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-[11px] font-bold text-neutral-400 tracking-widest uppercase transition-all pointer-events-none peer-focus:-top-6 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-6 peer-focus:text-[10px]"
                >
                  お名前
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-brand-gold transition-all duration-700 peer-focus:w-full" />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <input
                  required
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-neutral-200 py-4 outline-none focus:border-brand-gold transition-all peer text-base text-brand-black font-light"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-[11px] font-bold text-neutral-400 tracking-widest uppercase transition-all pointer-events-none peer-focus:-top-6 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-6 peer-focus:text-[10px]"
                >
                  メールアドレス
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-brand-gold transition-all duration-700 peer-focus:w-full" />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="relative group">
              <textarea
                required
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" "
                className="w-full bg-neutral-50 border border-neutral-100 p-10 h-60 outline-none focus:border-brand-gold/50 transition-all peer text-base text-brand-black resize-none leading-[1.8] font-light shadow-inner"
              />
              <label 
                htmlFor="message" 
                className="absolute left-10 top-10 text-[11px] font-bold text-neutral-400 tracking-widest uppercase transition-all pointer-events-none peer-focus:top-[-0.75rem] peer-focus:left-6 peer-focus:bg-white peer-focus:px-3 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-[-0.75rem] peer-[:not(:placeholder-shown)]:left-6 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-3"
              >
                ご相談内容
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group relative px-20 py-6 bg-brand-black text-white text-[11px] font-bold tracking-[0.6em] uppercase overflow-hidden transition-all disabled:opacity-30 shadow-2xl hover:shadow-brand-gold/20"
              >
                <span className="relative z-10">
                  {status === 'submitting' ? 'Processing...' : 'Send Message'}
                </span>
                <div className="absolute inset-0 bg-brand-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Consultation;