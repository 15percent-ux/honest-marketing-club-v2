import { useEffect } from 'react';
import { brand } from '../brand';
import { Footer } from '../components/Footer';

/** 特定商取引法に基づく表記（brand.legal の内容を表で表示する） */
export function LegalPage() {
  const legal = brand.legal;
  useEffect(() => {
    document.title = `${legal?.title || '特定商取引法に基づく表記'}｜${brand.brand.name}`;
  }, [legal]);
  return (
    <>
      <main className="px-5 pb-16 pt-8">
        <a href="/lp" className="text-[13px] font-bold text-primary">
          ← {brand.brand.name}のページへ戻る
        </a>
        <h1 className="mt-6 font-head text-[22px] font-bold leading-[1.5]">{legal?.title || '特定商取引法に基づく表記'}</h1>
        {legal ? (
          <dl className="mt-6 divide-y divide-line border-y border-line text-[14px]">
            {legal.rows.map((r) => (
              <div key={r.label} className="py-4">
                <dt className="font-bold">{r.label}</dt>
                <dd className="mt-1 whitespace-pre-line leading-[1.85] text-ink/90">{r.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-6 text-[14px] text-muted">準備中です。</p>
        )}
      </main>
      <Footer />
    </>
  );
}
