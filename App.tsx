
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import HWD from './components/HWD';
import MemberReview from './components/MemberReview';
import Letter from './components/Letter';
import Vision from './components/Vision';
import TableOfContents from './components/TableOfContents';
import EligibilityModal from './components/EligibilityModal';
import LineNavigator from './components/LineNavigator';
import SuccessStories from './components/SuccessStories';
import AiReviewSession from './components/AiReviewSession';
import Journal from './components/Journal';
import Provision from './components/Provision';
import IdealMembers from './components/IdealMembers';
import RichProfile from './components/RichProfile';
import Footer from './components/Footer';
import LegalDisclosure from './components/LegalDisclosure';
import PricingSection from './components/PricingSection';
import Consultation from './components/Consultation';
import SelfProduce from './components/SelfProduce';
import Story from './components/Story';
import FAQ from './components/FAQ';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [view, setView] = useState<'home' | 'stories' | 'ai-review' | 'journal' | 'legal' | 'self-produce' | 'story'>('home');
  
  useEffect(() => {
    // ページ遷移時にトップへ戻る（ただしハッシュがある場合はハッシュ処理に任せる）
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [view]);

  // URLハッシュに基づく初期表示とスクロール制御
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const viewMap: Record<string, typeof view> = {
        'stories': 'stories',
        'ai-review': 'ai-review',
        'journal': 'journal',
        'legal': 'legal',
        'self-produce': 'self-produce',
        'story': 'story'
      };

      const targetView = viewMap[hash];

      if (targetView) {
        // 特定のビュー（ページ）に該当する場合
        if (view !== targetView) setView(targetView);
        // ビュー切り替え後のレンダリング待ち
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo(0, 0);
        }, 100);
      } else {
        // ホーム画面内のセクション（reviews, price, provisionなど）の場合
        if (view !== 'home') {
          setView('home');
          // ホーム画面への切り替え待ち
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          // 既にホーム画面にいる場合
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // 初回ロード時
    handleHashChange();

    // ハッシュ変更時
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [view]); // viewの変更も監視し、適切なタイミングでスクロールを実行できるようにする

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleOpenInvitation = () => {
    setIsModalOpen(true);
  };

  const handleViewChange = (newView: 'home' | 'stories' | 'ai-review' | 'journal' | 'legal' | 'self-produce' | 'story') => {
    setView(newView);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#AF9662] selection:text-white bg-white text-brand-black">
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

            <section className="py-24 px-6 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
              <div className="max-w-4xl w-full space-y-12 relative text-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-[0.8em] text-[#AF9662] uppercase font-bold block animate-pulse">審査制コミュニティ</span>
                  <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-[0.15em] leading-relaxed flex items-center justify-center flex-wrap gap-y-2 [word-break:keep-all]">
                    成長しあえる
                    <span className="inline-flex items-baseline mx-4">
                      <span className="text-[#AF9662] font-display text-5xl md:text-6xl font-semibold leading-none drop-shadow-[0_0_15px_rgba(175,150,98,0.3)]">5</span>
                      <span className="text-[#AF9662] text-sm ml-2 font-sans transform -translate-y-0.5">名</span>
                    </span>
                    と出会える場所へ
                  </h2>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-[#AF9662] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
                    募集締切：2025年2月5日(水) 23:59まで
                  </p>
                  <div 
                    className="relative inline-block group perspective-1000 cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handleOpenInvitation}
                  >
                    <div 
                      className={`relative w-[157px] h-[98px] md:w-[245px] md:h-[147px] rounded-xl overflow-hidden transition-all duration-1000 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-neutral-800 p-4 md:p-6 text-left ${isHovering ? 'scale-110 -translate-y-2 border-[#AF9662]/40' : 'scale-100'}`}
                      style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
                      }}
                    >
                      <div 
                        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                        style={{
                          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(175, 150, 98, 0.4) 0%, transparent 60%)`,
                          opacity: isHovering ? 0.6 : 0.2
                        }}
                      />
                      <div className="relative h-full flex flex-col justify-between z-10 transition-transform duration-700 group-hover:scale-[0.98]">
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <div className="text-[5px] md:text-[7px] font-mono text-[#AF9662]/60 tracking-widest uppercase leading-none">Honest Marketing Club</div>
                            <div className="text-white/90 font-display text-[10px] md:sm tracking-[0.2em] font-bold leading-tight">コミュニティパス</div>
                          </div>
                          <div className="w-6 h-4 md:w-9 md:h-6 bg-gradient-to-br from-[#D7BE82] via-[#AF9662] to-[#D7BE82] rounded shadow-inner opacity-90" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-[#AF9662] font-mono text-[5px] md:text-[7px] tracking-[0.4em] uppercase font-bold flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#AF9662] animate-pulse" />
                            OFFICIAL ACCESS
                          </div>
                          <div className="text-white font-display text-xs md:text-base tracking-[0.3em] font-bold uppercase leading-none">参加する</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <LineNavigator />
            <Curriculum />
            <HWD />
            <Provision onNavigateToSelfProduce={() => handleViewChange('self-produce')} />
            <RichProfile onNavigateToSelfProduce={() => handleViewChange('self-produce')} />
            <IdealMembers />
            <PricingSection />
            <FAQ />
            <Consultation />
          </>
        ) : view === 'stories' ? (
          <SuccessStories onBack={() => setView('home')} />
        ) : view === 'ai-review' ? (
          <AiReviewSession onBack={() => setView('home')} onOpenEntry={handleOpenInvitation} />
        ) : view === 'journal' ? (
          <Journal onBack={() => setView('home')} />
        ) : view === 'legal' ? (
          <LegalDisclosure onBack={() => setView('home')} />
        ) : view === 'self-produce' ? (
          <SelfProduce 
            onBack={() => setView('home')} 
            onOpenModal={handleOpenInvitation} 
            onNavigateToStory={() => handleViewChange('story')}
          />
        ) : (
          <Story onBack={() => setView('home')} />
        )}
      </main>

      <Footer 
        onOpenModal={handleOpenInvitation} 
        onViewChange={handleViewChange} 
        currentView={view} 
      />

      <EligibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
