import { brand } from '../brand';
import { navigate } from '../lib/router';
import { track } from '../lib/track';

/**
 * ページの外枠（brand.shell）。premium テーマで使う。
 * - ShellHeader：列の上に貼りつく見出し（ブランド名と1つのボタン）
 * - ShellFrame：PC幅（1280px以上）で出す背景写真・左のメニュー・右下のLINE案内
 */

/** '#plans' などページ内の位置へ。今のページに無ければLPのその位置へ移る */
function go(href: string, source: string) {
  track('cta_click', { section_id: source, href });
  if (href.startsWith('#')) {
    const id = href.slice(1);
    const el = document.querySelector(`[data-section="${CSS.escape(id)}"], [data-section^="${CSS.escape(id)}-"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = `/lp${href}`;
    return;
  }
  if (href === '/' || href === '/lp') return navigate(href);
  window.location.href = href;
}

const isExternal = (href: string) => /^https?:/.test(href);

export function ShellHeader() {
  const h = brand.shell?.header;
  if (!h) return null;
  return (
    <header className="shell-header sticky top-0 z-30 mx-2 flex items-center justify-between rounded-b-[18px] px-4 py-3">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
        className="font-head text-[14px] font-bold tracking-[0.08em] text-ink"
      >
        {h.title}
      </a>
      {h.cta && (
        <a
          href={h.cta.href}
          onClick={(e) => {
            if (isExternal(h.cta!.href)) return;
            e.preventDefault();
            go(h.cta!.href, 'header');
          }}
          className="rounded-md bg-lineg px-4 py-2 text-[12px] font-bold text-white"
        >
          {h.cta.label}
        </a>
      )}
    </header>
  );
}

export function ShellFrame() {
  const s = brand.shell;
  if (!s) return null;
  return (
    <>
      {s.backdrop && (
        <div className="shell-backdrop" aria-hidden>
          <img src={s.backdrop} alt="" />
        </div>
      )}
      {s.aside && (
        <aside className="shell-aside fixed top-[117px] z-20 hidden w-[310px] text-white xl:block">
          <p className="font-head text-[40px] leading-tight tracking-[0.08em]">{s.aside.title}</p>
          <p className="mt-2 font-head text-[14px] tracking-[0.16em] text-white/85">{s.aside.sub}</p>
          <nav className="mt-10 space-y-3" aria-label="ページ内メニュー">
            {s.aside.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.href, 'aside');
                }}
                className="block font-head text-[28px] leading-snug transition-opacity hover:opacity-70"
              >
                - {n.en}
                <span className="ml-2 align-middle text-[12px] tracking-[0.2em] text-white/80">[ {n.ja} ]</span>
              </a>
            ))}
          </nav>
          {s.aside.card && (
            <a
              href={s.aside.card.href}
              onClick={(e) => {
                e.preventDefault();
                go(s.aside!.card!.href, 'aside_card');
              }}
              className="mt-10 block rounded-lg border border-white/40 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <p className="text-center font-head text-[14px] tracking-[0.06em]">{s.aside.card.title}</p>
              {s.aside.card.image && <img src={s.aside.card.image} alt="" className="mt-4 block aspect-[16/10] w-full rounded-md object-cover" />}
              <p className="mt-4 flex items-center justify-between rounded-full bg-white/10 px-5 py-3 font-head text-[14px]">
                {s.aside.card.label}
                <span aria-hidden>→</span>
              </p>
            </a>
          )}
        </aside>
      )}
      {s.promo && (
        <aside className="shell-promo fixed bottom-14 z-20 hidden w-[300px] text-right text-white xl:block">
          <p className="inline-block whitespace-pre-line bg-black px-3 py-2 text-left font-head text-[24px] font-bold leading-snug">{s.promo.badge}</p>
          <p className="mt-6 font-head text-[34px] leading-tight">{s.promo.title}</p>
          <p className="mt-2 font-head text-[14px] tracking-[0.2em]">{s.promo.sub}</p>
          <a
            href={s.promo.button.href}
            target={isExternal(s.promo.button.href) ? '_blank' : undefined}
            rel="noopener"
            onClick={() => track('line_link_click', { source: 'shell_promo' })}
            className="mt-6 block rounded-md bg-white/15 py-4 text-center font-head text-[14px] font-bold shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            {s.promo.button.label}
          </a>
        </aside>
      )}
    </>
  );
}
