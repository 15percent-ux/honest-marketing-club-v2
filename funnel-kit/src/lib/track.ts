import { brand } from '../brand';
import { load } from './store';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

function inject(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initTracking() {
  window.dataLayer = window.dataLayer || [];
  const t = brand.tracking;
  if (t?.ga4Id) {
    inject(`https://www.googletagmanager.com/gtag/js?id=${t.ga4Id}`);
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', t.ga4Id);
  }
  if (t?.metaPixelId) {
    const q: unknown[] = [];
    const fbq = ((...args: unknown[]) => q.push(args)) as NonNullable<Window['fbq']>;
    fbq.queue = q;
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = window._fbq = fbq;
    inject('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', t.metaPixelId);
    fbq('track', 'PageView');
  }
}

// Meta広告の標準イベントに対応づけるもの
const META_STANDARD: Record<string, string> = {
  form_submit: 'Lead',
  form_open: 'InitiateCheckout',
  survey_complete: 'CompleteRegistration',
};

/** 計測イベントを送る（docs/trial-funnel/02_prompts.md の P9 の定義に準拠） */
export function track(event: string, params: Record<string, unknown> = {}) {
  const payload = {
    brand: brand.id,
    ...(load<Record<string, string>>('utm') || {}),
    ...params,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.('event', event, payload);
  if (window.fbq) {
    if (META_STANDARD[event]) window.fbq('track', META_STANDARD[event], payload);
    else window.fbq('trackCustom', event, payload);
  }
  if (import.meta.env.DEV) console.debug('[track]', event, payload);
}
