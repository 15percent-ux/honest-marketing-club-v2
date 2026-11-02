import { Fragment, type ReactNode } from 'react';
import type { RichText } from '../types';

const TAG = /\[(m|p|a|b|inv|invp|invt|hl|dots|u)\]([\s\S]*?)\[\/\1\]/g;

const cls: Record<string, string> = {
  m: 'marker',
  p: 'text-primary font-bold',
  a: 'text-accent font-bold',
  b: 'font-bold',
  inv: 'inv',
  invp: 'inv !bg-primary',
  invt: 'inv !bg-teal',
  hl: 'inv !bg-hl !text-ink',
  dots: 'dots',
  u: 'underline-p',
};

function lines(text: string, keyBase: string): ReactNode[] {
  return text.split('\n').flatMap((part, i) => (i === 0 ? [part] : [<br key={`${keyBase}-br${i}`} />, part]));
}

/** 装飾タグ付きの文字列を React ノードに変換する（types.ts の RichText を参照） */
export function rt(text: RichText | undefined): ReactNode {
  if (!text) return null;
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TAG)) {
    if (m.index! > last) out.push(...lines(text.slice(last, m.index), `t${i}`));
    out.push(
      <span key={`s${i}`} className={cls[m[1]]}>
        {lines(m[2], `s${i}`)}
      </span>,
    );
    last = m.index! + m[0].length;
    i++;
  }
  if (last < text.length) out.push(...lines(text.slice(last), 'end'));
  return <Fragment>{out}</Fragment>;
}

/** タグを除いたプレーンテキスト（alt や計測用） */
export const plain = (text: RichText) => text.replace(TAG, '$2').replace(/\n/g, ' ');
