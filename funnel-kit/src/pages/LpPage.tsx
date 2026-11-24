import { useEffect, useRef, useState } from 'react';
import { brand } from '../brand';
import { campaignActive } from '../lib/countdown';
import { FormContext } from '../lib/formContext';
import { load } from '../lib/store';
import { query } from '../lib/router';
import { track } from '../lib/track';
import { CountdownBar } from '../components/CountdownBar';
import { Footer } from '../components/Footer';
import { RenderSection } from '../sections/Sections';
import { ChatForm } from '../chatform/ChatForm';
import { ShellHeader } from '../components/Shell';
import type { LpSection } from '../types';

// 直前のカードにまとめる小さなセクション（ボタン・バッジ）
const JOIN_PREV = new Set<LpSection['type']>(['cta', 'badges']);

export function LpPage() {
  const [formOpen, setFormOpen] = useState(false);
  const fromSurvey = query('from') === 'survey' || !!load('survey');
  const active = campaignActive(brand.campaign?.deadline);

  const sections = brand.lp.sections.filter((s) => {
    if (s.campaignOnly && !active) return false;
    if (s.type === 'thanksBand' && !fromSurvey) return false;
    return true;
  });

  useEffect(() => {
    track('lp_view', { from_survey: fromSurvey });
    // リッチメニューなどからの直リンク：?open=form で申込フォームを開く／#faq などでその位置へ
    if (query('open') === 'form') {
      track('form_open', { source: query('utm_medium') || 'deeplink' });
      setFormOpen(true);
    } else if (window.location.hash.length > 1) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      // セクションの id か種類（例：#faq, #futures）で探す
      const sel = `[data-section="${CSS.escape(id)}"], [data-section^="${CSS.escape(id)}-"]`;
      window.setTimeout(() => document.querySelector(sel)?.scrollIntoView({ block: 'start' }), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // どのセクションまで読まれたか（計測）と、画面に入ったセクションをふわっと表示する
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.section!;
          if (e.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track('section_view', { id });
          }
        }
      },
      { threshold: 0.4 },
    );
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    el.querySelectorAll('[data-section]').forEach((s) => {
      io.observe(s);
      reveal.observe(s);
    });
    el.classList.add('js-reveal');
    return () => {
      io.disconnect();
      reveal.disconnect();
    };
  }, []);

  // カード（premium テーマで角丸のカードになる）ごとにまとめる
  const groups: { key: string; kind: string; items: { s: LpSection; i: number }[] }[] = [];
  sections.forEach((s, i) => {
    const last = groups[groups.length - 1];
    if (last && JOIN_PREV.has(s.type) && last.kind === '') last.items.push({ s, i });
    else groups.push({ key: s.id || `${s.type}-${i}`, kind: s.type === 'thanksBand' ? 'is-band' : s.type === 'closing' ? 'is-dark' : '', items: [{ s, i }] });
  });

  const open = (source: string) => {
    track('cta_click', { section_id: source });
    track('form_open', { source });
    setFormOpen(true);
  };

  return (
    <FormContext.Provider value={open}>
      <ShellHeader />
      <CountdownBar />
      <main ref={root}>
        {groups.map((g) => (
          <div key={g.key} className={`shell-card ${g.kind}`}>
            {g.items.map(({ s, i }) => (
              <div key={s.id || `${s.type}-${i}`} data-section={s.id || `${s.type}-${i}`}>
                <RenderSection s={s} index={i} />
              </div>
            ))}
          </div>
        ))}
      </main>
      <Footer />
      {formOpen && <ChatForm onClose={() => setFormOpen(false)} />}
    </FormContext.Provider>
  );
}
