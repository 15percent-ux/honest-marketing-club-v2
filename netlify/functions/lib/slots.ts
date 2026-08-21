// 予約可能枠の算出：営業時間グリッド − Googleカレンダーのbusy − 既存予約 − 直前枠

import { CONFIG } from './config';
import { getBusyIntervals } from './google';
import { jstDate, jstDateKey, jstIso, toJstParts } from './time';

export interface Slot {
  start: string; // ISO (+09:00)
  end: string; // ISO (+09:00)
}

export interface DaySlots {
  date: string; // YYYY-MM-DD (JST)
  weekday: number; // 0=日
  slots: Slot[];
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** 今日から daysAhead 日分の空き枠を返す */
export async function getAvailableSlots(now = new Date()): Promise<DaySlots[]> {
  const { slotMinutes, startHour, endHour, daysAhead, minNoticeHours } = CONFIG;
  const todayJst = toJstParts(now);
  const rangeStart = jstDate(todayJst.year, todayJst.month, todayJst.day);
  const rangeEnd = new Date(rangeStart.getTime() + (daysAhead + 1) * 24 * 60 * 60 * 1000);

  const busy = await getBusyIntervals(rangeStart, rangeEnd);
  const earliest = new Date(now.getTime() + minNoticeHours * 60 * 60 * 1000);

  const days: DaySlots[] = [];
  for (let d = 0; d <= daysAhead; d++) {
    const dayStart = new Date(rangeStart.getTime() + d * 24 * 60 * 60 * 1000);
    const p = toJstParts(dayStart);
    const slots: Slot[] = [];

    for (let minutes = startHour * 60; minutes + slotMinutes <= endHour * 60; minutes += slotMinutes) {
      const slotStart = jstDate(p.year, p.month, p.day, Math.floor(minutes / 60), minutes % 60);
      const slotEnd = new Date(slotStart.getTime() + slotMinutes * 60 * 1000);
      if (slotStart < earliest) continue;
      if (busy.some((b) => overlaps(slotStart, slotEnd, b.start, b.end))) continue;
      slots.push({ start: jstIso(slotStart), end: jstIso(slotEnd) });
    }

    days.push({ date: jstDateKey(dayStart), weekday: p.weekday, slots });
  }
  return days;
}

/** 予約リクエストの枠が現在も有効（グリッド上にあり、空いている）か検証する */
export async function isSlotAvailable(startIso: string, now = new Date()): Promise<boolean> {
  const days = await getAvailableSlots(now);
  return days.some((day) => day.slots.some((s) => s.start === startIso));
}
