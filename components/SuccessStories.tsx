
import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';

interface SuccessStoriesProps {
  onBack: () => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleStory = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-48 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-32 space-y-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 text-[10px] font-bold text-neutral-400 hover:text-brand-gold transition-colors tracking-[0.4em] uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span> 
            Back to Home
          </button>
          
          <div className="h-12 w-px bg-brand-gold/30 mt-8" />
          
          <h1 className="text-4xl md:text-[clamp(2rem,5vw,5rem)] font-display font-bold text-brand-black tracking-tight uppercase [word-break:keep-all]">
            Success <span className="text-brand-gold">Stories.</span>
          </h1>
          <p className="text-sm text-neutral-500 font-sans tracking-[0.2em] font-medium max-w-lg mx-auto leading-relaxed">
            HMCの哲学が、いかに個人の知性を研磨し、<br className="hidden md:block" />具体的な成果へと結びついたのか。
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {REVIEWS.map((story, i) => (
            <div key={story.id} className="group flex flex-col h-full relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-[2.5rem] mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-brand-gold/10">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                   <div className="h-px w-12 bg-brand-gold mb-4" />
                   <p className="text-white text-xs font-mono tracking-widest uppercase leading-loose">
                     Case Study No. {String(i + 1).padStart(2, '0')}<br />
                     Strategic Partnership
                   </p>
                </div>
              </div>
              
              <div className="flex-1 space-y-6 px-4">
                <div className="flex flex-wrap gap-2">
                  {story.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-sans font-bold text-brand-black tracking-tight leading-snug [word-break:keep-all]">{story.storyTitle}</h3>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-4 bg-brand-gold" />
                    <p className="text-brand-gold font-display text-sm italic font-bold tracking-widest">{story.name}</p>
                  </div>
                </div>
                
                {/* Short Description or Expanded Content */}
                <div className="relative">
                  {expandedId === story.id ? (
                    <div className="space-y-5 animate-fade-in-content">
                       <div className="text-sm text-neutral-600 leading-relaxed font-sans font-light space-y-4 border-l-2 border-brand-gold/20 pl-4">
                          {story.content}
                       </div>
                    </div>
                  ) : (
                    <p className="text-neutral-500 text-sm leading-relaxed font-sans font-light">
                      {story.shortDescription}
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => toggleStory(story.id)}
                  className="text-[10px] font-bold text-brand-black tracking-[0.3em] uppercase border-b border-brand-black/20 hover:border-brand-gold hover:text-brand-gold transition-colors pb-1 inline-flex items-center gap-2"
                >
                  {expandedId === story.id ? 'Close Story' : 'Read Full Story'}
                  <span className={`transition-transform duration-500 ${expandedId === story.id ? 'rotate-180' : ''}`}>↓</span>
                </button>
              </div>

              <div className={`mt-8 mx-4 p-5 bg-neutral-50 border-l-2 border-brand-gold/60 transition-colors group-hover:bg-brand-gold/5 ${expandedId === story.id ? 'opacity-50' : ''}`}>
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">Key Result</p>
                <p className="text-[13px] font-bold text-brand-black leading-snug">{story.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-content {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-content {
          animation: fade-in-content 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;
