import React from 'react';

const Curriculum: React.FC = () => {
  const items = [
    {
      id: '01',
      title: '既存サービスの価値見直し',
      desc: '既存サービスの価格を見直し値上げをする。価値の言語化をおこない本当の価値を洗い出します。価値と価格のズレが合えば自信をもって値上げすることができます。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1766815368/2_eolhcq.png',
      reverse: false
    },
    {
      id: '02',
      title: 'セカンドオピニオンへの相談',
      desc: 'セカンドオピニオンはモチベーションを維持するために役立ちます。メンターとも言われますが、いわゆる相談役です。大事を決断するとき、迷っている時、自信がないとき、答え合わせをしたり、常に壁打ちを出来る相手をもつことは最大のリスクヘッジになります。代表の阪田への相談回数なども制限はありません、何回でも何時でも相談してください。メンバー全員が相談役です。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767214958/s-1024x768_v-fs_webp_ce41d516-b5f6-4a40-9d8d-5ae7ff48f3cd_pbqni5.png',
      reverse: true
    },
    {
      id: '03',
      title: '同じベクトルの戦友と刺激し合う',
      desc: '審査制のコミュニティだから心地いい。近い価値観をもった人と繋がる事ができるのも魅力の一つ、ビジネスを共に始めることもあり、プライベートでも交流が生まれたり、助け合いながら成長していける環境づくりをコンセプトにしています。',
      image: 'https://res.cloudinary.com/dxr2aeoze/image/upload/v1767214957/s-1024x768_v-fs_webp_f1d44356-7dd9-405f-aa02-0376e9141d1c_hpvmhz.jpg',
      reverse: false
    }
  ];

  return (
    <section id="work" className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto space-y-32 md:space-y-40">
        {items.map((item) => (
          <div key={item.id} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
            {/* Image Column - Reduced by 50% visually on desktop */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-sm md:max-w-md overflow-hidden rounded-[2rem] shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
            {/* Content Column - Expanded to fill the remaining space */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="inline-block bg-[#1a1a1a] text-white text-[9px] font-mono font-bold px-4 py-1 rounded-full tracking-widest">
                {item.id}
              </div>
              {/* Heading - Reduced by 30% (3xl -> xl, 4xl -> 2xl) */}
              <h3 className="text-xl md:text-2xl lg:text-[26px] font-sans font-bold text-brand-black tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-neutral-600 text-base md:text-lg leading-[1.8] font-sans font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Curriculum;