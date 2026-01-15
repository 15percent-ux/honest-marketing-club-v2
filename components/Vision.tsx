
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".vision-title", {
        scrollTrigger: {
          trigger: ".vision-title",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Paragraph reveal
      gsap.from(".vision-para", {
        scrollTrigger: {
          trigger: ".vision-para",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Emphasis blocks
      gsap.from(".vision-emphasis", {
        scrollTrigger: {
          trigger: ".vision-emphasis",
          start: "top 90%",
        },
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // フレーズを保持するためのヘルパーコンポーネント
  const Phrase = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block">{children}</span>
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-40 bg-brand-black text-white px-6 overflow-hidden relative">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Label Column: Top Aligned with Body */}
          <div className="lg:col-span-5 space-y-4 md:space-y-8">
            <div className="vision-title flex items-center gap-4">
              <span className="w-8 md:w-12 h-px bg-brand-gold"></span>
              <span className="text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase">The Vision</span>
            </div>
            <h2 className="vision-title text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight break-keep overflow-wrap-anywhere">
              <Phrase>搾取されず</Phrase><Phrase>利益を</Phrase><Phrase>高めるために。</Phrase>
            </h2>
          </div>

          {/* Content Column */}
          <div ref={textRef} className="lg:col-span-7 space-y-10 md:space-y-16">
            <div className="space-y-8 md:space-y-12">
              <div className="vision-para space-y-6 md:space-y-8 text-neutral-400 font-sans text-sm md:text-lg leading-[1.65] md:leading-[1.8] font-light tracking-wider break-keep overflow-wrap-anywhere">
                <p>
                  <Phrase>コミュニティを</Phrase><Phrase>作ろうと思ったのは、</Phrase>
                  <Phrase>僕の大切な人が</Phrase><Phrase>搾取されていたと</Phrase><Phrase>知った時でした。</Phrase>
                  <Phrase>誰にだって</Phrase><Phrase>知識も経験値も</Phrase><Phrase>ゼロの頃があります、</Phrase>
                  <Phrase>そこに漬け込む人間が</Phrase><Phrase>あまりにも多いんです。</Phrase>
                  <Phrase>好きな人には</Phrase><Phrase>出来る限り</Phrase><Phrase>損をしてほしくないと</Phrase><Phrase>思っています。</Phrase>
                </p>
                <p>
                  <Phrase>搾取されることが</Phrase><Phrase>多かった僕は</Phrase><Phrase>守る術を身につけました、</Phrase>
                  <Phrase>それが誰かの</Phrase><Phrase>役に立てるようになればと</Phrase><Phrase>コミュニティを作りました。</Phrase>
                </p>
                
                <div className="py-4 md:py-6">
                  <p className="text-lg md:text-2xl font-bold text-brand-goldLight tracking-wide leading-[1.5] md:leading-[1.6]">
                    <Phrase>「煽り」や</Phrase><Phrase>「安売り」には</Phrase><Phrase>手を出さない。</Phrase><br className="hidden md:block" />
                    <Phrase>僕なりに得た</Phrase><Phrase>一つの到達点です。</Phrase>
                  </p>
                </div>

                <p>
                  <Phrase>もう騙されたくない、</Phrase><Phrase>質の低いマーケティングと</Phrase><Phrase>ブランディングに</Phrase><Phrase>振り回されたくないです。</Phrase>
                  <Phrase>自分軸で判断できる</Phrase><Phrase>考え方が欲しい、</Phrase><Phrase>見極められる</Phrase><Phrase>視野の広さが欲しい。</Phrase>
                </p>
                <p>
                  <Phrase>自分自身、セミナーや</Phrase><Phrase>情報にコストを</Phrase><Phrase>かけた時もあった、</Phrase><Phrase>試したこともある、</Phrase><Phrase>後悔している人も</Phrase><Phrase>沢山見てきた、</Phrase>
                  <Phrase>搾取する人も</Phrase><Phrase>搾取される人達も</Phrase><Phrase>両側の人間を見てきた、</Phrase>
                  <Phrase>一方で同じ手法を</Phrase><Phrase>教わったのに</Phrase><Phrase>成功している人もいる、</Phrase><Phrase>その差はこれだった。</Phrase>
                </p>
              </div>

              {/* Major Emphasis 1 */}
              <div className="vision-emphasis p-6 md:p-10 border border-brand-gold/30 bg-brand-gold/5 rounded-2xl md:rounded-3xl text-center shadow-lg shadow-brand-gold/5">
                <h3 className="text-lg md:text-3xl lg:text-4xl font-sans font-bold text-white tracking-tighter break-keep">
                  <Phrase>視野の広さと</Phrase><Phrase>自分軸が</Phrase><Phrase>あるか、ないか。</Phrase>
                </h3>
              </div>

              <div className="vision-para space-y-6 md:space-y-8 text-neutral-400 font-sans text-sm md:text-lg leading-[1.65] md:leading-[1.8] font-light tracking-wider break-keep overflow-wrap-anywhere">
                <p>
                  <Phrase>武器（手法や知識）を</Phrase><Phrase>持つ前から</Phrase><Phrase>差があることを知った。</Phrase>
                  <Phrase>強い武器（優れた手法）を</Phrase><Phrase>使うには</Phrase><Phrase>筋力が必要だった、</Phrase>
                  <Phrase>筋力がマインドであり、</Phrase><Phrase>マインドは考え方であり、</Phrase>
                  <Phrase>考え方と視野の広さは</Phrase><Phrase>繋がっていると知った。</Phrase>
                </p>
                <p className="text-base md:text-xl font-bold text-white leading-[1.5]">
                  <Phrase>「視野が狭い、</Phrase><Phrase>もっと視野を</Phrase><Phrase>広げないと」と</Phrase><Phrase>よく言われる。</Phrase>
                </p>
                <p className="opacity-80">
                  これを言語化すると、
                </p>
              </div>

              {/* Definition Block */}
              <div className="vision-emphasis space-y-4 md:space-y-6 p-6 md:p-10 border-l-2 md:border-l-4 border-brand-gold bg-neutral-900/40 rounded-r-2xl md:rounded-r-3xl backdrop-blur-sm">
                <p className="text-lg md:text-2xl font-sans font-bold text-brand-goldLight leading-[1.5] md:leading-[1.6] tracking-tight break-keep overflow-wrap-anywhere">
                  <Phrase>「視野の狭さは</Phrase><Phrase>考えの浅さ、</Phrase><Phrase>考えた回数の少なさ、</Phrase><Phrase>考え方に</Phrase><Phrase>バリエーションが少ない、</Phrase><Phrase>自分ごとに</Phrase><Phrase>置き換えた経験が少ない、</Phrase><Phrase>他人から見えてる</Phrase><Phrase>自分を見れない」</Phrase>
                </p>
                <p className="text-[10px] md:text-xs text-neutral-500 italic font-sans tracking-widest">
                  — と僕は解釈している。だれに教わった訳ではないので正解かどうかは分からないが、試行錯誤でそう思えるようになった。
                </p>
              </div>

              <div className="vision-para space-y-6 md:space-y-8 text-neutral-400 font-sans text-sm md:text-lg leading-[1.65] md:leading-[1.8] font-light tracking-wider break-keep overflow-wrap-anywhere">
                <p>
                  <Phrase>このコミュニティの価値は、</Phrase><Phrase>視野の広げ方と</Phrase><Phrase>言語化力が上がることだと</Phrase><Phrase>自信を持って言えます。</Phrase>
                  <Phrase>利益を高めて</Phrase><Phrase>搾取させず</Phrase><Phrase>大切な人を守る力を</Phrase><Phrase>身につけていきたい。</Phrase>
                  <Phrase>僕も同じ立場として</Phrase><Phrase>一緒に学んでいきたいと思います。</Phrase>
                </p>
              </div>
            </div>

            <div className="vision-para pt-4 md:pt-8">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="h-px w-12 md:w-16 bg-brand-gold/30"></div>
                <p className="text-[9px] md:text-[10px] font-mono font-bold text-brand-gold tracking-[0.4em] md:tracking-[0.5em] uppercase">
                  Honest Perspective
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .break-keep {
          word-break: keep-all;
        }
        .overflow-wrap-anywhere {
          overflow-wrap: anywhere;
        }
      `}</style>
    </section>
  );
};

export default Vision;
