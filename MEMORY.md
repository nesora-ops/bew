# Project Memory

## Current Status

Status:
- **Redesign (Session 2, 2026-10-13) is merged to `main` and pushed live** (fast-forward, pushed
  as nesora-ops on 2026-10-13). Vercel deploys `main` to production. 30 routes prerender.
- What works: every page renders in the new system (off-white and dark green, Outfit display
  type, glass pill header, site-wide leaf shadows, dotted SVG globe hero); no horizontal overflow
  at 375 / 768 / 1280 / 1440 on all 26 pages; no console output; lint and typecheck clean;
  Lighthouse accessibility, best practices and SEO all 100 on `/`.
- What is open: Lighthouse mobile performance on `/` is 84–88 against a 91–92 baseline (LCP
  about 3.0 s). See Known Issues.

## Current Architecture

- **Framework:** Next.js 16.3.4 (App Router, Turbopack)
- **Frontend:** React 19.2.8, TypeScript 5
- **Backend/API:** none. The website makes **no** backend calls (see Architecture Decisions).
- **Database:** none in this repo.
- **Authentication:** none.
- **Styling:** Tailwind CSS v4 with CSS-variable design tokens in `app/globals.css` (`@theme`).
  Light mode only. Motion is CSS only (keyframes plus scroll-driven animations behind
  `@supports`); there is no motion library.
- **Fonts:** Outfit (display), Geist (body and UI) and Geist Mono (labels, placeholders), all via
  `next/font/google`. Geist Mono is not preloaded.
- **Icons:** `lucide-react` (only runtime dependency added beyond the Next scaffold).
- **Deployment:** Vercel, linked to `nesora-ops/bew`. Pushes to `main` deploy to production
  (https://bew-rho.vercel.app). No custom domain yet.

## Current Routes

- `/` — homepage, 11 sections
- `/about`
- `/organizations`
- `/assessors-partners`
- `/partners`
- `/certifications` — hub
- `/certifications/[slug]` — 7 prerendered pathways
- `/case-studies`, `/case-studies/[slug]` — 1 study
- `/faq`
- `/insights`, `/insights/[slug]` — 3 placeholder articles
- `/contact`
- `/legal/terms`, `/legal/privacy`, `/legal/cookies`, `/legal/accessibility` — placeholder stubs
- `/sitemap.xml`, `/robots.txt`, `/icon.svg`, 404

## Current Features

- Reusable component library (`components/`): Container, Section, SectionHeading, Eyebrow, Button,
  Card, FeatureCard, LinkCard, IconTile, PageHero, CertificationCard/Grid, ComparisonTable,
  FaqAccordion, CtaSection, Breadcrumbs, Stat, Testimonial, CaseStudyCard, InsightCard, PartnerCard,
  JourneyTimeline, BulletList, LegalStub, PlaceholderText, Header, MobileNav, Footer, Logo.
- **One** certification template serves all seven pathways.
- All structured content is data in `content/`, read through accessors in `content/index.ts`.
- `<PlaceholderText>` renders bracketed source tokens as visible, greppable `[data-placeholder]`
  spans so unresolved business facts cannot silently harden into fabricated copy.
- SEO: per-route metadata, canonicals, OpenGraph, sitemap, robots, semantic heading hierarchy.
- FAQ accordion is native `<details>/<summary>` — zero JS, accessible, crawlable.
- `MobileNav` is the only client component. It locks scroll, makes `main` and the footer inert
  while open, moves focus into the sheet and returns it to the toggle on Escape.
- Home hero (`components/home/HomeHero.tsx`): decorative "Better Earth" wordmark (the LCP
  element), the dotted SVG globe (`components/ui/globe.tsx`) with three decorative pulse markers,
  the source headline as h1, and a glass card. Then `components/home/Statement.tsx`, the source's
  Outcome line, animated by CSS scroll timelines.
- Site-wide leaf shadows (`components/ambient/LeafShadows.tsx`), rendered once in the root layout.
- `PageHero` takes optional `breadcrumbs`; the three detail pages use it.

## Architecture Decisions

1. **No admin/CMS and no backend calls in this pass.** Decided with the user: the admin is being
   built on the backend and wired in later. To keep that wiring cheap, pages never import data
   modules directly — they go through `content/index.ts` accessors (`getCertifications()`,
   `getFaqs()`, …). When the API lands, those functions become async fetches and pages stay
   largely untouched.
2. **Content is data, not markup** (PROMPT.md §19/§22). The source document's own consolidation
   note warns about repetition across Homepage / Hub / Organizations; sharing `content/` modules
   is how that is avoided.
3. **Fonts: Outfit for display, Geist for body and UI, Geist Mono for labels and placeholders.**
   All OFL Google Fonts, self-hosted by next/font. Nothing is taken from any reference site.
4. **Light mode only, one palette.**
5. **No component library.** shadcn/Radix would be weight this site does not need.

## Design Decisions

The glaido-era decisions (Session 1) were superseded on 2026-10-13; they live in commit
`f2e901e`.

Current system (Session 2), the feel of the "Qelora" reference with nothing copied from it.
Rules are in CLAUDE.md "Design rules"; the plan and its reasoning are in
`plans/redesign-plan.md`.

| Token | Value | Use |
|---|---|---|
| canvas | `#f4f4f0` | off-white page |
| surface | `#fbfbf9` | cards, pills |
| glass | `rgb(251 251 249 / .72)` | floating pills and hero card (with backdrop blur) |
| ink | `#121512` | body headings |
| ink-subdued | `#4a5048` | muted text (7.52:1 on canvas) |
| line | `rgb(18 21 18 / .12)` | hairlines |
| accent | `#1d5a3a` | deep green: hero, statement, CTAs, accents (7.39:1) |
| accent-strong | `#133f28` | hover, stronger green text |
| accent-soft / -strong | `#e3f0e7` / `#cbe5d4` | tints, placeholders, selection |
| holo / holo-deep | `#2ee59d` / `#12a66b` | decorative only, never text |
| radius-btn / radius-card | 9999px / 20px | pills / cards |

Structure: whitespace between sections (no rules), 80rem container, transparent sticky header
with glass pills (pill row from `xl`, menu sheet below), mono uppercase eyebrows, Outfit display
headlines with the accent second line, flat bordered cards, rounded CTA panel, site-wide leaf
shadows. Every text pair passes WCAG AA, including the darkest leaf-shadow overlap.

**The greens are a proposal, not BEW brand** (no BEW palette exists). They are `@theme`
variables, so swapping them is a token change.

## Known Issues

- **The logo is a PLACEHOLDER** (`components/brand/Logo.tsx`, `app/icon.svg`). No BEW logo,
  wordmark, favicon or brand palette exists in the project. Do not treat it as approved brand.
- `Button` hard-codes `inline-flex`, so passing `hidden` via `className` will not hide it —
  the class order fight is won by the base. Wrap it in a `<span className="hidden sm:block">`
  instead. This already bit the header CTA once.
- Footer omits three links the source lists — **Careers, Press & Media, Impact Reports**. They
  have no route in PROMPT.md §6 and no source copy, so they were held back rather than shipped
  as dead links.
- The "Find Your Fit" quiz, sample-questionnaire PDFs and partner directory have no destination.
  Buttons pointing at bracketed placeholders render as disabled-looking spans rather than links
  that go nowhere.
- No contact form is implemented — the source supplies no fields and there is no endpoint.
- `next-env.d.ts` is gitignored by the Next scaffold's own `.gitignore`.
- **Lighthouse mobile performance on `/` is 84–88, against a 91–92 baseline** (accessibility,
  best practices and SEO are 100; CLS 0; TBT is back to the baseline's ~280 ms). The gap is LCP
  (about 3.0 s against 2.6 s): Lighthouse's simulation counts every early download, and the new
  display font (Outfit, 32 KB) plus a larger HTML document add about 46 KB. Options, not yet
  chosen by the user: set Geist Mono aside for a system monospace stack (-23 KB), or use Outfit
  for body text too and drop Geist (-29 KB). Scores on this machine swing about 10 points with
  load, so compare runs made back to back.
- Found while planning, not fixed: some pages import data modules directly (`@/content/journey`,
  `@/content/partners`, `@/content/site`) despite the accessors-only rule; several section
  headings are not in the source doc (for example "Credibility is the product."); the
  `/certifications` "Credible" card drops the source's hedge on a recognition claim.

## Outstanding content — must be resolved before publication

From the source document's own Master Placeholder & Launch Checklist:
hero statistic; 8–10 certified organization logos; three detailed case studies; impact metrics;
3–5 blog articles with dates and preview text; advisory board names; contact email confirmation,
phone, office hours; Calendly link; social handles; certification pricing by type and org size;
assessor fees; channel-partner revenue share; certification-specific timelines; Ketaki's biography;
accreditation/affiliation claims; CTA destinations; case-study company names; final impact figures.

And its ten flagged **source inconsistencies**: certification timeline; certification validity;
assessor training duration; independence vs partner referral fees; accreditation claims;
investor/regulatory claims; the Organisation of Choice™ relationship; pricing; contact details;
case studies and impact figures. These are surfaced in the UI (certification `note` fields, the
independence callout on `/assessors-partners`) rather than silently resolved.

## Pending Work

- [ ] Manual visual review of every page by a human
- [ ] Replace the placeholder logo and confirm the brand palette
- [ ] Supply the outstanding content above
- [ ] Wire the content accessors to the backend API once the admin exists
- [ ] Contact / assessor / partner application forms (need endpoints)
- [ ] Find Your Fit quiz
- [ ] Legal copy for the four `/legal/*` stubs
- [ ] Decide production domain (currently `https://betterearthworkplace.com` in `content/site.ts`)
- [ ] Custom production domain on Vercel (currently `bew-rho.vercel.app`)
- [ ] User testing of the redesign on localhost, then push `redesign/hologram-globe` as nesora-ops
- [ ] Decide on the font trade-off for Lighthouse performance (see Known Issues)
- [ ] Decide whether the `/certifications` stats row should go too (the home page's impact
      metrics block was removed at the user's request)

---

# Execution Log

## 2026-09-10 — Session 1

### Objective
Scaffold the Next.js project and build the base version of the BEW website, styled from
glaido.com (light mode), then push to `github.com/nesora-ops/bew`.

### Work Completed
- Scaffolded Next.js 16.3.4 + React 19 + Tailwind v4 + TypeScript (created in a temp directory and
  moved in, because `create-next-app` refuses a non-empty directory).
- Extracted the reference site's real design tokens from its live stylesheet and ported them into
  a Tailwind v4 `@theme` block.
- Built the content layer (`content/`), the component library (`components/`) and all 30 routes.
- Placeholder logo + favicon.
- QA: build, typecheck, lint, link crawl, responsive overflow and console-error sweep.

### Files Changed
Created `content/` (8 modules), `components/` (14 files), `app/` (20 route files plus
`globals.css`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `icon.svg`, `not-found.tsx`).
Rewrote `CLAUDE.md` (restored after the scaffold overwrote it — see Issues) and this file.

### Testing
- `npm run build` — clean; 30 routes, all 7 certification slugs prerendered
- `npx tsc --noEmit` — clean
- `npm run lint` — clean
- Link crawl over 17 pages, 30 distinct internal targets — no broken links
- Puppeteer sweep at 375 / 768 / 1280 — no horizontal overflow, no console errors
- Route status check — all 200, unknown route 404s

### Issues
- The scaffold's own `CLAUDE.md` (an `@AGENTS.md` pointer) overwrote the project `CLAUDE.md`
  during the file move. Restored from the original and extended with project rules; the
  `@AGENTS.md` reference was kept.
- Three real responsive bugs found and fixed during QA:
  1. `[data-placeholder] { white-space: nowrap }` forced overflow on long placeholder sentences.
  2. Header was 8px too wide at 375px — container padding reduced to `px-4` on mobile, logo made
     shrinkable, right cluster `shrink-0`.
  3. The header CTA was visible at 375px because `Button`'s baked-in `inline-flex` beat the
     `hidden` utility. Fixed with a wrapper span.
- Button rows could overflow at 768px — now `sm:flex-wrap`.

### Git

Repository initialised on `main`. Identity set **repository-local only** — the global config was
left untouched (it is a different developer account):

```
git config user.name  "nesora-ops"
git config user.email "ops@nesora.co.in"
```

Remote: `https://github.com/nesora-ops/bew.git` — **public**, by the user's explicit decision.
Pushed as the `nesora-ops` GitHub account. All seven commits are authored
`nesora-ops <ops@nesora.co.in>`.

| Commit | Message |
|---|---|
| `250ebc0` | chore: scaffold Next.js 16 app with Tailwind v4 and TypeScript |
| `376ee69` | docs: add project instructions, memory and source content document |
| `972f33a` | feat: add typed BEW content layer |
| `f2e901e` | feat: add design tokens, layout primitives and placeholder brand |
| `3c766f2` | feat: build homepage and certification system |
| `577a75e` | feat: add remaining site pages |
| `d517002` | feat: add SEO metadata, sitemap, robots and 404 |

Note: git reports `LF will be replaced by CRLF` warnings on this Windows checkout. Harmless, but
a `.gitattributes` pinning `* text=auto eol=lf` would silence them and keep line endings stable
if anyone works on this from macOS or Linux.

### Next Recommended Step
Human visual review of all pages, then supply brand assets and the outstanding content above.
Do not wire the backend until the admin exists on the backend side.

## 2026-10-13 — Session 2

### Objective
Plan and build a premium redesign (the feel of the "Qelora" screen recording, with a green
globe from the "Nexova" 404 idea) and remove every em dash from user-visible copy and the
source document. Plan: `plans/redesign-plan.md` (approved, with the user's decisions in §11).

### Work Completed
- Copy: 29 user-visible em dashes and 40 in the source doc rewritten by structure (colon for
  label pairs, commas for parenthetical pairs, full stops or commas for joined thoughts,
  parentheses for doc notes, attribution lines in the doc, pipe in page titles). Placeholder
  token counts verified identical; en dashes (numeric ranges) kept.
- Design system: new `@theme` tokens (names kept so every route inherited), Outfit display face,
  pill radii, `--ease-calm`, `--spacing-header`, glass utility, `data-scroll-behavior` for
  Next 16.
- Components: glass pill header, accessible mobile sheet, editorial `PageHero` with breadcrumbs,
  whitespace section rhythm, round icon tiles, rounded CTA panel, editorial testimonial, FAQ
  toggles, calmer footer, recoloured placeholder favicon.
- Site-wide dappled leaf shadows (the user asked for them everywhere, sharper, in the leaf green).
- Home: "Better Earth" wordmark and statement in the dark green; dotted SVG globe below the
  wordmark (the user's requested component, adapted: no shadcn/Radix, no invented tooltip data);
  statement = the source's Outcome line with the subheading as caption; impact metrics block
  removed at the user's request.
- 404 restyled with the same globe as a horizon.
- A custom WebGL hologram globe was built first (commits `60fa7e8`, `34dfe6a`), then replaced by
  the SVG globe at the user's request. It also cost up to 1.6 s of blocking time in Lighthouse
  (synchronous shader compile on ANGLE), so it should not come back without parallel compile.

### Files Changed
`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/icon.svg`, the
three detail pages, nine copy-only pages, `components/` (ui primitives, layout, PageHero,
CtaSection, content-blocks, FaqAccordion, Logo, LegalStub), new `components/home/*`,
`components/ui/globe.tsx`, `components/ui/globe-utils/svg-globe-path.ts`,
`components/ambient/LeafShadows.tsx`, `scripts/build-globe-data.mjs`, `content/` (copy),
`BEW_Consolidated_Deduplicated.md`, `CLAUDE.md`, this file, `plans/redesign-plan.md`.

### Testing
- `npm run build` (30 routes), `npm run lint`, `npx tsc --noEmit`: clean.
- Overflow sweep, all 25 sitemap routes plus a 404 at 375 / 768 / 1280 / 1440: no overflow.
- Headless Chrome console sweep of the same 26 pages (with a positive control): no output.
- Header fits at exactly 1280 (1,201 of 1,216 px). Keyboard order and focus rings verified;
  mobile sheet focus, inert and Escape verified.
- LCP element is the wordmark text; CLS 0 through load and scroll.
- Lighthouse mobile on `/` (production build): accessibility 100 (baseline 96: fixed the `dl`
  markup in `Stat` and the logo link's label), best practices 100, SEO 100, performance 84–88
  (baseline 91–92). See Known Issues.
- Lighthouse 13 needs Node 22.19+; this machine has 22.14, so `npx lighthouse@12` was used.
- The land data came from `unpkg.com/world-atlas@2.0.2/land-110m.json` (approved download, not
  committed). Regenerate with `node scripts/build-globe-data.mjs <path>`.

### Git
Branch `redesign/hologram-globe` from `main`. Not pushed (the user tests on localhost first).
Local preview configs `bew-dev` (3300) and `bew-prod` (3301) were added to the OOC root
`.claude/launch.json`. `REDESIGN_PLAN_PROMPT.md` is untracked and was left out on purpose.

| Commit | Message |
|---|---|
| `b94579c` | content: replace em dashes with natural punctuation |
| `b683797` | style: new design tokens, typography and base components |
| `60fa7e8` | feat: hologram globe hero and scroll statement |
| `34dfe6a` | style: roll the new system out to all routes and the 404 |
| `c04bb9a` | feat: dotted SVG globe hero in the dark green |
| `d0703f3` | content: remove the home page impact metrics block |
| `597602f` | perf: flatten the leaf shadow layers to two paths each |

| `af4804b` | docs: update design rules and project memory |

Pushed 2026-10-13 as nesora-ops: `main` fast-forwarded to the redesign branch and pushed
(`56ae7c4..main`), the branch was pushed too. Vercel production deploys from `main`.

### Next Recommended Step
Check the production deploy at https://bew-rho.vercel.app. Decide the font trade-off for
Lighthouse mobile performance (84–88 vs the 91–92 baseline).
