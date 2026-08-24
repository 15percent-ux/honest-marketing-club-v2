# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

**Honest Marketing Club (HMC) v2** — a single-page marketing/landing site for a
Japanese invite-only marketing community. It is a **content-heavy React SPA**, not
an application: nearly all "logic" is presentational (scroll animation, view
switching, modals). Copy is in Japanese; code identifiers and comments are mixed
Japanese/English.

Originally scaffolded by Google AI Studio (see `README.md`, `metadata.json`),
which explains several of the quirks documented under [Gotchas](#gotchas).

**Stack:** React 19 · TypeScript 5.8 · Vite 6 · Tailwind (CDN) · GSAP ScrollTrigger ·
framer-motion · `@google/genai`

## Commands

```bash
npm install --legacy-peer-deps   # REQUIRED — plain `npm install` fails (see Gotchas)
npm run dev                      # Vite dev server on 0.0.0.0:3000
npm run build                    # production build → dist/
npm run preview                  # serve the built output
npx tsc --noEmit                 # typecheck (no npm script exists for this)
```

There is **no test suite, no linter, and no formatter** in this repo. Before
claiming a change is good, run `npx tsc --noEmit` and `npm run build` — that is
the full verification surface available.

`.env.local` (gitignored) holds `GEMINI_API_KEY`. It is optional: everything
except the unused `AIEngine` component renders fine without it.

## Layout

```
index.html          # Tailwind CDN config, fonts, global CSS, esm.sh importmap, SEO/OG tags
index.tsx           # createRoot → <App />
App.tsx             # view state machine + hash routing + one inline "community pass" section
types.ts            # Project, Message, AIStatus — only partially used
metadata.json       # AI Studio app manifest (not consumed at runtime)
components/         # 34 .tsx files, one component each, default-exported
data/reviews.tsx    # REVIEWS: single source of truth for member testimonials (JSX-in-data)
services/gemini.ts  # getGeminiInspiration() — the only external API call
```

### Routing

There is **no router library**. `App.tsx` holds a `view` union:

```ts
'home' | 'stories' | 'ai-review' | 'journal' | 'legal' | 'self-produce' | 'story'
```

Two navigation mechanisms coexist and must stay in sync:

1. **View switching** — `setView(...)` swaps the `<main>` subtree. `Navbar` and
   `Footer` both receive `onViewChange` + `currentView` props.
2. **Hash routing** — a `hashchange` effect in `App.tsx` maps `#stories`,
   `#ai-review`, `#journal`, `#legal`, `#self-produce`, `#story` to views; any
   *other* hash is treated as a section on the home page, switching to `'home'`
   first if needed, then `scrollIntoView`. Cross-view scrolls use a `setTimeout(…, 100)`
   to wait for the render — that delay is load-bearing, don't remove it.

**Adding a page:** add the literal to the `view` union in `App.tsx`, `Navbar.tsx`
*and* `Footer.tsx` (all three declare it independently — there is no shared type),
add an entry to the `viewMap` in `App.tsx`, add the render branch, and add a
`navItems` entry with `isPage: true`.

### Home page section order

Rendered by `App.tsx` in this order — anchor `id`s are what hash links target:

`Hero` → `Letter` (`#letter`) → `Vision` → `MemberReview` (`#reviews`) →
`TableOfContents` → inline community-pass CTA → `LineNavigator` →
`Curriculum` (`#work`) → `HWD` (`#hwd`) → `Provision` (`#provision`) →
`RichProfile` (`#rich-profile`) → `IdealMembers` (`#ideal-members`) →
`PricingSection` (`#price`) → `FAQ` (`#faq`) → `Consultation` (`#consultation`)

`Navbar`, `Footer` and `EligibilityModal` render outside the view switch on every page.

### Unused components

These are dead code — not imported anywhere. Do not assume they are live, and do
not "fix" them unless asked:

`AIEngine` (the only consumer of `services/gemini.ts`), `AuthGate`, `ExampleUsage`,
`InteractiveIntro`, `Projects`, `ValueProposition`, and the three splash screens
`AmazakeCampSplash`, `HmcSplash`, `NewYearSplash`.

`@emailjs/browser` is likewise a dependency with zero imports.

## Conventions

**Component shape** — every file follows the same template:

```tsx
import React, { useState, useEffect } from 'react';

interface FooProps {           // omit entirely if the component takes no props
  onBack: () => void;
}

const Foo: React.FC<FooProps> = ({ onBack }) => { ... };

export default Foo;            // always a default export
```

**Content lives inside components.** Section copy, image URLs, pricing tiers and
card data are declared as local `const items = [...]` arrays at the top of each
component body, *not* in a data layer. The one exception is `data/reviews.tsx`,
which centralizes testimonials because `MemberReview` and `SuccessStories` both
consume them — edit copy there, never in the two consumers. Note it is `.tsx`, not
`.ts`, because review fields hold JSX (`React.ReactNode`) for inline styling.

**Styling is Tailwind utility classes only**, loaded from the CDN in `index.html`.
There is no CSS file and no PostCSS/Tailwind build step.
- The theme (`brand.black/white/gold/goldLight/gray`, the four font families) is
  configured in the inline `window.tailwind.config` block in `index.html`. Add
  design tokens there, not in a config file.
- Arbitrary values are used freely and heavily: `bg-[#0a0a0a]`, `tracking-[0.4em]`,
  `text-[10px]`. Two different golds are in circulation: the `brand-gold` token
  (`#c5a059`, the default, ~270 uses) and a hardcoded `#AF9662` used in the dark
  CTA sections (~25 uses). Match whatever the surrounding section already uses
  rather than normalizing them.
- Per-component `@keyframes` go in an inline `<style>{`…`}</style>` block at the
  bottom of the component's JSX (see `App.tsx`, `Hero.tsx`).
- Japanese typography relies on `[word-break:keep-all]`, `font-balanced`
  (Noto Sans JP) and explicit `<br />` for line breaks. Several past commits are
  purely about fixing wrapping — be careful when editing text in styled headings.
- `html, body { overflow-x: hidden }` in `index.html` guards against mobile
  horizontal scroll; wide/animated sections carry `overflow-hidden` for the same
  reason. Keep it when refactoring a section.

**Animation** — two libraries, used in different places:
- **GSAP + ScrollTrigger** for scroll-driven reveals. The pattern is always
  `gsap.registerPlugin(ScrollTrigger)` at module scope, a `useRef` on the section,
  and `gsap.context(...)` inside `useEffect` with `ctx.revert()` in the cleanup.
  Used by `Hero`, `Vision`, `Curriculum`, `MemberReview`, `TableOfContents`,
  `Journal`, `Story`.
- **framer-motion** only in `FAQ.tsx` (accordion). Don't spread it further without
  reason — see the peer-dep note below.

**Scroll handling** — components register their own `window.addEventListener('scroll', …)`
with matching cleanup; `Navbar` uses an 80px offset constant when scrolling to
anchors. `Navbar` also locks `document.body.style.overflow` while the mobile menu
is open.

**Assets** are remote, never in the repo: all images are Cloudinary URLs under
`res.cloudinary.com/dxr2aeoze/`. There is no `public/` directory.

## External integrations

| Integration | Where | Notes |
|---|---|---|
| **LINE** | `EligibilityModal`, `Consultation`, `SelfProduce`, `Story` | The same group-chat URL is hardcoded as a `LINE_CHAT_URL` const in four files. Changing it means changing all four. |
| **Stripe** | `PricingSection` | Four hardcoded `buy.stripe.com` payment links. `index.html` also loads `pricing-table.js`. No server side. |
| **Gemini** | `services/gemini.ts` | `gemini-3-flash-preview`, system instruction sets the "Lead Strategist" persona, ≤80 words. Only called by the unused `AIEngine`. |

## Gotchas

- **`npm install` fails outright.** `framer-motion@11.0.8` declares a React 18 peer
  and the project is on React 19 → `ERESOLVE`. Always use `--legacy-peer-deps`.
  No lockfile is committed.
- **The API key is compiled into the client bundle.** `vite.config.ts` `define`s
  both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` from `GEMINI_API_KEY`,
  which inlines the literal into the JS shipped to browsers. Treat any key used
  here as public; never put a secret with real spend or scope behind it.
- **`index.html` carries a dead `importmap`** pointing react/react-dom/gsap/
  framer-motion/`@google/genai` at `esm.sh`, plus a `window.process = { env: … }`
  shim. These are AI Studio's buildless-runtime leftovers. Vite resolves bare
  specifiers from `node_modules` at build time, so the importmap has no effect on
  `npm run dev` or `npm run build` — but it *does* get copied verbatim into
  `dist/index.html`. Its versions have already drifted from `package.json`
  (react 19.0.0 vs ^19.2.3, gsap 3.12.5 vs ^3.14.2). Don't rely on it; if you
  touch dependency versions, either update it too or leave it alone deliberately.
- **`@` aliases the repo root** (`vite.config.ts` + `tsconfig.json`), but every
  existing import uses relative paths. Follow the existing style.
- **`allowImportingTsExtensions` is on** yet imports omit extensions
  (`./components/Hero`, not `./components/Hero.tsx`). `index.tsx` has a comment
  explaining this was a deliberate fix — keep extensions off.
- **The bundle is ~624 kB** (one chunk, no code splitting) and Vite warns on every
  build. That warning is expected, not a regression you introduced.
- Pages whose hash has no matching DOM `id` (`journal`, `legal`, `story`) fall back
  to `window.scrollTo(0, 0)` in the hash handler. That's intentional, not a bug.
- **Hardcoded dates in copy go stale.** e.g. the application-deadline string in the
  `App.tsx` community-pass section. Don't silently "correct" them; they're content
  the owner controls.

## Git workflow

- Default branch is `main`. Work on feature branches; push with
  `git push -u origin <branch>`.
- Commit messages follow Conventional Commits with occasional scopes:
  `feat: …`, `fix: …`, `refactor: …`, `feat(SuccessStories): …`.
- `dist/`, `node_modules/`, `*.local` are gitignored. No lockfile is tracked —
  don't add one incidentally.
- Do not open a pull request unless explicitly asked.
