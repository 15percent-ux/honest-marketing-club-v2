import { brand } from '../brand';
import type { Reservation, SlotAvailability } from '../types';

export class ApiError extends Error {
  constructor(public code: 'slot_full' | 'duplicate' | 'network' | 'invalid', message: string) {
    super(message);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 予約枠の残数（backend=demo のときは null を返し、設定から作った枠をそのまま使う） */
export async function fetchSlots(from: string, to: string): Promise<SlotAvailability[] | null> {
  const b = brand.backend;
  if (b.type !== 'gas') return null;
  try {
    const res = await fetch(`${b.endpoint}?action=slots&from=${from}&to=${to}`);
    const json = (await res.json()) as { ok: boolean; slots: SlotAvailability[] };
    return json.ok ? json.slots : null;
  } catch {
    return null; // 取れなければ全枠を表示し、送信時にサーバー側で満席を判定する
  }
}

/** 予約を送信して予約番号を受け取る */
export async function submitReservation(r: Omit<Reservation, 'rid'>): Promise<{ rid: string }> {
  const b = brand.backend;
  if (b.type === 'demo') {
    await sleep(700);
    const rid = `D${r.date.replace(/-/g, '').slice(2)}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    return { rid };
  }
  let json: { ok: boolean; rid?: string; error?: string; message?: string };
  try {
    // GAS は CORS のプリフライトに応答できないため text/plain で送る
    const res = await fetch(b.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'reserve', brand: brand.id, reservation: r }),
    });
    json = await res.json();
  } catch {
    throw new ApiError('network', '通信に失敗しました。電波の良い場所でもう一度お試しください。');
  }
  if (!json.ok || !json.rid) {
    const code = (json.error as ApiError['code']) || 'invalid';
    throw new ApiError(code, json.message || '送信できませんでした。時間をおいてもう一度お試しください。');
  }
  return { rid: json.rid };
}
