/**
 * Vercel Functions（/api/line）用の入口。LINEからのWebhookを受け、署名を確かめて返信する。
 * 環境変数：LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN
 * 予約の保存先（Apps Script）は brands/<id>/config.ts の backend.endpoint を使う。
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import bot from '@line-bot';
import config from '@brand';
import { handleEvent } from './engine';
import type { BotContext, LineEvent } from './types';

const API = 'https://api.line.me/v2/bot';
const token = () => process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
const endpoint = config.backend.type === 'gas' ? config.backend.endpoint : '';

function validSignature(body: string, signature: string | null) {
  const secret = process.env.LINE_CHANNEL_SECRET || '';
  if (!secret || !signature) return false;
  const expected = createHmac('sha256', secret).update(body).digest();
  const given = Buffer.from(signature, 'base64');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

async function gas(method: 'GET' | 'POST', params: Record<string, string>, body?: unknown) {
  if (!endpoint) return { ok: false, error: 'invalid', message: '予約の保存先が設定されていません' };
  const url = method === 'GET' ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
  const res = await fetch(url, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'text/plain;charset=utf-8' } : undefined,
    body: method === 'POST' ? JSON.stringify(body) : undefined,
    redirect: 'follow',
  });
  return res.json();
}

const ctx = (): BotContext => ({
  bot,
  nowMs: Date.now(),
  async getProfile(userId) {
    const r = await fetch(`${API}/profile/${userId}`, { headers: { Authorization: `Bearer ${token()}` } });
    return r.ok ? r.json() : null;
  },
  async fetchSlots(from, to) {
    try {
      const j = await gas('GET', { action: 'slots', from, to });
      return j.ok ? j.slots : null;
    } catch {
      return null;
    }
  },
  async reserve(r) {
    try {
      return await gas('POST', {}, { action: 'reserve', brand: config.id, reservation: r });
    } catch {
      return { ok: false, error: 'network', message: '通信に失敗しました。' };
    }
  },
  async link(rid, lineUserId) {
    try {
      return await gas('POST', {}, { action: 'link', rid, lineUserId });
    } catch {
      return { ok: false };
    }
  },
});

async function reply(replyToken: string, messages: unknown[]) {
  const r = await fetch(`${API}/message/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
    body: JSON.stringify({ replyToken, messages: messages.slice(0, 5) }),
  });
  if (!r.ok) console.error('reply failed', r.status, await r.text());
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.text();
  if (!validSignature(body, request.headers.get('x-line-signature'))) return new Response('invalid signature', { status: 401 });
  const { events = [] } = JSON.parse(body) as { events: LineEvent[] };
  await Promise.all(
    events.map(async (ev) => {
      try {
        const messages = await handleEvent(ev, ctx());
        if (messages?.length && ev.replyToken) await reply(ev.replyToken, messages);
      } catch (e) {
        console.error('event failed', e);
      }
    }),
  );
  return new Response('ok');
}

export function GET(): Response {
  return Response.json({ ok: true, bot: config.id, configured: !!process.env.LINE_CHANNEL_SECRET && !!token() && !!endpoint });
}
