/**
 * 画像づくり用：Phosphor のアイコンを SVG の文字列にする（LPと同じアイコンを使う）。
 *   const svg = await iconSvg('gift', 240, '#2E5E4E', 'light');
 */
const NAMES = {
  book: 'BookOpen',
  calendar: 'CalendarCheck',
  chat: 'ChatCircleText',
  check: 'Check',
  compass: 'Compass',
  gift: 'Gift',
  pen: 'PencilLine',
  question: 'Question',
  robot: 'Robot',
  sprout: 'Plant',
  plant: 'Plant',
  shop: 'Storefront',
  scissors: 'Scissors',
  food: 'ForkKnife',
  phone: 'DeviceMobile',
  sparkle: 'Sparkle',
  user: 'UserCircle',
};

let mod;
async function iconSvg(name, size, color, weight = 'light') {
  if (!mod) {
    const [R, S, P] = await Promise.all([import('react'), import('react-dom/server'), import('@phosphor-icons/react/ssr')]);
    mod = { R: R.default || R, S: S.default || S, P };
  }
  const base = NAMES[name] || name;
  const C = mod.P[`${base}Icon`] || mod.P[base];
  if (!C) throw new Error(`icon not found: ${name}`);
  return mod.S.renderToStaticMarkup(mod.R.createElement(C, { size, color, weight }));
}

module.exports = { iconSvg };
