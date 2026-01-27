
import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

const SITES = [
  {
    id: 'site-a',
    title: '魚勝商店 / 麹王子',
    url: 'https://koujiouji.vercel.app/',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1769342204/koujiouji_product_wiwtqw.png',
    category: 'Brand Identity',
    accent: '伝承と革新の融合'
  },
  {
    id: 'site-b',
    title: 'Honest Marketing Club V2',
    url: 'https://honest-marketing-club-v2.vercel.app/',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1769342202/honest_marketing_product_u0beum.png',
    category: 'Digital Collective',
    accent: '誠実な戦略の拠点'
  },
  {
    id: 'site-c',
    title: 'Rinrin Photo Studio',
    url: 'https://rinrin-photo.vercel.app/',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1769342202/rinrin_product_e3ghah.png',
    category: 'Visual Branding',
    accent: '本質を写し出す'
  },
  {
    id: 'site-d',
    title: 'Keichan / Coaching',
    url: 'https://keichan.vercel.app/',
    image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1769342203/keichan_product_p7es05.png',
    category: 'Personal Produce',
    accent: '私らしさを武器に変える'
  }
];

const PortfolioGallery: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<typeof SITES[0] | null>(null);

  return (
    <section className="py-24 md:py-40 px-6 bg-brand-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-brand-gold"></span>
            <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.5em] uppercase">Produced Archives</span>
          </div>
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-sans font-bold text-white tracking-tight leading-tight [word-break:keep-all] font-feature-palt">
            制作実績：<span className="text-white">プロダクト・ショーケース</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/60 leading-[1.6] font-light text-justify font-feature-palt tracking-[-0.01em] max-w-2xl">
            ディレクション、デザイン、ライティング。全ての工程において「美意識」と「戦略」を両立させた、one scene チームによる成果物の一部をご紹介します。画像をクリックすると、実際のサイトを閲覧可能です。
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {SITES.map((site) => (
            <div 
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="group cursor-pointer space-y-6"
            >
              {/* Card Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-900/50 border border-white/5 transition-all duration-700 hover:border-brand-gold/40 hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] group-hover:-translate-y-2">
                <img 
                  src={site.image} 
                  alt={site.title} 
                  className="w-full h-full object-contain grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-px bg-brand-gold" />
                    <span className="text-[9px] font-mono text-brand-gold font-bold tracking-widest uppercase">Open Live Site</span>
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-brand-gold font-mono text-[9px] font-bold tracking-[0.3em] uppercase">{site.category}</span>
                  <span className="text-white/30 font-sans text-[10px] italic">{site.accent}</span>
                </div>
                <h4 className="text-xl font-bold text-white font-feature-palt transition-colors group-hover:text-brand-gold">
                  {site.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GalleryModal 
        isOpen={!!selectedSite} 
        onClose={() => setSelectedSite(null)} 
        url={selectedSite?.url || ''} 
        title={selectedSite?.title || ''} 
      />

      <style>{`
        .font-feature-palt {
          font-feature-settings: "palt";
        }
        .text-justify {
          text-align: justify;
          text-justify: inter-character;
        }
      `}</style>
    </section>
  );
};

export default PortfolioGallery;
