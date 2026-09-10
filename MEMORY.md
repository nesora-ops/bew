# Project Memory

## Current Status

Status:
- **Base version of the public website is built and building clean.** 30 routes prerender.
- Implementation stage: initial scaffold + full content build (Steps 1–8 and 10–12 of PROMPT.md §27).
- What works: every page in scope renders, navigation works desktop and mobile, no horizontal
  overflow at 375 / 768 / 1280, no console errors, no broken internal links, lint and typecheck clean.
- What is broken: nothing known. See Known Issues for deliberate gaps.

## Current Architecture

- **Framework:** Next.js 16.3.4 (App Router, Turbopack)
- **Frontend:** React 19.2.8, TypeScript 5
- **Backend/API:** none. The website makes **no** backend calls (see Architecture Decisions).
- **Database:** none in this repo.
- **Authentication:** none.
- **Styling:** Tailwind CSS v4 with CSS-variable design tokens in `app/globals.css` (`@theme`).
  Light mode only.
- **Fonts:** Geist + Geist Mono via `next/font/google`.
- **Icons:** `lucide-react` (only runtime dependency added beyond the Next scaffold).
- **Deployment:** not configured yet.

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
- `MobileNav` is the only client component.

## Architecture Decisions

1. **No admin/CMS and no backend calls in this pass.** Decided with the user: the admin is being
   built on the backend and wired in later. To keep that wiring cheap, pages never import data
   modules directly — they go through `content/index.ts` accessors (`getCertifications()`,
   `getFaqs()`, …). When the API lands, those functions become async fetches and pages stay
   largely untouched.
2. **Content is data, not markup** (PROMPT.md §19/§22). The source document's own consolidation
   note warns about repetition across Homepage / Hub / Organizations; sharing `content/` modules
   is how that is avoided.
3. **Geist substituted for the reference site's Aspekta.** Aspekta is on neither npm nor Google
   Fonts, and copying its `.woff2` from the reference site would be lifting a licensed asset
   (PROMPT.md §3 forbids this). Geist Mono is the reference's own mono face.
4. **Light mode only.** The reference was specified as light mode, so `globals.css` defines one
   palette rather than a dual-theme token set.
5. **No component library.** shadcn/Radix would be weight this site does not need.

## Design Decisions

Design language taken from **glaido.com in light mode**. Token values were read from its live
stylesheet (`[data-theme=light]`), not eyeballed:

| Role | Value |
|---|---|
| canvas | `#f2f2f2` |
| surface | `#ffffff` |
| ink | `#000000` |
| ink-subdued | `rgba(0,0,0,.7)` |
| line | `rgba(0,0,0,.1)` |
| accent | `#4f730c` |

Structure: hairline-bordered full-bleed sections, 80rem container, sticky translucent blurred
header, uppercase mono eyebrows, two-line headlines with an accent-coloured second line, bordered
white cards with tinted icon tiles. No gradients, no heavy shadows, minimal motion.

**The accent green is the reference's, not BEW's** — no BEW palette exists anywhere in the project.
It is one `@theme` variable, so swapping it later is a one-line change.

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
- [ ] Deployment configuration

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
See the commits created in this session (`git log`). Repository-local identity is
`nesora-ops <ops@nesora.co.in>`; remote is `github.com/nesora-ops/bew` (public, by the user's
explicit decision).

### Next Recommended Step
Human visual review of all pages, then supply brand assets and the outstanding content above.
Do not wire the backend until the admin exists on the backend side.
