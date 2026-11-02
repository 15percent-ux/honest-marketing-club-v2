import type { FormConfig, SlotAvailability } from '../types';

const pad = (n: number) => String(n).padStart(2, '0');
export const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function slotStart(date: string, time: string) {
  const [h, m] = time.split('-')[0].split(':').map(Number);
  const [y, mo, d] = date.split('-').map(Number);
  return new Date(y, mo - 1, d, h, m);
}

/** 設定から予約可能な枠を作る。remaining は backend の値で上書きする（demo では 1 固定） */
export function generateSlots(s: FormConfig['schedule'], now = new Date()): SlotAvailability[] {
  const out: SlotAvailability[] = [];
  const limit = now.getTime() + s.leadHours * 3600_000;
  for (let i = 0; i <= s.daysAhead; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const date = ymd(d);
    if (!s.weekdays.includes(d.getDay()) || s.closedDates?.includes(date)) continue;
    for (const time of s.times) {
      if (slotStart(date, time).getTime() < limit) continue;
      out.push({ date, time, remaining: 1 });
    }
  }
  return out;
}

export function mergeAvailability(base: SlotAvailability[], server: SlotAvailability[] | null) {
  if (!server) return base;
  const map = new Map(server.map((s) => [`${s.date} ${s.time}`, s.remaining]));
  return base.map((s) => ({ ...s, remaining: map.get(`${s.date} ${s.time}`) ?? s.remaining }));
}

const WD = ['日', '月', '火', '水', '木', '金', '土'];
export function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  const wd = WD[new Date(y, m - 1, d).getDay()];
  return `${m}月${d}日（${wd}）`;
}
