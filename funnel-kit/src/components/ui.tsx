import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CharRef, ImgRef, RichText } from '../types';
import { rt } from '../lib/rt';
import { Icon, isIconName } from './Icon';

/**
 * 共通の部品。形のルール：カード16px、ボタンは丸（pill）、入力欄10px、画像12px。
 * 傾き・ずらした影・飾りの線は使わない。
 */

/** 画像。src が無ければ、差し替え箇所が分かる控えめなプレースホルダー */
export function Img({ img, className = '', ratio, eager }: { img: ImgRef; className?: string; ratio?: string; eager?: boolean }) {
  if (img.src) {
    return (
      <img
        src={img.src}
        alt={img.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`block w-full object-cover ${className}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={img.alt}
      className={`flex w-full items-center justify-center bg-primary-soft p-3 text-center text-[11px] text-muted ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {img.label || img.alt}
    </div>
  );
}

/** アイコン名・絵文字・画像のどれでも受け取って、丸い枠で表示する */
export function Char({ c, size = 88, ring = true }: { c?: CharRef; size?: number; ring?: boolean }) {
  if (!c) return null;
  const box = `flex shrink-0 items-center justify-center overflow-hidden rounded-full ${ring ? 'bg-primary-soft text-primary' : 'text-primary'}`;
  if (typeof c === 'string') {
    return (
      <div className={box} style={{ width: size, height: size }} aria-hidden>
        <Icon name={c} size={Math.round(size * (isIconName(c) ? 0.48 : 0.56))} weight="light" />
      </div>
    );
  }
  return (
    <div className={box} style={{ width: size, height: size }}>
      <Img img={c} className="h-full" />
    </div>
  );
}

/** 小さな見出しラベル（多用しない：3セクションに1つまで） */
export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-bold tracking-[0.12em] text-primary ${className}`}>{children}</p>;
}

/** セクションの見出し＋リード（左揃えが基本） */
export function SectionHead({ title, lead, kicker, center }: { title: ReactNode; lead?: ReactNode; kicker?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {kicker && <Kicker className="mb-2">{kicker}</Kicker>}
      <h2 className="font-head text-[24px] font-bold leading-[1.45] tracking-[0.02em] text-ink">{title}</h2>
      {lead && <p className="mt-3 text-[14px] leading-[1.9] text-muted">{lead}</p>}
    </div>
  );
}

/** 互換用：旧 SectionTitle */
export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-head text-center text-[22px] font-bold leading-[1.5] text-ink ${className}`}>{children}</h2>;
}

/** しっぽ付きの吹き出しラベル（キャンペーン系のセクションでだけ使う） */
export function BubbleLabel({ children, className = '' }: { children: ReactNode; tone?: string; className?: string }) {
  return (
    <div className={`bubble inline-block whitespace-nowrap rounded-full border-2 border-navy bg-navy px-5 py-1 text-[13px] font-bold text-white ${className}`}>
      {children}
    </div>
  );
}

export function CheckList({ items, className = '' }: { items: RichText[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.7]">
          <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Icon name="check" size={12} weight="bold" />
          </span>
          <span>{rt(t)}</span>
        </li>
      ))}
    </ul>
  );
}

/** メインのボタン。上に小さな補足（例：「顔出しなしOK」）を添えられる */
export function CtaPill({ label, micro, onClick }: { label: string; micro?: string; icon?: string; onClick: () => void }) {
  return (
    <div className="text-center">
      {micro && <p className="mb-2 text-[12px] font-bold text-primary">{micro}</p>}
      <button type="button" onClick={onClick} className="cta-pill">
        <span>{label}</span>
        <span aria-hidden className="text-[18px] leading-none">→</span>
      </button>
    </div>
  );
}

export function Footnote({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-4 text-[11px] leading-relaxed text-muted">{children}</p>;
}

/** 横スワイプのカルーセル（左右のボタン＋ドット） */
export function Carousel<T>({ items, render, label }: { items: T[]; render: (item: T, i: number) => ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // 1枚の幅（カード幅＋すき間12px）
  const step = () => ((ref.current?.firstElementChild as HTMLElement | null)?.clientWidth || 1) + 12;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setIdx(Math.min(items.length - 1, Math.round(el.scrollLeft / step())));
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = (i + items.length) % items.length;
    el.scrollTo({ left: n * step(), behavior: 'smooth' });
  };

  const btn = 'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink';
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 pt-1">
        {items.map((it, i) => (
          <div key={i} className="w-[86%] shrink-0 snap-center" aria-hidden={i !== idx}>
            {render(it, i)}
          </div>
        ))}
        <div aria-hidden className="w-2 shrink-0" />
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-between px-5">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}枚目`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-primary' : 'w-1.5 bg-line'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="前へ" className={btn} onClick={() => go(idx - 1)}>
              ‹
            </button>
            <button type="button" aria-label="次へ" className={btn} onClick={() => go(idx + 1)}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
