
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "コミュニティは有料ですか？",
    answer: "有料と無料があります。有料枠の詳細はPriceページ（価格表）をご参照ください。"
  },
  {
    id: 2,
    question: "有料コミュニティは何ができますか？",
    answer: "6ヶ月間のアドバイザリー契約となります。事業の壁打ちや無制限の個別相談、グループミーティング、各種勉強会（EC、ライティング、SNS）、マーケティング強化合宿、メンバーとのオフ会、ブランディング構築など、実践的な活動に取り組んでいただきます。"
  },
  {
    id: 3,
    question: "有料コミュニティはどこから参加できますか？",
    answer: "価格表にある「Honest Club（月額8万円）」よりお申し込みください。"
  },
  {
    id: 4,
    question: "無料参加はどこからできますか？",
    answer: "LINEオープンチャットグループがございます。どなたでも入室いただけます。"
  },
  {
    id: 5,
    question: "無料グループはなにをするのですか？",
    answer: "週に一度の個別相談（30分）、マーケティングノウハウの配信、不定期のオフ会などが主な活動です。"
  },
  {
    id: 6,
    question: "セルフプロデュースプランとはなんですか？",
    answer: "1ヶ月間かけてヒアリングやサービスの添削を行い、あなただけの「リッチプロフィールページ」の制作を進めていくプランです。（※有料コミュニティメンバーは、この制作費が特典として無料になります）"
  },
  {
    id: 7,
    question: "セルフプロデュースプランと有料コミュニティは料金別ですか？",
    answer: "いいえ、有料コミュニティ（Honest Club）のメンバー様は、セルフプロデュースプランの費用が含まれているため「無料」で制作可能です。"
  },
  {
    id: 8,
    question: "有料コミュニティの継続期間について教えてください。",
    answer: "基本契約期間は6ヶ月で終了となります。"
  },
  {
    id: 9,
    question: "なぜ少人数制なのですか？",
    answer: "コミュニケーション密度を高く、一人に一人にコミットするためです、大多数のオンラインサロンのように一方的に配信するのではなく、メンバー全員が戦友であり同志になる助け合って高め合える環境にしたかったんです。"
  },
  {
    id: 10,
    question: "なぜ審査制なのですか？",
    answer: "少人数制であるからというのもありますが、伸びそうなサービスや人物であることが審査基準で、お互いミスマッチしないようにする為です。"
  }
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-brand-black text-white py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-brand-gold"></span>
            <span className="text-brand-gold font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Common Questions</span>
            <span className="w-8 h-px bg-brand-gold"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight">よくある質問</h2>
        </div>

        <div className="space-y-px bg-neutral-900 border-y border-neutral-900">
          {FAQ_DATA.map((item) => (
            <div key={item.id} className="bg-brand-black overflow-hidden group">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between py-8 px-4 md:px-6 text-left transition-all duration-300 hover:bg-neutral-900/30"
                aria-expanded={openId === item.id}
              >
                <span className={`text-base md:text-lg font-sans font-medium tracking-wide transition-colors duration-300 pr-8 ${openId === item.id ? 'text-brand-gold' : 'text-white/90 group-hover:text-white'}`}>
                  {item.question}
                </span>
                
                <span className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: openId === item.id ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`block w-4 h-[1px] ${openId === item.id ? 'bg-brand-gold' : 'bg-neutral-500 group-hover:bg-white'} absolute`}
                  />
                  <motion.span
                    animate={{ rotate: openId === item.id ? 45 : 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`block w-4 h-[1px] ${openId === item.id ? 'bg-brand-gold' : 'bg-neutral-500 group-hover:bg-white'} absolute`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-4 md:px-6 pb-8 pt-0">
                      <div className="pl-0 md:pl-4 border-l-2 border-brand-gold/20">
                        <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed tracking-wide text-justify">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-neutral-500 font-sans tracking-widest">
            その他のご質問は、無料グループ内でもお答えしております。
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
