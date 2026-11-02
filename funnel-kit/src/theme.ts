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
    'https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap',
};

const calm: Preset = {
  // 繊細さん向け：煽らない・静か・やわらかい
  tokens: {
    'c-bg': '#FBF8F4',
    'c-surface': '#FFFFFF',
    'c-ink': '#3B3A36',
    'c-muted': '#8A857C',
    'c-border': '#E8E2D8',
    'c-primary': '#C47F75',
    'c-primary-soft': '#F4E3DF',
    'c-accent': '#A85E55',
    'c-cta': '#5C7A6B',
    'c-cta-shadow': '#3E5449',
    'c-navy': '#34424F',
    'c-teal': '#6E9C94',
    'c-teal-soft': '#E3EFEC',
    'c-mustard': '#C9A55C',
    'c-highlight': '#F6E7A8',
    'c-step': '#5C7A6B',
    'c-answer': '#C47F75',
    'c-form': '#A3897A',
    'c-form-soft': '#F7F2EC',
    'c-form-off': '#D9CEC4',
    'c-line': '#06C755',
    'c-cream': '#FBF6EA',
    'c-survey-bg': '#EFE6DC',
    'g-aurora': 'linear-gradient(135deg,#E6F0EA 0%,#F7ECE5 52%,#ECEAF5 100%)',
    'g-hero': 'linear-gradient(160deg,#F6ECE6 0%,#FBF6EA 50%,#E7F0EC 100%)',
    'f-head': '"Zen Maru Gothic", "Zen Kaku Gothic New", sans-serif',
    'f-pop': '"Zen Maru Gothic", "Zen Kaku Gothic New", sans-serif',
    'f-body': '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
  },
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap',
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
    'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Maru+Gothic:wght@700;900&display=swap',
};

export const presets: Record<ThemePresetName, Preset> = { pop, calm, natural };

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
