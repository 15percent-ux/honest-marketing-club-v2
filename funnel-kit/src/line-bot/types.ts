import type { FormConfig } from '../types';

/** 公式LINEのボット（トーク内で診断と予約を完結させる）の設定。brands/<id>/line-bot.ts で書く */
export interface LineBotConfig {
  /** 画像の置き場所（LPと同じサイト） */
  siteUrl: string;
  /** line は選択肢の枠線・区切り線の色（省略時は薄いグレー） */
  colors: { accent: string; sage: string; ink: string; bg: string; sub: string; soft: string; line?: string };
  greeting: { text: string; card: { image: string; title: string; sub: string; button: string } };
  diagnosis: {
    questions: { id: string; text: string; options: string[] }[];
    /** 結果を決める設問 */
    resultQuestionId: string;
    results: Record<string, BotResult>;
    /** 結果カードの小見出し（既定：「あなたに合いそうな稼ぎ方は…」） */
    kicker?: string;
    /** 結果の上に出す判定（例：「安心して進められます」） */
    verdict?: string;
    /** ほかの設問の回答に応じて足す補足 */
    extras?: { questionId: string; label: string; answers: Record<string, string> }[];
    stepLabel?: string;
    note: string;
    /** リッチメニューの「一覧を見る」で出すカード（省略時は results を並べる） */
    styles?: { title: string; kicker: string; button: string; items: BotResult[] };
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

export interface BotResult {
  key: string;
  name: string;
  image: string;
  desc: string[];
  step: string;
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
