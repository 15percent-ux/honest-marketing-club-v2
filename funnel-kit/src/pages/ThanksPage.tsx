import { useEffect } from 'react';
import { brand } from '../brand';
import { rt } from '../lib/rt';
import { load } from '../lib/store';
import { query } from '../lib/router';
import { track } from '../lib/track';
import { lineLinkUrl } from '../lib/line';
import { formatDate, slotStart } from '../lib/slots';
import { Char } from '../components/ui';
import { Footer } from '../components/Footer';
import type { Reservation } from '../types';

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

function eventTimes(r: Pick<Reservation, 'date' | 'time'>) {
  const start = slotStart(r.date, r.time);
  const [eh, em] = r.time.split('-')[1].split(':').map(Number);
  const end = new Date(start);
  end.setHours(eh, em);
  return { start, end };
}

function googleCalUrl(r: Reservation) {
  const { start, end } = eventTimes(r);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${brand.brand.name} ${brand.offer.name}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `予約番号：${r.rid}\n参加URLはメールでお送りしています。`,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function downloadIcs(r: Reservation) {
  const { start, end } = eventTimes(r);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//funnel-kit//JA',
    'BEGIN:VEVENT',
    `UID:${r.rid}@${brand.id}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${brand.brand.name} ${brand.offer.name}`,
    `DESCRIPTION:予約番号：${r.rid}\\n参加URLはメールでお送りしています。`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `${brand.id}-${r.rid}.ics`;
  a.click();
}

export function ThanksPage() {
  const t = brand.thanks;
  const r = load<Reservation>('reservation');
  const rid = query('rid') || r?.rid || '';
  const linked = query('linked') === '1' || !!r?.lineUserId;
  const lineUrl = rid ? lineLinkUrl(rid) : null;

  useEffect(() => {
    track('thanks_view', { rid, linked });
    if (query('linked') === '1') track('line_link_complete', { rid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="bg-form-soft px-4 pb-10 pt-8">
        <div className="text-center">
          <p className="text-[40px]" aria-hidden>
            🎉
          </p>
          <h1 className="h-head text-[22px] text-navy">{t.title}</h1>
          <p className="mt-2 whitespace-pre-line text-[14px]">{t.lead}</p>
        </div>

        {r && (
          <dl className="mt-5 divide-y divide-line rounded-xl bg-white px-4 text-[13px] shadow-sm">
            <div className="flex justify-between py-3">
              <dt className="font-bold text-muted">日時</dt>
              <dd className="font-bold">
                {formatDate(r.date)} {r.time.replace('-', '〜')}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-bold text-muted">形式</dt>
              <dd>{brand.offer.format}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="font-bold text-muted">予約番号</dt>
              <dd className="font-num font-bold">{rid}</dd>
            </div>
          </dl>
        )}

        {brand.line.mode !== 'none' && (
          <section className="relative mt-6 overflow-hidden rounded-2xl border-4 border-lineg bg-white px-5 pb-6 pt-5 shadow">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-head text-[15px] font-bold">{t.lineCard.kicker}</p>
                <p className="mt-2 font-head text-[22px] font-black leading-snug">{rt(t.lineCard.title)}</p>
              </div>
              <Char c={t.lineCard.character} size={64} />
            </div>
            <ul className="mt-4 space-y-2 rounded-lg bg-[color-mix(in_srgb,var(--c-line)_10%,#fff)] p-3 text-[13px]">
              {t.lineCard.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-lineg">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            {linked ? (
              <p className="mt-4 rounded-full bg-lineg/10 py-3 text-center font-bold text-lineg">✓ LINE連携が完了しています</p>
            ) : lineUrl ? (
              <a
                href={lineUrl}
                onClick={() => track('line_link_click', { rid, mode: brand.line.mode })}
                className="mt-4 flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-lineg font-head text-[17px] font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.15)] wide"
              >
                {t.lineCard.button}
              </a>
            ) : null}
            {brand.line.mode === 'B' && brand.line.addFriendUrl && !linked && (
              <p className="mt-3 text-center text-[12px] text-muted">
                友だち追加がまだの方は
                <a href={brand.line.addFriendUrl} className="ml-1 text-lineg underline">
                  こちらから先に追加
                </a>
                してください
              </p>
            )}
          </section>
        )}

        {t.prep && (
          <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <p className="font-head text-[16px] font-bold">{t.prep.title}</p>
            <ol className="mt-3 space-y-2 text-[13px]">
              {t.prep.steps.map((s, i) => (
                <li key={s} className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta text-[12px] font-bold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>
        )}

        {r && (
          <div className="mt-6 grid grid-cols-2 gap-3 text-[13px] font-bold">
            <a href={googleCalUrl(r)} target="_blank" rel="noopener" className="rounded-full border border-navy bg-white py-3 text-center text-navy">
              Googleカレンダーに追加
            </a>
            <button type="button" onClick={() => downloadIcs(r)} className="rounded-full border border-navy bg-white py-3 text-navy">
              iPhoneのカレンダーに追加
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
