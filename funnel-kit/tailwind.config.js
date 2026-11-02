/** 色はすべてCSS変数（src/theme.ts のプリセット）経由。ブランドごとに差し替わる */
const v = (name) => `var(--${name})`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('c-bg'),
        surface: v('c-surface'),
        ink: v('c-ink'),
        muted: v('c-muted'),
        line: v('c-border'),
        primary: v('c-primary'),
        'primary-soft': v('c-primary-soft'),
        accent: v('c-accent'),
        cta: v('c-cta'),
        'cta-shadow': v('c-cta-shadow'),
        navy: v('c-navy'),
        teal: v('c-teal'),
        'teal-soft': v('c-teal-soft'),
        mustard: v('c-mustard'),
        hl: v('c-highlight'),
        step: v('c-step'),
        answer: v('c-answer'),
        form: v('c-form'),
        'form-soft': v('c-form-soft'),
        'form-off': v('c-form-off'),
        lineg: v('c-line'),
        cream: v('c-cream'),
        survey: v('c-survey-bg'),
      },
      fontFamily: {
        head: v('f-head'),
        pop: v('f-pop'),
        body: v('f-body'),
        num: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { lp: '480px' },
    },
  },
  plugins: [],
};
