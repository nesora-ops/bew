
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

## Architecture rules

- Repeated content is **data, not markup**. It lives in `content/` and is read through the
  accessors in `content/index.ts` — pages never import the data files directly. When the backend
  API lands, those accessors become async fetches and pages stay untouched.
- One reusable certification template serves all seven pathways. Never seven implementations.
- No `/admin` and no backend calls in the website. The admin is built on the backend and wired later.

## Design rules

- Reference: glaido.com in **light mode**. Tokens live in the `@theme` block in `app/globals.css`.
- Light mode only. No gradients, no heavy shadows, minimal motion.
- The accent green `#4f730c` is carried from the reference; no BEW brand palette exists yet.
- The logo is a **placeholder**. Do not present it as final brand.

## Git

Repository-local identity only — never change global config:

```bash
git config user.name  "nesora-ops"
git config user.email "ops@nesora.co.in"
```

Push as the `nesora-ops` GitHub account. Never commit secrets or `.env` values.
Meaningful commit messages, split by area. Record commit hashes in `MEMORY.md`.

@AGENTS.md
