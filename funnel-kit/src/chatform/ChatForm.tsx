import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { brand } from '../brand';
import { rt } from '../lib/rt';
import { navigate } from '../lib/router';
import { load, remove, save } from '../lib/store';
import { track } from '../lib/track';
import { ApiError, fetchSlots, submitReservation } from '../lib/api';
import { formatDate, generateSlots, mergeAvailability } from '../lib/slots';
import { Char } from '../components/ui';
import { Calendar } from './Calendar';
import { CARRIER_DOMAINS, REGIONS } from './regions';
import type { FormStepId, Reservation, SlotAvailability } from '../types';

interface Values {
  date?: string;
  time?: string;
  intent?: string;
  lastName: string;
  firstName: string;
  email: string;
  tel: [string, string, string];
  region?: string;
  by?: string;
  bm?: string;
  bd?: string;
  message: string;
  password: string;
}

const empty: Values = { lastName: '', firstName: '', email: '', tel: ['', '', ''], message: '', password: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_CHARS = /^[\x21-\x7e]*$/;

type Phase = 'steps' | 'final' | 'sending' | 'done';

export function ChatForm({ onClose }: { onClose: () => void }) {
  const cfg = brand.form;
  const steps = useMemo(() => cfg.steps.filter((s): s is Exclude<FormStepId, 'greeting'> => s !== 'greeting'), [cfg.steps]);
  const N = steps.length;

  const saved = load<{ v: Values; i: number }>('form');
  const [v, setV] = useState<Values>(saved?.v || empty);
  const [idx, setIdx] = useState(saved?.i ?? 0);
  const [shown, setShown] = useState(saved?.i ?? 0); // タイピング演出のあとに表示済みのステップ
  const [phase, setPhase] = useState<Phase>('steps');
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotAvailability[]>(() => generateSlots(cfg.schedule));
  const scroller = useRef<HTMLDivElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((p) => ({ ...p, [k]: val }));

  // 背景のスクロールを止める
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // 予約枠の残数を取得（demo では設定から作った枠をそのまま使う）
  const refreshSlots = async () => {
    const base = generateSlots(cfg.schedule);
    if (!base.length) return setSlots(base);
    const server = await fetchSlots(base[0].date, base[base.length - 1].date);
    setSlots(mergeAvailability(base, server));
  };
  useEffect(() => {
    refreshSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 入力途中の内容を保持（閉じて開き直しても残る）
  useEffect(() => {
    if (phase === 'steps' || phase === 'final') save('form', { v, i: idx });
  }, [v, idx, phase]);

  // 新しいステップはタイピング演出のあとに表示し、そこまでスクロールする
  useEffect(() => {
    if (shown >= idx) return;
    const t = window.setTimeout(() => setShown(idx), 650);
    return () => window.clearTimeout(t);
  }, [idx, shown]);
  useEffect(() => {
    const el = phase === 'steps' ? blocks.current[shown] : finalRef.current;
    if (el && shown > 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [shown, phase]);

  const telDigits = v.tel.join('');
  const daySlots = slots.filter((s) => s.date === v.date);
  const slotOk = !!slots.find((s) => s.date === v.date && s.time === v.time && s.remaining > 0);
  const birthOk = (() => {
    if (!v.by || !v.bm || !v.bd) return false;
    const d = new Date(+v.by, +v.bm - 1, +v.bd);
    return d.getMonth() === +v.bm - 1;
  })();

  const valid: Record<Exclude<FormStepId, 'greeting'>, boolean> = {
    schedule: slotOk,
    intent: !!v.intent,
    name: !!v.lastName.trim() && !!v.firstName.trim(),
    contact: EMAIL.test(v.email.trim()) && /^0\d{9,10}$/.test(telDigits),
    region: !!v.region,
    birthdate: birthOk,
    message: !cfg.message?.required || !!v.message.trim(),
    password: v.password.length >= 6 && PASS_CHARS.test(v.password),
  };

  const next = () => {
    track('form_step', { n: idx + 1, id: steps[idx] });
    if (idx < N - 1) setIdx(idx + 1);
    else {
      setPhase('final');
      window.setTimeout(() => finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const close = () => {
    track('form_close', { n: idx + 1, phase });
    onClose();
  };

  const submit = async () => {
    setPhase('sending');
    setError(null);
    const payload: Omit<Reservation, 'rid'> = {
      date: v.date!,
      time: v.time!,
      intent: v.intent,
      lastName: v.lastName.trim(),
      firstName: v.firstName.trim(),
      email: v.email.trim().toLowerCase(),
      tel: v.tel.join('-'),
      region: v.region,
      birthdate: birthOk ? `${v.by}-${v.bm!.padStart(2, '0')}-${v.bd!.padStart(2, '0')}` : undefined,
      message: v.message.trim() || undefined,
      password: steps.includes('password') ? v.password : undefined,
      survey: load('survey'),
      utm: load('utm'),
      lineUserId: load<{ userId: string }>('liff')?.userId,
    };
    try {
      const { rid } = await submitReservation(payload);
      const { password: _omit, ...publicData } = payload;
      void _omit;
      save('reservation', { ...publicData, rid });
      remove('form');
      track('form_submit', { rid, date: payload.date, time: payload.time, intent: payload.intent });
      setConfirm(false);
      setPhase('done');
      window.setTimeout(() => navigate('/thanks', { rid }), 1200);
    } catch (e) {
      const err = e instanceof ApiError ? e : new ApiError('network', '送信に失敗しました。');
      track('form_error', { code: err.code });
      setError(err.message);
      if (err.code === 'slot_full') {
        setConfirm(false);
        set('time', undefined);
        await refreshSlots();
        setPhase('steps');
        setIdx(steps.indexOf('schedule'));
        setShown(steps.indexOf('schedule'));
      } else {
        setPhase('final');
      }
    }
  };

  const progress = phase === 'steps' ? (idx + 1) / N : 1;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/30" role="dialog" aria-modal="true" aria-label={cfg.headerTitle}>
      <div ref={scroller} className="relative h-full w-full max-w-lp overflow-y-auto bg-form-soft">
        {/* ヘッダーと進捗 */}
        <div className="sticky top-0 z-20 bg-form-soft">
          <div className="flex items-center gap-2 border-b border-form/30 bg-[color-mix(in_srgb,var(--c-form)_14%,#fff)] px-4 py-2">
            <div className="flex-1 text-center">
              <p className="text-[12px] font-bold text-form wide">✦ {cfg.headerTitle}</p>
              <p className="font-head text-[17px] font-bold text-form wide">{cfg.headerSub}</p>
            </div>
            <Char c={brand.brand.staffIcon} size={40} />
            <button type="button" onClick={close} aria-label="閉じる" className="ml-1 h-10 w-10 text-[22px] text-form">
              ×
            </button>
          </div>
          <div className="bg-white px-4 pb-2 pt-1.5">
            <div className="flex justify-between text-[11px] font-bold text-form">
              <span>{phase === 'steps' ? `${idx + 1}/${N}` : '完了'}</span>
              <span>{cfg.speedLabel}</span>
              <span className="w-6" />
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-form-soft">
              <div className="h-full rounded-full bg-form transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 pb-40 pt-4">
          {cfg.steps.includes('greeting') && (
            <Bot>
              <p>{cfg.greeting}</p>
              {cfg.existingLink && (
                <a href={cfg.existingLink.href} className="mt-3 block rounded border border-form/40 p-3 text-[12px] text-form underline">
                  {cfg.existingLink.label}
                </a>
              )}
            </Bot>
          )}

          {steps.slice(0, Math.min(shown, idx) + 1).map((id, i) => (
            <div
              key={id}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              className="fade-up scroll-mt-28 space-y-3"
            >
              <StepView id={id} v={v} set={set} slots={slots} daySlots={daySlots} />
              {phase === 'steps' && i === idx && (
                <NextButton disabled={!valid[id]} onClick={next} />
              )}
            </div>
          ))}

          {phase === 'steps' && shown < idx && <Typing />}

          {error && (
            <Bot>
              <p className="font-bold text-[#c0392b]">{error}</p>
            </Bot>
          )}

          {phase !== 'steps' && (
            <div ref={finalRef} className="fade-up scroll-mt-28 space-y-3">
              <Bot>
                <p>最後に、入力していただいた内容をご確認ください。</p>
                <p className="mt-1">ご利用規約をご確認のうえ、同意いただける方は次へお進みください。</p>
              </Bot>
              {phase !== 'done' && (
                <button type="button" onClick={() => setConfirm(true)} className="w-full rounded bg-form py-3 font-bold text-white wide">
                  内容を確認する
                </button>
              )}
              {phase === 'done' && (
                <Bot>
                  <p className="whitespace-pre-line">{cfg.completeMessage}</p>
                </Bot>
              )}
            </div>
          )}
        </div>

        {confirm && (
          <ConfirmModal
            v={v}
            steps={steps}
            sending={phase === 'sending'}
            onClose={() => setConfirm(false)}
            onSubmit={submit}
          />
        )}
      </div>
    </div>
  );
}

// ───────── 部品 ─────────

function Bot({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Char c={brand.brand.staffIcon} size={32} />
      <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm bg-white px-4 py-3 text-[13px] leading-relaxed shadow-sm">{children}</div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-2" aria-label="入力中">
      <Char c={brand.brand.staffIcon} size={32} />
      <div className="typing rounded-xl bg-white px-4 py-3 shadow-sm">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function NextButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="ml-auto block w-1/2 rounded bg-form py-3 font-bold text-white transition wide disabled:bg-form-off"
    >
      次へ
    </button>
  );
}

const field = 'w-full rounded border border-line bg-white px-3 py-3 text-[16px] outline-none focus:border-form focus:ring-2 focus:ring-form/30';
const label = 'mb-1 block text-[12px] font-bold text-ink';

function StepView({
  id,
  v,
  set,
  slots,
  daySlots,
}: {
  id: Exclude<FormStepId, 'greeting'>;
  v: Values;
  set: <K extends keyof Values>(k: K, val: Values[K]) => void;
  slots: SlotAvailability[];
  daySlots: SlotAvailability[];
}) {
  const cfg = brand.form;
  switch (id) {
    case 'schedule':
      return (
        <>
          {cfg.proof?.footnote && (
            <Bot>
              <div className="flex flex-col items-center py-2">
                <div
                  className="flex h-40 w-40 items-center justify-center rounded-full"
                  style={{ background: `conic-gradient(var(--c-form) ${cfg.proof.value}%, var(--c-form-soft) 0)` }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-form text-white">
                    <span className="text-[12px] font-bold">{cfg.proof.unit}</span>
                    <span className="font-num text-[40px] font-bold leading-none">
                      {cfg.proof.value}
                      <span className="text-[18px]">%</span>
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center font-head text-[15px] font-bold">{rt(cfg.proof.caption)}</p>
                <p className="mt-2 text-[10px] text-muted">{cfg.proof.footnote}</p>
              </div>
            </Bot>
          )}
          {cfg.scheduleIntro.map((t) => (
            <Bot key={t}>
              <p>{t}</p>
            </Bot>
          ))}
          <div>
            <span className={label}>ご希望の日にち</span>
            <Calendar slots={slots} value={v.date} onChange={(d) => (set('date', d), set('time', undefined))} />
          </div>
          <div>
            <label className={label} htmlFor="cf-time">
              ご希望の時間
            </label>
            <select id="cf-time" className={field} value={v.time || ''} disabled={!v.date} onChange={(e) => set('time', e.target.value || undefined)}>
              <option value="">{v.date ? '選択してください' : '先に日にちを選んでください'}</option>
              {daySlots.map((s) => (
                <option key={s.time} value={s.time} disabled={s.remaining <= 0}>
                  {s.time.replace('-', ' - ')}
                  {s.remaining <= 0 ? '（満席）' : ''}
                </option>
              ))}
            </select>
            {v.date && v.time && <p className="mt-1 text-[12px] text-form">{formatDate(v.date)} {v.time.replace('-', '〜')} で受け付けます</p>}
          </div>
        </>
      );
    case 'intent':
      return (
        <>
          <Bot>
            <p>{cfg.intent?.prompt}</p>
          </Bot>
          <select aria-label={cfg.intent?.prompt} className={field} value={v.intent || ''} onChange={(e) => set('intent', e.target.value || undefined)}>
            <option value="">選択してください</option>
            {cfg.intent?.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </>
      );
    case 'name':
      return (
        <>
          <Bot>
            <p>次に、お名前をご入力ください。</p>
          </Bot>
          <div>
            <span className={label}>お名前</span>
            <div className="grid grid-cols-2 gap-2">
              <input className={field} aria-label="姓" placeholder="山田" autoComplete="family-name" value={v.lastName} onChange={(e) => set('lastName', e.target.value)} />
              <input className={field} aria-label="名" placeholder="花子" autoComplete="given-name" value={v.firstName} onChange={(e) => set('firstName', e.target.value)} />
            </div>
          </div>
        </>
      );
    case 'contact': {
      const domain = v.email.split('@')[1]?.toLowerCase() || '';
      const carrier = CARRIER_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
      const telRefs = [0, 1, 2];
      return (
        <>
          <Bot>
            <p>続いて、メールアドレスと電話番号をご入力ください。</p>
          </Bot>
          <div>
            <label className={label} htmlFor="cf-email">
              メールアドレス
            </label>
            <input
              id="cf-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={field}
              placeholder="example@gmail.com"
              value={v.email}
              onChange={(e) => set('email', e.target.value)}
            />
            <p className={`mt-1 text-[11px] leading-snug ${carrier ? 'font-bold text-[#c0392b]' : 'text-[#c0392b]/80'}`}>
              docomo・au・SoftBank などの携帯メールは、ご案内が届かない場合があります。Gmail などのアドレスをおすすめします。
            </p>
          </div>
          <div>
            <span className={label}>電話番号</span>
            <div className="flex items-center gap-1">
              {telRefs.map((i) => (
                <div key={i} className="flex flex-1 items-center gap-1">
                  {i > 0 && <span className="text-muted">-</span>}
                  <input
                    id={`cf-tel${i}`}
                    aria-label={`電話番号（${i + 1}つ目）`}
                    inputMode="numeric"
                    autoComplete={i === 0 ? 'tel-area-code' : i === 1 ? 'tel-local-prefix' : 'tel-local-suffix'}
                    maxLength={4}
                    className={`${field} text-center`}
                    placeholder={i === 0 ? '080' : 'xxxx'}
                    value={v.tel[i]}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                      const t = [...v.tel] as Values['tel'];
                      t[i] = digits;
                      set('tel', t);
                      const full = i === 0 ? (/^0[789]0$/.test(digits) ? 3 : 4) : 4;
                      if (digits.length >= full && i < 2) document.getElementById(`cf-tel${i + 1}`)?.focus();
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
    case 'region':
      return (
        <>
          <Bot>
            <p>続いて、お住まいの地域を教えてください。</p>
          </Bot>
          <RegionPicker value={v.region} onChange={(r) => set('region', r)} />
        </>
      );
    case 'birthdate': {
      const now = new Date().getFullYear();
      const years = Array.from({ length: 76 }, (_, i) => String(now - 15 - i));
      const sel = `${field} pr-6`;
      return (
        <>
          <Bot>
            <p>次に、生年月日をご入力ください。</p>
          </Bot>
          <div>
            <span className={label}>生年月日</span>
            <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2">
              <select aria-label="生年月日（年）" className={sel} value={v.by || ''} onChange={(e) => set('by', e.target.value)}>
                <option value="">年</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <select aria-label="生年月日（月）" className={sel} value={v.bm || ''} onChange={(e) => set('bm', e.target.value)}>
                <option value="">月</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
              <select aria-label="生年月日（日）" className={sel} value={v.bd || ''} onChange={(e) => set('bd', e.target.value)}>
                <option value="">日</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      );
    }
    case 'message':
      return (
        <>
          <Bot>
            <p>{cfg.message?.prompt}</p>
          </Bot>
          <textarea
            aria-label={cfg.message?.prompt}
            rows={4}
            className={field}
            placeholder={cfg.message?.placeholder}
            value={v.message}
            onChange={(e) => set('message', e.target.value)}
          />
          {!cfg.message?.required && <p className="text-[11px] text-muted">※ 空欄のままでも次へ進めます</p>}
        </>
      );
    case 'password':
      return <PasswordStep value={v.password} onChange={(p) => set('password', p)} />;
  }
}

function RegionPicker({ value, onChange }: { value?: string; onChange: (r: string) => void }) {
  const [open, setOpen] = useState<string | null>(() => REGIONS.find((r) => value && r.prefs.includes(value))?.name || null);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
      {REGIONS.map((r) => (
        <div key={r.name}>
          <button
            type="button"
            aria-expanded={open === r.name}
            onClick={() => setOpen(open === r.name ? null : r.name)}
            className="flex w-full items-center gap-2 px-3 py-3 text-left text-[14px] font-bold"
          >
            <span className={`text-form transition ${open === r.name ? 'rotate-90' : ''}`}>▶</span>
            {r.name}
            {value && r.prefs.includes(value) && <span className="ml-auto text-[12px] text-form">{value}</span>}
          </button>
          {open === r.name && (
            <div className="grid grid-cols-2 gap-1 px-4 pb-3" role="radiogroup" aria-label={r.name}>
              {r.prefs.map((p) => (
                <label key={p} className="flex items-center gap-2 py-1 text-[14px]">
                  <input type="radio" name="cf-region" className="h-4 w-4 accent-[var(--c-form)]" checked={value === p} onChange={() => onChange(p)} />
                  {p}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PasswordStep({ value, onChange }: { value: string; onChange: (p: string) => void }) {
  const [show, setShow] = useState(false);
  const longEnough = value.length >= 6;
  const charsOk = PASS_CHARS.test(value);
  return (
    <>
      <Bot>
        <p>続いて、マイページ用のパスワードをご入力ください。</p>
      </Bot>
      <div>
        <label className={label} htmlFor="cf-pass">
          パスワード（6文字以上）
        </label>
        <div className="relative">
          <input
            id="cf-pass"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            className={`${field} pr-12`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? '隠す' : '表示する'} className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-muted">
            {show ? '🙈' : '👁'}
          </button>
        </div>
        <p className={`mt-1 text-[12px] ${longEnough ? 'text-[#2e9e5b]' : 'text-muted'}`}>{longEnough ? '✓' : '・'} 6文字以上</p>
        {!charsOk && <p className="text-[12px] font-bold text-[#c0392b]">使えない文字（全角・空白など）が含まれています</p>}
      </div>
    </>
  );
}

function ConfirmModal({
  v,
  steps,
  sending,
  onClose,
  onSubmit,
}: {
  v: Values;
  steps: Exclude<FormStepId, 'greeting'>[];
  sending: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const cfg = brand.form;
  const [agreed, setAgreed] = useState<boolean[]>(cfg.agreements.map(() => false));
  const rows: [string, string][] = [
    ['ご希望の日時', v.date && v.time ? `${formatDate(v.date)} ${v.time.replace('-', '〜')}` : ''],
    ['お名前', `${v.lastName} ${v.firstName}`],
    ['メールアドレス', v.email],
    ['電話番号', v.tel.join('-')],
  ];
  if (steps.includes('region')) rows.push(['お住まい', v.region || '']);
  if (steps.includes('birthdate')) rows.push(['生年月日', v.by ? `${v.by}年${v.bm}月${v.bd}日` : '']);
  if (steps.includes('intent')) rows.push(['ご検討状況', v.intent || '']);
  if (steps.includes('message') && v.message) rows.push(['ご相談内容', v.message]);
  if (steps.includes('password')) rows.push(['パスワード', '●'.repeat(v.password.length)]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center" role="dialog" aria-modal="true" aria-label="内容確認">
      <div className="max-h-[92dvh] w-full max-w-lp overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <p className="mx-auto font-head text-[16px] font-bold">◆ 内容確認 ◆</p>
          <button type="button" onClick={onClose} aria-label="閉じる" className="flex h-8 w-8 items-center justify-center rounded-full bg-form text-white">
            ×
          </button>
        </div>
        <table className="mt-4 w-full text-[12px]">
          <tbody>
            {rows.map(([k, val]) => (
              <tr key={k} className="border-b border-line">
                <th className="w-28 bg-form-soft px-2 py-2 text-left font-bold">{k}</th>
                <td className="whitespace-pre-wrap break-all px-2 py-2 text-right">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 space-y-3">
          {cfg.agreements.map((a, i) => (
            <label key={i} className="flex items-start gap-2 text-[12px] leading-relaxed">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--c-cta)]"
                checked={agreed[i]}
                onChange={(e) => setAgreed(agreed.map((x, j) => (j === i ? e.target.checked : x)))}
              />
              <span>
                {a.text}
                {a.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className="ml-1 text-form underline">
                    {l.label}
                  </a>
                ))}
              </span>
            </label>
          ))}
        </div>
        <button
          type="button"
          disabled={sending || agreed.some((x) => !x)}
          onClick={onSubmit}
          className="mt-5 w-full rounded-full bg-primary py-4 font-head text-[17px] font-black text-white wide disabled:opacity-40"
        >
          {sending ? '送信中…' : '申し込みを完了する'}
        </button>
      </div>
    </div>
  );
}
