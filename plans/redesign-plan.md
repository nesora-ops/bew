# BEW website: premium redesign + copy clean-up (implementation plan)

Status: **approved 2026-10-13.** Implementation is on branch `redesign/hologram-globe`. Section 12 adds the architecture review findings that were folded in after approval.

---

## Context

The base BEW site (Session 1, 2026-09-10) was styled after glaido.com. Two changes are wanted now:

- **A. Copy clean-up.** Remove every em dash from user-visible copy and from the source doc. Each sentence is rewritten so it reads like a person wrote it. Meaning, claims and placeholders do not change.
- **B. Premium redesign.** The new look takes its feel from the "Qelora" recording: an off-white canvas, drifting leaf shadows, giant display type broken by an object, pill navigation, a floating CTA card and a scroll into a centred statement. The object becomes a **green holographic globe**, an idea taken from the "Nexova" 404. The other 29 routes inherit the look through shared components and tokens, not page-by-page styling.

What we end up with: a calm, editorial site that stays fully static and fast. The copy reads as human-written, and there are no new claims or numbers.

I watched both recordings frame by frame. One detail matters for the build: in Qelora, everything scrolls natively. The object only lags a little behind (a parallax), which is why the wordmark seems to slide up behind it. Nothing is pinned or hijacked, so we can recreate the effect without any scroll-jacking.

---

## 1. Findings

### 1.1 What exists and what can be reused

- **Styling runs on tokens.** Every colour comes from `@theme` token names (`canvas`, `surface`, `ink`, `ink-subdued`, `line`, `wash`, `accent`, `accent-soft`, `accent-soft-strong`), and every radius from `rounded-btn` or `rounded-card`. The accent token family appears 35 times across 15 files, definitions included. **If we keep the token names and change only their values, most of the restyle lands with no page edits.** For example, setting `--radius-btn: 9999px` turns every button and chip into a pill.
- **Shared components already cover nearly everything.** `PageHero` (10 index pages, plus the 4 legal pages through `LegalStub`), `Section`/`SectionHeading`/`Eyebrow`/`Container`, `Card`/`FeatureCard`/`LinkCard`/`IconTile`, `Button`, `CtaSection` (the foot of every page), `content-blocks.tsx`, `FaqAccordion`, `ComparisonTable`, `CertificationCard`, `LegalStub`, `Header`/`MobileNav`/`Footer` and `Logo`.
- **What does not inherit on its own:**
  - Three detail pages build their own hero section instead of using `PageHero`: `certifications/[slug]`, `case-studies/[slug]` and `insights/[slug]`. Fix: add an optional `breadcrumbs` prop to `PageHero` and switch the three pages over to it.
  - `app/not-found.tsx` is bespoke. It gets restyled on purpose.
  - 11 inline uppercase labels in pages (and 10 more in components) use `font-mono` directly. Labels stay in Geist Mono so these inherit.
- **Five tokens are defined but never used:** `ink-disabled`, `wash-strong`, `surface-muted`, `shadow-elevation`, `accent-hover`. They are part of the palette being replaced, so the new `@theme` block drops them.
- **Client components:** `MobileNav` is currently the only one. There is no `public/` folder yet.
- **The source doc suggests a globe itself.** §1 Hero says: "Visual direction: … an animated globe with certification badge" (line 23). Its note about a "semi-transparent dark gradient" applies to a photo hero, which we don't have.
- **Next 16 facts, checked in `node_modules/next/dist/docs`:**
  - `dynamic(..., {ssr:false})` is not allowed in Server Components, so it has to live in a `'use client'` file.
  - `next/image` `priority` is deprecated in favour of `preload`.
  - `title.template` applies only to child segments.
  - v16 no longer overrides `scroll-behavior` during navigation unless `<html data-scroll-behavior="smooth">` is set. Today `globals.css` sets `html{scroll-behavior:smooth}` without it, so route changes animate the scroll. The fix is part of this plan.
  - The default browsers are Chrome/Edge/Firefox 111+ and Safari 16.4+.
  - View transitions need no config, but wrappers would have to go in every `page.tsx`. **I'm not using them in this pass.**
  - The React Compiler is off.

### 1.2 Pre-existing problems found while reading (out of scope, flagged only)

1. **Pages import data modules directly**, against the CLAUDE.md "accessors only" rule:
   - `@/content/journey` in `app/page.tsx` and `app/organizations/page.tsx`
   - `@/content/partners` in three pages
   - `@/content/site` in `about`, `contact` and `organizations`
2. **Several headings on the site are not in the source doc**, for example "Credibility is the product.", "Five reasons organizations choose BEW certification over self-declaration.", "Chosen, not assigned", "Let's talk." and "Measured, then reported". None of them is used for the new statement.
3. **One hedge was dropped.** The `/certifications` "Credible" card leaves out the source's hedge. The source (line 989) says "The source positions BEW certification as institutional-grade verification recognized by investors, customers, and regulators". The site states it as fact. This is a recognition claim the source lists as unverified (inconsistencies #5 and #6). **Decision: only the punctuation changes.** The claim stays on the content checklist.
4. **`REDESIGN_PLAN_PROMPT.md` is untracked in the repo root.** It won't be committed unless you ask.

### 1.3 Rule conflicts and the replacement text I propose

**CLAUDE.md, "Design rules":**

1. **Reference rule.**
   - Current: "Reference: glaido.com in **light mode**. Tokens live in the `@theme` block in `app/globals.css`."
   - Proposed: "Reference: the 'Qelora' screen recording for feel (off-white canvas, leaf shadows, display type broken by an object, pill navigation, slow editorial motion) and the 'Nexova' 404 for the globe idea only. Take the feel, never the files: no assets, fonts, code or copy from either. Tokens live in the `@theme` block in `app/globals.css`."
2. **Light mode, gradients, shadows, motion.**
   - Current: "Light mode only. No gradients, no heavy shadows, minimal motion."
   - Proposed: "Light mode only. Gradients only as soft light (the globe aura and leaf shadows), never behind body text or on buttons and cards. Soft shadows only on floating elements (nav pills, hero card); grid cards stay flat. Motion is slow and purposeful: one easing curve, transform and opacity only, no scroll-jacking, and every animation has a reduced-motion fallback."
3. **Accent green.**
   - Current: "The accent green `#4f730c` is carried from the reference; no BEW brand palette exists yet."
   - Proposed: "The greens are a proposal, not BEW brand: deep green `#1D5A3A` (`accent`) and hologram green `#2EE59D` (`holo`, decorative only, never text). No BEW brand palette exists yet; the `@theme` tokens are the single swap point."
4. **Logo.**
   - Current: "The logo is a placeholder. Do not present it as final brand."
   - Proposed: keep it, and add "The hero 'Better Earth' wordmark is typeset in Outfit. It is not the logo, and it gets revisited when brand assets arrive."
5. **New content rule.** "No em dashes in user-visible copy or the source doc. Use a colon, comma, full stop, parentheses or a restructured sentence. En dashes are used only in numeric ranges (8–12 weeks)."
6. **New performance rule.** "The globe is client-only, lazy and never the LCP element. It pauses off-screen and when the tab is hidden, and shows a static poster for reduced motion, no WebGL and low-power devices."
7. **New precedence rule.** "These design rules supersede PROMPT.md §3 and §20 for visual direction (2026-10-13)." PROMPT.md itself stays unedited as the historical brief.

**MEMORY.md:**

1. Architecture Decision 3 ("Geist substituted for the reference site's Aspekta") is replaced by the new font decision.
2. Architecture Decision 4 is reworded to "Light mode only, one palette".
3. The "Design Decisions" glaido token table and the line "No gradients, no heavy shadows, minimal motion" are replaced by the new tokens, plus **one line** saying the glaido decisions were superseded on 2026-10-13 and live in commit `f2e901e` (decided).
4. "MobileNav is the only client component" becomes "MobileNav and Globe".
5. The Fonts line is updated.

**PROMPT.md §20** says to avoid "excessive" gradients, animation, empty space, glassmorphism, rounded cards and shadows. The new system stays inside those limits:

- Glass only on the nav pills and the hero card.
- Pills only on buttons and chips.
- Cards are flat with a 20px radius.
- Motion only in the hero and statement, plus calm reveals.
- Whitespace is generous, but sections stay dense with content.

---

## 2. Workstream A: copy clean-up

### 2.1 Counts (checked with a script)

| Scope | Em dashes (—) | En dashes (–) |
|---|---|---|
| `app/`, `components/`, `content/` | **57**: 29 user-visible + 28 in code comments | 38, all numeric ranges (2 of them in comments) |
| `BEW_Consolidated_Deduplicated.md` | **40** on 38 lines | 49, all numeric ranges |

### 2.2 Rules

- **R1. Label and title pairs** ("The Gap — No Single Standard", "Module 1 — …", "Stage 1 — …") use a **colon**. The same structure gets the same fix. Different structures get different fixes.
- **R2. Paired parenthetical dashes** ("rewarded—not penalized—for") become **commas**.
- **R3. A dash joining a second thought** becomes a **full stop** (two sentences), a **comma** (an appositive or "with" clause), or a **colon** (an elaboration).
- **R4. Implementation notes in the source doc** ("Learn More — link each…") go in **parentheses**.
- **R5. Quote attributions in the source doc** (`” — [Name, Title]`) move to their own `**Attribution:** [Name, Title]` line. This mirrors the site's `figcaption`.
- **R6. Page `<title>` separators** become a **pipe**. A title is not a sentence, and the pipe is the web convention. Example: `About | Better Earth Workplaces`.
- **R7. Placeholder tokens are never edited.** The new punctuation goes outside the brackets. The token count must be identical before and after.
- **R8. Code comments are untouched**, except where the redesign rewrites a comment anyway because it describes glaido and goes stale (`globals.css`, `Header`, `Footer`, `PageHero`, `Section`). New comments contain no em dashes.

### 2.3 Before/after: site (all 29 user-visible em dashes)

| File:line | Before | After | Rule |
|---|---|---|---|
| `app/layout.tsx:25,32` | `Better Earth Workplaces — The Global Sustainability Certification Authority` (default + OG) | `Better Earth Workplaces \| The Global Sustainability Certification Authority` | R6 |
| `app/layout.tsx:26` | template `%s — Better Earth Workplaces` | `%s \| Better Earth Workplaces` | R6 |
| `app/page.tsx:29` | home title, same as the default | same as the new default | R6 |
| `app/page.tsx:39` | The Challenge — Sustainability Claims Without Proof | The Challenge: Sustainability Claims Without Proof | R1 |
| `app/page.tsx:45` | The Gap — No Single Standard | The Gap: No Single Standard | R1 |
| `app/page.tsx:51` | The Solution — Independent, Credible Verification | The Solution: Independent, Credible Verification | R1 |
| `app/page.tsx:224` | Your certification journey — / *transparent & achievable.* | Your certification journey, / *transparent & achievable.* | R3 |
| `app/about/page.tsx:129` | organizations are rewarded—not penalized—for genuine progress | organizations are rewarded, not penalized, for genuine progress | R2 |
| `app/about/page.tsx:202` | Founder & CEO — Ketaki | Ketaki, Founder & CEO | R3 |
| `app/about/page.tsx:260` | BEW also works with channel partners — see [channel partners]. | BEW also works with [channel partners]. (the link moves onto the phrase, so it is said once) | R3 |
| `app/assessors-partners/page.tsx:142,152,164,175` | Module 1 — BEW Fundamentals (and Modules 2–4) | Module 1: BEW Fundamentals | R1 |
| `app/assessors-partners/page.tsx:320` | …because practical work overlaps other modules — the final schedule requires confirmation. | …because practical work overlaps other modules. The final schedule requires confirmation. (still flagged) | R3 |
| `app/certifications/page.tsx:28` | …rather than self-reported — institutional-grade verification recognized by investors, customers, and regulators. | …rather than self-reported: institutional-grade verification recognized by investors, customers, and regulators. (punctuation only, as decided) | R3 |
| `app/certifications/page.tsx:184` | …our sustainability commitment—something our investors and customers demanded… | …our sustainability commitment, something our investors and customers demanded… | R3 |
| `app/faq/page.tsx:11` (meta description) | Eligibility, assessment, costs, using your certification, and support — answered. | Answers on eligibility, assessment, costs, using your certification, and support. | R3 |
| `app/partners/page.tsx:53` | …arrive at assessment prepared — without compromising the independence… | …arrive at assessment prepared, without compromising the independence… | R3 |
| `app/partners/page.tsx:84` | [Partner Directory] — no partner records have been supplied yet. | [Partner Directory]: no partner records have been supplied yet. | R3, R7 |
| `app/organizations/page.tsx:232` | …all-in for the certification process — no hidden fees. | …all-in for the certification process, with no hidden fees. | R3 |
| `app/certifications/[slug]/page.tsx:43` | OG `${name} — Better Earth Workplaces` | `${name} \| Better Earth Workplaces` | R6 |
| `components/layout/Header.tsx:22` | aria-label "Better Earth Workplaces — home" | "Better Earth Workplaces home" | R3 |
| `components/LegalStub.tsx:23` | [Terms of Service copy to be supplied] — this page is a placeholder. | [Terms of Service copy to be supplied]. This page is a placeholder. | R3, R7 |
| `content/faqs.ts:106` | [Certification name] sample questionnaire — [Link to PDF] | [Certification name] sample questionnaire: [Link to PDF] | R1, R7 |
| `content/caseStudies.ts:17` | Environmental Impact — Sustainable Manufacturer | Environmental Impact: Sustainable Manufacturer | R1 |
| `content/partners.ts:32` | Connect verified impact to capital — sustainability-linked finance, green bonds, and investor reporting. | Connect verified impact to capital through sustainability-linked finance, green bonds, and investor reporting. | R3 |

Knock-on effect: the case-study `<title>` changes from "Environmental Impact — Sustainable Manufacturer — Better Earth Workplaces" to "Environmental Impact: Sustainable Manufacturer | Better Earth Workplaces".

### 2.4 Before/after: source doc (all 40)

| Line(s) | Before → After | Rule |
|---|---|---|
| 2 | `## Website Content — Part One (…)` → `## Website Content: Part One (…)` | R1 |
| 33, 36, 39 | `### The Challenge — …` / `The Gap — …` / `The Solution — …` → colon (same as the site) | R1 |
| 111 | `**CTA:** Learn More — link each certification to its detail page.` → `**CTA:** Learn More (link each certification to its detail page).` | R4 |
| 120 | `Your Certification Journey — Transparent & Achievable` → `Your Certification Journey, Transparent & Achievable` (matches the site) | R3 |
| 124, 130, 147, 157, 171, 516, 521, 550, 568, 588 | `### Stage N — Title` → `### Stage N: Title` | R1 |
| 193 | `### Featured Case Study — Manufacturing` → `### Featured Case Study: Manufacturing` | R1 |
| 200, 268, 962 | `“…” — [Name, Title]` → `“…”` then a new line `**Attribution:** [Name, Title]` (the token is unchanged) | R5 |
| 341 | `rewarded—not penalized—for` → `rewarded, not penalized, for` | R2 |
| 383 | `### Founder & CEO — Ketaki` → `### Ketaki, Founder & CEO` | R3 |
| 715 | `[Certification name] sample questionnaire — [Link to PDF]` → colon | R1 |
| 861, 868, 877, 885 | `### Module N — Title` → `### Module N: Title` | R1 |
| 954, 970, 997, 1274 | `## Environmental Impact — …`, `# 9. Certifications Hub Page — …`, `## Seven Certifications — …`, `## Certifications Hub — …` → colon | R1 |
| 982, 1189, 1205 | `Find Your Fit — link to …`, `Start Quiz — link to …`, `View Full Pricing — link to …` → parentheses | R4 |
| 1233 | `commitment—something …effort.” — [Name, Title, Company]` → `commitment, something …effort.”` + `**Attribution:** [Name, Title, Company]` | R3, R5 |
| 1377, 1380 | `Homepage — 11 sections`, `For Assessors & Partners — partial in Part One` → `Homepage (11 sections)`, `For Assessors & Partners (partial in Part One)` | R4 |
| 1385 | `Certifications Hub Page — detailed certification criteria, …` → `Certifications Hub Page: detailed certification criteria, …` | R1 |

### 2.5 En dashes (decided: keep in numeric ranges)

Every en dash in scope is a numeric range ("8–12 weeks", "500–5,000", "10–15%"). None is used as sentence punctuation. They stay as they are. An en dash is the correct mark for a range, and keeping them avoids touching timeline wording the source flags as unresolved (PROMPT.md §26). Phase 1 checks that the en dash count is unchanged: 38 in the code, 49 in the doc.

---

## 3. Globe: technology choice

| | `cobe` 2.0.1 | three.js 0.186 (+ R3F 9.8) | Canvas 2D / SVG | **Custom raw-WebGL shader (recommended)** |
|---|---|---|---|---|
| Added JS (gz) | 5.9 KB | ~133 KB minimal (~190 KB with R3F) | ~3 KB code | ~4 KB code + 3–6 KB land data |
| GPU/CPU | 1 draw call, light | Fine on GPU, but parsing ~133 KB is a TBT risk on Lighthouse's 4× CPU | CPU work on the main thread every frame; blur glow is costly | 1 full-screen-quad draw; cost scales with pixels (DPR capped) |
| Look | Dotted globe + glow. Map is baked in (no custom data). No graticule, scan lines or orbit. On light pages the dots are grey and a white glow is invisible | Anything | Flat; no real fresnel or glow | Graticule, dotted land, fresnel rim, scan lines and orbit ring, all in one synced shader |
| SSR / hydration | Client-only. v2 API is `update()`/`destroy()` (no `onRender`) | Client-only, plus R3F reconciler hydration weight | Can SSR a static frame | Client-only vanilla module; poster is server-rendered |
| Degrades | Silently does nothing without WebGL | Needs a poster | Works everywhere | Needs a poster (planned) |

**Recommendation: the custom raw-WebGL fragment shader.** No library is involved. One full-screen quad analytically intersects a sphere for each pixel and draws:

- lat/long lines anti-aliased with `fwidth`
- dotted land sampled from a tiny equirectangular mask built from public-domain Natural Earth 110m data
- a fresnel rim in `holo`
- scan lines at about 3% alpha
- a faint tilted orbit ring

It costs about 250 lines and no new dependencies. It's the only option that delivers the requested look at cobe's weight. Fallback if you'd rather write less custom code: cobe plus an SVG graticule overlay, though its glow and grey dots fight a light theme.

**How it loads (all requirements):**

- **Client-only:** `components/globe/Globe.tsx` is `'use client'`. It server-renders an **inline-SVG poster**, a single `<path>` of dots plus the graticule. Inline SVG is not an LCP image candidate, so **the LCP element is the server-rendered "Better Earth" wordmark text, never the globe**.
- **Frosted body:** the sphere has a canvas-tinted fill at about 80% alpha, with the linework and dots drawn on top. The "Earth" letters behind it read as covered, the way Qelora's object covers its wordmark, instead of showing through a see-through wireframe. The poster uses the same fill.
- **No layout shift:** the poster sits in a fixed `aspect-ratio: 1` box, so CLS is 0.
- **Lazy:** after `load`, plus idle time, plus the globe being in view, it calls `import('./globe-gl')`. That is a vanilla module with `start/stop/destroy`, not a React component, so there is no `next/dynamic` and no Suspense. The canvas then fades in over the poster.
- **Poster only** (no WebGL loaded) when any of these is true:
  - `prefers-reduced-motion: reduce`
  - `getContext('webgl', {failIfMajorPerformanceCaveat:true})` fails
  - `navigator.connection.saveData`
  - the low-power heuristic: `hardwareConcurrency ≤ 2`, or `deviceMemory ≤ 2` where available
- **Pauses** through an `IntersectionObserver` plus `visibilitychange`, so no `requestAnimationFrame` runs off-screen or while the tab is hidden.
- **Caps:** DPR at 2 (1.5 on coarse pointers) and 30 fps when `hardwareConcurrency ≤ 4`.
- **Context loss:** on `webglcontextlost` the poster comes back.
- **Tilt:** the pointer adds ±6° of tilt with easing; scroll adds a little more.
- **404 reuse:** the same component takes a `variant="horizon"` prop for the 404, which shows only the top arc, like the Nexova horizon.

**Land data.** A one-off Node script with no dependencies (`scripts/build-globe-data.mjs`) reads Natural Earth `ne_110m_land` and writes two files:

- `components/globe/land-mask.ts`: a bit-packed 512×256 mask. The power-of-two size lets longitude wrap cleanly in WebGL1. That's 16 KB raw, about 3–5 KB gzipped.
- `components/globe/poster-path.ts`

Natural Earth is public domain. The script needs one download, which I'll ask you to approve when we get there.

---

## 4. Leaf shadows

**Technique:** our own SVG. I draw two or three branch silhouettes myself as simple leaf paths on curved stems, so nothing is copied.

- **Blur is baked in** with `<feGaussianBlur>` inside the SVG. It is applied once, when the SVG is drawn. CSS `filter: blur()` is avoided because it is recomputed every frame while animating.
- **Fill:** ink at about 7–8% alpha.
- **Rendered inline** as `aria-hidden` SVG, `position:absolute`, `pointer-events:none`, **behind** the content (z-index 0, content at 1). Inline SVG is not an LCP candidate. A CSS `background-image` would be.
- **Weight:** about 4 KB raw (about 1.5 KB gz) in the HTML.
- **Motion:** two groups drift with CSS keyframes on `transform` only (±2% translate, ±1.5° rotate, 24s and 37s periods, alternating, `ease-in-out`). They are static under reduced motion.
- **Rejected:**
  - Licensed stock photo: heavier, and needs a licence record.
  - CSS blurred masks: they read as blobs, not leaves.
  - Looping video: 100 KB to 1 MB, plus autoplay and battery cost.
- **Scope (decided: hero bands):** animated on the home hero and statement (one sticky layer within that wrapper), and a lighter static copy inside `PageHero` so every route's hero inherits it. Not behind long-form body text, tables or FAQs.
- **Readability check:** at the darkest shadow point, `ink-subdued` body text is still **6.27:1** (computed).

---

## 5. Scroll and motion system

| Option | Added JS (gz) | Verdict |
|---|---|---|
| **CSS scroll-driven animations** (`animation-timeline: scroll()/view()`) | 0 | **Recommended.** Runs on the compositor. Supported in Chrome/Edge 115+ and Safari 26+; Firefox stable lacks it, so it goes in `@supports` and the static layout is the baseline |
| `motion` 14.1 | ~19.6 KB (`m` + `LazyMotion` + `domAnimation`) or ≥34 KB | Would be fine, but nothing here needs it |
| GSAP 3.15 + ScrollTrigger | 45.4 KB | Free licence, but heavy, and pinning tempts scroll-jacking |
| Lenis 1.3 | 5.4 KB | Rejected. It ignores keyboard and scrollbar input mid-animation (#107) and blocks anchor links by default |

**Easing and timing:**

- One easing curve: `--ease-calm: cubic-bezier(0.22, 1, 0.36, 1)`.
- Duration scale:
  - `--dur-micro` 160ms (hover colour)
  - `--dur-ui` 320ms (pills, accordion)
  - `--dur-reveal` 640ms
  - `--dur-hero` 1200ms (globe canvas fade-in)
- Ambient loops: leaves 24s/37s; globe 1 revolution per 80s.

**The scroll sequence (native scroll, nothing pinned):**

- Over the first viewport, the globe wrapper moves at about 0.7× scroll speed and scales from 1 to 1.12. The "Better Earth" wordmark scrolls normally, so it slides up *behind* the globe.
- The statement then fades and rises 24px as it enters (`view()`, entry 10% to 60%).
- The vertical line draws itself (`scaleY` 0 to 1), then the icon and caption fade in.
- **Neither the wordmark nor the h1 has an entrance animation**, which keeps LCP clean.

**Reduced motion:**

- All scroll-driven rules sit inside `@media (prefers-reduced-motion: no-preference)`, so under `reduce` they don't apply at all and content is static and fully visible.
- Leaves are static.
- The globe shows its poster.
- The existing global rule zeroes transitions and keeps `scroll-behavior: auto`.

**No scroll-jacking:** no wheel listeners, no `preventDefault`, no pinning. Keyboard, find-in-page and anchors stay native. `<html data-scroll-behavior="smooth">` is added for Next 16.

---

## 6. Design tokens, type and components

### 6.1 New `@theme` block (token names kept, so all routes inherit)

```css
@theme {
  --color-canvas: #f4f4f0;            /* off-white page */
  --color-surface: #fbfbf9;           /* cards, pills */
  --color-glass: rgb(251 251 249 / 0.72); /* floating pills + hero card (with backdrop-blur) */
  --color-ink: #121512;               /* near-black, green undertone */
  --color-ink-subdued: #4a5048;       /* muted ink */
  --color-line: rgb(18 21 18 / 0.12);
  --color-wash: rgb(18 21 18 / 0.04);
  --color-accent: #1d5a3a;            /* deep brand green (replaces glaido #4f730c) */
  --color-accent-strong: #133f28;     /* hover / pressed */
  --color-accent-soft: #e3f0e7;       /* tint: CTA band, placeholders, icon tiles */
  --color-accent-soft-strong: #cbe5d4;/* selection */
  --color-holo: #2ee59d;              /* hologram glow: decorative only, never text */
  --color-holo-deep: #12a66b;         /* hologram linework: decorative only */
  --radius-btn: 9999px;               /* every button + chip becomes a pill */
  --radius-card: 20px;
  --font-display: var(--font-display-face), var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --shadow-float: 0 1px 2px rgb(18 21 18 / 0.05), 0 12px 32px -16px rgb(18 21 18 / 0.25);
  --ease-calm: cubic-bezier(0.22, 1, 0.36, 1);
}
```

**Why change the accent:** `#4f730c` was glaido's green, not BEW's (MEMORY.md says so). Its olive hue (~82°) also clashes with an emerald hologram (~156°). The deep green `#1D5A3A` sits in the same family as the hologram, reads as more premium, and gives better contrast headroom. Keeping `#4f730c` is a one-line revert (decision 7).

**Contrast (WCAG 2.x, computed):**

| Pair | Ratio | Result |
|---|---|---|
| ink on canvas / surface | 16.68 / 17.75 | AAA |
| ink-subdued on canvas / surface | 7.52 / 8.00 | AAA |
| ink-subdued on canvas under the darkest leaf shadow (8%) | 6.27 | AA |
| accent on canvas / surface | 7.39 / 7.87 | AAA |
| white on accent / accent-strong (primary button) | 8.15 / 11.87 | AAA |
| accent on accent-soft (placeholder chip, CTA band) | 6.94 | AA |
| ink / ink-subdued on accent-soft | 15.66 / 7.06 | AAA |
| ink on accent-soft-strong (selection) | 13.75 | AAA |
| ink / ink-subdued on a glass pill, worst case over a shadow | 16.56 / 7.46 | AAA |
| holo / holo-deep on canvas | 1.49 / 2.85 | **Decorative only** (aria-hidden globe, exempt from 1.4.11) and never used for text |

A lighter "faint" text grey was rejected: it falls to 4.08:1 under the leaf shadow.

### 6.2 Typography (decided: Outfit for display)

**Outfit** (Google Fonts, OFL, variable 100–900) is loaded through `next/font/google`: self-hosted, `display: swap`, with an adjusted fallback to limit layout shift. It has a true 900 weight for giant type and is the closest free match to the Qelora wordmark's round, heavy feel. The alternatives I considered were Urbanist (100–900, cooler) and keeping Geist only (no extra bytes, but less geometric).

**Plan:**

- Outfit sets the "Better Earth" wordmark, the `PageHero` h1, the statement and section h2s.
- Geist stays for body and UI.
- Geist Mono stays for eyebrows, labels and placeholders, so the inline labels inherit.
- Phase 2 opens with a specimen screenshot of the real wordmark in Outfit 700, 800 and 900 next to Urbanist, so the weight is confirmed before anything is committed.

**Scale:**

| Use | Size | Weight / tracking / leading |
|---|---|---|
| Wordmark | One line from `sm` (about `clamp(3rem, 15vw, 14rem)`); two lines, "Better" / "Earth", below `sm` (about 26vw). Tuned against Outfit's measured width so nothing overflows from 375 to 1920 | 800, −0.045em, 0.86 |
| h1 in `PageHero` (other routes) | `clamp(2.75rem, 6vw, 5.5rem)` | 700, −0.03em |
| h1 on the home page (tagline spot) | `clamp(1.5rem, 2.4vw, 2.25rem)`, max about 18ch | 600, −0.02em, 1.15 |
| Statement | `clamp(2rem, 4.6vw, 4.25rem)` | 500, −0.02em, 1.08 |
| h2 | `clamp(2rem, 3.6vw, 3.25rem)` | — |
| Body | 17–18px | leading 1.65 |
| Nav/pill labels | 12px uppercase | 0.08em |

### 6.3 Component changes

| File | Change |
|---|---|
| `components/ui/Button.tsx` | Pill (via token). Sizes md `h-11 px-6`, sm `h-9 px-4`. Primary = accent → accent-strong. Secondary = glass + line, hover ink. Focus ring kept. The placeholder-span behaviour is unchanged. |
| `components/ui/Card.tsx` | `rounded-card` 20px, more padding. `IconTile` becomes round. `LinkCard` hover = line darkens + arrow nudge (no lift, no shadow). |
| `components/ui/Section.tsx` | `Section` default switches from hairline borders to a whitespace rhythm (`py-20 sm:py-28 lg:py-36`; `bordered` is kept as an opt-in). `SectionHeading` h1/h2 use `font-display` with the new scale; the accent second line stays in `text-accent`. `Eyebrow` stays mono. |
| `components/PageHero.tsx` | Left-aligned editorial layout with the static leaf layer. New optional `breadcrumbs` prop. Border removed. |
| `components/CtaSection.tsx` | Becomes a large rounded `accent-soft` panel inside the container, with a calm centred layout. |
| `components/content-blocks.tsx` | `Stat` numbers in the display face. Testimonial goes borderless and editorial. Timeline and bullets inherit the accent. |
| `components/FaqAccordion.tsx` | Typography, plus the round "+" pill. Stays native `<details>`. |
| `components/layout/Header.tsx` | Transparent sticky header. Logo in a glass pill. Nav items are individual glass pills (uppercase, 12px, tracked) from `xl` up; six pills plus the CTA overflow at 1024. CTA pill on the right. **No language pill (there is no i18n).** |
| `components/layout/MobileNav.tsx` | Round toggle pill and a full-height sheet. Focus moves into the sheet on open; Escape closes it and returns focus to the toggle; `inert` is set on `#main` and the footer while open. |
| `components/layout/Footer.tsx` | Spacing, display-face tagline, calmer columns. Data unchanged. |
| `components/brand/Logo.tsx`, `app/icon.svg` | Colours only (the icon hard-codes `#4f730c` and `#f2f2f2`). Still a placeholder. |
| `ComparisonTable`, `CertificationCard`, `LegalStub` | Inherit through tokens. `LegalStub` gets the copy fix only. |

### 6.4 Home page composition (decided; all source copy, nothing new)

| Element | Content and source | Notes |
|---|---|---|
| Wordmark | "Better Earth", giant, in Outfit | `aria-hidden` (decorative). The globe sits over "Earth". This is the LCP element. |
| h1 (in Qelora's tagline spot) | "The Global Sustainability Certification Authority" (§1 Hero headline) | Visible h1, so SEO and heading order are unchanged. |
| Uppercase link | "Explore Our Certifications ↓" (§1 secondary CTA) | Goes to `#certifications` (home section 4), so the down arrow tells the truth. |
| Floating glass card | "No hidden requirements. Transparent process. Real impact." (§1 supporting text), "Trusted by [X] organizations across [Y] countries" (§1 supporting stat, through `PlaceholderText`), and a "Start Your Certification" pill (§1 primary CTA) | No photo, as decided. A small static hologram-arc motif reuses the poster path. On mobile the card stacks as a normal block. |
| Statement (h2) | "Investor confidence. Stakeholder trust. Competitive advantage." (§1 Outcome) | Moves out of the small "Outcome:" line at the end of section 2, so it is not duplicated. |
| Line, icon, caption | lucide `BadgeCheck`, then "Third-party verified credentials that prove your environmental and social impact to investors, customers, and stakeholders." (§1 Hero subheading) | The subheading moves from the hero to the caption. That keeps the hero as minimal as Qelora's, and it still sits directly below the fold. |
| Section 2 onward | Unchanged: "The problem we solve", "Stakeholders demand proof. / We provide it.", its description and the three problem cards | Only the trailing "Outcome:" line is removed, because it is now the statement. |

---

## 7. File-by-file change list

**Workstream A (copy only):**

- `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/assessors-partners/page.tsx`, `app/certifications/page.tsx`, `app/certifications/[slug]/page.tsx`, `app/faq/page.tsx`, `app/partners/page.tsx`, `app/organizations/page.tsx`
- `components/layout/Header.tsx`, `components/LegalStub.tsx`
- `content/faqs.ts`, `content/caseStudies.ts`, `content/partners.ts`
- `BEW_Consolidated_Deduplicated.md`

**Workstream B, edits:**

- `app/globals.css`: new tokens; leaf-drift keyframes; scroll-driven rules in `@supports` plus no-preference; a `glass` utility; placeholder styling on the new tokens.
- `app/layout.tsx`: display font; `data-scroll-behavior="smooth"`; skip link restyle.
- `app/page.tsx`: the hero becomes `<HomeHero>`, and `<Statement>` follows it (see 6.4). Section 2 loses only its trailing "Outcome:" line. Section 4 gets `id="certifications"` for the hero link.
- `app/not-found.tsx`: horizon globe. Existing copy kept.
- The three detail pages: switch to `PageHero` with `breadcrumbs`.
- `app/icon.svg`.
- Every component listed in 6.3.

**Workstream B, new files:**

| File | Purpose |
|---|---|
| `components/home/HomeHero.tsx` | Server component: "Better Earth" wordmark, `Globe`, h1, uppercase link, floating card |
| `components/home/Statement.tsx` | Server component: the Outcome statement (h2), line, icon, caption, all CSS-animated |
| `components/globe/Globe.tsx` | `'use client'`: poster, canvas, capability checks, lazy import, pause logic |
| `components/globe/globe-gl.ts` | Vanilla WebGL with the shaders as template strings, so Turbopack needs no `.glsl` config |
| `components/globe/GlobePoster.tsx`, `poster-path.ts`, `land-mask.ts` | Generated poster and land data |
| `components/ambient/LeafShadows.tsx` | Inline SVG, two drift groups, `variant="hero" \| "static"` |
| `scripts/build-globe-data.mjs` | One-off generator, Node built-ins only |
| `plans/redesign-plan.md` | Copy of this plan |

**Dependencies:**

- **No new runtime or dev dependencies.**
- Fonts come through `next/font`, so there is no runtime request to Google.
- The display font adds about 30–45 KB of woff2 (one variable file).
- The home page's first-load JS grows by about 2 KB (the `Globe` wrapper). The WebGL chunk (about 4 KB plus 3–6 KB of data) loads after idle.

---

## 8. Phased execution

**Phase 0: setup.**

- Create branch `redesign/hologram-globe` from `main`.
- Copy this plan into the repo.
- Record a baseline: `npm run build`, `npm run lint`, Lighthouse mobile on `/`, and screenshots of `/`, `/certifications/water-neutral` and `/faq` at 375 and 1440.
- For browser checks, add a `bew-website` entry to the OOC `.claude/launch.json` (dev server on port 3300).

**Phase 1: copy clean-up.** Make the changes in tables 2.3 and 2.4.

- **Verify** (run before and after, with `rg` 15.2 on this machine):
  - `rg -n "—" app components content | rg -v ":\s*(\*|//|/\*|\{/\*)"` returns nothing; that filter keeps only non-comment lines.
  - `rg -c "—" BEW_Consolidated_Deduplicated.md` returns nothing.
  - `rg -o "–" app components content BEW_Consolidated_Deduplicated.md` still counts 87 matches.
  - `rg --count-matches "\[[^\]]+\]" app components content BEW_Consolidated_Deduplicated.md` gives the same count for every file before and after.
  - `npm run build` (30 routes) and `npm run lint` are clean.
  - The diff matches the approved tables word for word.
  - The rendered `<title>` is spot-checked on `/`, `/about` and `/case-studies/sustainable-manufacturer`.
- **Commit:** `content: replace em dashes with natural punctuation`.

**Phase 2: tokens, fonts, base components.**

- An independent architecture review (Tailwind v4 details, stacking, overflow and sticky behaviour, hydration) was still running when this plan was written. Its findings are folded in before Phase 2 starts. Phase 1 doesn't depend on it. Anything that would change one of your decisions comes back to you first.
- Start with the font specimen screenshot.
- Then: `globals.css`, `layout.tsx`, `Button`, `Card`, `Section`, `PageHero` (+ `breadcrumbs` and the three detail pages), `CtaSection`, `content-blocks`, `FaqAccordion`, `Header`, `MobileNav`, `Footer`, `Logo`/icon.
- **Verify:**
  - build, lint and `tsc --noEmit` are clean
  - the contrast script passes on the final token values
  - preview screenshots of `/`, `/certifications/water-neutral` and `/faq` at 375, 768, 1280 and 1440
  - a keyboard pass through the header pills and the mobile sheet: visible focus, Escape returns focus, background inert
- **Commit:** `style: new design tokens, typography and base components`.

**Phase 3: hero, globe, leaves, statement, scroll.**

- Run `scripts/build-globe-data.mjs` (download approval needed).
- Build `Globe`, `globe-gl`, `LeafShadows`, `HomeHero` and `Statement`, and wire up `app/page.tsx`.
- **Verify:**
  - A `PerformanceObserver` on the production build shows the LCP entry is the "Better Earth" wordmark text (never the globe or poster) and CLS stays under 0.05 while scrolling.
  - A rAF counter stops when the globe is off-screen or the tab is hidden.
  - Headless Edge screenshots with `--force-prefers-reduced-motion` and with `--disable-3d-apis` show the poster.
  - Forcing `WEBGL_lose_context` brings the poster back.
  - **Art-direction checkpoint:** I send you hero and statement screenshots at 375 and 1440 before rollout.
- **Commit:** `feat: hologram globe hero, leaf shadows and scroll statement`.

**Phase 4: rollout and 404.**

- Restyle the 404 with the horizon globe, and fix whatever the sweep finds.
- **Verify:** a scripted sweep of all 30 routes plus a 404 URL at 375, 768, 1280 and 1440 shows `scrollWidth ≤ innerWidth` and no console errors. Keyboard pass.
- **Commit:** `style: roll the new system out to all routes and the 404`.

**Phase 5: QA and docs.**

- Lighthouse mobile on `next build && next start`. Use `npx lighthouse@12`, because LH 13 needs Node ≥ 22.19 and this machine has 22.14. The scoring weights are the same.
- Update CLAUDE.md and MEMORY.md with the rule text in 1.3, record the commit hashes, and push as `nesora-ops` **after you confirm**.
- **Commit:** `docs: update design rules and project memory`.

---

## 9. Quality bar (must all pass)

- **Build:** `npm run build` (30 routes), `npm run lint` and `npx tsc --noEmit` are clean.
- **Errors and overflow:** no console errors on any route, and no horizontal overflow at 375, 768, 1280 and 1440.
- **Lighthouse mobile on `/`:** Performance ≥ 90 and Accessibility 100 (Best Practices and SEO no worse than the baseline).
- **Core metrics:** LCP < 2.5 s with the wordmark text as the LCP element (never the globe); CLS < 0.05; TBT < 200 ms.
- **JS weight on `/`:** first-load JS up by ≤ 8 KB gz; the deferred globe chunk ≤ 10 KB gz.
- **Globe behaviour:** zero rAF callbacks while hidden or off-screen; poster under reduced motion, no WebGL, Save-Data or low power.
- **Focus and keyboard:**
  - Visible focus on every interactive element.
  - Desktop order: skip link → logo → nav pills → CTA → content.
  - Mobile: toggle → sheet links → CTA, and Escape closes the sheet and returns focus.
- **Contrast:** AA for every pair in 6.1, including the leaf-shadow worst case.
- **Copy:** 0 em dashes in scope; placeholder token count unchanged.

---

## 10. Risks and mitigations

1. **GPU cost on low-end phones.** A single-pass shader, DPR caps, a 30 fps cap on weak CPUs, a poster on Save-Data or low power, pausing when off-screen or hidden, and a context-loss fallback.
2. **The hologram looking cheap on a light background.**
   - Linework in deep emerald with alpha, not neon on white; mint only in the rim and a faint aura.
   - Dot size scales with the fresnel term; back-face lines at 25% for depth.
   - The Phase 3 art-direction checkpoint.
   - An "etched" no-glow variant set through uniforms if needed.
3. **Leaves hurting readability.** They sit behind content only, darken at most 8% (6.27:1 worst case), live in hero bands only and are static under reduced motion.
4. **Font licensing.** OFL Google Fonts, self-hosted by `next/font`. Nothing is taken from either reference.
5. **Scroll-driven gaps** in Firefox and Safari below 26. Progressive enhancement: the static layout is fully designed.
6. **LCP and the display font.** A single variable file with swap and adjusted fallback, measured in Phase 3. If needed, drop the Geist Mono preload.
7. **Header overflow from 1024 to 1279.** The pill nav starts at `xl`, verified at exactly 1280.
8. **Copy edits brushing flagged claims.** Punctuation and structure changes only, plus a placeholder-count check and a diff review against the tables.
9. **Cost of the glass pills.** Every `backdrop-filter` region is re-blurred as content scrolls under it. Mobile has only two (the logo pill and the menu toggle), and desktop has about nine small ones. I'll check scroll smoothness with a 4× CPU slowdown. If it stutters, the pills switch to an 85%-opaque fill with no blur, which looks almost identical over the pale canvas.

---

## 11. Decisions (answered in chat, 2026-10-13)

| # | Question | Decision |
|---|---|---|
| 1 | En dashes | Keep them in numeric ranges; nothing else uses them. |
| 2 | Hero type | A giant "Better Earth" wordmark (decorative, `aria-hidden`) with the globe over "Earth". The source headline is the visible h1 in the tagline spot (6.4). |
| 3 | Scroll statement | The Outcome line: "Investor confidence. Stakeholder trust. Competitive advantage." Its caption is the hero subheading (6.4). |
| 4 | Leaf overlay | Hero bands: animated on the home hero and statement, static in `PageHero`. |
| 5 | Hero card image | No photo. A glass card with a hologram-arc motif. |
| 6 | Old glaido decisions | Replaced by a one-line pointer to commit `f2e901e`. |
| 7 | Accent | `#1D5A3A`, as recommended (not asked separately). Reverting to `#4f730c` is a one-line token change if you prefer it. |
| 8 | Display font | Outfit, confirmed against a weight specimen at the start of Phase 2. |
| 9 | "Credible" hedge | Punctuation only. The claim stays on the content checklist. |

---

## 12. Architecture review findings (folded in before Phase 2)

An independent review checked the plan against the source, the built CSS, `tailwindcss@4.3.3` and the Next 16 docs. Adopted:

1. **Header height token.** Add `--spacing-header: 4rem`. It gives `top-header`, `-mt-header`, `pt-header` and `scroll-pt-header`. Heroes pull up under the transparent header (`-mt-header pt-header`), so the leaf layer has no hard edge. `scroll-padding-top` keeps anchors such as `#get-started` clear of the pills.
2. **Header width.** Six tracked uppercase pills plus the logo and CTA may be wider than the 1,216px available at 1280. Measure first. Fallback: one glass capsule holding the nav items, which also cuts the blurred regions from about 8 to 3. The bar is `pointer-events-none` and the pills are `pointer-events-auto`, so the gaps don't block clicks. `MobileNav` (`lg:hidden`, `top-16`) changes in step with the header breakpoint.
3. **Poster weight.** The poster is rendered in a server parent and passed to the client `Globe` as `children`, so its path data isn't shipped twice (HTML and JS). Shared constants (colours, tilt) live in a plain `config.ts`, because exports from a `'use client'` file become client references. Colours are plain hex there; Tailwind drops unused CSS variables, so JS can't rely on them.
4. **Remount safety.** `destroy()` can be called twice and releases the context (`WEBGL_lose_context`). The async `import()` checks a cancelled flag, because Strict Mode and home → about → home navigations remount the effect. `requestIdleCallback` is feature-detected (Safari), with a `setTimeout` fallback. Markup is identical on server and client: the canvas is always present at `opacity-0`, and every capability check runs in `useEffect`.
5. **Blend modes.** Transforms, `isolate` and `will-change` each isolate blending, so no `mix-blend-mode` is relied on inside the parallax wrapper. The hologram uses normal alpha blending: linework in `holo-deep` or `accent`, and `holo` only for the halo.
6. **Leaf layer.** Drift is animated on HTML wrappers with `will-change: transform`, never on SVG `<g>`. The host is `relative isolate`; the layer is `absolute inset-0 -z-10 pointer-events-none`. The sticky layer is dropped. One absolutely positioned layer spans the home hero and statement, and the same component (with `animated={false}`) sits in `PageHero`.
7. **Overflow.** `overflow-x: clip` is used everywhere, never `hidden`, because `hidden` makes a scroll container: sticky stops sticking and `scroll()`/`view()` timelines freeze.
8. **Scroll-timeline CSS** goes in plain CSS in `globals.css`, with `animation-timeline` declared after the `animation` shorthand (the shorthand resets it). The base state stays visible; `opacity: 0` appears only in `from` keyframes. Nothing above the fold is hidden by a timeline.
9. **Gaps in inheritance closed.** The two hand-built icon tiles in `app/page.tsx` switch to `IconTile`. The hard-coded display sizes in `Section.tsx`, `CtaSection.tsx`, `content-blocks.tsx` (`Stat`) and `not-found.tsx` move to the display scale. The detail pages drop the imports they no longer use.
10. **Wordmark.** It gets an explicit line-height, so the font swap can't change its height (CLS).

Not adopted:

- **Swapping the custom shader for `cobe` plus an SVG overlay.** On a light page, cobe draws dark dots on a solid shaded sphere whose alpha never drops below 0.5. That can't produce emerald linework on a frosted body, which is the hologram look. The approved custom shader stays.
- **Trying Geist 800 first.** You chose Outfit. The Phase 2 specimen includes Geist 800 for comparison anyway.
