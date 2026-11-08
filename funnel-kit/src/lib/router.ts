import { useEffect, useState } from 'react';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export type Route = '/' | '/lp' | '/thanks' | '/admin';

function current(): Route {
  const p = window.location.pathname.slice(base.length).replace(/\/$/, '') || '/';
  return (['/', '/lp', '/thanks', '/admin'].includes(p) ? p : '/') as Route;
}

export function navigate(to: Route, query?: Record<string, string>) {
  const qs = new URLSearchParams(window.location.search);
  // UTM などは引き継ぐ。遷移ごとの一時パラメータは上書きする
  for (const k of ['from', 'rid', 'linked']) qs.delete(k);
  for (const [k, v] of Object.entries(query || {})) qs.set(k, v);
  const s = qs.toString();
  window.history.pushState({}, '', `${base}${to === '/' ? '/' : to}${s ? `?${s}` : ''}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(current);
  useEffect(() => {
    const on = () => setRoute(current());
    window.addEventListener('popstate', on);
    return () => window.removeEventListener('popstate', on);
  }, []);
  return route;
}

export const query = (key: string) => new URLSearchParams(window.location.search).get(key);
