import type { FormConfig } from '../types';

/** 公式LINEのボット（トーク内で診断と予約を完結させる）の設定。brands/<id>/line-bot.ts で書く */
export interface LineBotConfig {
  /** 画像の置き場所（LPと同じサイト） */
  siteUrl: string;
  colors: { accent: string; sage: string; ink: string; bg: string; sub: string; soft: string };
  greeting: { text: string; card: { image: string; title: string; sub: string; button: string } };
  diagnosis: {
    questions: { id: string; text: string; options: string[] }[];
    /** 結果を決める設問 */
    resultQuestionId: string;
    results: Record<string, { key: string; name: string; image: string; desc: string[]; step: string }>;
    note: string;
  };
  booking: {
    offerName: string;
    duration: string;
    format: string;
    schedule: FormConfig['schedule'];
    afterNote: string[];
  };
  faq: { q: string; a: string }[];
  about: { title: string; lines: string[]; lpLabel: string };
  /** LPから来た人が送ってくる「相談予約:R…」の接頭辞 */
  linkPrefix: string;
  richMenu: {
    image: string;
    size: { width: number; height: number };
    chatBarText: string;
    areas: { bounds: { x: number; y: number; width: number; height: number }; data: string; displayText: string }[];
  };
}

export interface LineEvent {
  type: string;
  replyToken?: string;
  source?: { userId?: string };
  message?: { type: string; text?: string };
  postback?: { data: string };
}

export interface BotContext {
  bot: LineBotConfig;
  nowMs: number;
  getProfile(userId: string): Promise<{ displayName: string } | null>;
  fetchSlots(from: string, to: string): Promise<{ date: string; time: string; remaining: number }[] | null>;
  reserve(r: Record<string, unknown>): Promise<{ ok: boolean; rid?: string; error?: string; message?: string }>;
  link(rid: string, lineUserId: string): Promise<{ ok: boolean }>;
}

// LINE Messaging API のメッセージ（必要な分だけの緩い型）
export type LineMessage = Record<string, unknown>;
