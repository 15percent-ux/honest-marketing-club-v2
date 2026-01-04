import React, { useState, useEffect } from 'react';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // フォームデータ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    area: '',
    entityType: '個人',
    products: '',
    hasAdvisor: 'なし',
    regrets: '',
    improvements: '',
    weakness: '',
    strength: '',
    customerCount: '',
    sns: {
      instagram: { count: '', hardlyUsed: false },
      x: { count: '', hardlyUsed: false },
      tiktok: { count: '', hardlyUsed: false },
      threads: { count: '', hardlyUsed: false },
      youtube: { count: '', hardlyUsed: false },
      facebook: { count: '', hardlyUsed: false },
      other: { count: '', hardlyUsed: false }
    },
    mainSnsUrl: '',
    scamExperience: 'なし',
    infoProductExperience: 'なし',
    infoProductRegret: '',
    highestInvestment: '',
    referrerName: '',
    referrerSns: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500)); // 送信シミュレーション
      console.log('エントリーデータ送信:', formData);
      setSubmitted(true);
    } catch (error) {
      alert('システムエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnsChange = (platform: string, field: 'count' | 'hardlyUsed', value: any) => {
    setFormData(prev => ({
      ...prev,
      sns: {
        ...prev.sns,
        [platform]: {
          ...prev.sns[platform as keyof typeof prev.sns],
          [field]: value
        }
      }
    }));
  };

  const SectionTitle = ({ number, title }: { number: string, title: string }) => (
    <div className="flex items-center gap-4 mb-8 border-l-2 border-brand-gold pl-4">
      <span className="text-[10px] font-mono text-brand-gold/60 font-bold">{number}</span>
      <h3 className="text-[11px] font-bold text-neutral-300 uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className={`absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`relative w-full max-w-4xl transition-all duration-1000 transform ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}>
        <div className="relative bg-[#0a0a0a] border border-neutral-800 shadow-[0_0_80px_rgba(197,160,89,0.1)] overflow-hidden">
          
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-neutral-900 text-center relative bg-neutral-950/50">
            <button onClick={onClose} className="absolute top-8 right-8 text-neutral-600 hover:text-brand-gold transition-colors text-xl z-20">✕</button>
            <span className="text-[10px] font-mono tracking-[0.6em] text-brand-gold uppercase block mb-4">Official Entry</span>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-[0.1em]">エントリーシート</h2>
            <div className="mt-6 max-w-xl mx-auto space-y-2">
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                本シートはエントリー審査のために活用させていただきます。ご記入いただいた情報は秘密厳守いたします。
              </p>
              <p className="text-[11px] text-brand-gold/80 leading-relaxed font-sans font-bold">
                【条件】年商1,000万円以下の事業者（起業予定・会社員の方も含む）
              </p>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:30px_30px]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-8 md:p-16 space-y-20">
                
                {/* 01. 基本情報 */}
                <section>
                  <SectionTitle number="01" title="基本プロフィール" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">氏名</label>
                      <input required type="text" className="w-full bg-neutral-900/50 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" placeholder="お名前" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">メールアドレス</label>
                      <input required type="email" className="w-full bg-neutral-900/50 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" placeholder="example@mail.com" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">在住の都道府県エリア</label>
                      <input required type="text" className="w-full bg-neutral-900/50 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" placeholder="東京都" onChange={e => setFormData({...formData, area: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">区分</label>
                      <div className="flex gap-6 pt-3">
                        {['個人', '法人', '起業準備中', '会社員'].map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="entityType" value={type} checked={formData.entityType === type} onChange={e => setFormData({...formData, entityType: e.target.value})} className="hidden" />
                            <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${formData.entityType === type ? 'border-brand-gold bg-brand-gold' : 'border-neutral-700'}`}>
                              {formData.entityType === type && <div className="w-1 h-1 bg-black rounded-full" />}
                            </div>
                            <span className={`text-[11px] ${formData.entityType === type ? 'text-white' : 'text-neutral-500'} group-hover:text-brand-gold transition-colors`}>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 02. 事業実績 */}
                <section>
                  <SectionTitle number="02" title="事業内容と実績" />
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">販売商品・ジャンル</label>
                      <input required type="text" className="w-full bg-neutral-900/50 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" placeholder="情報商材、食品、雑貨など" onChange={e => setFormData({...formData, products: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">顧問やアドバイザリーの経験</label>
                        <select className="w-full bg-neutral-950 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" onChange={e => setFormData({...formData, hasAdvisor: e.target.value})}>
                          <option value="なし">なし</option>
                          <option value="過去にあった">過去にあった</option>
                          <option value="現在受けている">現在受けてしている</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">顧客数（2回以上購入されたリピーター数）</label>
                        <input type="text" className="w-full bg-neutral-900/50 border-b border-neutral-800 py-3 px-1 focus:border-brand-gold outline-none text-white text-sm transition-all" placeholder="例: 15名" onChange={e => setFormData({...formData, customerCount: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 03. 課題とスキル */}
                <section>
                  <SectionTitle number="03" title="課題と自己分析" />
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">得意なこと</label>
                        <textarea className="w-full bg-neutral-900/30 border border-neutral-800 p-4 focus:border-brand-gold outline-none text-white text-sm h-24 transition-all resize-none" placeholder="例: ライティング、共感を得ること" onChange={e => setFormData({...formData, strength: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">苦手なこと</label>
                        <textarea className="w-full bg-neutral-900/30 border border-neutral-800 p-4 focus:border-brand-gold outline-none text-white text-sm h-24 transition-all resize-none" placeholder="例: SNS運用、デザイン" onChange={e => setFormData({...formData, weakness: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">これまでの後悔</label>
                      <textarea className="w-full bg-neutral-900/30 border border-neutral-800 p-4 focus:border-brand-gold outline-none text-white text-sm h-24 transition-all resize-none" placeholder="事業や投資での後悔をご記入ください" onChange={e => setFormData({...formData, regrets: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">改善したいこと</label>
                      <textarea className="w-full bg-neutral-900/30 border border-neutral-800 p-4 focus:border-brand-gold outline-none text-white text-sm h-24 transition-all resize-none" placeholder="利益、事業モデル、セルフブランディングなど" onChange={e => setFormData({...formData, improvements: e.target.value})} />
                    </div>
                  </div>
                </section>

                <div className="pt-10">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-white text-brand-black text-[11px] font-bold tracking-[0.6em] uppercase hover:bg-brand-gold transition-all disabled:opacity-30 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{isSubmitting ? '送信中...' : 'エントリーする'}</span>
                    <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-32 px-12 text-center space-y-12 animate-fade-in">
                <div className="w-24 h-24 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                  <div className="absolute inset-0 bg-brand-gold/5 animate-ping rounded-full" />
                  <span className="text-4xl text-brand-gold">✓</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-bold text-white tracking-[0.2em] uppercase">提出完了</h2>
                  <p className="text-[11px] text-neutral-500 font-sans max-w-sm mx-auto leading-relaxed">
                    厳正なる審査の上、5営業日以内に事務局よりご連絡を差し上げます。<br />
                    今しばらくお待ちください。
                  </p>
                </div>
                <button onClick={onClose} className="px-16 py-4 border border-neutral-800 text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-500 hover:text-brand-gold hover:border-brand-gold transition-all">閉じる</button>
              </div>
            )}
          </div>
          
          <div className="p-8 border-t border-neutral-900 bg-neutral-950/50 flex justify-between items-center px-12">
             <span className="text-[8px] font-mono text-neutral-700 tracking-[0.4em] uppercase">Honest Marketing Club 2025</span>
             <span className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest italic">Encrypted Secure Entry</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityModal;