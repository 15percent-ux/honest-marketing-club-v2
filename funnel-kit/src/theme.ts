import type { BrandConfig, ThemePresetName, ThemeToken } from './types';

type Preset = { tokens: Record<ThemeToken, string>; fontsHref: string };

const pop: Preset = {
  // 元LP（ポップ・ピンク）に近いプリセット
  tokens: {
    'c-bg': '#FFFFFF',
    'c-surface': '#FFFFFF',
    'c-ink': '#3A3F4B',
    'c-muted': '#7A8090',
    'c-border': '#E6E8EE',
    'c-primary': '#EF5A86',
    'c-primary-soft': '#FCE3EB',
    'c-accent': '#E5307A',
    'c-cta': '#C5282C',
    'c-cta-shadow': '#8F1C1F',
    'c-navy': '#3D4B5F',
    'c-teal': '#2A9FA6',
    'c-teal-soft': '#D5F1F2',
    'c-mustard': '#E7B93E',
    'c-highlight': '#FFF04A',
    'c-step': '#2F62D6',
    'c-answer': '#F07A2B',
    'c-form': '#D07A88',
    'c-form-soft': '#FBEFF2',
    'c-form-off': '#E8B5BE',
    'c-line': '#06C755',
    'c-cream': '#FFFBEA',
    'c-survey-bg': '#F8CDD8',
    'g-aurora': 'linear-gradient(135deg,#BDEFEA 0%,#F6D5EE 52%,#D8E3FF 100%)',
    'g-hero': 'linear-gradient(160deg,#FFE3EE 0%,#FFF7C2 45%,#C9F0FF 100%)',
    'f-head': '"Zen Maru Gothic", "Noto Sans JP", sans-serif',
    'f-pop': '"Mochiy Pop One", "Zen Maru Gothic", sans-serif',
    'f-body': '"Noto Sans JP", sans-serif',
  },
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@500;600;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap',
};

const calm: Preset = {
  // 落ち着いた森のトーン：生成りではなく少し青みのある白＋深い緑ひとつだけをアクセントに
  tokens: {
    'c-bg': '#F4F5F1',
    'c-surface': '#FFFFFF',
    'c-ink': '#1F2A24',
    'c-muted': '#5E6A63',
    'c-border': '#E1E5DF',
    'c-primary': '#2E5E4E',
    'c-primary-soft': '#E5EEE9',
    'c-accent': '#2E5E4E',
    'c-cta': '#2E5E4E',
    'c-cta-shadow': '#1F4436',
    'c-navy': '#1F2A24',
    'c-teal': '#2E5E4E',
    'c-teal-soft': '#E5EEE9',
    'c-mustard': '#B08D3C',
    'c-highlight': '#DCEBD9',
    'c-step': '#2E5E4E',
    'c-answer': '#2E5E4E',
    'c-form': '#2E5E4E',
    'c-form-soft': '#F4F5F1',
    'c-form-off': '#B8C6BE',
    'c-line': '#06C755',
    'c-cream': '#F4F5F1',
    'c-survey-bg': '#F4F5F1',
    'g-aurora': '#F4F5F1',
    'g-hero': '#F4F5F1',
    'f-head': '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
    'f-pop': '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
    'f-body': '"Noto Sans JP", sans-serif',
  },
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap',
};

const natural: Preset = {
  // サロン・食・暮らし系：生成り＋テラコッタ＋オリーブ
  tokens: {
    'c-bg': '#FFFDF8',
    'c-surface': '#FFFFFF',
    'c-ink': '#3E3A32',
    'c-muted': '#857D70',
    'c-border': '#ECE4D6',
    'c-primary': '#D0825A',
    'c-primary-soft': '#F8E6DA',
    'c-accent': '#B5643C',
    'c-cta': '#6B8E4E',
    'c-cta-shadow': '#4A6436',
    'c-navy': '#44533F',
    'c-teal': '#7FA584',
    'c-teal-soft': '#E6F0E3',
    'c-mustard': '#E0AE4E',
    'c-highlight': '#FCEFB4',
    'c-step': '#6B8E4E',
    'c-answer': '#D0825A',
    'c-form': '#B08968',
    'c-form-soft': '#F8F2E9',
    'c-form-off': '#DCCDBB',
    'c-line': '#06C755',
    'c-cream': '#FBF5E6',
    'c-survey-bg': '#F1E7D6',
    'g-aurora': 'linear-gradient(135deg,#EAF2E2 0%,#FBEFE3 52%,#F3EEDF 100%)',
    'g-hero': 'linear-gradient(160deg,#FBEFE3 0%,#FFFBEF 50%,#EAF2E2 100%)',
    'f-head': '"Shippori Mincho", "Zen Old Mincho", serif',
    'f-pop': '"Zen Maru Gothic", sans-serif',
    'f-body': '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
  },
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Shippori+Mincho:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Maru+Gothic:wght@700;900&display=swap',
};

const premium: Preset = {
  // 紺と深い青緑・明朝体。すりガラスのカードを重ねる（shell と組み合わせる）
  tokens: {
    'c-bg': '#F4F6F8',
    'c-surface': '#FFFFFF',
    'c-ink': '#13213A',
    'c-muted': '#52606D',
    'c-border': '#E1E7EC',
    'c-primary': '#177363',
    'c-primary-soft': '#EEF8F5',
    'c-accent': '#177363',
    'c-cta': '#06C755',
    'c-cta-shadow': '#04913E',
    'c-navy': '#13213A',
    'c-teal': '#177363',
    'c-teal-soft': '#EEF8F5',
    'c-mustard': '#B08D3C',
    'c-highlight': '#DDF1EB',
    'c-step': '#177363',
    'c-answer': '#177363',
    'c-form': '#177363',
    'c-form-soft': '#F4F7F8',
    'c-form-off': '#B9CBC6',
    'c-line': '#06C755',
    'c-cream': '#F8F9FA',
    'c-survey-bg': 'transparent',
    'g-aurora': '#F8F9FA',
    'g-hero': '#F8F9FA',
    'f-head': '"Noto Serif JP", Georgia, serif',
    'f-pop': '"Noto Serif JP", Georgia, serif',
    'f-body': '"Noto Serif JP", Georgia, serif',
  },
  fontsHref: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&display=swap',
};

export const presets: Record<ThemePresetName, Preset> = { pop, calm, natural, premium };

export function applyTheme(theme: BrandConfig['theme']) {
  const preset = presets[theme.preset];
  const tokens = { ...preset.tokens, ...theme.overrides };
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(`--${k}`, v);
  root.dataset.preset = theme.preset;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = preset.fontsHref;
  document.head.appendChild(link);
}
