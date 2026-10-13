
# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# BEW Website — Project Rules

## Sources of truth

- `PROMPT.md` — the master prompt. The build brief. Read it before any work.
- `BEW_Consolidated_Deduplicated.md` — the **only** source of website copy. Do not invent marketing copy.
- `MEMORY.md` — living project memory. Read it first; update it after every meaningful session.

## Content rules

- Never fabricate statistics, pricing, timelines, validity terms, accreditations, testimonials,
  company names, contact details or regulatory claims.
- Placeholders in the source (`[X]`, `[Y]`, `[Placeholder]`, `[To be confirmed]`) stay placeholders.
  Render them through the `<Placeholder>` component so they remain visible and greppable.
- The source document's own "Important source inconsistencies to resolve before publishing" list
  (timelines, validity, assessor training duration, independence vs referral fees, accreditation
  claims, investor/regulatory claims, the Organisation of Choice™ relationship, pricing, contact
  details, case-study figures) must be preserved as flagged, not silently resolved.
- No em dashes in user-visible copy or in the source document. Use a colon, comma, full stop,
  parentheses or a restructured sentence. En dashes appear only in numeric ranges (8–12 weeks).
  Page titles use a pipe separator (`About | Better Earth Workplaces`).

## Architecture rules

- Repeated content is **data, not markup**. It lives in `content/` and is read through the
  accessors in `content/index.ts` — pages never import the data files directly. When the backend
  API lands, those accessors become async fetches and pages stay untouched.
- One reusable certification template serves all seven pathways. Never seven implementations.
- No `/admin` and no backend calls in the website. The admin is built on the backend and wired later.

## Design rules

These supersede PROMPT.md §3 and §20 for visual direction (2026-10-13). PROMPT.md stays
unedited as the historical brief.

- Reference: the "Qelora" screen recording for feel (off-white canvas, leaf shadows, giant
  display type, pill navigation, slow editorial motion). Take the feel, never the files: no
  assets, fonts, code or copy from any reference. Tokens live in the `@theme` block in
  `app/globals.css`.
- Light mode only. Gradients only as soft light (the globe's fade, the leaf shadows), never
  behind body text or on buttons and cards. Soft shadows only on floating elements (nav pills,
  hero card); grid cards stay flat. Motion is slow and purposeful: one easing curve
  (`--ease-calm`), transform and opacity only, no scroll-jacking, and every animation has a
  reduced-motion fallback.
- The greens are a proposal, not BEW brand: deep green `#1D5A3A` (`accent`), `accent-strong`
  for text that needs more weight. No BEW brand palette exists yet; the `@theme` tokens are
  the single swap point. The home hero wordmark is ink (`#121512`); the hero h1, card and the
  statement use the dark green.
- The dappled leaf shadows are the site-wide ambient texture: one fixed layer in
  `app/layout.tsx`, behind content, at most 10% (near) and 6% (far) of the leaf green.
- The home hero and the 404 use the static SVG dotted globe (`components/ui/globe.tsx`),
  generated from Natural Earth by `scripts/build-globe-data.mjs`. In the hero it sits at 55%
  opacity over a soft green `GlobeGlow`, so the headline stays readable over its dots. Keep it free of client JavaScript, and animate only with
  compositor-friendly CSS on HTML elements (an animated SVG child repaints the whole globe).
- Fonts: Outfit for display (wordmark, h1/h2, statement), Geist for body and UI, Geist Mono
  for labels and placeholders, all through `next/font/google`.
- The logo is a **placeholder**. Do not present it as final brand. The hero "Better Earth"
  wordmark is typeset copy, not the logo; revisit it when brand assets arrive.

## Git

Repository-local identity only — never change global config:

```bash
git config user.name  "nesora-ops"
git config user.email "ops@nesora.co.in"
```

Push as the `nesora-ops` GitHub account. Never commit secrets or `.env` values.
Meaningful commit messages, split by area. Record commit hashes in `MEMORY.md`.

@AGENTS.md
