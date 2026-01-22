
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
  onViewChange: (view: 'home' | 'stories' | 'ai-review' | 'journal' | 'legal') => void;
  currentView: 'home' | 'stories' | 'ai-review' | 'journal' | 'legal';
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onViewChange, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'コンテンツ', href: 'provision' },
    { label: '参加者の声', href: 'stories', isPage: true, view: 'stories' as const },
    { label: '公開添削会', href: 'ai-review', isPage: true, view: 'ai-review' as const },
    { label: 'ジャーナル', href: 'journal', isPage: true, view: 'journal' as const },
    { label: '入会条件', href: 'ideal-members' },
    { label: '料金', href: 'pricing' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMenuOpen ? 'py-4 glass border-b border-neutral-200/40 shadow-sm' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div 
            className="group flex items-center gap-4 cursor-pointer relative z-[110]" 
            onClick={() => {
              onViewChange('home');
              setIsMenuOpen(false);
            }}
          >
            <div className="relative w-10 h-10 bg-brand-black flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
              <span className="text-brand-white font-bold text-[10px] font-mono relative z-10">HMC</span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display font-bold tracking-[0.1em] text-[13px] text-brand-black uppercase leading-none">
                Honest Marketing Club Stars.
              </span>
              <div className="flex gap-1 mt-1 opacity-80">
                <span className="text-[8px] text-brand-black">★</span>
                <span className="text-[8px] text-brand-black">★</span>
                <span className="text-[8px] text-brand-black">★</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={(e) => {
                  if (item.isPage) {
                    onViewChange(item.view);
                    setIsMenuOpen(false);
                  } else {
                    handleNavClick(e, item.href);
                  }
                }}
                className={`relative text-[11px] font-bold tracking-[0.2em] transition-colors duration-300 group ${currentView === (item.isPage ? item.view : 'home') && !(!item.isPage && currentView === 'home') ? 'text-brand-gold' : 'text-neutral-500 hover:text-brand-black'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${currentView === (item.isPage ? item.view : 'home') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
            <button 
              onClick={onOpenModal}
              className="relative px-8 py-3 bg-brand-black text-brand-white text-[10px] tracking-[0.2em] font-bold overflow-hidden group"
            >
              <span className="relative z-10">参加する</span>
              <div className="absolute inset-0 bg-brand-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
          
          <button 
            className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-brand-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-brand-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-6 h-0.5 bg-brand-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-12">
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={(e) => {
                  if (item.isPage) {
                    onViewChange(item.view);
                    setIsMenuOpen(false);
                  } else {
                    handleNavClick(e, item.href);
                  }
                }}
                className={`text-2xl font-display font-bold tracking-widest transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${currentView === (item.isPage ? item.view : 'home') ? 'text-brand-gold' : 'text-brand-black'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="w-12 h-px bg-brand-gold" />
          
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenModal();
            }}
            className="px-12 py-4 bg-brand-black text-white text-xs font-bold tracking-[0.4em] uppercase"
          >
            参加する
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
