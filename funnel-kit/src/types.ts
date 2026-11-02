/**
 * ブランド設定の型。brands/<id>/config.ts はこの型に沿って書く。
 *
 * RichText（文字列）では次の装飾タグが使える（入れ子は不可）。改行は \n。
 *   [m]蛍光マーカー[/m]  [p]メイン色の太字[/p]  [a]アクセント色の太字[/a]  [b]太字[/b]
 *   [inv]濃色の反転ブロック[/inv]  [invp]メイン色の反転[/invp]  [invt]サブ色の反転[/invt]
 *   [hl]黄色地のブロック[/hl]  [dots]傍点[/dots]  [u]メイン色の下線[/u]
 */
export type RichText = string;

/** 画像。src が無い場合はラベル付きのプレースホルダーを表示する */
export interface ImgRef {
  src?: string;
  alt: string;
  /** プレースホルダーに表示する説明（例：「写真：PCを前に笑う受講生」） */
  label?: string;
}

/** キャラクター：画像か絵文字 */
export type CharRef = ImgRef | string;

export type ThemePresetName = 'pop' | 'calm' | 'natural';

export type ThemeToken =
  | 'c-bg' | 'c-surface' | 'c-ink' | 'c-muted' | 'c-border'
  | 'c-primary' | 'c-primary-soft' | 'c-accent' | 'c-cta' | 'c-cta-shadow'
  | 'c-navy' | 'c-teal' | 'c-teal-soft' | 'c-mustard' | 'c-highlight'
  | 'c-step' | 'c-answer' | 'c-form' | 'c-form-soft' | 'c-form-off'
  | 'c-line' | 'c-cream' | 'c-survey-bg'
  | 'g-aurora' | 'g-hero' | 'f-head' | 'f-pop' | 'f-body';

export interface BrandConfig {
  id: string;
  brand: {
    name: string;
    tagline?: string;
    /** 運営者（会社名または屋号） */
    operator: string;
    /** チャットフォームで話しかける人の名前とアイコン */
    staffName?: string;
    staffIcon?: CharRef;
    links: {
      privacy?: string;
      terms?: string;
      tokushoho?: string;
      contact?: string;
      company?: string;
    };
    sns?: { line?: string; instagram?: string; x?: string; youtube?: string };
  };
  theme: { preset: ThemePresetName; overrides?: Partial<Record<ThemeToken, string>> };
  offer: {
    /** 例：無料体験レッスン／無料個別相談 */
    name: string;
    /** 例：90分 */
    duration: string;
    /** 例：Zoom（スマホ参加OK） */
    format: string;
    /** 例：完全無料 */
    priceLabel: string;
  };
  /** 実在の締切があるときだけ設定する。過ぎるとカウントダウンと campaign 系セクションが自動で消える */
  campaign?: Campaign;
  survey: SurveyConfig;
  lp: { sections: LpSection[] };
  form: FormConfig;
  thanks: ThanksConfig;
  line: LineConfig;
  backend: BackendConfig;
  tracking?: { ga4Id?: string; metaPixelId?: string };
}

export interface Campaign {
  /** カウントダウンバーの文言（2行まで。\n で改行） */
  label: string;
  /** ISO 8601（例：2026-11-30T21:00:00+09:00） */
  deadline: string;
  /** all＝参加者全員に配布（推奨）／lottery＝抽選（景品表示法の確認が必須） */
  type: 'all' | 'lottery';
}

// ───────────────────────── アンケート ─────────────────────────

export interface SurveyConfig {
  /** false にするとアンケートを飛ばしてLPから始まる */
  enabled: boolean;
  hero: {
    image: ImgRef;
    /** 右側に縦に積むコピー。inverse＝濃色帯／box＝白箱／boxAccent＝白箱にメイン色の太字 */
    lines: { text: string; style: 'inverse' | 'box' | 'boxAccent' }[];
    tags?: string[];
  };
  /** 回答後にもらえるものの予告 */
  teaser?: { label: string; lines: string[]; items: { image: ImgRef; label: string }[] };
  questions: SurveyQuestion[];
  /** 設問の間に挟む動画。ended まで次の設問に進めない（読み込めない場合は fallbackSeconds 後に進める） */
  video?: { src: string; poster?: string; note: RichText; afterQuestion: number; fallbackSeconds?: number };
  submitLabel: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  options: string[];
  /** true：複数選択＋送信ボタン／false：1つ選ぶと自動で次へ */
  multiple?: boolean;
  character?: CharRef;
}

// ───────────────────────── LP セクション ─────────────────────────

export type Tone = 'primary' | 'teal' | 'mustard' | 'navy';

/**
 * LPのセクション。配列の順に表示される（並べ替え・削除は自由）。
 * campaignOnly: true のセクションは、campaign の締切が過ぎると自動で非表示になる。
 */
export type LpSection = LpSectionBody & { campaignOnly?: boolean; id?: string };

type LpSectionBody =
  | { type: 'thanksBand'; text: string; character?: CharRef }
  | {
      type: 'campaignHero';
      bubble: RichText;
      kicker?: string;
      headline: string[];
      groups?: { label: string; tone: 'dark' | 'accent' }[];
      items: { image: ImgRef; label: string; badge?: string }[];
      deadlineBand?: RichText;
      note?: { label: string; href: string };
    }
  | {
      type: 'invite';
      connector?: string;
      title: string;
      lead: RichText;
      icons: { icon: string; label: string }[];
      checks?: string[];
      checksSuffix?: string;
      illustration?: CharRef;
    }
  | { type: 'badges'; items: { title: string; icon: string; tone: Tone }[]; footnote?: string }
  | {
      type: 'cta';
      heading?: RichText;
      micro?: string;
      label: string;
      icon?: string;
      arrows?: boolean;
      connector?: RichText;
    }
  | {
      type: 'steps';
      kicker?: string;
      title: RichText;
      steps: { title: RichText; image?: ImgRef }[];
      finale?: { title: string; body: string };
    }
  | {
      type: 'futures';
      title: RichText[];
      items: { role: string; desc: string[]; images: ImgRef[]; tags?: string[]; points?: string[] }[];
      footnote?: string;
    }
  | {
      type: 'cases';
      title: RichText;
      items: { name: string; image: ImgRef; before: string[]; after: string[] }[];
      footnote?: string;
    }
  | {
      type: 'priceBenefit';
      kicker: string;
      label: RichText;
      big: string;
      bigPrefix?: string;
      bigSuffix?: string;
      footnote?: string;
      urgency?: RichText;
    }
  | {
      type: 'support';
      quote: string;
      quoteSub?: string;
      title: string;
      items: string[];
      conclusion: string;
      footnote?: string;
    }
  | {
      type: 'offerDetail';
      title: string;
      label: string;
      checks: RichText[];
      character?: CharRef;
      subLabel?: string;
      covers?: { image: ImgRef; label: string }[];
    }
  | {
      type: 'schedule';
      title: RichText;
      slots: { label: string; sub: string; times: string[]; image: ImgRef; tone: 'morning' | 'noon' | 'night' }[];
    }
  | {
      type: 'campaignDetail';
      kicker: string;
      title: string;
      groups: { label: string; deadline?: string; items: { image: ImgRef; name: string; note: string }[] }[];
      period: string;
      conditions: string[];
      howTo?: string[];
    }
  | { type: 'profile'; title: string; name: string; role: string; image: ImgRef; body: string[] }
  | { type: 'faq'; title: string; items: { q: string; a: string }[] }
  | { type: 'closing'; icon?: string; lines: RichText[]; box?: string; cta: string; micro?: string };

// ───────────────────────── フォーム ─────────────────────────

export type FormStepId =
  | 'greeting'
  | 'schedule'
  | 'intent'
  | 'name'
  | 'contact'
  | 'region'
  | 'birthdate'
  | 'message'
  | 'password';

export interface FormConfig {
  headerTitle: string;
  headerSub: string;
  speedLabel: string;
  /** 表示順。greeting は入力が無いので進捗の数に含めない */
  steps: FormStepId[];
  greeting: string;
  existingLink?: { label: string; href: string };
  /** 予約ステップの前に見せる実績。footnote が無ければ表示しない */
  proof?: { value: number; unit: string; caption: RichText; footnote: string };
  scheduleIntro: string[];
  schedule: {
    /** 何日先まで予約できるか */
    daysAhead: number;
    /** 直前の何時間前まで予約できるか */
    leadHours: number;
    /** 開催する曜日（0＝日〜6＝土） */
    weekdays: number[];
    /** 枠（"開始-終了"） */
    times: string[];
    closedDates?: string[];
  };
  intent?: { prompt: string; options: string[] };
  message?: { prompt: string; placeholder: string; required?: boolean };
  agreements: { text: string; links?: { label: string; href: string }[] }[];
  completeMessage: string;
}

// ───────────────────────── 完了・LINE・バックエンド ─────────────────────────

export interface ThanksConfig {
  title: string;
  lead: string;
  lineCard: { kicker: string; title: RichText; benefits: string[]; button: string; character?: CharRef };
  prep?: { title: string; steps: string[] };
}

export interface LineConfig {
  /**
   * A＝LINEログインで後から紐付け（完全再現。GASのコールバックが必要）
   * B＝友だち追加＋予約番号入りメッセージを送ってもらう（簡易・サーバー不要）
   * C＝LIFFで開いて最初からLINEのIDを取る（LINE内の流入専用）
   * none＝LINEを使わない
   */
  mode: 'A' | 'B' | 'C' | 'none';
  /** @から始まるベーシックID */
  oaId?: string;
  /** 友だち追加URL（https://lin.ee/...） */
  addFriendUrl?: string;
  liffId?: string;
  /** A：LINEログインのチャネルID */
  loginChannelId?: string;
  /** A：コールバックURL（GASのウェブアプリURL） */
  loginCallback?: string;
  /** B：送ってもらうメッセージ。{rid} が予約番号に置き換わる */
  messageTemplate?: string;
}

export type BackendConfig = { type: 'demo' } | { type: 'gas'; endpoint: string };

// ───────────────────────── 実行時データ ─────────────────────────

export interface Reservation {
  rid: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM-HH:MM
  intent?: string;
  lastName: string;
  firstName: string;
  email: string;
  tel: string;
  region?: string;
  birthdate?: string;
  message?: string;
  password?: string;
  survey?: Record<string, string[]>;
  utm?: Record<string, string>;
  lineUserId?: string;
}

export interface SlotAvailability {
  date: string;
  time: string;
  remaining: number;
}
