import React, { useEffect, useMemo, useState } from 'react';
import {
  fetchAvailability,
  createBooking,
  BookingApiError,
  DaySlots,
  BookingResult,
} from '../services/booking';

const GOLD = '#D4AF37';
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

type Phase = 'loading' | 'select' | 'form' | 'submitting' | 'done' | 'error';

const formatDateChip = (date: string) => {
  const [, m, d] = date.split('-').map(Number);
  return `${m}/${d}`;
};

const formatTime = (iso: string) => iso.slice(11, 16);

const formatFullLabel = (iso: string, weekday: number) => {
  const [datePart] = iso.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  return `${y}年${m}月${d}日(${WEEKDAYS_JA[weekday]}) ${formatTime(iso)}`;
};

const ZoomBooking: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('loading');
  const [days, setDays] = useState<DaySlots[]>([]);
  const [slotMinutes, setSlotMinutes] = useState(60);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<BookingResult | null>(null);

  const loadAvailability = async () => {
    setPhase('loading');
    setErrorMsg('');
    try {
      const data = await fetchAvailability();
      const availableDays = data.days.filter((d) => d.slots.length > 0);
      setDays(availableDays);
      setSlotMinutes(data.slotMinutes);
      setSelectedDate(availableDays[0]?.date ?? null);
      setPhase('select');
    } catch (err) {
      setErrorMsg(err instanceof BookingApiError ? err.message : '空き状況の取得に失敗しました。');
      setPhase('error');
    }
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const activeDay = useMemo(
    () => days.find((d) => d.date === selectedDate) ?? null,
    [days, selectedDate]
  );

  const selectedWeekday = useMemo(() => {
    if (!selectedSlot) return 0;
    const day = days.find((d) => d.slots.some((s) => s.start === selectedSlot));
    return day?.weekday ?? 0;
  }, [days, selectedSlot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !name.trim() || !email.trim()) return;
    setPhase('submitting');
    setErrorMsg('');
    try {
      const booking = await createBooking({
        name: name.trim(),
        email: email.trim(),
        note: note.trim(),
        start: selectedSlot,
        website,
      });
      setResult(booking);
      setPhase('done');
    } catch (err) {
      if (err instanceof BookingApiError && err.code === 'SLOT_TAKEN') {
        setErrorMsg(err.message);
        setSelectedSlot(null);
        await loadAvailability();
        return;
      }
      setErrorMsg(err instanceof BookingApiError ? err.message : '予約に失敗しました。');
      setPhase('form');
    }
  };

  const inputClass =
    'w-full bg-neutral-900/40 border border-neutral-800 rounded-lg px-5 py-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37]/60 transition-colors';

  return (
    <section id="booking" className="py-32 md:py-48 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20 text-center space-y-8">
          <div className="inline-flex items-center gap-4">
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
            <span className="font-mono text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: GOLD }}>
              Online Consultation
            </span>
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
          </div>
          <h2
            className="font-display font-bold leading-tight uppercase tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 64px)', wordBreak: 'keep-all' }}
          >
            BOOK A SESSION
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-sans tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
            ご希望の日時を選ぶだけで、Zoomの発行・カレンダー登録・リマインドまで<br className="hidden md:block" />
            すべて自動で完了します。（{slotMinutes}分／無料）
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {phase === 'loading' && (
            <div className="text-center py-24">
              <div className="inline-block w-8 h-8 border-2 border-neutral-700 border-t-[#D4AF37] rounded-full animate-spin" />
              <p className="mt-6 text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">
                Loading available slots...
              </p>
            </div>
          )}

          {phase === 'error' && (
            <div className="text-center py-16 space-y-6">
              <p className="text-sm text-neutral-400 leading-relaxed">{errorMsg}</p>
              <button
                onClick={loadAvailability}
                className="px-10 py-4 text-[11px] font-bold tracking-[0.4em] uppercase border border-neutral-700 text-white hover:border-[#D4AF37] transition-colors"
              >
                再読み込み
              </button>
            </div>
          )}

          {(phase === 'select' || phase === 'form' || phase === 'submitting') && (
            <div className="space-y-10">
              {days.length === 0 ? (
                <p className="text-center text-sm text-neutral-400 py-12">
                  現在ご案内できる枠がありません。恐れ入りますが、日を改めてご確認ください。
                </p>
              ) : (
                <>
                  {/* Step 1: 日付選択 */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">
                      <span style={{ color: GOLD }}>01</span> — 日付を選択
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {days.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => {
                            setSelectedDate(d.date);
                            setSelectedSlot(null);
                          }}
                          className={`flex-shrink-0 w-16 py-3 rounded-lg border text-center transition-all ${
                            selectedDate === d.date
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                              : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
                          }`}
                        >
                          <span className="block text-sm font-bold lining-nums">{formatDateChip(d.date)}</span>
                          <span
                            className={`block text-[10px] mt-1 ${
                              d.weekday === 0 ? 'text-red-400/70' : d.weekday === 6 ? 'text-blue-400/70' : 'text-neutral-500'
                            }`}
                          >
                            {WEEKDAYS_JA[d.weekday]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: 時間選択 */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">
                      <span style={{ color: GOLD }}>02</span> — 時間を選択（日本時間）
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {activeDay?.slots.map((s) => (
                        <button
                          key={s.start}
                          onClick={() => setSelectedSlot(s.start)}
                          className={`py-3 rounded-lg border text-sm lining-nums transition-all ${
                            selectedSlot === s.start
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
                              : 'border-neutral-800 text-neutral-300 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {formatTime(s.start)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: 情報入力 */}
                  {selectedSlot && (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-neutral-900">
                      <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">
                        <span style={{ color: GOLD }}>03</span> — お客様情報
                      </p>
                      <div className="bg-neutral-900/30 border border-[#D4AF37]/20 rounded-lg px-5 py-4 text-sm text-white">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-1">
                          Selected
                        </span>
                        {formatFullLabel(selectedSlot, selectedWeekday)}〜（{slotMinutes}分）
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="お名前 *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        maxLength={100}
                      />
                      <input
                        type="email"
                        required
                        placeholder="メールアドレス *（Zoomリンクとカレンダー招待が届きます）"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        maxLength={200}
                      />
                      <textarea
                        placeholder="ご相談内容（任意）"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        className={inputClass}
                        maxLength={2000}
                      />
                      {/* honeypot: 人間には見えない */}
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
                      />

                      {errorMsg && (
                        <p className="text-sm text-red-400/90 leading-relaxed">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={phase === 'submitting' || !name.trim() || !email.trim()}
                        className={`w-full py-6 text-[12px] font-bold tracking-[0.5em] uppercase transition-all ${
                          phase === 'submitting' || !name.trim() || !email.trim()
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-[#D4AF37] hover:text-white'
                        }`}
                      >
                        {phase === 'submitting' ? '予約処理中...' : 'この日時で予約する'}
                      </button>
                      <p className="text-[10px] text-neutral-600 text-center leading-relaxed">
                        予約確定と同時にZoomミーティングを発行し、確認メールとGoogleカレンダー招待をお送りします。
                      </p>
                    </form>
                  )}
                </>
              )}
            </div>
          )}

          {phase === 'done' && result && (
            <div className="text-center space-y-8 py-8">
              <div
                className="w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center text-2xl"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                ✓
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white tracking-wide">ご予約が確定しました</h3>
                <p className="text-sm text-neutral-400 leading-loose">
                  {result.label}〜（日本時間）<br />
                  確認メールとGoogleカレンダーの招待をお送りしました。<br />
                  前日と1時間前にもリマインドが届きます。
                </p>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 max-w-md mx-auto space-y-3">
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">Zoom Link</p>
                <a
                  href={result.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm break-all transition-colors hover:opacity-80"
                  style={{ color: GOLD }}
                >
                  {result.joinUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-neutral-900/10 skew-x-12 -translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default ZoomBooking;
