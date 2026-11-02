import { useState } from 'react';
import type { LpSection } from '../types';
import { rt } from '../lib/rt';
import { useOpenForm } from '../lib/formContext';
import {
  BubbleLabel,
  Carousel,
  Char,
  CheckList,
  CircleBadge,
  ConnectorPill,
  CtaPill,
  Footnote,
  Img,
  SectionTitle,
  Slashed,
  Sparkles,
  TripleArrow,
} from '../components/ui';

type S<T extends LpSection['type']> = Extract<LpSection, { type: T }>;

// ───────── S01 回答のお礼 ─────────
function ThanksBand({ s }: { s: S<'thanksBand'> }) {
  return (
    <div className="relative flex items-center justify-center bg-cta px-6 py-5 text-center text-white">
      <p className="whitespace-pre-line font-head text-[17px] font-bold leading-relaxed wide">{s.text}</p>
      {s.character && (
        <div className="absolute bottom-0 right-3">
          <Char c={s.character} size={52} ring={false} />
        </div>
      )}
    </div>
  );
}

// ───────── S02 キャンペーンのFV ─────────
function CampaignHero({ s }: { s: S<'campaignHero'> }) {
  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-6" style={{ background: 'var(--g-hero)' }}>
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[8, 18, 82, 92].map((x) => (
          <polygon key={x} points={`${x},100 ${x + 3},100 ${x < 50 ? 30 : 70},40`} fill="var(--c-accent)" opacity="0.35" />
        ))}
      </svg>
      <div className="relative text-center">
        <div className="bubble mx-auto inline-block rounded-full border-[3px] border-navy bg-white px-5 py-1.5 font-head text-[15px] font-black wide text-navy">
          {rt(s.bubble)}
        </div>
        {s.kicker && <p className="mt-4 font-head text-[14px] font-black text-accent">{s.kicker}</p>}
        <h1 className="mt-2 space-y-1">
          {s.headline.map((l, i) => (
            <span
              key={i}
              className={`pop-stroke block ${i === 0 ? 'text-[30px] text-teal' : i === s.headline.length - 1 ? 'text-[34px] text-navy' : 'text-[42px] text-accent'}`}
            >
              {l}
            </span>
          ))}
        </h1>
      </div>
      <div className="relative mt-5 rounded-2xl border-2 border-accent bg-white px-3 pb-4 pt-5">
        {s.groups && (
          <div className="absolute -top-3 left-3 right-3 flex justify-between gap-2">
            {s.groups.map((g) => (
              <span
                key={g.label}
                className={`rounded-full px-4 py-0.5 text-[12px] font-bold text-white wide ${g.tone === 'dark' ? 'flex-1 bg-navy text-center' : 'bg-accent'}`}
              >
                {g.label}
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {s.items.map((it) => (
            <figure key={it.label} className="relative text-center">
              <div className="scallop bg-teal-soft p-2">
                <Img img={it.image} ratio="1" className="rounded-lg" />
              </div>
              {it.badge && (
                <span className="absolute -right-1 top-1 flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent bg-white text-center text-[10px] font-bold leading-tight text-accent">
                  {it.badge}
                </span>
              )}
              <figcaption className="mt-1 rounded-full border border-navy/30 bg-white px-1 text-[11px] font-bold">{it.label}</figcaption>
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

// ───────── S03 体験への招待 ─────────
function Invite({ s }: { s: S<'invite'> }) {
  return (
    <section className="bg-grid px-5 pb-8 pt-6">
      {s.connector && <ConnectorPill>{s.connector}</ConnectorPill>}
      <div className="mt-4 -rotate-1 bg-accent px-4 py-2 text-center font-head text-[21px] font-black text-white shadow-[4px_4px_0_var(--c-navy)] wide">
        {s.title}
      </div>
      <p className="mt-5 text-center font-head text-[18px] font-bold leading-relaxed wide text-navy">{rt(s.lead)}</p>
      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line">
        <div className="grid grid-cols-3 divide-x divide-dashed divide-line">
          {s.icons.map((ic) => (
            <div key={ic.label} className="flex flex-col items-center gap-2 px-1">
              <span className="text-[40px] leading-none" aria-hidden>
                {ic.icon}
              </span>
              <span className="w-full rounded-full bg-teal px-1 py-0.5 text-center text-[11px] font-bold text-white">{ic.label}</span>
            </div>
          ))}
        </div>
      </div>
      {s.checks && (
        <>
          <div className="relative z-10 mx-auto -my-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white text-primary">＋</div>
          <div className="relative rounded-2xl bg-white p-5 pr-24 shadow-sm ring-1 ring-line">
            <CheckList items={s.checks} />
            {s.checksSuffix && <p className="mt-1 pl-7 font-head text-[16px] font-black underline-p">{s.checksSuffix}</p>}
            {s.illustration && (
              <div className="absolute bottom-3 right-3">
                <Char c={s.illustration} size={72} />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

// ───────── S04 信頼バッジ ─────────
function Badges({ s }: { s: S<'badges'> }) {
  return (
    <section className="bg-grid px-5 pb-6">
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-2 ring-primary-soft">
        <div className="grid grid-cols-3 gap-3">
          {s.items.map((b) => (
            <CircleBadge key={b.title} {...b} />
          ))}
        </div>
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── S05/S13 CTA ─────────
function Cta({ s, index }: { s: S<'cta'>; index: number }) {
  const open = useOpenForm();
  return (
    <section className="bg-grid px-5 py-7">
      {s.heading && (
        <Slashed className="mb-5">
          <p className="font-head text-[16px] font-bold leading-loose wide text-navy">{rt(s.heading)}</p>
        </Slashed>
      )}
      <CtaPill label={s.label} micro={s.micro} icon={s.icon} onClick={() => open(`cta_${index}`)} />
      {s.arrows && <TripleArrow className="mt-5" />}
      {s.connector && (
        <p className="mt-3 text-center font-head text-[18px] font-black text-white">
          <span className="inline-block rounded-full bg-accent px-6 py-1.5">{rt(s.connector)}</span>
        </p>
      )}
    </section>
  );
}

// ───────── S06 応募／参加の手順 ─────────
function Steps({ s }: { s: S<'steps'> }) {
  const cards = [
    ...s.steps.map((st, i) => ({ kind: 'step' as const, st, n: i + 1 })),
    ...(s.finale ? [{ kind: 'finale' as const, finale: s.finale }] : []),
  ];
  return (
    <section className="bg-primary-soft pb-8">
      <div className="bg-grid px-5 pt-2">
        <div className="relative mx-auto -mb-2 max-w-[360px] rounded-xl bg-navy px-5 pb-5 pt-4 text-center text-white shadow-lg">
          {s.kicker && <p className="-rotate-3 font-pop text-[15px] text-hl">{s.kicker}</p>}
          <p className="font-head text-[19px] font-bold leading-relaxed wide">{rt(s.title)}</p>
          <span aria-hidden className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-navy" />
        </div>
      </div>
      <div className="pt-4">
        <Carousel
          label="手順"
          items={cards}
          render={(c) =>
            c.kind === 'step' ? (
              <div className="relative rounded-xl bg-white px-4 pb-5 pt-9 text-center shadow ring-1 ring-line">
                <div className="absolute -top-5 left-1/2 flex h-14 w-14 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-navy text-white">
                  <span className="text-[10px] leading-none">STEP</span>
                  <span className="font-num text-[20px] font-bold leading-none">{c.n}</span>
                </div>
                {c.st.image && <Img img={c.st.image} ratio="4/3" className="rounded-lg" />}
                <p className="mt-3 font-head text-[16px] font-bold leading-relaxed">{rt(c.st.title)}</p>
              </div>
            ) : (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-white px-4 py-6 text-center shadow ring-1 ring-line">
                <span className="text-[44px]" aria-hidden>
                  🎁
                </span>
                <p className="mt-2 font-head text-[26px] font-black text-accent">{c.finale.title}</p>
                <p className="mt-2 font-head text-[15px] font-bold">{c.finale.body}</p>
              </div>
            )
          }
        />
      </div>
    </section>
  );
}

// ───────── S07 目指せる姿（カルーセル） ─────────
function Futures({ s }: { s: S<'futures'> }) {
  return (
    <section className="relative bg-[color-mix(in_srgb,var(--c-primary-soft)_45%,#fff)] pb-8 pt-8">
      <Sparkles />
      <div className="px-5 text-center">
        {s.title.map((t, i) => (
          <p
            key={i}
            className={`h-head ${i === s.title.length - 1 ? 'mt-1 text-[24px] text-navy' : 'text-[18px] text-navy'}`}
          >
            {i === s.title.length - 1 ? <span className="underline-p">{rt(t)}</span> : rt(t)}
          </p>
        ))}
      </div>
      <div className="mt-2">
        <Carousel
          label="目指せる働き方"
          items={s.items}
          render={(it) => (
            <article className="rounded-xl bg-white pb-4 shadow-sm">
              <div className="flex justify-center">
                <span className="bubble -mt-4 rounded-full border-accent bg-accent px-6 py-1 font-head text-[16px] font-bold text-white wide">
                  {it.role}
                </span>
              </div>
              <div className="mx-4 mt-3 divide-y divide-dashed divide-line border-y border-dashed border-line text-center font-head text-[14px] font-bold leading-[2.2]">
                {it.desc.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
              <div className="relative mx-3 mt-4 grid grid-cols-2 gap-2">
                {it.images.slice(0, 2).map((im, i) => (
                  <Img key={i} img={im} ratio="1" className={`rounded-lg ${i === 0 ? '-rotate-2' : 'rotate-2'}`} />
                ))}
                {it.tags?.map((t, i) => (
                  <span
                    key={t}
                    className={`absolute bottom-1 rounded border border-accent bg-white px-2 text-[11px] font-bold ${i === 0 ? 'left-1' : 'right-1'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {it.points && (
                <div className="mx-3 mt-3 rounded-lg bg-primary-soft px-3 py-2">
                  <CheckList items={it.points} />
                </div>
              )}
            </article>
          )}
        />
      </div>
      <div className="px-6">
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── S08 事例 ─────────
function Cases({ s }: { s: S<'cases'> }) {
  return (
    <section className="relative bg-aurora pb-8 pt-8">
      <Sparkles />
      <div className="px-5 text-center">
        <Slashed>
          <p className="font-head text-[17px] font-bold leading-loose wide">{rt(s.title)}</p>
        </Slashed>
      </div>
      <div className="mt-1">
        <Carousel
          label="事例"
          items={s.items}
          render={(c, i) => (
            <article className="relative rounded bg-white p-3 shadow-md">
              <span aria-hidden className="absolute -top-3 left-4 h-7 w-3 rounded-full border-2 border-muted" />
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-num text-[13px] text-accent">
                    case<span className="text-[34px] font-bold leading-none">{String(i + 1).padStart(2, '0')}</span>
                  </p>
                  <p className="text-[12px] font-bold">{c.name}</p>
                  <div className="mt-2 space-y-1">
                    {c.before.map((b) => (
                      <span key={b} className="mr-1 inline-block bg-teal-soft px-2 text-[12px] font-bold text-navy">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-[44%] shrink-0">
                  <Img img={c.image} ratio="4/5" className="rounded" />
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {c.after.map((a) => (
                  <p key={a} className="bg-teal px-2 py-1 font-head text-[15px] font-bold text-white wide">
                    {a}
                  </p>
                ))}
              </div>
            </article>
          )}
        />
      </div>
      <div className="px-6">
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── S09 価格メリット ─────────
function PriceBenefit({ s }: { s: S<'priceBenefit'> }) {
  return (
    <section className="bg-teal-soft px-5 pb-6 pt-8">
      <div className="text-center">
        <BubbleLabel tone="teal">{s.kicker}</BubbleLabel>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl bg-white text-center shadow">
        <p className="px-3 py-3 font-head text-[18px] font-bold wide">{rt(s.label)}</p>
        <div className="flex items-end justify-center gap-1 bg-primary px-3 pb-2 pt-1 text-white">
          {s.bigPrefix && <span className="mb-3 w-5 font-head text-[16px] font-black leading-tight">{s.bigPrefix}</span>}
          <span className="font-head text-[72px] font-black leading-none">{s.big}</span>
          {s.bigSuffix && <span className="mb-2 font-head text-[34px] font-black">{s.bigSuffix}</span>}
        </div>
      </div>
      <Footnote>{s.footnote}</Footnote>
      {s.urgency && (
        <Slashed className="mt-5">
          <p className="font-head text-[16px] font-bold leading-loose">{rt(s.urgency)}</p>
        </Slashed>
      )}
    </section>
  );
}

// ───────── S10 不安の解消 ─────────
function Support({ s }: { s: S<'support'> }) {
  const tones = ['ring-primary', 'ring-teal', 'ring-mustard'];
  return (
    <section className="bg-grid pb-8">
      <div className="bg-navy px-5 py-5 text-center text-white">
        <p className="font-head text-[18px] font-bold wide">“{s.quote}”</p>
        {s.quoteSub && <p className="text-[13px]">{s.quoteSub}</p>}
      </div>
      <div className="px-5">
        <div className="mt-5 text-center">
          <BubbleLabel tone="primary">{s.title}</BubbleLabel>
        </div>
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line">
          <div className="grid grid-cols-3 gap-3">
            {s.items.map((it, i) => (
              <div
                key={it}
                className={`flex aspect-square items-center justify-center whitespace-pre-line rounded-full bg-white p-1 text-center font-head text-[12px] font-bold leading-snug ring-4 ${tones[i % 3]}`}
              >
                {it}
              </div>
            ))}
          </div>
          <TripleArrow className="mt-4" />
          <Slashed className="mt-3">
            <p className="font-head text-[17px] font-black">{s.conclusion}</p>
          </Slashed>
        </div>
        <Footnote>{s.footnote}</Footnote>
      </div>
    </section>
  );
}

// ───────── S11 体験の中身 ─────────
function OfferDetail({ s }: { s: S<'offerDetail'> }) {
  return (
    <section className="bg-aurora px-5 pb-8">
      <div className="-mx-5 bg-navy px-5 py-4 text-center">
        <h2 className="pop-stroke text-[28px] text-primary" style={{ WebkitTextStroke: '5px #fff' }}>
          {s.title}
        </h2>
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block whitespace-pre-line rounded-2xl border-2 border-mustard bg-cream px-5 py-2 font-head text-[16px] font-bold leading-snug text-navy">
          {s.label}
        </span>
      </div>
      <div className="relative mt-4 rounded-2xl bg-white p-5 shadow ring-1 ring-line">
        <CheckList items={s.checks} />
        {s.character && (
          <div className="absolute -top-5 right-3">
            <Char c={s.character} size={48} />
          </div>
        )}
      </div>
      {s.covers && (
        <div className="mt-6 rounded-2xl bg-white p-4 shadow ring-1 ring-line">
          {s.subLabel && (
            <p className="-mt-8 mb-3 text-center">
              <span className="rounded-2xl border-2 border-mustard bg-cream px-4 py-1 font-head text-[15px] font-bold">{s.subLabel}</span>
            </p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {s.covers.map((c) => (
              <figure key={c.label} className="text-center">
                <Img img={c.image} ratio="3/4" className="rounded shadow" />
                <figcaption className="mt-1 font-head text-[12px] font-bold underline-p">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ───────── S12 開催時間 ─────────
function Schedule({ s }: { s: S<'schedule'> }) {
  const tone = { morning: 'bg-[#E0525C]', noon: 'bg-[#E8A33A]', night: 'bg-[#2E78A8]' } as const;
  return (
    <section className="bg-aurora px-5 pb-8 pt-2">
      <div className="text-center">
        <span className="inline-block rounded-full border-2 border-mustard bg-cream px-6 py-1.5 font-head text-[18px] font-black">
          {rt(s.title)}
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow ring-1 ring-line">
        <div className="grid grid-cols-3">
          {s.slots.map((sl) => (
            <div key={sl.label} className="text-center">
              <Img img={sl.image} ratio="3/4" />
              <div className={`${tone[sl.tone]} px-1 py-2 text-white`}>
                <p className="mx-auto -mt-5 w-fit rounded-full bg-white px-3 text-[11px] font-bold text-ink">{sl.label}</p>
                <p className="text-[11px] font-bold">{sl.sub}</p>
                {sl.times.map((t) => (
                  <p key={t} className="font-num text-[12px] font-bold leading-tight">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── S14 キャンペーン詳細 ─────────
function CampaignDetail({ s }: { s: S<'campaignDetail'> }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-8" style={{ background: 'linear-gradient(180deg,var(--c-teal) 0 45%,var(--c-teal-soft) 45%)' }}>
      <p className="text-center font-head text-[17px] font-bold text-white wide">{s.kicker}</p>
      <h2 className="pop-stroke mt-1 text-center text-[34px] text-accent">{s.title}</h2>
      <div className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow">
        {s.groups.map((g) => (
          <div key={g.label} className="relative rounded-xl bg-teal-soft p-3 pt-5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-teal px-4 py-0.5 text-[12px] font-bold text-white">{g.label}</span>
            {g.deadline && (
              <span className="absolute -right-1 -top-3 flex h-12 w-12 items-center justify-center whitespace-pre-line rounded-full bg-accent text-center text-[10px] font-bold leading-tight text-white">
                {g.deadline}
              </span>
            )}
            <div className={`grid gap-2 ${g.items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {g.items.map((it) => (
                <figure key={it.name} className="text-center">
                  <Img img={it.image} ratio="4/3" className="rounded-lg" />
                  <figcaption className="mt-1 font-head text-[15px] font-bold">{it.name}</figcaption>
                  <p className="text-[11px] text-muted">{it.note}</p>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-white p-4 text-[13px] shadow">
        <p className="bg-teal py-1 text-center text-[13px] font-bold text-white">実施期間</p>
        <p className="py-2 text-center font-head text-[20px] font-black">{s.period}</p>
        <p className="bg-teal py-1 text-center text-[13px] font-bold text-white">応募条件</p>
        <ul className="list-disc space-y-1 py-2 pl-5">
          {s.conditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {s.howTo && (
          <div className="border-t border-line pt-2">
            <button type="button" className="flex w-full items-center justify-between font-bold text-teal" onClick={() => setOpen(!open)} aria-expanded={open}>
              <span>{open ? '︿' : '﹀'} 応募方法</span>
              <span className="text-[10px] text-muted">詳細は必ずご確認ください</span>
            </button>
            {open && (
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-[12px]">
                {s.howTo.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ───────── プロフィール（個人事業のクライアント向けに追加） ─────────
function Profile({ s }: { s: S<'profile'> }) {
  return (
    <section className="bg-white px-5 py-8">
      <SectionTitle>{s.title}</SectionTitle>
      <div className="mt-5 flex items-center gap-4">
        <div className="w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-primary-soft">
          <Img img={s.image} ratio="1" />
        </div>
        <div>
          <p className="text-[12px] font-bold text-primary">{s.role}</p>
          <p className="h-head text-[22px]">{s.name}</p>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-[14px]">
        {s.body.map((b, i) => (
          <p key={i}>{rt(b)}</p>
        ))}
      </div>
    </section>
  );
}

// ───────── よくある質問（追加） ─────────
function Faq({ s }: { s: S<'faq'> }) {
  return (
    <section className="bg-grid px-5 py-8">
      <SectionTitle>{s.title}</SectionTitle>
      <div className="mt-5 space-y-3">
        {s.items.map((f) => (
          <details key={f.q} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-line">
            <summary className="flex cursor-pointer list-none items-start gap-2 font-head text-[15px] font-bold">
              <span className="text-primary">Q.</span>
              <span className="flex-1">{f.q}</span>
              <span aria-hidden className="text-muted transition group-open:rotate-180">﹀</span>
            </summary>
            <p className="mt-3 flex gap-2 text-[14px]">
              <span className="font-bold text-teal">A.</span>
              <span className="flex-1">{rt(f.a)}</span>
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ───────── S15 クロージング（事実ベース） ─────────
function Closing({ s }: { s: S<'closing'> }) {
  const open = useOpenForm();
  return (
    <section className="bg-cream pb-8">
      <div className="warn-stripe" />
      <div className="px-6 py-7 text-center">
        <span className="text-[44px]" aria-hidden>
          {s.icon || '📌'}
        </span>
        {s.lines.map((l) => (
          <p key={l} className="h-head text-[22px] text-ink">
            {rt(l)}
          </p>
        ))}
        {s.box && <p className="mx-auto mt-4 whitespace-pre-line border-2 border-ink px-4 py-2 font-head text-[16px] font-bold">{s.box}</p>}
      </div>
      <div className="warn-stripe" />
      <div className="px-5 pt-6">
        <CtaPill label={s.cta} micro={s.micro} onClick={() => open('closing')} />
      </div>
    </section>
  );
}

export function RenderSection({ s, index }: { s: LpSection; index: number }) {
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
    case 'faq':
      return <Faq s={s} />;
    case 'closing':
      return <Closing s={s} />;
  }
}
