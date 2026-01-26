
import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

const ExampleUsage: React.FC = () => {
  // 1. 選択されたアイテムを管理するステートを定義
  const [selectedItem, setSelectedItem] = useState<{ url: string; title: string } | null>(null);

  // 実績データの例
  const projects = [
    { title: 'プロジェクトA', url: 'https://koujiouji.vercel.app/' },
    { title: 'プロジェクトB', url: 'https://rinrin-photo.vercel.app/' }
  ];

  return (
    <div className="py-20 px-6">
      <h2 className="text-2xl font-bold mb-10">実績一覧（例）</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div 
            key={i}
            onClick={() => setSelectedItem(p)} // 2. クリックでステートにセットして開く
            className="p-8 bg-neutral-100 rounded-xl cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <h3 className="font-bold">{p.title} を見る</h3>
          </div>
        ))}
      </div>

      {/* 3. モーダル本体を配置（ステートがあれば表示） */}
      <GalleryModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        url={selectedItem?.url || ''} 
        title={selectedItem?.title || ''} 
      />
    </div>
  );
};

export default ExampleUsage;
