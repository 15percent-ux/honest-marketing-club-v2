
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REVIEWS } from '../data/reviews';

gsap.registerPlugin(ScrollTrigger);

const MemberReview: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(".review-item-wrapper", { opacity: 0, y: 80 });

      // 2. Title Entrance
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // 3. Staggered Entrance
      gsap.to(".review-item-wrapper", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      });

      // 4. Background Orbs Animation
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? "20%" : "-20%",
          x: i % 3 === 0 ? "15%" : "-15%",
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="bg-white py-32 md:py-48 px-6 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={el => { orbRefs.current[0] = el; }} className="absolute top-[5%] -left-[5%] w-[55vw] h-[55vw] bg-indigo-50/50 rounded-full blur-[130px]" />
        <div ref={el => { orbRefs.current[1] = el; }} className="absolute bottom-[5%] -right-[5%] w-[55vw] h-[55vw] bg-brand-gold/5 rounded-full blur-[130px]" />
        <div ref={el => { orbRefs.current[2] = el; }} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[45vw] h-[45vw] bg-rose-50/25 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-24 space-y-4">
          <span className="text-brand-gold font-mono text-[11px] font-bold tracking-[0.5em] uppercase block">Member Reviews</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-black tracking-tight uppercase">
            参加者の声
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto mt-8" />
        </div>

        {/* Reviews Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className={`review-item-wrapper relative transition-all duration-700 
                ${expandedId && expandedId !== review.id ? 'opacity-20 blur-[2px] scale-95' : 'opacity-100'}`}
            >
              <div 
                onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                className="group relative flex flex-col items-center p-10 bg-white/70 backdrop-blur-xl border border-neutral-100 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-2xl hover:border-brand-gold/40 transition-all duration-500 w-full"
              >
                {/* Profile Photo */}
                <div className="relative mb-10">
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${review.gradient} rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  
                  <div 
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-neutral-100 ring-1 ring-black/5"
                    style={{ 
                      maskImage: '-webkit-radial-gradient(white, black)', 
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      isolation: 'isolate' 
                    }}
                  >
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out will-change-transform" 
                    />
                  </div>
                </div>
                
                <div className="text-center space-y-5 flex-1">
                  <div>
                    <p className="text-xl font-sans font-bold text-brand-black mb-1">{review.name}</p>
                    <div className="text-[10px] font-sans text-brand-gold tracking-[0.25em] font-bold uppercase min-h-[40px] flex items-center justify-center">
                      {review.role}
                    </div>
                  </div>
                  
                  <div className="h-px w-10 bg-neutral-100 mx-auto" />
                  
                  <div className="min-h-[120px] flex items-center justify-center px-2">
                    <p className="text-sm md:text-base leading-relaxed tracking-tight italic text-brand-black font-sans font-medium">
                      {review.highlight}
                    </p>
                  </div>

                  <div className="pt-6">
                    <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full border text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 
                      ${expandedId === review.id ? 'bg-brand-black text-white' : 'bg-transparent border-neutral-200 text-neutral-400 group-hover:border-brand-gold group-hover:text-brand-gold'}`}>
                      {expandedId === review.id ? 'Close' : 'Full Story'}
                      <span className="text-xs transition-transform duration-700 group-hover:translate-x-1">{expandedId === review.id ? '✕' : '→'}</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                {expandedId === review.id && (
                  <div className="mt-10 pt-10 border-t border-neutral-100 animate-slide-up text-left w-full">
                    <div className="text-sm text-neutral-600 leading-relaxed space-y-5 font-sans font-light">
                      {review.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 6s infinite linear;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default MemberReview;
