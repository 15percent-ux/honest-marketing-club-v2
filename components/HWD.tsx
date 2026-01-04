import React, { useState } from 'react';

const HWD: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const contents = [
    {
      id: '01',
      title: '01. “価値”を言語化し適正価格を作る',
      desc: '独学で培った実績をもとに、商品が持つ本当の価値を深掘りします。価格の見直し、価値の伝え方を身につけていきます。価値が伝われば、本来の適正価格でサービスを提供することができます。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767215160/s-1024x768_v-fs_webp_651f9640-5a39-4d92-8874-9189b8287711_i0f9k4.png'
    },
    {
      id: '02',
      title: '02. 唯一無二を作る',
      desc: 'スキルやノウハウを学ぶことは最優先ではありません。“あの人といえばこれ”と呼ばれる必殺技が必要です。自分と相性の良いサービスを見つけます。これがあれば高額セミナーや情報に振り回される事はなくなります。強くブレない代表作を一緒に生み出していきましょう。',
      image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: '03',
      title: '03. 小さな実績を継続して生み出す',
      desc: 'サービスの魅力を最も伝えやすいのは数字です、信憑性を高める為にも必須です。自分の代表作で数字を作り上げて、セールスに使えるような状態にします。コミュニティには評価制度もあります。星1・星3・星5の3段階、6ヶ月間のトレーニング終了時に発表します。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767216042/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2026-01-01_6.18.44_totxie.png'
    },
    {
      id: '04',
      title: '04. オフライン合宿',
      desc: '月1回のオフラインマーケティング会あり（東京・大阪・福岡のみ） ※企画中。直接顔を合わせることでしか生まれない熱量と、深い対話がビジネスを次のステージへ引き上げます。',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb11c1?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <div className="space-y-0">
      {/* HWD Intro */}
      <section className="bg-[#ece6e4] py-40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white w-full max-w-sm aspect-square flex items-center justify-center shadow-sm">
              <span className="text-8xl md:text-9xl font-display font-bold tracking-[0.2em] text-brand-black">HWD</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-black">Honest Weapon Design (HWD) ™</h2>
              <p className="text-lg text-neutral-600 font-sans tracking-widest">自分だけのブランドづくり</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-sans font-bold text-brand-black">まだ自分のブランドがない方へ</h3>
              <p className="text-neutral-600 leading-relaxed font-sans font-light max-w-lg">
                まだ自信を持って提供できるサービスがないという方、これからサービスを構築するという方へ。広告に頼らない、売り込まないブランド作りをここで。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HWD Contents */}
      <section className="bg-white py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-sans font-bold text-brand-black">HWD/contents</h2>
                <p className="text-neutral-400 font-sans tracking-widest">コンテンツ</p>
              </div>
              <div className="flex flex-col border-t border-neutral-100">
                {contents.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center justify-between py-8 border-b border-neutral-100 group transition-all ${activeTab === i ? 'text-brand-black' : 'text-neutral-400'}`}
                  >
                    <span className="text-sm font-sans font-bold tracking-widest">{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                    <span className={`text-xl transition-transform duration-300 ${activeTab === i ? 'translate-x-0' : '-translate-x-4'}`}>↓</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-[#f7f7f7] rounded-[2rem] p-8 md:p-16 space-y-12 min-h-[600px] animate-fade-in" key={activeTab}>
                <div className="inline-block bg-[#1a1a1a] text-white text-[10px] font-mono font-bold px-4 py-1 rounded-full mb-6">
                  {contents[activeTab].id}
                </div>
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-brand-black">
                  {contents[activeTab].title}
                </h3>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                  <img 
                    src={contents[activeTab].image} 
                    alt={contents[activeTab].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-neutral-600 text-lg leading-relaxed font-sans font-light">
                  {contents[activeTab].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HWD;