import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { brand } from '../brand';
import { adminList, adminUpdate, forgetAdminKey, takeAdminKey, type AdminReservation, type Status } from '../lib/admin';
import { formatDate, ymd } from '../lib/slots';

type Tab = 'today' | 'upcoming' | 'past' | 'cancelled';

const STATUS: Record<Status, { label: string; cls: string }> = {
  active: { label: '予約中', cls: 'bg-teal text-white' },
  done: { label: '完了', cls: 'bg-navy text-white' },
  cancelled: { label: 'キャンセル', cls: 'bg-line text-muted' },
  noshow: { label: '無断欠席', cls: 'bg-accent text-white' },
};

const TABS: { id: Tab; label: string }[] = [
  { id: 'today', label: '今日' },
  { id: 'upcoming', label: 'これから' },
  { id: 'past', label: '過去' },
  { id: 'cancelled', label: 'キャンセル' },
];

const resultOf = (r: AdminReservation) => r.survey['診断結果']?.[0] || r.survey['選んだ稼ぎ方']?.[0] || '';

export function AdminPage() {
  const [key, setKey] = useState(() => takeAdminKey());
  const [list, setList] = useState<AdminReservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('today');
  const [query, setQuery] = useState('');
  const [openRid, setOpenRid] = useState<string | null>(null);
  const today = ymd(new Date());

  // すでに管理画面を開いている状態で、合言葉つきのリンクを開いた場合にも対応する
  useEffect(() => {
    const on = () => {
      const k = takeAdminKey();
      if (k) setKey(k);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // 管理画面は検索エンジンに載せない
  useEffect(() => {
    document.title = `予約管理｜${brand.brand.name}`;
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  const load = useCallback(async () => {
    if (!key) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminList(key);
      if (!res.ok) {
        if (res.error === 'unauthorized') {
          forgetAdminKey();
          setKey(null);
        }
        setError(res.error === 'unauthorized' ? '合言葉が違います。スプレッドシートの「管理画面」シートのリンクから開き直してください。' : '読み込めませんでした。');
        return;
      }
      setList(res.reservations || []);
    } catch {
      setError('通信に失敗しました。電波の良い場所で、もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    load();
  }, [load]);

  // 初回は「今日」が空なら「これから」を開く
  useEffect(() => {
    if (list && !list.some((r) => r.date === today && r.status !== 'cancelled')) setTab('upcoming');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list === null]);

  const groups = useMemo(() => {
    if (!list) return { today: [], upcoming: [], past: [], cancelled: [] } as Record<Tab, AdminReservation[]>;
    const q = query.trim();
    const hit = (r: AdminReservation) => !q || [r.name, r.email, r.tel, r.rid, r.message, r.note].some((x) => x.includes(q));
    const items = list.filter(hit).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    return {
      today: items.filter((r) => r.date === today && r.status !== 'cancelled'),
      upcoming: items.filter((r) => r.date > today && r.status === 'active'),
      past: items.filter((r) => r.date < today && r.status !== 'cancelled').reverse(),
      cancelled: items.filter((r) => r.status === 'cancelled').reverse(),
    };
  }, [list, query, today]);

  const stats = useMemo(() => {
    const all = list || [];
    const valid = all.filter((r) => r.status !== 'cancelled');
    const month = today.slice(0, 7);
    const thisMonth = valid.filter((r) => r.date.startsWith(month));
    const fromLine = thisMonth.filter((r) => r.source === 'line').length;
    const pending = valid.filter((r) => r.date < today && r.status === 'active').length;
    return {
      today: groups.today.length,
      upcoming: groups.upcoming.length,
      month: thisMonth.length,
      linePct: thisMonth.length ? Math.round((fromLine / thisMonth.length) * 100) : 0,
      pending,
    };
  }, [list, groups, today]);

  const update = async (rid: string, patch: { status?: Status; note?: string }) => {
    if (!key) return false;
    const prev = list;
    setList((l) => l && l.map((r) => (r.rid === rid ? { ...r, ...patch } : r)));
    try {
      const res = await adminUpdate(key, rid, patch);
      if (!res.ok) throw new Error();
      return true;
    } catch {
      setList(prev);
      setError('保存できませんでした。もう一度お試しください。');
      return false;
    }
  };

  if (brand.backend.type !== 'gas') {
    return <Shell><p className="p-6 text-[14px]">予約の保存先（Apps Script）が設定されていないため、管理画面は使えません。</p></Shell>;
  }
  if (!key) return <Shell><KeyForm onSubmit={setKey} message={error} /></Shell>;

  const open = list?.find((r) => r.rid === openRid) || null;
  const items = groups[tab];

  return (
    <Shell onReload={load} loading={loading}>
      <div className="grid grid-cols-4 gap-2 px-4 pt-4">
        <Stat label="今日" value={stats.today} unit="件" />
        <Stat label="これから" value={stats.upcoming} unit="件" />
        <Stat label="今月" value={stats.month} unit="件" />
        <Stat label="LINE経由" value={stats.linePct} unit="%" />
      </div>
      {stats.pending > 0 && (
        <button type="button" onClick={() => setTab('past')} className="mx-4 mt-3 block w-[calc(100%-2rem)] rounded-lg bg-cream px-3 py-2 text-left text-[12px] font-bold text-accent ring-1 ring-mustard/50">
          終わった予約のうち {stats.pending} 件が「予約中」のままです。完了・無断欠席をつけておきましょう →
        </button>
      )}

      <div className="sticky top-[52px] z-10 mt-3 bg-bg px-4 pb-2 pt-1">
        <div className="flex gap-1 rounded-xl bg-surface p-1 ring-1 ring-line">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg py-2 text-[13px] font-bold ${tab === t.id ? 'bg-navy text-white' : 'text-muted'}`}
            >
              {t.label}
              <span className="ml-1 text-[11px] opacity-70">{groups[t.id].length}</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="名前・メール・電話・予約番号で検索"
          className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] outline-none focus:border-teal"
        />
      </div>

      {error && <p className="mx-4 mt-2 rounded-lg bg-primary-soft px-3 py-2 text-[13px] text-accent">{error}</p>}

      <div className="px-4 pb-24">
        {list === null ? (
          <p className="py-16 text-center text-[13px] text-muted">読み込み中…</p>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-muted">{query ? '見つかりませんでした' : 'この欄の予約はありません'}</p>
        ) : (
          dayGroups(items).map(([date, rs]) => (
            <section key={date} className="mt-4">
              <h2 className="mb-2 text-[13px] font-bold text-muted">
                {formatDate(date)}
                {date === today && <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-[10px] text-white">今日</span>}
              </h2>
              <div className="space-y-2">
                {rs.map((r) => (
                  <Card key={r.rid} r={r} past={r.date < today} onOpen={() => setOpenRid(r.rid)} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {open && <Detail r={open} onClose={() => setOpenRid(null)} onUpdate={update} />}
    </Shell>
  );
}

function dayGroups(items: AdminReservation[]) {
  const m = new Map<string, AdminReservation[]>();
  for (const r of items) m.set(r.date, [...(m.get(r.date) || []), r]);
  return [...m.entries()];
}

function Shell({ children, onReload, loading }: { children: ReactNode; onReload?: () => void; loading?: boolean }) {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="mx-auto max-w-[720px]">
        <header className="sticky top-0 z-20 flex h-[52px] items-center justify-between bg-navy px-4 text-white">
          <div>
            <p className="text-[10px] opacity-70">{brand.brand.name}</p>
            <h1 className="font-head text-[16px] font-bold leading-tight">予約管理</h1>
          </div>
          {onReload && (
            <button type="button" onClick={onReload} className="rounded-full border border-white/40 px-3 py-1 text-[12px]" disabled={loading}>
              {loading ? '更新中…' : '↻ 更新'}
            </button>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-xl bg-surface px-2 py-2 text-center ring-1 ring-line">
      <p className="text-[10px] font-bold text-muted">{label}</p>
      <p className="font-num text-[20px] font-bold leading-tight text-navy">
        {value}
        <span className="ml-0.5 text-[10px] text-muted">{unit}</span>
      </p>
    </div>
  );
}

function Card({ r, past, onOpen }: { r: AdminReservation; past: boolean; onOpen: () => void }) {
  const [start, end] = r.time.split('-');
  const s = STATUS[r.status] || STATUS.active;
  const result = resultOf(r);
  return (
    <button type="button" onClick={onOpen} className="flex w-full gap-3 rounded-xl bg-surface p-3 text-left shadow-sm ring-1 ring-line active:scale-[0.99]">
      <div className="w-14 shrink-0 border-r border-line pr-2 text-center">
        <p className="font-num text-[17px] font-bold leading-tight text-navy">{start}</p>
        <p className="font-num text-[10px] text-muted">〜{end}</p>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[15px] font-bold">{r.name || '（お名前なし）'} 様</p>
          <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.cls}`}>{past && r.status === 'active' ? '未処理' : s.label}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${r.source === 'line' ? 'bg-[#E6F7EC] text-[#0a7a3a]' : 'bg-teal-soft text-teal'}`}>
            {r.source === 'line' ? 'LINEで予約' : 'LPから予約'}
          </span>
          {r.source === 'lp' && r.line && <span className="rounded bg-[#E6F7EC] px-1.5 py-0.5 text-[10px] font-bold text-[#0a7a3a]">LINE連携済み</span>}
          {result && <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold text-accent">{result}</span>}
        </div>
        {(r.message || r.note) && <p className="mt-1 truncate text-[12px] text-muted">{r.note ? `📝 ${r.note}` : `「${r.message}」`}</p>}
      </div>
    </button>
  );
}

function Detail({ r, onClose, onUpdate }: { r: AdminReservation; onClose: () => void; onUpdate: (rid: string, p: { status?: Status; note?: string }) => Promise<boolean> }) {
  const [note, setNote] = useState(r.note);
  const [saved, setSaved] = useState(false);
  const surveyRows = Object.entries(r.survey);
  const row = (k: string, v: ReactNode) =>
    v ? (
      <div className="flex gap-3 border-b border-line py-2 text-[13px]">
        <dt className="w-20 shrink-0 text-muted">{k}</dt>
        <dd className="min-w-0 flex-1 whitespace-pre-wrap break-all">{v}</dd>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 sm:items-center" role="dialog" aria-modal="true" aria-label="予約の詳細" onClick={onClose}>
      <div className="max-h-[90dvh] w-full max-w-[720px] overflow-y-auto rounded-t-2xl bg-surface p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-bold text-muted">
              {formatDate(r.date)} {r.time.replace('-', '〜')}
            </p>
            <h2 className="mt-0.5 text-[20px] font-bold">{r.name || '（お名前なし）'} 様</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="閉じる" className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-[18px]">
            ×
          </button>
        </div>

        <p className="mt-4 text-[11px] font-bold text-muted">状態</p>
        <div className="mt-1 grid grid-cols-4 gap-1.5">
          {(Object.keys(STATUS) as Status[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onUpdate(r.rid, { status: st })}
              className={`rounded-lg py-2 text-[12px] font-bold ring-1 ${r.status === st ? `${STATUS[st].cls} ring-transparent` : 'bg-surface text-muted ring-line'}`}
            >
              {STATUS[st].label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {r.tel && (
            <a href={`tel:${r.tel.replace(/\D/g, '')}`} className="flex-1 rounded-lg bg-bg py-2 text-center text-[13px] font-bold text-navy ring-1 ring-line">
              📞 電話する
            </a>
          )}
          {r.email && (
            <a href={`mailto:${r.email}`} className="flex-1 rounded-lg bg-bg py-2 text-center text-[13px] font-bold text-navy ring-1 ring-line">
              ✉️ メールする
            </a>
          )}
          {r.line && <span className="flex-1 rounded-lg bg-[#E6F7EC] py-2 text-center text-[12px] font-bold text-[#0a7a3a]">LINEのチャットで連絡できます</span>}
        </div>

        <dl className="mt-4">
          {row('申込元', r.source === 'line' ? '公式LINEのトーク' : 'LP（Webページ）')}
          {row('メール', r.email)}
          {row('電話', r.tel)}
          {row('検討状況', r.intent)}
          {row('相談内容', r.message)}
          {row('流入元', [r.utm.utm_source, r.utm.utm_medium].filter(Boolean).join(' / '))}
          {row('予約番号', r.rid)}
          {row('受付日時', r.createdAt ? new Date(r.createdAt).toLocaleString('ja-JP', { dateStyle: 'medium', timeStyle: 'short' }) : '')}
        </dl>

        {surveyRows.length > 0 && (
          <div className="mt-4 rounded-xl bg-bg p-3">
            <p className="text-[11px] font-bold text-muted">診断の回答</p>
            {surveyRows.map(([k, v]) => (
              <div key={k} className="mt-2 text-[13px]">
                <p className="text-[11px] text-muted">{k.replace(/^q\d+\s*/, '')}</p>
                <p className={`font-bold ${k === '診断結果' ? 'text-accent' : ''}`}>{v.join(' / ')}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-[11px] font-bold text-muted">メモ（お客さまには見えません）</p>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSaved(false);
          }}
          rows={3}
          placeholder="例：次回はLPの添削から。Instagramは週2で更新中"
          className="mt-1 w-full rounded-lg border border-line bg-surface p-3 text-[14px] outline-none focus:border-teal"
        />
        <button
          type="button"
          disabled={note === r.note && !saved}
          onClick={async () => setSaved(await onUpdate(r.rid, { note }))}
          className="mt-2 w-full rounded-lg bg-navy py-3 text-[14px] font-bold text-white disabled:opacity-40"
        >
          {saved ? '✓ 保存しました' : 'メモを保存'}
        </button>
      </div>
    </div>
  );
}

function KeyForm({ onSubmit, message }: { onSubmit: (k: string) => void; message: string | null }) {
  const [v, setV] = useState('');
  return (
    <div className="p-6">
      <p className="text-[14px] leading-relaxed">
        予約管理のスプレッドシートを開き、<b>「管理画面」シートのリンク</b>から開いてください。
        一度開けば、この端末では次回から自動で開けます。
      </p>
      {message && <p className="mt-3 rounded-lg bg-primary-soft px-3 py-2 text-[13px] text-accent">{message}</p>}
      <details className="mt-6 text-[13px] text-muted">
        <summary>合言葉を直接入力する</summary>
        <input value={v} onChange={(e) => setV(e.target.value.trim())} className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px]" placeholder="合言葉" />
        <button
          type="button"
          disabled={!v}
          onClick={() => {
            try {
              localStorage.setItem('funnelkit:admin-key', v);
            } catch {
              /* noop */
            }
            onSubmit(v);
          }}
          className="mt-2 w-full rounded-lg bg-navy py-2 font-bold text-white disabled:opacity-40"
        >
          開く
        </button>
      </details>
    </div>
  );
}
