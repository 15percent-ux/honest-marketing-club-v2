
import React from 'react';

interface SuccessStoriesProps {
  onBack: () => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ onBack }) => {
  const stories = [
    {
      title: "アパレルブランドの再定義",
      name: "AYAMI",
      result: "自分自身の『価値の方程式』を確立",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815319/0hYRkn7WqnBn1GFxQ2Ahh4AjZHBRdlZl9vaHFAHXBHDR14JxZ7OXIZSCcUXEovI0EpaXAeTnQUD01KBHEbWEH6SUEnWEp_IEgtaXdImQ_gwe8qo.jpg",
      tags: ["セルフブランディング", "ビジュアル設計"],
      description: "フリーランスデザイナーとして、アイコンひとつから世界観を再構築。自分の視点では気づけなかった「本来の価値」を言語化し、照れずに堂々とブランディングできる体制を確立。"
    },
    {
      title: "高額講座の即日満席",
      name: "KEICHAN",
      result: "提供価値に合わせた価格適正化",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/559719606_18082260113488480_9103706004784034476_n_tnbj3h.jpg",
      tags: ["価格戦略", "顧客心理"],
      description: "「安すぎる」という指摘から始まった価格改定。心理的障壁を乗り越え、本来提供すべき価値に見合った価格へ設定し直した結果、顧客満足度を維持したまま即日満席を達成。"
    },
    {
      title: "年商2000万円の壁を突破",
      name: "KOFUMI",
      result: "生き残るための本質的戦略の導入",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518385/rectangle_large_type_2_c53794ac4a74726b7f5847245dd337b3_xjxntr.webp",
      tags: ["事業拡大", "マインドセット"],
      description: "専業主婦からの起業初期段階でHMCの『価値の方程式』を導入. 単なるノウハウではなく「生き残るための戦略」を基盤に据え、2年で年商2000万円を突破する事業へ成長。"
    },
    {
      title: "ポップアップで週間300万を達成",
      name: "REII",
      result: "潜在意識と価値が一致した瞬間の飛躍",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133470/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.24.18_x3xsmm.png",
      tags: ["プロダクト価値", "対面販売戦略"],
      description: "自身の強みと価格設定のあやふやさを壁打ちで整理。潜在意識が「価値」に追いついたとき、1週間のポップアップでこれまでの2倍となる300万円という驚異的な売上を記録。"
    },
    {
      title: "会社員卒業、個人事業主への転身",
      name: "RINRIN",
      result: "仲間の背中が変えた人生の選択",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815239/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-04_18.59.16_xedy7u.png",
      tags: ["キャリアシフト", "コミュニティ"],
      description: "会社員を続けながらの模索期。「スナックオミ」など密な交流を通じて信頼関係と仕事を獲得。仲間の活躍に勇気をもらい、長年手放せなかった会社員を卒業し独立を果たした。"
    },
    {
      title: "日本最大級アワードで2部門入賞",
      name: "AOKI",
      result: "客観的視点が導いた社会的証明",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767518135/143205-14-e0e21d8a880f15d24a668e3da39ff7d7-735x735_ubxz6j.webp",
      tags: ["実績構築", "プロデュース論"],
      description: "ビジネスカンファレンス（ICC）初出場で2部門2位を獲得. オミ氏の感情に流されない論理的かつ具体的なアドバイスが、プレゼンの精度と事業の説得力を極限まで高めた。"
    },
    {
      title: "孤独な挑戦から『縁の財産』へ",
      name: "COCO",
      result: "等身大の自分を受け入れる成長",
      image: "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767133201/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-12-31_7.19.50_ky3txe.png",
      tags: ["対話", "共創マインド"],
      description: "おごらず、比較せず、自分のサイズを素直に受け入れる場の重要性。同じ熱量を持つ仲間との対話を通じ、ビジネスの成果を超えた「生涯続く縁」という無形の財産を獲得。"
    }
  ];

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
          {stories.map((story, i) => (
            <div key={i} className="group flex flex-col h-full">
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
                  <h3 className="text-2xl font-sans font-bold text-brand-black tracking-tight leading-snug [word-break:keep-all]">{story.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-4 bg-brand-gold" />
                    <p className="text-brand-gold font-display text-sm italic font-bold tracking-widest">{story.name}</p>
                  </div>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-sans font-light">
                  {story.description}
                </p>
              </div>

              <div className="mt-8 mx-4 p-5 bg-neutral-50 border-l-2 border-brand-gold/60 transition-colors group-hover:bg-brand-gold/5">
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">Key Result</p>
                <p className="text-[13px] font-bold text-brand-black leading-snug">{story.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
