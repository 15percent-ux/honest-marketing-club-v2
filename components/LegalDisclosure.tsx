import React from 'react';

interface LegalDisclosureProps {
  onBack: () => void;
}

const LegalDisclosure: React.FC<LegalDisclosureProps> = ({ onBack }) => {
  const legalInfo = [
    { label: "事業者の名称", value: "Honest Marketing Club Stars 事務局" },
    { label: "代表者", value: "阪田 真臣" },
    { label: "所在地", value: "福岡市中央区大名2-6-11　Fukuoka Growth Next" },
    { label: "お問い合わせ先", value: "15percent@kouji-ouji.jp" },
    { label: "代金の支払時期", value: "クレジットカード・オンライン決済：各決済代行会社およびカード会社が定める引き落とし日。お申し込み時に即時決済されます。" },
    { label: "代金の支払方法", value: "クレジットカード、各種オンライン決済" },
    { label: "商品の引き渡し時期", value: "入会審査通過後、決済完了から3営業日以内にアカウントの発行・案内を行います。" },
    { label: "返品・キャンセル", value: "商品の性質上、決済完了後の返金・返品・キャンセルはお受けできません。あらかじめご了承ください。" },
    { label: "動作環境", value: "インターネット接続環境、および最新のブラウザ、LINE、Zoom等が利用可能な端末が必要となります。" }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-48 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 text-[10px] font-bold text-neutral-400 hover:text-brand-gold transition-colors tracking-[0.4em] uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span> 
            Back to Home
          </button>
          
          <div className="h-12 w-px bg-brand-gold/30 mt-8" />
          
          <h1 className="text-2xl md:text-3xl font-sans font-bold text-brand-black tracking-tight">
            特定商取引法に基づく表記
          </h1>
          <p className="text-[10px] text-neutral-400 font-mono tracking-[0.4em] uppercase font-bold">
            Act on Specified Commercial Transactions
          </p>
        </div>

        {/* Content Table */}
        <div className="border border-neutral-100 divide-y divide-neutral-100">
          {legalInfo.map((info, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 group">
              <div className="md:col-span-4 bg-neutral-50 p-6 md:p-8 flex items-center">
                <span className="text-[10px] font-mono font-bold text-brand-black tracking-widest uppercase opacity-60">
                  {info.label}
                </span>
              </div>
              <div className="md:col-span-8 p-6 md:p-8 bg-white group-hover:bg-neutral-50/30 transition-colors">
                <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                  {info.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-bold text-neutral-400 hover:text-brand-black border-b border-neutral-200 transition-all pb-1 tracking-[0.4em] uppercase"
          >
            トップページへ戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclosure;