// 予約データの保存（Netlify Blobs）。リマインド送信の管理に使う。

import { getStore } from '@netlify/blobs';

export interface Booking {
  id: string;
  name: string;
  email: string;
  note: string;
  start: string; // ISO (+09:00)
  end: string; // ISO (+09:00)
  zoomMeetingId: string;
  zoomJoinUrl: string;
  calendarEventId: string;
  createdAt: string;
  reminded24h: boolean;
  reminded1h: boolean;
  status: 'confirmed' | 'cancelled';
  cancelToken: string;
  cancelUrl: string;
}

function bookingsStore() {
  return getStore('bookings');
}

/** キーは開始日時順に並ぶよう start を先頭に置く */
export function bookingKey(b: Pick<Booking, 'id' | 'start'>): string {
  return `${b.start.replace(/[:+]/g, '')}_${b.id}`;
}

export async function saveBooking(b: Booking): Promise<void> {
  await bookingsStore().setJSON(bookingKey(b), b);
}

export async function getBookingByKey(key: string): Promise<Booking | null> {
  if (!key || key.length > 200) return null;
  return (await bookingsStore().get(key, { type: 'json' })) as Booking | null;
}

export async function listBookings(): Promise<Booking[]> {
  const store = bookingsStore();
  const { blobs } = await store.list();
  const bookings: Booking[] = [];
  for (const blob of blobs) {
    const b = (await store.get(blob.key, { type: 'json' })) as Booking | null;
    if (b) bookings.push(b);
  }
  return bookings;
}

/** 指定期間に開始する確定済み予約 */
export async function listUpcomingBookings(from: Date, to: Date): Promise<Booking[]> {
  const all = await listBookings();
  return all.filter((b) => {
    if (b.status !== 'confirmed') return false;
    const start = new Date(b.start).getTime();
    return start >= from.getTime() && start < to.getTime();
  });
}
