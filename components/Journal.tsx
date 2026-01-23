
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Article {
  id: string;
  date: string;
  category: string;
  title: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: 'price-truth',
    date: '2025.01.10',
    category: 'Strategy',
    title: '適正価格で売れる力の真実。',
    excerpt: '価格を上げられないのは、自分の価値が唯一無二である “確信” がまだ育っていないから。才能はいらない。必要なのは「実践」と「振り返り」だけ。',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    content: (
      <div className="space-y-12 py-10 text-brand-black">
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-bold leading-relaxed [word-break:keep-all]">
            適正価格で売れる力の真実
          </p>
          <p className="text-lg md:text-xl font-bold opacity-80">
            自分のサービスに“適正価格”をつけ、堂々と受け取れるようになる力
          </p>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■「値段を上げられない本当の理由」
          </h3>
          <div className="space-y-4 leading-loose">
            <p>多くの人は「勇気がない」「自信がない」<br />だから値段を上げられないと思っています。</p>
            <p>でも僕は、違うと思っている。</p>
            <p>
              価格を上げられないのは、<br />
              自分の価値が唯一無二である “確信” がまだ育っていないからです。
            </p>
            <p>そしてその確信は、才能やセンスではなく、</p>
            <p className="text-xl font-bold border-l-4 border-brand-gold pl-6 py-2">
              圧倒的な検証と答え合わせ
            </p>
            <p>からしか生まれません。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ 実例：才能は最初からあった。でも「価値」は自覚できていなかった
          </h3>
          <div className="space-y-4 leading-loose">
            <p>ある方がいました。</p>
            <p>
              人にはない特殊な感覚を持ち、<br />
              相手の深い部分を読み解き、<br />
              人生を大きく動かしてしまう力がある方でした。
            </p>
            <p>でもその力を仕事にしていなかった。<br />なぜなら、</p>
            <p className="italic">
              いくらで売れば良いのか分からない<br />
              自信がない<br />
              お金をもらうのが怖い
            </p>
            <p>そう思っていたからです。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ 最初の一歩：小さな検証から始まる
          </h3>
          <div className="space-y-4 leading-loose">
            <p>そこで僕は提案しました。</p>
            <p>まずは紹介制で数名だけやってみませんか？<br />安い価格でいい。外に出してみよう。</p>
            <p>最初は恐る恐る。<br />でも、やってみると…想像を超える感謝を受け取った。</p>
            <p>その瞬間、本人の中に小さな火が灯ったんです。</p>
            <p className="font-bold italic">「あれ…？私の提供していることって、価値ある…？」</p>
            <p>ここからがスタート。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ 変化の本質：検証 → 振り返り → 気づき
          </h3>
          <div className="space-y-4 leading-loose">
            <p>僕たちは何度も壁打ちをしました。</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>なにを提供した？</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>相手はどんな反応だった？</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>どの言葉が響いていた？</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>自分はどう感じた？</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>どのぐらいの価値を渡せた？</li>
            </ul>
            <p>つまり答え合わせの習慣です。</p>
            <p>その繰り返しで、<br />言葉ではなく感覚で理解できる領域に入ります。</p>
            <p className="text-lg font-bold">「あ、私の価値は本物なんだ。」</p>
            <p>それが腹に落ちた時、はじめて人は価格を上げられる。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ そして、10倍の価格へ
          </h3>
          <div className="space-y-4 leading-loose">
            <p>少しずつ価格を上げ、<br />反応を見て、<br />また答え合わせを繰り返す。</p>
            <p>やがて、</p>
            <p className="text-xl font-bold text-brand-gold">“10倍の価格”でも感謝される</p>
            <p>というステージに到達しました。</p>
            <p>彼女の中で恐怖心は消え、<br />代わりに揺るぎない自信と使命感が宿っていました。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ 気づき：唯一無二は「才能」ではなく「検証」で作られる
          </h3>
          <div className="space-y-4 leading-loose">
            <p>このプロセスを見て、確信しました。</p>
            <p>
              唯一無二は生まれながらのものじゃない。<br />
              圧倒的な検証量が、自信と価値観と価格をつくる。
            </p>
            <p>
              勇気は必要ない。<br />
              正しい答え合わせを繰り返せば、<br />
              価格は自然と上がっていく。
            </p>
            <p>逆に言うと、</p>
            <p className="font-bold">「検証せずに価格をつけようとするから苦しくなる」</p>
            <p>だけなんです。</p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ だからオネマでは
          </h3>
          <div className="space-y-4 leading-loose">
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>試す場がある</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>返ってくるフィードバックがある</li>
              <li className="flex items-start gap-3"><span className="text-brand-gold">•</span>それを共に読み解く環境がある</li>
            </ul>
            <p>
              一人で不安に耐えるのではなく、<br />
              答え合わせしながら前に進める。
            </p>
            <p>
              それが“価格の恐怖”を消し、<br />
              唯一無二の自分へと成長させる。
            </p>
          </div>
          <div className="text-neutral-200 py-4 font-light">⸻</div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            ■ 最後に
          </h3>
          <div className="space-y-4 leading-loose">
            <p>適正価格とは、戦略論や心理テクニックではありません。</p>
            <p>「これで良い」と胸を張れる自分になること。</p>
            <p>その状態に辿り着く手段はただひとつ。</p>
            <p className="text-xl font-bold">圧倒的な検証と答え合わせ。</p>
            <p>才能はいらない。<br />必要なのは「実践」と「振り返り」だけ。</p>
            <p>
              それを共にやっていくのが<br />
              オネストマーケティングです。
            </p>
          </div>
        </section>
      </div>
    )
  }
];

interface JournalProps {
  onBack: () => void;
}

const Journal: React.FC<JournalProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".journal-header", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      gsap.from(".article-card", {
        scrollTrigger: {
          trigger: ".article-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [selectedArticle]);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-48 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="group flex items-center gap-4 text-[10px] font-bold text-neutral-400 hover:text-brand-gold transition-all tracking-[0.4em] uppercase mb-16"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span> 
            Back to Journal
          </button>

          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-brand-gold font-mono text-[11px] font-bold tracking-[0.5em] uppercase">{selectedArticle.category} — {selectedArticle.date}</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-black leading-tight [word-break:keep-all]">
                {selectedArticle.title}
              </h1>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={selectedArticle.image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="animate-reveal-up" style={{ animationDelay: '0.4s' }}>
              {selectedArticle.content}
            </div>

            <div className="pt-20 text-center">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-16 py-6 bg-brand-black text-white text-[11px] font-bold tracking-[0.5em] uppercase rounded-full hover:bg-brand-gold transition-all shadow-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-32 pb-48 px-6 animate-fade-in relative overflow-hidden">
      {/* Abstract Background Lines */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/4 -z-0" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-neutral-100 -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="journal-header text-center mb-32 space-y-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 text-[10px] font-bold text-neutral-400 hover:text-brand-gold transition-all tracking-[0.4em] uppercase mx-auto mb-12"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span> 
            Back to Home
          </button>
          
          <span className="text-brand-gold font-mono text-[11px] font-bold tracking-[0.5em] uppercase block">Thinking Archive</span>
          <h1 className="text-4xl md:text-[clamp(2.5rem,5vw,5rem)] font-display font-bold text-brand-black tracking-tight leading-none uppercase">
            The Journal<span className="text-brand-gold">.</span>
          </h1>
          <p className="text-sm text-neutral-400 font-sans tracking-[0.2em] font-medium max-w-lg mx-auto leading-relaxed">
            マーケティングを哲学する。<br />HMC Starsの思想を深く掘り下げる記録。
          </p>
        </div>

        <div className="article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {ARTICLES.map((article) => (
            <div 
              key={article.id} 
              className="article-card group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-xl rounded-[2rem]">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[9px] font-mono font-bold tracking-widest uppercase text-brand-black rounded-full">
                     {article.category}
                   </span>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-gold font-bold">{article.date}</span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
                <h3 className="text-xl font-sans font-bold text-brand-black leading-tight group-hover:text-brand-gold transition-colors duration-500 [word-break:keep-all]">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-sans font-light line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="pt-4 overflow-hidden">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-brand-black tracking-[0.4em] uppercase group-hover:text-brand-gold transition-colors">
                    Read Story
                    <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-40 pt-20 border-t border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-300 font-mono tracking-[0.8em] uppercase">
            - End of Archive -
          </p>
        </div>
      </div>
      <style>{`
        @keyframes reveal-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
};

export default Journal;
