// 予約APIクライアント（Netlify Functions を呼び出す）

export interface Slot {
  start: string; // ISO (+09:00)
  end: string;
}

export interface DaySlots {
  date: string; // YYYY-MM-DD
  weekday: number; // 0=日
  slots: Slot[];
}

export interface AvailabilityResponse {
  timezone: string;
  slotMinutes: number;
  days: DaySlots[];
}

export interface BookingResult {
  start: string;
  end: string;
  label: string;
  joinUrl: string;
}

export class BookingApiError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

async function parseError(res: Response): Promise<never> {
  let message = '通信エラーが発生しました。時間をおいて再度お試しください。';
  let code: string | undefined;
  try {
    const data = await res.json();
    if (data?.error) message = data.error;
    code = data?.code;
  } catch {
    // ignore
  }
  throw new BookingApiError(message, code);
}

export async function fetchAvailability(): Promise<AvailabilityResponse> {
  const res = await fetch('/api/availability');
  if (!res.ok) await parseError(res);
  return res.json();
}

export async function createBooking(params: {
  name: string;
  email: string;
  note: string;
  start: string;
  website?: string; // honeypot
}): Promise<BookingResult> {
  const res = await fetch('/api/book', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) await parseError(res);
  const data = await res.json();
  return data.booking as BookingResult;
}
