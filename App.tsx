import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Curriculum from './components/Curriculum.tsx';
import HWD from './components/HWD.tsx';
import MemberReview from './components/MemberReview.tsx';
import Letter from './components/Letter.tsx';
import Vision from './components/Vision.tsx';
import TableOfContents from './components/TableOfContents.tsx';
import EligibilityModal from './components/EligibilityModal.tsx';
import InteractiveIntro from './components/InteractiveIntro.tsx';
import LineNavigator from './components/LineNavigator.tsx';
import HmcSplash from './components/HmcSplash.tsx';
import AuthGate from './components/AuthGate.tsx';
import SuccessStories from './components/SuccessStories.tsx';
import AiReviewSession from './components/AiReviewSession.tsx';
import Provision from './components/Provision.tsx';
import IdealMembers from './components/IdealMembers.tsx';
import Footer from './components/Footer.tsx';
import LegalDisclosure from './components/LegalDisclosure.tsx';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [view, setView] = useState<'home' | 'stories' | 'ai-review' | 'legal'>('home');
  
  // スプラッシュ画面の管理
  const [splashStep, setSplashStep] = useState<'hmc' | 'auth' | 'none'>('hmc');

  // ページ切り替え時にトップへスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleOpenInvitation = () => {
    setIsModalOpen(true);
  };

  const handleViewChange = (newView: 'home' | 'stories' | 'ai-review' | 'legal') => {
    setView(newView);
  };

  return (
    <div className="relative min-h-screen selection:bg-brand-gold selection:text-white bg-white text-brand-black">
      {/* Splash Sequence */}
      {splashStep === 'hmc' && (
        <HmcSplash onComplete={() => setSplashStep('auth')} />
      )}
      
      {splashStep === 'auth' && (
        <AuthGate onSuccess={() => setSplashStep('none')} />
      )}

      {/* Main Content */}
      {splashStep === 'none' && (
        <>
          <Navbar onOpenModal={handleOpenInvitation} onViewChange={handleViewChange} currentView={view} />
          <main className="animate-fade-in">
            {view === 'home' ? (
              <>
                <Hero />
                <div className="w-full h-px bg-neutral-100" />
                <Letter />
                <Vision />
                <MemberReview />
                <TableOfContents />

                {/* Entry Section */}
                <section className="py-24 px-6 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
                  <div className="max-w-4xl w-full space-y-12 relative text-center">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono tracking-[0.8em] text-brand-gold uppercase font-bold block animate-pulse">審査制コミュニティ</span>
                      <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-[0.15em] leading-relaxed flex items-center justify-center flex-wrap gap-y-2">
                        成長しあえる
                        <span className="inline-flex items-baseline mx-4">
                          <span className="text-brand-gold font-display text-5xl md:text-6xl font-semibold leading-none drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">20</span>
                          <span className="text-brand-gold text-sm ml-2 font-sans transform -translate-y-0.5">名</span>
                        </span>
                        と出会える場所へ
                      </h2>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <p className="text-brand-gold font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
                        募集締切：2025年1月20日(月) 23:59まで
                      </p>
                      <div 
                        className="relative inline-block group perspective-1000 cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={handleOpenInvitation}
                      >
                        <div 
                          className={`relative w-[157px] h-[98px] md:w-[245px] md:h-[147px] rounded-xl overflow-hidden transition-all duration-1000 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-neutral-800 p-4 md:p-6 text-left ${isHovering ? 'scale-110 -translate-y-2 border-brand-gold/40' : 'scale-100'}`}
                          style={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
                          }}
                        >
                          <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                            style={{
                              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(197, 160, 89, 0.4) 0%, transparent 60%)`,
                              opacity: isHovering ? 0.6 : 0.2
                            }}
                          />
                          <div className="relative h-full flex flex-col justify-between z-10 transition-transform duration-700 group-hover:scale-[0.98]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <div className="text-[5px] md:text-[7px] font-mono text-brand-gold/60 tracking-widest uppercase leading-none">Honest Marketing Club</div>
                                <div className="text-white/90 font-display text-[10px] md:text-sm tracking-[0.2em] font-bold leading-tight">コミュニティパス</div>
                              </div>
                              <div className="w-6 h-4 md:w-9 md:h-6 bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-goldLight rounded shadow-inner opacity-90" />
                            </div>
                            <div className="space-y-1.5">
                              <div className="text-brand-gold font-mono text-[5px] md:text-[7px] tracking-[0.4em] uppercase font-bold flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
                                OFFICIAL ACCESS
                              </div>
                              <div className="text-white font-display text-xs md:text-base tracking-[0.3em] font-bold uppercase leading-none">エントリー</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <InteractiveIntro />
                <LineNavigator />
                <Curriculum />
                <HWD />
                <Provision />
                <IdealMembers />
              </>
            ) : view === 'stories' ? (
              <SuccessStories onBack={() => setView('home')} />
            ) : view === 'ai-review' ? (
              <AiReviewSession onBack={() => setView('home')} onOpenEntry={handleOpenInvitation} />
            ) : (
              <LegalDisclosure onBack={() => setView('home')} />
            )}
          </main>

          <Footer 
            onOpenModal={handleOpenInvitation} 
            onViewChange={handleViewChange} 
            currentView={view} 
          />

          <EligibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      )}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;