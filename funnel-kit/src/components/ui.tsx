import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CharRef, ImgRef, RichText, Tone } from '../types';
import { rt } from '../lib/rt';

/** 画像。src が無ければラベル付きのプレースホルダー（差し替え箇所がひと目で分かる） */
export function Img({ img, className = '', ratio }: { img: ImgRef; className?: string; ratio?: string }) {
  if (img.src) {
    return (
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
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
      className={`flex w-full items-center justify-center bg-aurora p-2 text-center text-[11px] font-bold leading-snug text-muted ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <span className="rounded bg-white/70 px-2 py-1">{img.label || img.alt}</span>
    </div>
  );
}

/** キャラクター（画像 or 絵文字）を丸枠で表示 */
export function Char({ c, size = 88, ring = true }: { c?: CharRef; size?: number; ring?: boolean }) {
  if (!c) return null;
  const box = `flex shrink-0 items-center justify-center overflow-hidden rounded-full ${ring ? 'bg-white shadow-sm' : ''}`;
  if (typeof c === 'string') {
    return (
      <div className={box} style={{ width: size, height: size, fontSize: size * 0.52 }} aria-hidden>
        {c}
      </div>
    );
  }
  return (
    <div className={box} style={{ width: size, height: size }}>
      <Img img={c} className="h-full" />
    </div>
  );
}

/** しっぽ付きの吹き出しラベル */
export function BubbleLabel({ children, tone = 'navy', className = '' }: { children: ReactNode; tone?: Tone | 'white'; className?: string }) {
  const map: Record<string, string> = {
    navy: 'bg-navy text-white border-navy',
    primary: 'bg-primary text-white border-primary',
    teal: 'bg-teal text-white border-teal',
    mustard: 'bg-mustard text-white border-mustard',
    white: 'bg-white text-navy border-white',
  };
  return (
    <div className={`bubble inline-block whitespace-nowrap rounded-full border-2 px-6 py-1.5 font-head text-[15px] font-bold wide ${map[tone]} ${className}`}>
      {children}
    </div>
  );
}

/** \ 見出し / のスラッシュ囲み */
export function Slashed({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span aria-hidden className="h-14 w-[2px] shrink-0 -rotate-[25deg] bg-navy" />
      <div className="text-center">{children}</div>
      <span aria-hidden className="h-14 w-[2px] shrink-0 rotate-[25deg] bg-navy" />
    </div>
  );
}

export function Sparkles() {
  return (
    <>
      <span aria-hidden className="absolute left-3 top-6 text-lg text-navy/70">✦</span>
      <span aria-hidden className="absolute right-4 top-10 text-sm text-navy/60">✦</span>
      <span aria-hidden className="absolute bottom-6 right-8 text-base text-navy/50">✦</span>
    </>
  );
}

const toneBg: Record<Tone, string> = {
  primary: 'bg-primary',
  teal: 'bg-teal',
  mustard: 'bg-mustard',
  navy: 'bg-navy',
};

export function CircleBadge({ title, icon, tone }: { title: string; icon: string; tone: Tone }) {
  return (
    <div className={`flex aspect-square w-full flex-col items-center justify-center rounded-full p-2 text-white ${toneBg[tone]}`}>
      <span className="whitespace-pre-line text-center font-head text-[12px] font-bold leading-tight wide">{title}</span>
      <span className="mt-1 text-[28px] leading-none" aria-hidden>
        {icon}
      </span>
    </div>
  );
}

export function CheckList({ items, className = '' }: { items: RichText[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2 font-head text-[15px] font-bold wide">
          <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] text-white">
            ✓
          </span>
          <span>{rt(t)}</span>
        </li>
      ))}
    </ul>
  );
}

export function TripleArrow({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`bob flex justify-center gap-3 text-navy ${className}`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} width="26" height="30" viewBox="0 0 26 30" fill="currentColor">
          <path d="M8 0h10v16h8L13 30 0 16h8z" />
        </svg>
      ))}
    </div>
  );
}

export function ConnectorPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-5 w-[2px] bg-navy" />
      <div className="rounded-full border-2 border-navy bg-white px-6 py-1 font-head text-[17px] font-bold wide text-navy">{children}</div>
      <div className="h-5 w-[2px] bg-navy" />
      <div aria-hidden className="-mt-1 h-0 w-0 border-x-[7px] border-t-[9px] border-x-transparent border-t-navy" />
    </div>
  );
}

/** メインCTA。上に小さな吹き出し（マイクロコピー） */
export function CtaPill({ label, micro, icon, onClick }: { label: string; micro?: string; icon?: string; onClick: () => void }) {
  return (
    <div className="relative pt-3">
      {micro && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-cta bg-white px-3 text-[11px] font-bold leading-5 text-cta wide">
          {micro}
        </div>
      )}
      <button type="button" onClick={onClick} className="cta-pill cta-shine text-[17px]">
        {icon && <span aria-hidden>{icon}</span>}
        <span>{label}</span>
        <span aria-hidden className="text-[11px]">▶</span>
      </button>
    </div>
  );
}

export function Footnote({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-3 text-[10px] leading-relaxed text-muted">{children}</p>;
}

/** 横スワイプのカルーセル（左右の丸ボタン＋ドット） */
export function Carousel<T>({ items, render, label }: { items: T[]; render: (item: T, i: number) => ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setIdx(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, []);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = (i + items.length) % items.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  };

  const btn =
    'absolute top-[calc(50%-4px)] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy shadow';
  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-2 pt-6">
        {items.map((it, i) => (
          <div key={i} className="w-full shrink-0 snap-center px-7" aria-hidden={i !== idx}>
            {render(it, i)}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <>
          <button type="button" aria-label="前へ" className={`${btn} left-0`} onClick={() => go(idx - 1)}>
            ‹
          </button>
          <button type="button" aria-label="次へ" className={`${btn} right-0`} onClick={() => go(idx + 1)}>
            ›
          </button>
          <div className="mt-3 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}枚目`}
                onClick={() => go(i)}
                className={`h-2 w-2 rounded-full ${i === idx ? 'bg-step' : 'bg-line'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`h-head text-center text-[22px] text-navy ${className}`}>{children}</h2>;
}
