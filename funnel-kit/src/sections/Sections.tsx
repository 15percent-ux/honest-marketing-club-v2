import { useEffect, useState } from 'react';
import type { LpSection } from '../types';
import { rt } from '../lib/rt';
import { useOpenForm } from '../lib/formContext';
import { load } from '../lib/store';
import { track } from '../lib/track';
import { Icon } from '../components/Icon';
import { BubbleLabel, Carousel, Char, CheckList, CtaPill, Footnote, Img, SectionHead, SectionLabel } from '../components/ui';

type S<T extends LpSection['type']> = Extract<LpSection, { type: T }>;

/** ボタンの行き先：'#plans' ならページ内のその位置へ、それ以外はそのURLへ */
function goHref(href: string, source: string) {
  track('cta_click', { section_id: source, href });
  if (href.startsWith('#')) {
    const id = href.slice(1);
    document.querySelector(`[data-section="${CSS.escape(id)}"], [data-section^="${CSS.escape(id)}-"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else window.location.href = href;
}

/** セクションの外枠：余白をそろえる */
const Pad = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`px-5 py-12 ${className}`}>{children}</section>
);

// ───────── 回答のお礼 ─────────
function ThanksBand({ s }: { s: S<'thanksBand'> }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-primary-soft px-5 py-3 text-[13px] font-bold text-primary">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
        <Icon name="check" size={14} weight="bold" />
      </span>
      <span className="whitespace-pre-line">{s.text.replace(/\n/g, '')}</span>
    </div>
  );
}

// ───────── 診断結果 ─────────
function SurveyResult({ s }: { s: S<'surveyResult'> }) {
  const survey = load<Record<string, string[]>>('survey');
  const answer = survey?.[s.questionId]?.[0];
  const r = answer ? s.results[answer] : undefined;
  useEffect(() => {
    if (r) track('survey_result_view', { result: r.name });
  }, [r]);
  if (!r) return null;
  // ほかの設問の回答に応じた補足（回答が無いもの・対応する文が無いものは出さない）
  const extras = (s.extras || [])
    .map((x) => {
      const a = survey?.[x.questionId]?.[0];
      return a && x.answers[a] ? { label: x.label, answer: a, text: x.answers[a] } : null;
    })
    .filter((x): x is { label: string; answer: string; text: string } => !!x);
  return (
    <Pad className="!pt-10">
      {r.icon && <Char c={r.icon} size={56} />}
      <p className="mt-4 text-[13px] font-bold text-muted">{s.kicker}</p>
      {s.verdict && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-2 pr-4 text-[14px] font-bold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
            <Icon name="check" size={14} weight="bold" />
          </span>
          {s.verdict}
        </p>
      )}
      <h2 className="mt-3 font-head text-[26px] font-bold leading-[1.4] text-primary">{r.name}</h2>
      <div className="mt-5 space-y-3 text-[15px] leading-[1.9]">
        {r.desc.map((d, i) => (
          <p key={i}>{rt(d)}</p>
        ))}
      </div>
      {extras.length > 0 && (
        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {extras.map((x) => (
            <div key={x.label} className="p-5">
              <dt className="text-[12px] font-bold text-primary">{x.label}</dt>
              <dd className="mt-1 text-[13px] text-muted">「{x.answer}」</dd>
              <dd className="mt-2 text-[15px] leading-[1.85]">{rt(x.text)}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-4 rounded-2xl bg-primary-soft p-5">
        <p className="text-[12px] font-bold text-primary">{s.stepLabel || '無料相談でやること'}</p>
        <p className="mt-1.5 text-[15px] font-bold leading-[1.75]">{rt(r.step)}</p>
      </div>
      <Footnote>{s.note}</Footnote>
    </Pad>
  );
}

// ───────── お悩み（不安の解消） ─────────
function Support({ s }: { s: S<'support'> }) {
  return (
    <Pad>
      <h2 className="font-head text-[22px] font-bold leading-[1.6]">{s.quote}</h2>
      {s.quoteSub && <p className="mt-1 text-[14px] text-muted">{s.quoteSub}</p>}
      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
        {s.items.map((it) => (
          <li key={it} className="flex items-center gap-3 px-5 py-4 text-[15px] font-bold">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name="check" size={14} weight="bold" />
            </span>
            {it.replace(/\n/g, '')}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-head text-[18px] font-bold leading-[1.6]">
        <span className="text-primary">{s.title}</span>
        <br />
        {s.conclusion}
      </p>
      <Footnote>{s.footnote}</Footnote>
    </Pad>
  );
}

// ───────── 何をするサービスか ─────────
function Invite({ s }: { s: S<'invite'> }) {
  return (
    <Pad>
      <SectionHead title={s.title} lead={rt(s.lead)} />
      <div className="mt-7 grid grid-cols-3 gap-2">
        {s.icons.map((ic) => (
          <div key={ic.label} className="flex flex-col items-center gap-2 rounded-2xl bg-primary-soft px-2 py-5 text-center">
            <span className="text-primary">
              <Icon name={ic.icon} size={30} weight="light" />
            </span>
            <span className="text-[12px] font-bold leading-snug">{ic.label}</span>
          </div>
        ))}
      </div>
      {s.checks && <CheckList className="mt-7" items={s.checks.map((c) => `${c}${s.checksSuffix || ''}`)} />}
    </Pad>
  );
}

// ───────── 安心のポイント（チップ） ─────────
function Badges({ s }: { s: S<'badges'> }) {
  return (
    <section className="px-5 py-8">
      <ul className="flex flex-wrap gap-2">
        {s.items.map((b) => (
          <li key={b.title} className="flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-2 pr-4 text-[13px] font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon name={b.icon} size={16} />
            </span>
            {b.title.replace(/\n/g, '')}
          </li>
        ))}
      </ul>
      <Footnote>{s.footnote}</Footnote>
    </section>
  );
}

// ───────── 申込ボタン ─────────
function Cta({ s, index }: { s: S<'cta'>; index: number }) {
  const open = useOpenForm();
  return (
    <section className="px-5 py-12">
      {s.heading && <p className="mb-6 text-center font-head text-[19px] font-bold leading-[1.7]">{rt(s.heading)}</p>}
      <CtaPill label={s.label} micro={s.micro} onClick={() => (s.href ? goHref(s.href, `cta_${index}`) : open(`cta_${index}`))} />
      {s.connector && <p className="mt-8 text-center font-head text-[17px] font-bold text-primary">{rt(s.connector)}</p>}
    </section>
  );
}

// ───────── 公開までの流れ（縦のタイムライン） ─────────
function Steps({ s }: { s: S<'steps'> }) {
  const items = [...s.steps.map((st) => st.title), ...(s.finale ? [`[p]${s.finale.title}[/p]\n${s.finale.body}`] : [])];
  return (
    <Pad>
      <SectionHead title={rt(s.title)} />
      <ol className="relative mt-8 space-y-6 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-line">
        {items.map((t, i) => (
          <li key={i} className="relative flex gap-4">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-num text-[14px] font-semibold text-white">
              {i === items.length - 1 && s.finale ? <Icon name="check" size={16} weight="bold" /> : i + 1}
            </span>
            <p className="pt-0.5 text-[15px] leading-[1.7]">{rt(t)}</p>
          </li>
        ))}
      </ol>
    </Pad>
  );
}

// ───────── 目指せる姿／業種別（縦のリスト） ─────────
function Futures({ s }: { s: S<'futures'> }) {
  return (
    <Pad>
      <SectionHead title={rt(s.title.join('\n'))} />
      <div className="mt-7 space-y-4">
        {s.items.map((it) => (
          <article key={it.role} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Img img={it.images[0]} ratio="16/9" />
            <div className="p-5">
              <h3 className="font-head text-[18px] font-bold">{it.role}</h3>
              <p className="mt-2 text-[14px] leading-[1.85] text-muted">{it.desc.join('')}</p>
              {it.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span key={t} className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {it.points && <CheckList items={it.points} className="mt-4" />}
            </div>
          </article>
        ))}
      </div>
      <Footnote>{s.footnote}</Footnote>
    </Pad>
  );
}

// ───────── 事例 ─────────
function Cases({ s }: { s: S<'cases'> }) {
  return (
    <section className="py-12">
      <div className="px-5">
        <SectionHead title={rt(s.title)} />
      </div>
      <div className="mt-6">
        <Carousel
          label="事例"
          items={s.items}
          render={(c) => (
            <article className="overflow-hidden rounded-2xl border border-line bg-surface">
              <Img img={c.image} ratio="4/3" />
              <div className="p-5">
                <p className="text-[12px] font-bold text-muted">{c.name}</p>
                <p className="mt-1 text-[13px] text-muted">{c.before.join('／')}</p>
                <p className="mt-2 font-head text-[17px] font-bold leading-[1.6]">{c.after.join('')}</p>
              </div>
            </article>
          )}
        />
      </div>
      <div className="px-5">
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── 価格メリット ─────────
function PriceBenefit({ s }: { s: S<'priceBenefit'> }) {
  return (
    <Pad>
      <p className="text-[13px] font-bold text-primary">{s.kicker}</p>
      <p className="mt-2 font-head text-[19px] font-bold">{rt(s.label)}</p>
      <p className="mt-3 flex items-baseline gap-1 text-primary">
        {s.bigPrefix && <span className="text-[16px] font-bold">{s.bigPrefix}</span>}
        <span className="font-num text-[64px] font-semibold leading-none">{s.big}</span>
        {s.bigSuffix && <span className="font-head text-[26px] font-bold">{s.bigSuffix}</span>}
      </p>
      <Footnote>{s.footnote}</Footnote>
      {s.urgency && <p className="mt-5 text-[15px] font-bold leading-[1.8]">{rt(s.urgency)}</p>}
    </Pad>
  );
}

// ───────── つくるもの／体験の中身 ─────────
function OfferDetail({ s }: { s: S<'offerDetail'> }) {
  return (
    <Pad>
      <SectionHead title={s.title} lead={s.label.replace(/\n/g, '')} />
      <CheckList items={s.checks} className="mt-6" />
      {s.covers && (
        <div className="mt-8">
          {s.subLabel && <p className="mb-3 text-[13px] font-bold text-muted">{s.subLabel}</p>}
          <div className="grid grid-cols-3 gap-2">
            {s.covers.map((c) => (
              <figure key={c.label}>
                <div className="overflow-hidden rounded-xl border border-line">
                  <Img img={c.image} ratio="3/4" className="object-top" />
                </div>
                <figcaption className="mt-1.5 text-center text-[12px] font-bold">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </Pad>
  );
}

// ───────── 開催時間 ─────────
function Schedule({ s }: { s: S<'schedule'> }) {
  return (
    <Pad>
      <SectionHead title={rt(s.title)} />
      <div className="mt-6 grid grid-cols-3 gap-2">
        {s.slots.map((sl) => (
          <div key={sl.label} className="overflow-hidden rounded-2xl border border-line bg-surface text-center">
            <Img img={sl.image} ratio="3/4" />
            <div className="p-2">
              <p className="text-[12px] font-bold">
                {sl.label}
                {sl.sub}
              </p>
              {sl.times.map((t) => (
                <p key={t} className="font-num text-[13px] font-semibold text-primary">
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Pad>
  );
}

// ───────── プロフィール ─────────
function Profile({ s }: { s: S<'profile'> }) {
  return (
    <Pad>
      <SectionHead title={s.title} />
      <div className="mt-6 flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-primary-soft">
          {s.image.src ? (
            <Img img={s.image} ratio="1" />
          ) : (
            <span aria-label={s.image.alt} className="flex h-full w-full items-center justify-center font-head text-[28px] font-bold text-primary">
              {s.name.slice(0, 1)}
            </span>
          )}
        </div>
        <div>
          <p className="font-head text-[20px] font-bold">{s.name}</p>
          <p className="text-[12px] text-muted">{s.role}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-[15px] leading-[1.9]">
        {s.body.map((b, i) => (
          <p key={i}>{rt(b)}</p>
        ))}
      </div>
    </Pad>
  );
}

// ───────── よくある質問 ─────────
function Faq({ s }: { s: S<'faq'> }) {
  return (
    <Pad>
      <SectionHead title={s.title} />
      <div className="faq-list mt-6 divide-y divide-line border-y border-line">
        {s.items.map((f) => (
          <details key={f.q} className="faq-item group py-1">
            <summary className="flex cursor-pointer list-none items-start gap-3 py-4 text-[15px] font-bold">
              <span className="flex-1">{f.q}</span>
              <span aria-hidden className="mt-0.5 text-[18px] leading-none text-primary transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 text-[14px] leading-[1.9] text-muted">{rt(f.a)}</p>
          </details>
        ))}
      </div>
    </Pad>
  );
}

// ───────── 料金プラン ─────────
type Plan = S<'plans'>['plans'][number];

const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;

/** 分割払いの目安：1回あたりの金額（割り切れないときは「約」） */
function Installments({ amount, counts }: { amount: number; counts: number[] }) {
  return (
    <details className="group mt-5 rounded-xl bg-bg">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[13px] font-bold">
        <span className="flex items-center gap-2">
          <Icon name="card" size={16} className="text-primary" />
          カードの分割払い（1回あたりの目安）
        </span>
        <span aria-hidden className="text-[16px] leading-none text-primary transition group-open:rotate-45">
          +
        </span>
      </summary>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 pb-4 text-[14px]">
        {counts.map((n) => {
          const per = amount / n;
          return (
            <div key={n} className="flex items-baseline justify-between border-b border-line py-1">
              <dt className="text-muted">{n}回</dt>
              <dd className="font-num font-semibold">
                {Number.isInteger(per) ? '' : '約'}
                {yen(Math.round(per))}
              </dd>
            </div>
          );
        })}
      </dl>
    </details>
  );
}

/** 決済ページへ進む前の確認画面（価格・支払時期・提供時期・キャンセル条件を表示） */
function CheckoutConfirm({ plan, cfg, onClose, onConsult }: { plan: Plan; cfg: NonNullable<S<'plans'>['checkout']>; onClose: () => void; onConsult: () => void }) {
  const [agreed, setAgreed] = useState(false);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  const rows = [
    { label: 'プラン', value: plan.name },
    { label: '受講内容', value: plan.features.filter((f) => f.included).map((f) => f.label).join('／') },
    { label: 'お支払い金額', value: `${plan.price}${plan.priceNote ? `（${plan.priceNote}）` : ''}` },
    ...cfg.rows,
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="fade-up max-h-[92dvh] w-full max-w-[480px] overflow-y-auto rounded-t-2xl bg-surface p-6 sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="checkout-title" className="font-head text-[20px] font-bold">
            {cfg.title}
          </h2>
          <button type="button" onClick={onClose} aria-label="閉じる" className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center rounded-full text-[22px] text-muted">
            ×
          </button>
        </div>
        <dl className="mt-4 divide-y divide-line border-y border-line text-[14px]">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[6.5em_1fr] gap-3 py-3">
              <dt className="font-bold text-muted">{r.label}</dt>
              <dd className="leading-[1.7]">{r.value}</dd>
            </div>
          ))}
        </dl>
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] leading-[1.7]">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--c-primary)]" />
          <span>
            {cfg.agree}
            {cfg.legalHref && (
              <>
                （
                <a href={cfg.legalHref} target="_blank" rel="noopener" className="text-primary underline underline-offset-2">
                  特定商取引法に基づく表記
                </a>
                ）
              </>
            )}
          </span>
        </label>
        {plan.checkoutUrl && agreed ? (
          <a href={plan.checkoutUrl} onClick={() => track('checkout_start', { plan: plan.name, value: plan.amount, currency: 'JPY' })} className="cta-pill mt-6">
            <span>{cfg.button}</span>
            <span aria-hidden className="text-[18px] leading-none">
              →
            </span>
          </a>
        ) : plan.checkoutUrl ? (
          <button type="button" disabled className="cta-pill mt-6 opacity-40">
            <span>{cfg.button}</span>
            <span aria-hidden className="text-[18px] leading-none">
              →
            </span>
          </button>
        ) : (
          <p className="mt-6 rounded-xl bg-bg px-4 py-3 text-center text-[14px] font-bold text-muted">{cfg.pending}</p>
        )}
        <button type="button" onClick={onConsult} className="mt-3 w-full py-2 text-[13px] font-bold text-primary underline underline-offset-2">
          申し込む前に、無料で相談する
        </button>
      </div>
    </div>
  );
}

function Plans({ s }: { s: S<'plans'> }) {
  const open = useOpenForm();
  const [confirm, setConfirm] = useState<Plan | null>(null);
  const choose = (p: Plan) => {
    const action = p.action || (s.checkout ? 'checkout' : 'consult');
    if (action === 'consult' || !s.checkout) return open(`plan_${p.name}`);
    track('plan_select', { plan: p.name, value: p.amount });
    setConfirm(p);
  };
  return (
    <Pad>
      <SectionHead kicker={s.kicker} title={s.title} lead={s.lead ? rt(s.lead) : undefined} />
      <div className="mt-7 space-y-4">
        {s.plans.map((p) => (
          <article key={p.name} className={`rounded-2xl bg-surface p-6 ${p.recommended ? 'border-2 border-primary' : 'border border-line'}`}>
            <div className="flex items-center gap-2">
              <h3 className="font-head text-[19px] font-bold">{p.name}</h3>
              {p.recommended && <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">おすすめ</span>}
            </div>
            <p className="mt-1 text-[13px] text-muted">{p.target}</p>
            <p className="mt-4">
              <span className={`font-num font-semibold tracking-tight ${p.amount ? 'text-[34px]' : 'text-[24px]'}`}>{p.price}</span>
              {p.priceNote && <span className="ml-1 text-[12px] text-muted">{p.priceNote}</span>}
            </p>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {p.features.map((f) => (
                <li key={f.label} className={`flex gap-2.5 ${f.included ? '' : 'text-muted/60'}`}>
                  <span
                    aria-hidden
                    className={`mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${f.included ? 'bg-primary text-white' : 'border border-line'}`}
                  >
                    {f.included && <Icon name="check" size={11} weight="bold" />}
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
            {p.amount && s.installments && <Installments amount={p.amount} counts={s.installments.counts} />}
            <button
              type="button"
              onClick={() => choose(p)}
              className={`plan-btn mt-6 w-full rounded-full py-3.5 font-head text-[15px] font-bold ${
                p.recommended || (p.action !== 'consult' && s.checkout) ? 'bg-primary text-white' : 'border border-ink/20 text-ink'
              }`}
            >
              {p.ctaLabel || s.cta}
            </button>
          </article>
        ))}
      </div>
      {s.installments && <Footnote>{s.installments.note}</Footnote>}
      <Footnote>{s.footnote}</Footnote>
      {confirm && s.checkout && (
        <CheckoutConfirm
          plan={confirm}
          cfg={s.checkout}
          onClose={() => setConfirm(null)}
          onConsult={() => {
            setConfirm(null);
            open(`plan_consult_${confirm.name}`);
          }}
        />
      )}
    </Pad>
  );
}

// ───────── 実際に触れるデモ ─────────
function Demos({ s }: { s: S<'demos'> }) {
  return (
    <section className="py-12">
      <div className="px-5">
        <SectionHead kicker={s.kicker} title={rt(s.title)} lead={s.lead} />
      </div>
      <div className="mt-7">
        <Carousel
          label="デモ"
          items={s.items}
          render={(d) => (
            <article className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="bg-primary-soft px-10 pt-6">
                <div className="overflow-hidden rounded-t-[26px] border-[5px] border-b-0 border-ink">
                  <Img img={d.image} ratio="9/12" className="object-top" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-head text-[17px] font-bold">{d.title}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.8] text-muted">{d.desc}</p>
                {d.link && (
                  <a
                    href={d.link.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-[13px] font-bold"
                  >
                    {d.link.label}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          )}
        />
      </div>
      <div className="px-5">
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── クロージング ─────────
function Closing({ s }: { s: S<'closing'> }) {
  const open = useOpenForm();
  return (
    <section className="closing bg-primary-soft px-5 py-16 text-center">
      {s.icon && (
        <div className="mx-auto mb-5 flex justify-center">
          <Char c={s.icon} size={56} ring={false} />
        </div>
      )}
      <p className="font-head text-[23px] font-bold leading-[1.6]">
        {s.lines.map((l, i) => (
          <span key={i} className="block">
            {rt(l)}
          </span>
        ))}
      </p>
      {s.box && <p className="mt-4 whitespace-pre-line text-[14px] text-muted">{s.box}</p>}
      <div className="mt-8">
        <CtaPill label={s.cta} micro={s.micro} onClick={() => (s.href ? goHref(s.href, 'closing') : open('closing'))} />
      </div>
    </section>
  );
}

// ───────── キャンペーン（ポップなテーマ向け） ─────────
function CampaignHero({ s }: { s: S<'campaignHero'> }) {
  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-6" style={{ background: 'var(--g-hero)' }}>
      <div className="relative text-center">
        <BubbleLabel>{rt(s.bubble)}</BubbleLabel>
        {s.kicker && <p className="mt-4 font-head text-[14px] font-black text-accent">{s.kicker}</p>}
        <h1 className="mt-2 space-y-1">
          {s.headline.map((l, i) => (
            <span key={i} className={`pop-stroke block ${i === 1 ? 'text-[40px] text-accent' : 'text-[30px] text-navy'}`}>
              {l}
            </span>
          ))}
        </h1>
      </div>
      <div className="relative mt-5 rounded-2xl border-2 border-accent bg-white px-3 pb-4 pt-5">
        <div className="grid grid-cols-3 gap-2">
          {s.items.map((it) => (
            <figure key={it.label} className="text-center">
              <Img img={it.image} ratio="1" className="rounded-xl" />
              <figcaption className="mt-1 text-[11px] font-bold">{it.label}</figcaption>
            </figure>
          ))}
        </div>
        {s.deadlineBand && (
          <p className="mt-4 rounded-lg bg-hl px-3 py-2 text-center font-head text-[15px] font-black leading-snug text-navy">{rt(s.deadlineBand)}</p>
        )}
      </div>
      {s.note && (
        <a href={s.note.href} className="relative mt-3 block text-center text-[11px] text-accent underline">
          {s.note.label}
        </a>
      )}
    </section>
  );
}

function CampaignDetail({ s }: { s: S<'campaignDetail'> }) {
  const [open, setOpen] = useState(false);
  return (
    <Pad>
      <p className="text-[13px] font-bold text-primary">{s.kicker}</p>
      <SectionHead title={s.title} />
      <div className="mt-6 space-y-4">
        {s.groups.map((g) => (
          <div key={g.label} className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-[13px] font-bold text-primary">
              {g.label}
              {g.deadline && <span className="ml-2 text-muted">{g.deadline.replace(/\n/g, ' ')}</span>}
            </p>
            <div className={`mt-3 grid gap-2 ${g.items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {g.items.map((it) => (
                <figure key={it.name}>
                  <Img img={it.image} ratio="4/3" className="rounded-xl" />
                  <figcaption className="mt-1 text-[14px] font-bold">{it.name}</figcaption>
                  <p className="text-[12px] text-muted">{it.note}</p>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
      <dl className="mt-6 space-y-2 text-[14px]">
        <div>
          <dt className="font-bold">実施期間</dt>
          <dd>{s.period}</dd>
        </div>
        <div>
          <dt className="font-bold">応募条件</dt>
          {s.conditions.map((c) => (
            <dd key={c}>・{c}</dd>
          ))}
        </div>
      </dl>
      {s.howTo && (
        <div className="mt-4 border-t border-line pt-3">
          <button type="button" className="text-[14px] font-bold text-primary" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? '− ' : '+ '}応募方法
          </button>
          {open && (
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px]">
              {s.howTo.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </Pad>
  );
}

export function RenderSection({ s, index }: { s: LpSection; index: number }) {
  return (
    <SectionLabel.Provider value={s.eyebrow}>
      <SectionBody s={s} index={index} />
    </SectionLabel.Provider>
  );
}

function SectionBody({ s, index }: { s: LpSection; index: number }) {
  switch (s.type) {
    case 'thanksBand':
      return <ThanksBand s={s} />;
    case 'campaignHero':
      return <CampaignHero s={s} />;
    case 'invite':
      return <Invite s={s} />;
    case 'badges':
      return <Badges s={s} />;
    case 'cta':
      return <Cta s={s} index={index} />;
    case 'steps':
      return <Steps s={s} />;
    case 'futures':
      return <Futures s={s} />;
    case 'cases':
      return <Cases s={s} />;
    case 'priceBenefit':
      return <PriceBenefit s={s} />;
    case 'support':
      return <Support s={s} />;
    case 'offerDetail':
      return <OfferDetail s={s} />;
    case 'schedule':
      return <Schedule s={s} />;
    case 'campaignDetail':
      return <CampaignDetail s={s} />;
    case 'profile':
      return <Profile s={s} />;
    case 'surveyResult':
      return <SurveyResult s={s} />;
    case 'faq':
      return <Faq s={s} />;
    case 'plans':
      return <Plans s={s} />;
    case 'demos':
      return <Demos s={s} />;
    case 'closing':
      return <Closing s={s} />;
  }
}
