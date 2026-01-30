
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryProps {
  onBack: () => void;
}

const Story: React.FC<StoryProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Cloudinary URLの最適化ヘルパー
  const optimizeUrl = (url: string, width: number = 1200) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // セクションの浮き上がりアニメーション（GPUレンダリングを意識）
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out"
        });
      });

      // ギャラリー画像のスタッガー表示
      gsap.utils.toArray('.gallery-img').forEach((img: any) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 95%",
          },
          opacity: 0,
          y: 20,
          duration: 1.2,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const textShadowStyle = { textShadow: '0px 2px 12px rgba(0,0,0,0.6)' };

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden relative max-w-full">
      
      {/* 左右の固定ブランド刻印 (Fixed Branding) - Z-index調整で前面に */}
      <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-white opacity-[0.15] font-serif tracking-[0.8em] text-[1rem] pointer-events-none select-none z-[100] font-light font-feature-palt">
        Honest Marketing Club
      </div>
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-white opacity-[0.15] font-serif tracking-[0.8em] text-[1rem] pointer-events-none select-none z-[100] font-light font-feature-palt">
        Honest Marketing Club
      </div>

      {/* 1. Hero Section: 全画面ヘッダー */}
      {/* w-screenはスクロールバー幅を含むため横揺れの原因になるのでw-fullに変更 */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-black">
        <div className="absolute inset-0 z-0 bg-brand-black">
          <img 
            src={optimizeUrl("https://res.cloudinary.com/dxr2aeoze/image/upload/v1769388223/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3_1_fjmrxi.png", 2000)} 
            alt="Masaomi Sakata" 
            className={`w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out will-change-transform ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ objectPosition: '50% 15%' }}
            loading="eager"
            onLoad={() => setHeroLoaded(true)}
            // @ts-ignore
            fetchpriority="high"
          />
          {/* 黒のオーバーレイ - rgba(0,0,0,0.4) で視認性確保 */}
          <div className="absolute inset-0 bg-brand-black/40 z-[1]" />
        </div>
        
        <div className={`relative z-10 text-center space-y-8 px-6 max-w-[1200px] transition-all duration-[1000ms] delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span 
            className="text-brand-gold font-mono text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase block"
            style={textShadowStyle}
          >
            THE DOCUMENTARY
          </span>
          <h1 
            className="text-[clamp(1.4rem,4.5vw,2.4rem)] font-bold text-white tracking-tight leading-snug font-feature-palt break-keep-all"
            style={textShadowStyle}
          >
            <span className="inline-block">—— 劣等感と出来損ないを</span><br className="md:hidden" />
            <span className="inline-block">セルフプロデュースで変えた</span><br />
            <span className="inline-block">人生勝ち逃げ戦略 ——</span>
          </h1>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[2]">
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent animate-pulse" />
        </div>
      </section>

      {/* コンテンツ共通レイアウト: 書籍スタイル */}
      <div className="bg-brand-black w-full max-w-full">
        
        {/* 2. 【序章】 */}
        <section className="reveal-section py-24 md:py-48 px-6 bg-white max-w-full">
          <div className="max-w-[700px] mx-auto space-y-12">
            <h2 className="text-brand-black font-serif font-bold tracking-[0.2em] [writing-mode:vertical-rl] text-orientation-upright min-h-[300px] text-[clamp(1.2rem,3vw,1.8rem)] mx-auto font-feature-palt">
              【序章：人生諦めた20代】
            </h2>
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em] text-brand-black">
              幼少期のいじめ、アトピーや虚弱体質の劣等感、アパレル時代の「クレーム王子」。ミスを繰り返し、上司から「お前は他では通用しない」と切り捨てられ自律神経を病み、死を考えた暗闇で掴んだのは、<span className="inline-block">「環境を変える（逃げる）」</span>という生存戦略でした。
            </p>
          </div>
        </section>

        {/* 3. 【第一章】 */}
        <section className="reveal-section bg-[#fafafa] text-brand-black py-24 md:py-48 px-6 max-w-full border-y border-neutral-100">
          <div className="max-w-[700px] mx-auto space-y-16">
            <h2 className="text-brand-black font-serif font-bold tracking-[0.2em] [writing-mode:vertical-rl] text-orientation-upright min-h-[300px] text-[clamp(1.2rem,3vw,1.8rem)] mx-auto font-feature-palt">
              【第一章：地獄の3日、10分間の賭け】
            </h2>
            <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em]">
              ３日間山奥での軟禁、地獄の自己啓発トレーニング、低学歴の就職氷河期、直筆の手紙と企画書を送りつけ勝ち取った10分間の面接。<span className="inline-block">楽天グループで</span>セールス部門賞受賞、退職し起業、預金残高わずか<span className="killer-phrase">20万円から1,000万円</span>の融資に成功、セルフブランディング起業がスタート。
            </p>
            {/* 追加画像1 */}
            <div className="gallery-img w-full my-12 md:my-24 overflow-hidden flex justify-center will-change-transform">
              <img 
                src={optimizeUrl("https://res.cloudinary.com/dxr2aeoze/image/upload/v1768409349/Gemini_Generated_Image_e1q6rke1q6rke1q6_tzcue6.png", 1200)} 
                className="max-w-full md:max-w-[80%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="第一章 象徴的イメージ" 
                loading="lazy"
              />
            </div>
            <div className="gallery-img w-full my-12 md:my-24 overflow-hidden flex justify-center will-change-transform">
              <img 
                src={optimizeUrl("https://res.cloudinary.com/dxr2aeoze/image/upload/v1768405944/IMG_4894_Original_ymuzfk.jpg", 1200)} 
                className="max-w-full md:max-w-[70%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="第一章 実績写真" 
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 4. 【第二章】 */}
        <section className="reveal-section bg-white text-brand-black py-24 md:py-48 px-6 max-w-full">
          <div className="max-w-[800px] mx-auto space-y-20">
            <div className="max-w-[700px] mx-auto space-y-12 text-center">
              <h2 className="text-brand-black font-serif font-bold tracking-[0.2em] [writing-mode:vertical-rl] text-orientation-upright min-h-[300px] text-[clamp(1.2rem,3vw,1.8rem)] mx-auto font-feature-palt">
                【第二章：0からの狂気】
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em] text-neutral-600">
                「良いものを高く売る」。その信念を証明するため相場８倍のあまざけをプロデュース、<span className="killer-phrase">広告費ゼロで1,500万円</span>の売上を達成。X（Twitter）では<span className="killer-phrase">1年で1万人</span>のフォロワーを獲得、業界初の無添加発酵アイスクリームを開発、初クラウドファンディングでは歴代2位の記録を樹立。<span className="inline-block text-brand-black">日本一高いあまざけが</span>5万個突破、300人のオンラインサロン設立……独学で築き上げた**「セルフプロデュース戦略」**
              </p>
            </div>

            {/* 追加画像2 */}
            <div className="gallery-img w-full my-12 md:my-24 overflow-hidden flex justify-center will-change-transform">
              <img 
                src={optimizeUrl("https://res.cloudinary.com/dxr2aeoze/image/upload/v1769410046/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-26_15.47.10_yxrjtg.png", 1200)} 
                className="max-w-full md:max-w-[90%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="第二章 狂気と熱量" 
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 my-12 md:my-24">
              {[
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1769278487/F5A48EB1-3BCF-4237-96F7-0ABEE17FBBAD_naonfy.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767029853/icecream_pvbkpd.png",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767027207/IMG_3469_Original_mk522n.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767029863/23702CFF-D127-403F-A291-C75D5FF190F6_a99sye.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767029862/671C99F4-D97E-4BC0-ADC4-D75E5572E3C5_p4ajfh.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767029863/55456564-C045-4DDA-B83D-B69097383938_gddxx5.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767029864/E92BC10A-3E24-46E1-92FB-C6937B82FD23_ph2rny.jpg"
              ].map((url, i) => (
                <div 
                  key={i} 
                  className={`gallery-img overflow-hidden bg-neutral-100 border border-neutral-200 transition-all will-change-transform
                    ${i === 6 ? 'col-span-2 md:col-start-2 md:col-span-1' : ''}`}
                >
                  <img 
                    src={optimizeUrl(url, 800)} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                    alt={`第二章 実績 ${i+1}`} 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 【第三章】 */}
        <section className="reveal-section bg-[#f5f5f5] text-brand-black py-24 md:py-48 px-6 max-w-full relative">
          <div className="max-w-[800px] mx-auto space-y-20">
            <div className="max-w-[700px] mx-auto space-y-12 text-center">
              <h2 className="text-brand-black font-serif font-bold tracking-[0.2em] [writing-mode:vertical-rl] text-orientation-upright min-h-[300px] text-[clamp(1.2rem,3vw,1.8rem)] mx-auto font-feature-palt">
                【第三章：その先へ】
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em]">
                最高峰のピッチイベント「ICCサミット」にて、初出場ながら<span className="killer-phrase">3部門入賞</span>という快挙。2025年には堀江貴文氏との対談、オンラインサロンメンバーの飛躍、独学のセルフプロデュース論を提供するために「言語化プロデュースコミュニティ」を2026年2月にスタート
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 my-12 md:my-24">
              {[
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767027156/IMG_4172_o3qvex.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767027167/IMG_5190_ipqsgr.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767027161/IMG_5186_udsxcx.jpg",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767216041/s-1024x768_v-fs_webp_ce41d516-b5f6-4a40-9d8d-5ae7ff48f3cd_yuumuh.png",
                "https://res.cloudinary.com/dxr2aeoze/image/upload/v1767546753/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A%E3%81%AE%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3_1_vnhiu1.png"
              ].map((url, i) => (
                <div 
                  key={i} 
                  className={`gallery-img overflow-hidden bg-white border border-neutral-200 shadow-sm transition-all will-change-transform
                    ${i === 4 ? 'col-span-2 md:col-span-1 md:col-start-2' : ''}`}
                >
                  <img 
                    src={optimizeUrl(url, 800)} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700" 
                    alt={`第三章 実績 ${i+1}`} 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* 追加画像3 */}
            <div className="gallery-img w-full my-12 md:my-24 overflow-hidden flex justify-center will-change-transform">
              <img 
                src={optimizeUrl("https://res.cloudinary.com/dxr2aeoze/image/upload/v1769278486/0170D55F-EA78-42ED-BE30-F1BAB1C0D0BB_mqew3v.jpg", 1200)} 
                className="max-w-full md:max-w-[60%] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="第三章 実績と栄光" 
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 6. 【結章】 */}
        <section className="reveal-section bg-brand-black text-white py-24 md:py-64 px-6 max-w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[150px] -z-10" />
          
          <div className="max-w-[700px] mx-auto space-y-20">
            <h2 className="text-brand-gold font-serif font-bold tracking-[0.2em] [writing-mode:vertical-rl] text-orientation-upright min-h-[400px] text-[clamp(1.4rem,3vw,1.8rem)] mx-auto font-feature-palt">
              【言語化は人生を変えます】
            </h2>
            
            <div className="space-y-12">
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em] text-neutral-300">
                僕は文字通りの”凡人””出来損ない”でした、頭では分かっているのに、想いはあるのに上手くいかない、伝え方を知らなかったから文章を書く力も欠落していました、全てが上手くいかなったんです、伝える力があることを知ってからは人一倍努力しました、SNSもセールスコピーも商談も事業計画も人間関係も<span className="killer-phrase">全て伝え方を変えただけで</span>成果が出ていきました、順序や文字数を変えるだけで価値を創ることができる、思考を具現化する、価値を創る、それらは”言語化する”ということなんだと思います。
              </p>
              
              <p className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-center text-brand-gold leading-tight font-serif font-feature-palt">
                <span className="killer-phrase">言語化は人生を変えます</span>
              </p>

              <p className="text-[14px] md:text-[15px] leading-[1.6] text-justify font-light font-feature-palt tracking-[-0.01em] text-neutral-300">
                言語化力を鍛えるコミュニティで価値をアップデートしていきませんか？コミュニティは誰でも無料参加できます。
              </p>
            </div>

            <div className="flex flex-col items-center gap-12 pt-12 pb-24">
              <a 
                href="https://line.me/ti/g2/N_2zQEMoVCr4TZpwtXren7CjLZFY8w-EzUUzLA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-16 py-6 bg-brand-gold text-white text-[12px] font-bold tracking-[0.6em] uppercase overflow-hidden shadow-[0_20px_40px_rgba(197,160,89,0.3)] transition-all hover:shadow-brand-gold/50 hover:-translate-y-1"
              >
                <span className="relative z-10">Clubへ参加する</span>
                <div className="absolute inset-0 bg-brand-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              <button 
                onClick={onBack}
                className="text-neutral-500 hover:text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase border-b border-neutral-800 pb-1 transition-colors"
              >
                Back to Main
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .font-serif {
          font-family: "Zen Old Mincho", "Noto Serif JP", serif;
        }
        .text-orientation-upright {
          text-orientation: upright;
        }
        .font-feature-palt {
          font-feature-settings: "palt" 1;
        }
        /* デバイス別の改行ルール: モバイルでは突き出しを防ぐためにnormalへ */
        .break-keep-all {
          word-break: keep-all;
          overflow-wrap: anywhere;
        }
        @media (max-width: 1024px) {
          .break-keep-all {
            word-break: normal;
          }
        }
        /* 強調テキスト（キラーフレーズ）のレスポンシブ化 - 指定フレーズのみさらに20%縮小 */
        .killer-phrase {
          font-size: clamp(1.15rem, 5vw, 2.2rem) !important; /* 1.44rem * 0.8 = 約1.15rem */
          font-weight: bold;
          color: #c5a059;
          display: inline-block;
          margin: 0.1em 0.2em;
          line-height: 1.2;
          vertical-align: middle;
          text-shadow: 0 2px 15px rgba(197,160,89,0.3);
          font-family: "Zen Old Mincho", serif;
          will-change: transform;
          white-space: normal !important;
          word-break: normal !important;
          max-width: 100% !important;
          font-feature-settings: "palt" 1;
        }
        /* 1,000万円 などの数字が途切れないように保護しつつ、親要素で折り返しを許可 */
        .inline-block {
          display: inline-block;
          white-space: nowrap;
          max-width: 100%;
        }
        @media (max-width: 768px) {
           .inline-block {
             white-space: normal;
           }
        }
        .text-justify {
          text-align: justify;
          text-justify: inter-character;
        }
      `}</style>
    </div>
  );
};

export default Story;
