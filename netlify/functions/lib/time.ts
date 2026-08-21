// 日本時間（Asia/Tokyo, UTC+9固定・DSTなし）前提の日時ヘルパー

import { CONFIG } from './config';

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** UTCのDateを日本時間の各パーツに分解する */
export function toJstParts(d: Date) {
  const j = new Date(d.getTime() + JST_OFFSET_MS);
  return {
    year: j.getUTCFullYear(),
    month: j.getUTCMonth() + 1,
    day: j.getUTCDate(),
    hour: j.getUTCHours(),
    minute: j.getUTCMinutes(),
    weekday: j.getUTCDay(), // 0=日
  };
}

/** 日本時間の日付・時刻から Date（UTC瞬間）を作る */
export function jstDate(year: number, month: number, day: number, hour = 0, minute = 0): Date {
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - JST_OFFSET_MS);
}

/** "YYYY-MM-DD" (JST) */
export function jstDateKey(d: Date): string {
  const p = toJstParts(d);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** ISO文字列（+09:00 付き）を返す。例: 2026-08-20T10:00:00+09:00 */
export function jstIso(d: Date): string {
  const p = toJstParts(d);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:00${CONFIG.tzOffset}`;
}

const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

/** メール等で使う日本語表記。例: 2026年8月20日(木) 10:00 */
export function jstLabel(d: Date): string {
  const p = toJstParts(d);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${p.year}年${p.month}月${p.day}日(${WEEKDAYS_JA[p.weekday]}) ${pad(p.hour)}:${pad(p.minute)}`;
}

export function jstTimeLabel(d: Date): string {
  const p = toJstParts(d);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(p.hour)}:${pad(p.minute)}`;
}
