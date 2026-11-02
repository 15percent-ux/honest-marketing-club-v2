import { useMemo, useState } from 'react';
import type { SlotAvailability } from '../types';

const WD = ['日', '月', '火', '水', '木', '金', '土'];
const pad = (n: number) => String(n).padStart(2, '0');

export function Calendar({
  slots,
  value,
  onChange,
}: {
  slots: SlotAvailability[];
  value?: string;
  onChange: (date: string) => void;
}) {
  const availableDates = useMemo(() => {
    const m = new Map<string, boolean>();
    for (const s of slots) m.set(s.date, (m.get(s.date) || false) || s.remaining > 0);
    return m;
  }, [slots]);

  const months = useMemo(() => {
    const keys = [...new Set(slots.map((s) => s.date.slice(0, 7)))].sort();
    return keys.length ? keys : [new Date().toISOString().slice(0, 7)];
  }, [slots]);

  const [mi, setMi] = useState(() => Math.max(0, months.indexOf((value || months[0]).slice(0, 7))));
  const [y, m] = months[Math.min(mi, months.length - 1)].split('-').map(Number);
  const first = new Date(y, m - 1, 1).getDay();
  const days = new Date(y, m, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div className="overflow-hidden rounded-lg border border-form/40 bg-white">
      <div className="flex items-center justify-between bg-form px-2 py-1.5 text-white">
        <button type="button" aria-label="前の月" disabled={mi === 0} onClick={() => setMi(mi - 1)} className="px-3 disabled:opacity-30">
          ‹
        </button>
        <span className="text-[14px] font-bold">
          {y}年{m}月
        </span>
        <button type="button" aria-label="次の月" disabled={mi >= months.length - 1} onClick={() => setMi(mi + 1)} className="px-3 disabled:opacity-30">
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-[12px]">
        {WD.map((w, i) => (
          <div key={w} className={`py-1 font-bold ${i === 0 ? 'text-[#d9534f]' : i === 6 ? 'text-[#3b7dd8]' : 'text-muted'}`}>
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />;
          const date = `${y}-${pad(m)}-${pad(d)}`;
          const ok = availableDates.get(date) === true;
          const on = value === date;
          return (
            <button
              key={date}
              type="button"
              disabled={!ok}
              aria-pressed={on}
              aria-label={`${m}月${d}日${ok ? '' : '（予約不可）'}`}
              onClick={() => onChange(date)}
              className={`m-[2px] h-9 rounded text-[13px] font-bold ${
                on ? 'bg-primary text-white' : ok ? 'bg-form-soft text-ink hover:bg-primary-soft' : 'text-muted/40'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
