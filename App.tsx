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
  const [splashStep, setSplashStep] = useState<'hmc' | 'auth' | 'none'>('hmc');

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
      {splashStep === 'hmc' && (
        <HmcSplash onComplete={() => setSplashStep('auth')} />
      )}
      
      {splashStep === 'auth' && (
        <AuthGate onSuccess={() => setSplashStep('none')} />
      )}

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

                {/* Entry Section - Masterpiece Leather Edition */}
                <section className="py-40 md:py-60 px-6 relative flex flex-col items-center justify-center overflow-hidden">
                  {/* High-End Leather Texture Background */}
                  <div className="absolute inset-0 z-0 bg-[#080808]">
                    {/* Leather Pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay" style={{ 
                      backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-leather.png")',
                      backgroundSize: '300px'
                    }}></div>
                    {/* Dark Vignette & Shine */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.5)_0%,rgba(0,0,0,0.9)_100%)]"></div>
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]"></div>
                  </div>

                  <div className="max-w-4xl w-full space-y-20 relative z-10 text-center">
                    <div className="space-y-8">
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-xs md:text-sm font-mono tracking-[1em] text-brand-goldLight uppercase font-black block drop-shadow-[0_2px_10px_rgba(226,207,159,0.3)]">審査制コミュニティ</span>
                        <div className="w-16 h-px bg-brand-gold/40" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-[0.15em] leading-relaxed flex flex-col items-center justify-center gap-y-6">
                        <span>成長しあえる</span>
                        <div className="inline-flex items-baseline mx-6">
                          <span className="text-brand-gold font-display text-8xl md:text-[10rem] font-black leading-none drop-shadow-[0_0_35px_rgba(197,160,89,0.6)] bg-clip-text text-transparent bg-gradient-to-b from-brand-goldLight via-brand-gold to-brand-goldLight">20</span>
                          <span className="text-brand-gold text-2xl ml-4 font-sans font-black">名</span>
                        </div>
                        <span>と出会える場所へ</span>
                      </h2>
                    </div>

                    <div className="flex flex-col items-center gap-14">
                      {/* Deadline: Maximum Impact */}
                      <div className="px-10 py-5 bg-brand-black/80 border border-brand-gold/40 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(197,160,89,0.2)]">
                        <p className="text-brand-goldLight font-mono text-xl md:text-3xl tracking-[0.3em] md:tracking-[0.5em] uppercase font-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                          募集締切：2025年1月20日(月) 23:59まで
                        </p>
                      </div>

                      <div 
                        className="relative inline-block group perspective-2000 cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={handleOpenInvitation}
                      >
                        {/* 20% Bigger Card (md:294x176) with Premium Shine */}
                        <div 
                          className={`relative w-[210px] h-[130px] md:w-[324px] md:h-[194px] rounded-[2rem] overflow-hidden transition-all duration-1000 shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] border border-white/10 p-6 md:p-10 text-left ${isHovering ? 'scale-110 -translate-y-6 border-brand-gold/80' : 'scale-100'}`}
                          style={{
                            background: 'linear-gradient(135deg, #181818 0%, #030303 100%)'
                          }}
                        >
                          <div 
                            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                            style={{
                              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(197, 160, 89, 0.5) 0%, transparent 60%)`,
                              opacity: isHovering ? 0.8 : 0.3
                            }}
                          />
                          <div className="relative h-full flex flex-col justify-between z-10 transition-transform duration-700 group-hover:scale-[0.97]">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1.5">
                                <div className="text-[7px] md:text-[9px] font-mono text-brand-gold/80 tracking-widest uppercase leading-none font-black">Honest Marketing Club</div>
                                <div className="text-white font-display text-sm md:text-xl tracking-[0.2em] font-black leading-tight">コミュニティパス</div>
                              </div>
                              <div className="w-9 h-6 md:w-12 md:h-8 bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-goldLight rounded-lg shadow-2xl opacity-90 ring-1 ring-white/20" />
                            </div>
                            <div className="space-y-3">
                              <div className="text-brand-gold font-mono text-[7px] md:text-[10px] tracking-[0.4em] uppercase font-black flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                                OFFICIAL ACCESS
                              </div>
                              <div className="text-white font-display text-lg md:text-2xl tracking-[0.4em] font-black uppercase leading-none">エントリー</div>
                            </div>
                          </div>
                        </div>
                        {/* Shadow/Glow under card */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-brand-gold/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      </div>
                    </div>
                  </div>
                </section>

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

          <Footer onOpenModal={handleOpenInvitation} onViewChange={handleViewChange} currentView={view} />
          <EligibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      )}
      
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </div>
  );
};

export default App;