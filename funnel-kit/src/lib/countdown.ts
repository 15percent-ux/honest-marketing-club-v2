import { useEffect, useState } from 'react';

export interface Remaining {
  d: number;
  h: number;
  m: number;
  s: number;
  done: boolean;
}

export function remaining(deadline: string, now = Date.now()): Remaining {
  const diff = Math.max(0, new Date(deadline).getTime() - now);
  const t = Math.floor(diff / 1000);
  return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60, done: diff === 0 };
}

/** 実在の締切に向けたカウントダウン。締切を過ぎたら done=true（エバーグリーンのリセットはしない） */
export function useCountdown(deadline?: string): Remaining | null {
  const [r, setR] = useState(() => (deadline ? remaining(deadline) : null));
  useEffect(() => {
    if (!deadline) return;
    const id = window.setInterval(() => setR(remaining(deadline)), 1000);
    return () => window.clearInterval(id);
  }, [deadline]);
  return r;
}

/** 締切が設定されていて、まだ過ぎていないか */
export const campaignActive = (deadline?: string) => !!deadline && new Date(deadline).getTime() > Date.now();
