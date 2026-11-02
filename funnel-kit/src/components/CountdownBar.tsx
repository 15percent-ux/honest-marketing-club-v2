import { brand } from '../brand';
import { useCountdown } from '../lib/countdown';

const Box = ({ n, unit }: { n: number; unit: string }) => (
  <span className="flex items-baseline gap-[2px]">
    <span className="inline-block min-w-[28px] rounded bg-white px-1 text-center font-num text-[17px] font-bold leading-7 text-navy">
      {String(n).padStart(2, '0')}
    </span>
    <span className="text-[10px]">{unit}</span>
  </span>
);

/** 実在の締切に向けた固定バー。締切を過ぎたら何も描画しない */
export function CountdownBar() {
  const c = brand.campaign;
  const r = useCountdown(c?.deadline);
  if (!c || !r || r.done) return null;
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between gap-2 bg-navy px-3 py-2 text-white" role="timer" aria-live="off">
      <p className="whitespace-pre-line text-[11px] font-bold leading-tight">{c.label}</p>
      <div className="flex items-center gap-1">
        <Box n={r.d} unit="日" />
        <Box n={r.h} unit="時間" />
        <Box n={r.m} unit="分" />
        <Box n={r.s} unit="秒" />
      </div>
    </div>
  );
}
