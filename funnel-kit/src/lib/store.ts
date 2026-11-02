// sessionStorage は LINE内ブラウザやプライベートモードで使えないことがあるので、必ず try/catch で包む
const NS = 'funnelkit:';

export function save<T>(key: string, value: T) {
  try {
    sessionStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* 保存できなくても動作は続ける */
  }
}

export function load<T>(key: string): T | undefined {
  try {
    const raw = sessionStorage.getItem(NS + key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

export function remove(key: string) {
  try {
    sessionStorage.removeItem(NS + key);
  } catch {
    /* noop */
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

/** 最初に着地したときのUTMを保存する（ページを移っても失わない） */
export function captureUtm(): Record<string, string> {
  const existing = load<Record<string, string>>('utm');
  const qs = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = qs.get(k);
    if (v) found[k] = v;
  }
  const utm = Object.keys(found).length ? found : existing || {};
  save('utm', utm);
  return utm;
}
