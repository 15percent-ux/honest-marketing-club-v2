/**
 * 公式LINEボットの中身（LINEや外部サービスへの通信は BotContext 経由で注入する純粋なロジック）。
 * 状態はサーバーに持たず、ポストバックのデータ（a=操作&s=これまでの回答…）に載せて運ぶ。
 */
import type { BotContext, LineBotConfig, LineEvent, LineMessage } from './types';

const DAY = 86_400_000;
const JST = 9 * 3_600_000;
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const pad = (n: number) => String(n).padStart(2, '0');

/** 装飾タグ（[p]…[/p] など）を外す */
export const strip = (s: string) => s.replace(/\[(\w+)\]([\s\S]*?)\[\/\1\]/g, '$2');

const img = (bot: LineBotConfig, path: string) => (path.startsWith('http') ? path : bot.siteUrl.replace(/\/$/, '') + path);

function jstParts(ms: number) {
  const d = new Date(ms + JST);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), wd: d.getUTCDay() };
}
const ymd = (p: { y: number; m: number; d: number }) => `${p.y}-${pad(p.m)}-${pad(p.d)}`;
function slotStartMs(date: string, time: string) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split('-')[0].split(':').map(Number);
  return Date.UTC(y, m - 1, d, hh, mm) - JST;
}
export function dateLabel(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return `${m}/${d}(${WD[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]})`;
}
const dateLong = (date: string) => {
  const [, m, d] = date.split('-').map(Number);
  return `${m}月${d}日（${dateLabel(date).slice(-2, -1)}）`;
};

/** 日本時間で予約できる枠を作る（サーバーのタイムゾーンに依存しない） */
export function jstSlots(s: LineBotConfig['booking']['schedule'], nowMs: number) {
  const out: { date: string; time: string; remaining: number }[] = [];
  const limit = nowMs + s.leadHours * 3_600_000;
  for (let i = 0; i <= s.daysAhead; i++) {
    const p = jstParts(nowMs + i * DAY);
    const date = ymd(p);
    if (!s.weekdays.includes(p.wd) || s.closedDates?.includes(date)) continue;
    for (const time of s.times) if (slotStartMs(date, time) >= limit) out.push({ date, time, remaining: 1 });
  }
  return out;
}

async function availableSlots(ctx: BotContext) {
  const base = jstSlots(ctx.bot.booking.schedule, ctx.nowMs);
  if (!base.length) return base;
  const server = await ctx.fetchSlots(base[0].date, base[base.length - 1].date);
  const map = new Map((server || []).map((x) => [`${x.date} ${x.time}`, x.remaining]));
  return base.map((x) => ({ ...x, remaining: map.get(`${x.date} ${x.time}`) ?? x.remaining })).filter((x) => x.remaining > 0);
}

// ───────────── Flex の部品 ─────────────

const text = (t: string, o: Record<string, unknown> = {}) => ({ type: 'text', text: t, wrap: true, ...o });
const postback = (label: string, data: string, displayText?: string) => ({
  type: 'postback',
  label: label.slice(0, 40),
  data,
  ...(displayText ? { displayText } : {}),
});

function bubble(bot: LineBotConfig, o: { hero?: string; body: unknown[]; footer?: unknown[] }) {
  return {
    type: 'bubble',
    size: 'mega',
    ...(o.hero ? { hero: { type: 'image', url: img(bot, o.hero), size: 'full', aspectRatio: '20:13', aspectMode: 'cover' } } : {}),
    body: { type: 'box', layout: 'vertical', spacing: 'md', paddingAll: '20px', backgroundColor: '#FFFFFF', contents: o.body },
    ...(o.footer ? { footer: { type: 'box', layout: 'vertical', spacing: 'sm', paddingAll: '16px', paddingTop: '0px', contents: o.footer } } : {}),
    styles: { footer: { separator: false } },
  };
}

const primaryBtn = (bot: LineBotConfig, label: string, data: string, displayText?: string) => ({
  type: 'button',
  style: 'primary',
  color: bot.colors.accent,
  height: 'md',
  action: postback(label, data, displayText),
});
const linkBtn = (bot: LineBotConfig, label: string, data: string, displayText?: string) => ({
  type: 'button',
  style: 'link',
  color: bot.colors.sage,
  height: 'sm',
  action: postback(label, data, displayText),
});

/** 枠線つきの選択肢（ボタンより上品に見える） */
const optionRow = (bot: LineBotConfig, label: string, data: string) => ({
  type: 'box',
  layout: 'horizontal',
  paddingAll: '13px',
  cornerRadius: '10px',
  borderWidth: '1px',
  borderColor: '#E5DCD2',
  backgroundColor: bot.colors.bg,
  action: postback(label, data, label),
  contents: [text(label, { size: 'sm', color: bot.colors.ink, weight: 'bold', flex: 1 }), text('›', { size: 'md', color: bot.colors.accent, flex: 0, wrap: false })],
});

const kicker = (bot: LineBotConfig, t: string) => text(t, { size: 'xs', color: bot.colors.sage, weight: 'bold' });
const flex = (altText: string, contents: unknown, quickReply?: unknown): LineMessage => ({
  type: 'flex',
  altText,
  contents,
  ...(quickReply ? { quickReply } : {}),
});

// ───────────── 画面（メッセージ）ごとの組み立て ─────────────

export function greeting(bot: LineBotConfig): LineMessage[] {
  const c = bot.greeting.card;
  return [
    { type: 'text', text: bot.greeting.text },
    flex(
      c.title,
      bubble(bot, {
        hero: c.image,
        body: [text(c.title, { size: 'lg', weight: 'bold', color: bot.colors.ink }), text(c.sub, { size: 'xs', color: bot.colors.accent })],
        footer: [primaryBtn(bot, c.button, 'a=diag', c.button)],
      }),
    ),
  ];
}

function question(bot: LineBotConfig, answers: number[]): LineMessage {
  const qs = bot.diagnosis.questions;
  const n = answers.length;
  const q = qs[n];
  const prefix = answers.length ? `s=${answers.join('.')}.` : 's=';
  return flex(
    `Q${n + 1}. ${q.text.replace(/\n/g, '')}`,
    bubble(bot, {
      body: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            text(`Q${n + 1}`, { size: 'xxl', weight: 'bold', color: bot.colors.accent, flex: 0, wrap: false }),
            text(`/ ${qs.length}`, { size: 'sm', color: bot.colors.sub, gravity: 'bottom', margin: 'sm', flex: 0, wrap: false }),
          ],
        },
        text(q.text.replace(/\n/g, ''), { size: 'md', weight: 'bold', color: bot.colors.ink }),
        { type: 'box', layout: 'vertical', spacing: 'sm', margin: 'lg', contents: q.options.map((o, i) => optionRow(bot, o, `a=q&${prefix}${i}`)) },
      ],
    }),
  );
}

function labeledSurvey(bot: LineBotConfig, answers: number[]) {
  const out: Record<string, string[]> = {};
  bot.diagnosis.questions.forEach((q, i) => {
    if (answers[i] !== undefined) out[`${q.id} ${q.text.replace(/\n/g, '')}`] = [q.options[answers[i]]];
  });
  const r = resultFor(bot, answers);
  if (r) out['診断結果'] = [r.name];
  return out;
}

function resultFor(bot: LineBotConfig, answers: number[]) {
  const qi = bot.diagnosis.questions.findIndex((q) => q.id === bot.diagnosis.resultQuestionId);
  const opt = bot.diagnosis.questions[qi]?.options[answers[qi]];
  return opt ? bot.diagnosis.results[opt] : undefined;
}

function resultCard(bot: LineBotConfig, r: LineBotConfig['diagnosis']['results'][string], s: string, withAlt = true) {
  return bubble(bot, {
    hero: r.image,
    body: [
      kicker(bot, withAlt ? 'あなたに合いそうな稼ぎ方は…' : '稼ぎ方の一例'),
      text(r.name, { size: 'xl', weight: 'bold', color: bot.colors.accent }),
      ...r.desc.map((d) => text(strip(d), { size: 'sm', color: bot.colors.ink })),
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        paddingAll: '12px',
        cornerRadius: '10px',
        backgroundColor: bot.colors.soft,
        contents: [text('無料相談でやること', { size: 'xxs', color: bot.colors.sage, weight: 'bold' }), text(strip(r.step), { size: 'sm', weight: 'bold', color: bot.colors.ink, margin: 'xs' })],
      },
      text(bot.diagnosis.note, { size: 'xxs', color: bot.colors.sub, margin: 'md' }),
    ],
    footer: [
      primaryBtn(bot, 'この内容で相談を予約する', `a=book&${s}&t=${r.key}`, '相談を予約したい'),
      ...(withAlt ? [linkBtn(bot, 'ほかの稼ぎ方も見る', 'a=styles', 'ほかの稼ぎ方も見たい')] : []),
    ],
  });
}

function stylesCarousel(bot: LineBotConfig): LineMessage {
  return flex('稼ぎ方の一例', {
    type: 'carousel',
    contents: Object.values(bot.diagnosis.results).map((r) => resultCard(bot, r, 's=', false)),
  });
}

async function dateChooser(bot: LineBotConfig, ctx: BotContext, carry: string): Promise<LineMessage[]> {
  const slots = await availableSlots(ctx);
  const dates = [...new Set(slots.map((x) => x.date))].slice(0, 12);
  if (!dates.length) return [{ type: 'text', text: 'ただいま予約できる日程がありません。このトークで希望日時をお送りください。担当者からご連絡します。' }];
  const b = bot.booking;
  return [
    flex(
      'ご希望の日にちを選んでください',
      bubble(bot, {
        body: [
          kicker(bot, 'BOOKING'),
          text(`${b.offerName}のご予約`, { size: 'lg', weight: 'bold', color: bot.colors.ink }),
          text(`${b.format}｜${b.duration}｜無料`, { size: 'xs', color: bot.colors.sub }),
          text('下のボタンから、ご希望の日にちを選んでください。', { size: 'sm', color: bot.colors.ink, margin: 'md' }),
        ],
      }),
      {
        items: dates.map((d) => ({ type: 'action', action: postback(dateLabel(d), `a=date&d=${d}${carry}`, `${dateLabel(d)}を希望`) })),
      },
    ),
  ];
}

async function timeChooser(bot: LineBotConfig, ctx: BotContext, date: string, carry: string): Promise<LineMessage[]> {
  const times = (await availableSlots(ctx)).filter((x) => x.date === date).map((x) => x.time);
  if (!times.length) return [{ type: 'text', text: `${dateLong(date)}は埋まってしまいました。別の日にちを選んでください。` }, ...(await dateChooser(bot, ctx, carry))];
  return [
    {
      type: 'text',
      text: `${dateLong(date)}ですね。ご希望の時間を選んでください。`,
      quickReply: {
        items: [
          ...times.map((t) => ({ type: 'action', action: postback(t.replace('-', '〜'), `a=time&d=${date}&tm=${t}${carry}`, `${t.split('-')[0]}〜を希望`) })),
          { type: 'action', action: postback('日にちを変える', `a=book${carry}`, '日にちを変えたい') },
        ],
      },
    },
  ];
}

function confirmCard(bot: LineBotConfig, date: string, time: string, name: string, carry: string): LineMessage {
  const row = (k: string, v: string) => ({
    type: 'box',
    layout: 'horizontal',
    contents: [text(k, { size: 'sm', color: bot.colors.sub, flex: 2 }), text(v, { size: 'sm', color: bot.colors.ink, weight: 'bold', flex: 5 })],
  });
  return flex(
    'ご予約内容の確認',
    bubble(bot, {
      body: [
        kicker(bot, 'CONFIRM'),
        text('この内容で予約しますか？', { size: 'lg', weight: 'bold', color: bot.colors.ink }),
        { type: 'separator', margin: 'md', color: '#EFE6DC' },
        { type: 'box', layout: 'vertical', spacing: 'sm', margin: 'md', contents: [row('内容', bot.booking.offerName), row('日時', `${dateLong(date)} ${time.replace('-', '〜')}`), row('形式', bot.booking.format), row('お名前', `${name} 様`)] },
      ],
      footer: [primaryBtn(bot, 'この内容で予約する', `a=ok&d=${date}&tm=${time}${carry}`, 'この内容で予約します'), linkBtn(bot, '日時を選び直す', `a=book${carry}`, '日時を選び直したい')],
    }),
  );
}

function doneCard(bot: LineBotConfig, date: string, time: string, rid: string): LineMessage {
  return flex(
    'ご予約ありがとうございます',
    bubble(bot, {
      body: [
        text('✓ ご予約を受け付けました', { size: 'sm', weight: 'bold', color: bot.colors.sage }),
        text(`${dateLong(date)}\n${time.replace('-', '〜')}`, { size: 'xl', weight: 'bold', color: bot.colors.ink }),
        text(`${bot.booking.offerName}｜${bot.booking.format}`, { size: 'xs', color: bot.colors.sub }),
        { type: 'separator', margin: 'md', color: '#EFE6DC' },
        ...bot.booking.afterNote.map((t) => text(`・${t}`, { size: 'sm', color: bot.colors.ink })),
        text(`予約番号：${rid}`, { size: 'xxs', color: bot.colors.sub, margin: 'md' }),
      ],
    }),
  );
}

function faqCard(bot: LineBotConfig): LineMessage {
  return flex(
    'よくある質問',
    bubble(bot, {
      body: [
        kicker(bot, 'FAQ'),
        text('よくある質問', { size: 'lg', weight: 'bold', color: bot.colors.ink }),
        ...bot.faq.flatMap((f, i) => [
          ...(i ? [{ type: 'separator', margin: 'md', color: '#EFE6DC' }] : []),
          text(`Q. ${f.q}`, { size: 'sm', weight: 'bold', color: bot.colors.accent, margin: 'md' }),
          text(strip(f.a), { size: 'sm', color: bot.colors.ink }),
        ]),
      ],
      footer: [primaryBtn(bot, '無料診断をはじめる', 'a=diag', '無料診断をはじめる'), linkBtn(bot, bot.about.lpLabel, 'a=about', bot.about.lpLabel)],
    }),
  );
}

function aboutCard(bot: LineBotConfig): LineMessage {
  return flex(
    bot.about.title,
    bubble(bot, {
      hero: bot.greeting.card.image,
      body: [text(bot.about.title, { size: 'lg', weight: 'bold', color: bot.colors.ink }), ...bot.about.lines.map((l) => text(l, { size: 'sm', color: bot.colors.ink }))],
      footer: [
        { type: 'button', style: 'primary', color: bot.colors.accent, action: { type: 'uri', label: 'くわしいページを見る', uri: `${bot.siteUrl.replace(/\/$/, '')}/lp?utm_source=line&utm_medium=bot` } },
        linkBtn(bot, '無料診断をはじめる', 'a=diag', '無料診断をはじめる'),
      ],
    }),
  );
}

// ───────────── イベント処理 ─────────────

export async function handleEvent(ev: LineEvent, ctx: BotContext): Promise<LineMessage[] | null> {
  const bot = ctx.bot;
  const userId = ev.source?.userId;

  if (ev.type === 'follow') return greeting(bot);

  if (ev.type === 'message' && ev.message?.type === 'text') {
    const t = (ev.message.text || '').trim();
    if (t.startsWith(bot.linkPrefix) && userId) {
      const rid = t.slice(bot.linkPrefix.length).trim();
      const res = await ctx.link(rid, userId);
      return [
        {
          type: 'text',
          text: res.ok
            ? `LINE連携が完了しました🍵\n予約番号：${rid}\n\n前日にこのトークでリマインドをお送りします。当日の参加URLもこちらでご案内します。`
            : `予約番号「${rid}」が見つかりませんでした。お手数ですが、予約完了画面の番号をもう一度お送りください。`,
        },
      ];
    }
    if (/^(診断|無料診断)/.test(t)) return [question(bot, [])];
    if (/^(予約|相談予約|予約したい)$/.test(t)) return dateChooser(bot, ctx, '');
    return null; // それ以外は担当者がチャットで返信する
  }

  if (ev.type !== 'postback' || !ev.postback) return null;
  const p = new URLSearchParams(ev.postback.data);
  const a = p.get('a');
  const answers = (p.get('s') || '')
    .split('.')
    .filter((x) => x !== '')
    .map(Number);
  const carry = `&s=${answers.join('.')}${p.get('t') ? `&t=${p.get('t')}` : ''}`;

  switch (a) {
    case 'diag':
      return [question(bot, [])];
    case 'q': {
      if (answers.length < bot.diagnosis.questions.length) return [question(bot, answers)];
      const r = resultFor(bot, answers);
      if (!r) return [question(bot, [])];
      return [{ type: 'text', text: 'ご回答ありがとうございました🍵' }, flex(`あなたに合いそうな稼ぎ方：${r.name}`, resultCard(bot, r, `s=${answers.join('.')}`))];
    }
    case 'styles':
      return [stylesCarousel(bot)];
    case 'book':
      return dateChooser(bot, ctx, carry);
    case 'date':
      return timeChooser(bot, ctx, p.get('d') || '', carry);
    case 'time': {
      const prof = userId ? await ctx.getProfile(userId) : null;
      return [confirmCard(bot, p.get('d') || '', p.get('tm') || '', prof?.displayName || 'LINEのお名前', carry)];
    }
    case 'ok': {
      if (!userId) return null;
      const date = p.get('d') || '';
      const time = p.get('tm') || '';
      const prof = await ctx.getProfile(userId);
      const survey = labeledSurvey(bot, answers);
      const chosen = p.get('t');
      if (chosen && !survey['診断結果']) {
        const r = Object.values(bot.diagnosis.results).find((x) => x.key === chosen);
        if (r) survey['選んだ稼ぎ方'] = [r.name];
      }
      const res = await ctx.reserve({
        date,
        time,
        lastName: prof?.displayName || 'LINEユーザー',
        firstName: '',
        email: '',
        tel: '',
        source: 'line',
        lineUserId: userId,
        survey,
        utm: { utm_source: 'line', utm_medium: 'bot' },
      });
      if (res.ok && res.rid) return [doneCard(bot, date, time, res.rid)];
      if (res.error === 'slot_full') return [{ type: 'text', text: 'ごめんなさい、その枠はちょうど埋まってしまいました。別の日時を選んでください。' }, ...(await dateChooser(bot, ctx, carry))];
      if (res.error === 'duplicate') return [{ type: 'text', text: 'この日時はすでにご予約いただいています。変更したい場合は、このトークでお知らせください。' }];
      return [{ type: 'text', text: `予約を受け付けられませんでした。${res.message || ''}\nお手数ですが、このトークでご希望の日時をお送りください。` }];
    }
    case 'faq':
      return [faqCard(bot)];
    case 'about':
      return [aboutCard(bot)];
    default:
      return null;
  }
}
