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
      window.setTimeout(() => document.querySelector(`[data-section="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'start' }), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // どのセクションまで読まれたか
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
    root.current?.querySelectorAll('[data-section]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const open = (source: string) => {
    track('cta_click', { section_id: source });
    track('form_open', { source });
    setFormOpen(true);
  };

  return (
    <FormContext.Provider value={open}>
      <CountdownBar />
      <main ref={root}>
        {sections.map((s, i) => (
          <div key={s.id || `${s.type}-${i}`} data-section={s.id || `${s.type}-${i}`}>
            <RenderSection s={s} index={i} />
          </div>
        ))}
      </main>
      <Footer />
      {formOpen && <ChatForm onClose={() => setFormOpen(false)} />}
    </FormContext.Provider>
  );
}
