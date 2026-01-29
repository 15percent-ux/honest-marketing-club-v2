
import React from 'react';

// Added 'self-produce' and 'story' to the view type union to align with App.tsx's view state and resolve the type mismatch error.
interface FooterProps {
  onOpenModal: () => void;
  onViewChange: (view: 'home' | 'stories' | 'ai-review' | 'journal' | 'legal' | 'self-produce' | 'story') => void;
  currentView: 'home' | 'stories' | 'ai-review' | 'journal' | 'legal' | 'self-produce' | 'story';
}

const Footer: React.FC<FooterProps> = ({ onOpenModal, onViewChange, currentView }) => {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'コンテンツ', href: 'provision' },
    { label: '参加者の声', href: 'stories', isPage: true, view: 'stories' as const },
    { label: '公開添削会', href: 'ai-review', isPage: true, view: 'ai-review' as const },
    { label: 'ジャーナル', href: 'journal', isPage: true, view: 'journal' as const },
    { label: '入会条件', href: 'ideal-members' },
    { label: '料金', href: 'pricing' },
    { label: '特定商取引法に基づく表記', href: 'legal', isPage: true, view: 'legal' as const }
  ];

  return (
    <footer className="py-24 md:py-32 px-8 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-black flex items-center justify-center">
                <span className="text-white font-bold text-xs font-mono">HMC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-[0.1em] text-lg text-brand-black uppercase leading-none">
                  Honest Marketing Club Stars.
                </span>
                <span className="text-[10px] text-brand-gold font-mono tracking-widest uppercase mt-1">Authentic Branding Collective</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-[2] max-w-sm">
              煽らない。安売りしない。自らの知性を「売れる武器」へと変え、誠実に、かつ大胆に市場を動かす。5名限定の特別な場所。
            </p>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-mono font-bold text-brand-black tracking-[0.4em] uppercase border-b border-neutral-100 pb-4">Navigation</h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={(e) => {
                      if (item.isPage) {
                        onViewChange(item.view);
                      } else {
                        handleNavClick(e, item.href);
                      }
                    }}
                    className="text-[11px] font-bold text-neutral-500 hover:text-brand-gold transition-colors tracking-[0.2em] uppercase text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-8">
            <h4 className="text-[10px] font-mono font-bold text-brand-black tracking-[0.4em] uppercase border-b border-neutral-100 pb-4">Join Us</h4>
            <div className="space-y-6">
              <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                現在、第0期メンバーを募集中です。
              </p>
              <div className="flex flex-col items-start gap-4">
                <p className="text-[10px] text-brand-gold font-bold tracking-widest">募集締切：2月5日(水) 23:59まで</p>
                <button
                  onClick={onOpenModal}
                  className="group relative inline-flex items-center gap-6 px-10 py-4 bg-brand-black text-white text-[10px] font-bold tracking-[0.4em] uppercase overflow-hidden shadow-xl transition-all"
                >
                  <span className="relative z-10">参加する</span>
                  <div className="absolute inset-0 bg-brand-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-mono text-neutral-300 tracking-[0.4em] uppercase">Honest Marketing Club 2025-2026</span>
            <span className="w-12 h-px bg-neutral-100 hidden md:block"></span>
            <button 
              onClick={() => {
                onViewChange('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[8px] font-mono text-neutral-400 hover:text-brand-gold transition-colors uppercase tracking-[0.4em]"
            >
              Back to Top ↑
            </button>
          </div>
          
          <div className="flex gap-4">
            <span className="text-[9px] text-neutral-300 font-sans tracking-widest uppercase">Tokyo / Fukuoka / Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
