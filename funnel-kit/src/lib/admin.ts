import { brand } from '../brand';

export type Status = 'active' | 'done' | 'cancelled' | 'noshow';

export interface AdminReservation {
  rid: string;
  createdAt: string;
  status: Status;
  date: string;
  time: string;
  name: string;
  email: string;
  tel: string;
  intent: string;
  message: string;
  survey: Record<string, string[]>;
  utm: Record<string, string>;
  line: boolean;
  source: 'line' | 'lp';
  note: string;
}

const KEY = 'funnelkit:admin-key';

/** 管理画面の合言葉：URLの #key=… から受け取り、この端末に覚えておく */
export function takeAdminKey(): string | null {
  const m = window.location.hash.match(/key=([0-9a-zA-Z]+)/);
  if (m) {
    try {
      localStorage.setItem(KEY, m[1]);
    } catch {
      /* 保存できない場合はこの画面の間だけ使う */
    }
    history.replaceState(null, '', window.location.pathname);
    return m[1];
  }
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function forgetAdminKey() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  if (brand.backend.type !== 'gas') throw new Error('demo');
  const res = await fetch(brand.backend.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export const adminList = (key: string) =>
  call<{ ok: boolean; error?: string; reservations?: AdminReservation[] }>({ action: 'admin_list', key });

export const adminUpdate = (key: string, rid: string, patch: { status?: Status; note?: string }) =>
  call<{ ok: boolean; error?: string }>({ action: 'admin_update', key, rid, ...patch });
