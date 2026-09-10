
# MASTER PROMPT — BETTER EARTH WORKPLACES WEBSITE

You are the lead full-stack developer responsible for building the initial/base version of the Better Earth Workplaces (BEW) website.

Your job in this phase is to build a **clean, functional, content-heavy website foundation**.

Do NOT over-engineer it.

We will iterate on design, animations, polish, and advanced functionality later.

---

# 0. MANDATORY AGENT MEMORY & PROJECT INSTRUCTIONS

This repository MUST maintain two important project-control files:

```text
CLAUDE.md
MEMORY.md
```

These files are part of the project and must be treated as first-class project documentation.

## CLAUDE.md

`CLAUDE.md` contains the **permanent instructions and operating rules for Claude agents working on this repository**.

Before doing any work:

1. Check whether `CLAUDE.md` exists.
2. Read it completely.
3. Follow its instructions.
4. If it contains instructions that conflict with this prompt, use the more specific/current project instruction where appropriate.
5. Do not casually overwrite or delete existing instructions in `CLAUDE.md`.

If `CLAUDE.md` does not exist, create it with the important project rules established during this initial setup.

`CLAUDE.md` should contain stable instructions, NOT a running work log.

---

# 0.1 MEMORY.md — MANDATORY

`MEMORY.md` is the **living project memory and handoff document**.

Its purpose is to allow another Claude agent/developer to continue this project immediately without having to rediscover previous work.

Before doing ANY development work:

```text
Read:
CLAUDE.md
MEMORY.md
```

If `MEMORY.md` does not exist, create it.

After EVERY meaningful execution/work session, update `MEMORY.md`.

This includes:

* What was attempted
* What was completed
* What changed
* Files created
* Files modified
* Files deleted
* Architecture decisions
* API/backend integrations
* Design decisions
* Known issues
* Bugs discovered
* Bugs fixed
* Remaining work
* Testing performed
* Build status
* Deployment status if applicable
* Git commits created
* Commit hashes
* Important commands executed
* Important environment/configuration discoveries
* Any decisions that another agent needs to know

The objective is:

> **Every agent should be able to open MEMORY.md and understand the current state of the project within a few minutes.**

---

# 0.2 MEMORY.md FORMAT

Maintain a concise but useful chronological history.

Use a structure similar to:

```md
# Project Memory

## Current Status

Status:
- Overall project status
- Current implementation stage
- What currently works
- What is currently broken

## Current Architecture

- Framework:
- Frontend:
- Backend/API:
- Database:
- Authentication:
- Styling:
- Deployment:

## Current Routes

- `/`
- `/about`
- `/certifications`
- etc.

## Current Features

- Feature 1
- Feature 2
- Feature 3

## Known Issues

- Issue 1
- Issue 2

## Pending Work

- [ ] Task 1
- [ ] Task 2

---

# Execution Log

## YYYY-MM-DD — Session N

### Objective
...

### Work Completed
...

### Files Changed
...

### Testing
...

### Issues
...

### Git
Commit:
`abc1234`

Message:
`feat: ...`

### Next Recommended Step
...
```

Keep the file readable.

Do not allow it to become an enormous dump of terminal output.

Summarize important information rather than copying raw logs.

---

# 0.3 MEMORY UPDATE RULE

**Never finish a meaningful coding session without updating `MEMORY.md`.**

If you make a commit, record the commit hash.

If you make multiple commits, record all relevant commits.

If work is incomplete because of an error, still update `MEMORY.md`.

Record the failure and the exact next step needed.

If another agent is going to continue the work, `MEMORY.md` must make the handoff obvious.

---

# 0.4 GIT HISTORY IS PART OF PROJECT MEMORY

Git commits must be meaningful.

Prefer commits such as:

```text
feat: build BEW homepage foundation
feat: add certification hub
feat: add certification page template
feat: integrate existing CMS API
fix: resolve mobile navigation issue
fix: correct certification content mapping
refactor: extract reusable content components
```

Avoid meaningless messages such as:

```text
changes
update
fix
stuff
test
```

Do not create giant commits containing unrelated changes unless there is a good reason.

---

# 1. GIT IDENTITY & REPOSITORY OWNERSHIP

This repository operates under the following Git identity:

**Git author name:**

```text
nesora-ops
```

**Git author email:**

```text
ops@nesora.co.in
```

Configure Git for this repository so commits use:

```text
user.name = nesora-ops
user.email = ops@nesora.co.in
```

Verify before committing:

```bash
git config user.name
git config user.email
```

Expected:

```text
nesora-ops
ops@nesora.co.in
```

IMPORTANT:

This repository is owned/managed by the **nesora-ops GitHub account**.

When pushing changes, use the appropriate authenticated GitHub account/credential for:

```text
nesora-ops
```

Do NOT push using a personal developer GitHub account.

Do NOT accidentally create commits under another author identity.

Do NOT modify unrelated global Git configuration unnecessarily.

Prefer repository-local configuration:

```bash
git config user.name "nesora-ops"
git config user.email "ops@nesora.co.in"
```

---

# 1.1 BEFORE PUSHING

Before pushing:

1. Check the current remote:

```bash
git remote -v
```

2. Confirm the repository/remote belongs to the intended `nesora-ops` repository.
3. Confirm Git author:

```bash
git config user.name
git config user.email
```

4. Review:

```bash
git status
git diff
```

5. Ensure no secrets are being committed.
6. Ensure `.env`, credentials, API keys, tokens and private configuration are not accidentally staged.
7. Commit.
8. Update `MEMORY.md` with the commit hash.
9. Push using the `nesora-ops` authenticated GitHub account.

---

# 1.2 NEVER DO THIS

Do NOT:

* Commit API keys
* Commit passwords
* Commit OAuth tokens
* Commit `.env` secrets
* Change repository ownership
* Force push unless explicitly instructed
* Rewrite project history unnecessarily
* Delete branches unnecessarily
* Modify unrelated repositories
* Push using another developer's GitHub account
* Change global Git identity when repository-local configuration is sufficient

If authentication for the `nesora-ops` GitHub account is unavailable, **do not work around it by pushing through another account**.

Report the authentication issue instead.

---

# 2. PROJECT CONTEXT

Brand:

**Better Earth Workplaces (BEW)**

BEW is a sustainability certification organization offering multiple certification pathways for organizations.

The website is content-heavy and will eventually have an admin/CMS system allowing the BEW team to:

* Add content
* Edit content
* Delete content
* Manage certifications
* Manage case studies
* Manage FAQs
* Manage blog/content
* Update website sections without editing code

IMPORTANT:

The underlying database/backend/API has ALREADY been developed separately.

Do NOT rebuild the database.

Do NOT redesign the backend architecture.

Do NOT create unnecessary backend infrastructure.

Your job is primarily to build the website frontend and connect it cleanly to the existing backend where required.

---

# 3. REFERENCE DESIGN

I will provide you with a reference website URL.

REFERENCE WEBSITE:

```text
[PASTE REFERENCE WEBSITE URL HERE]
```

Study the reference website carefully.

Use it as the primary visual/style reference for:

* Overall visual language
* Typography
* Spacing
* Navigation
* Buttons
* Cards
* Borders
* Shadows
* Colors
* Image treatment
* Section widths
* Layout rhythm
* Footer
* Responsive behavior

IMPORTANT:

Do not blindly copy proprietary assets, logos, images, or text from the reference website.

We are copying the **design language and structural approach**, not the actual content.

The BEW content remains the source of truth.

---

# 4. SOURCE CONTENT

The consolidated BEW content provided with this project is the source of truth for website copy.

Use the supplied Markdown/content documentation.

Do NOT invent large amounts of marketing copy.

Do NOT rewrite certification descriptions unnecessarily.

Do NOT remove substantive information simply because the website looks cleaner.

If content appears repetitive, use sensible component/page architecture rather than duplicating the same content unnecessarily.

If the source contains placeholders such as:

```text
[X]
[Y]
[Z]
[Placeholder]
[To be confirmed]
```

KEEP THEM.

Do not fabricate:

* Statistics
* Pricing
* Testimonials
* Certifications
* Accreditations
* Company names
* Customer logos
* Regulatory claims
* Investor claims
* Contact details

Anything explicitly marked as a placeholder remains a placeholder.

---

# 5. INITIAL WEBSITE SCOPE

Build the basic website structure for:

## Global

Create:

* Header
* Navigation
* Logo/brand area
* Primary CTA
* Mobile navigation
* Footer
* Global typography
* Global buttons
* Responsive layout
* Basic SEO metadata structure

---

# 6. MAIN PAGES

Create:

`/`

`/about`

`/organizations`

`/assessors-partners`

`/partners`

`/certifications`

`/case-studies`

`/faq`

`/insights`

---

# 7. HOMEPAGE

Route:

```text
/
```

Core sections:

1. Hero
2. Problem / sustainability challenge
3. Why Better Earth Workplaces
4. Seven certification pathways
5. Certification journey
6. Social proof
7. Audience-specific CTAs
8. Blog/content section
9. Trust/accreditation section
10. Final CTA
11. Footer

Prioritize:

**content + hierarchy + clean layout + responsiveness**

Do not overcomplicate individual sections.

---

# 8. CERTIFICATIONS HUB

Route:

```text
/certifications
```

Hero:

**Seven Pathways to Prove Your Impact**

Include:

* Introduction
* Why choose BEW certification
* Credible / Comprehensive / Comparable
* Seven certification cards
* Find Your Fit
* Certification comparison
* Channel partner section
* Social proof
* FAQ
* Final CTA

Seven certifications:

1. Water Neutral
2. Green Real Estate
3. CSR Impact
4. Green Hospitality
5. Low Carbon Product
6. Carbon Neutral Product
7. Organisation of Choice™ Workplace

Represent these as structured data wherever possible.

---

# 9. INDIVIDUAL CERTIFICATION PAGES

Create a reusable certification template.

Examples:

```text
/certifications/water-neutral
/certifications/green-real-estate
/certifications/csr-impact
/certifications/green-hospitality
/certifications/low-carbon-product
/certifications/carbon-neutral-product
/certifications/organisation-of-choice
```

Support:

* Name
* Tagline
* Who it's for
* Industry impact
* Assessment criteria
* Timeline
* Investment
* Validity
* Benefits
* CTA
* FAQ
* Related certifications

Build ONE reusable template.

Do not create seven completely separate implementations.

---

# 10. ABOUT PAGE

Route:

```text
/about
```

Include:

* Mission
* Vision
* Problem
* Differentiation
* Certification portfolio
* Leadership/governance
* Assessment model
* Assessor network
* Impact/reporting
* Technology
* Global growth
* Integrity/transparency
* Contact CTA

---

# 11. ORGANIZATIONS PAGE

Route:

```text
/organizations
```

Include:

* Why choose BEW
* Seven certification pathways
* Certification journey
* Application/assessment process
* Annual compliance / recertification
* Dashboard concept
* Timeline / effort
* Pricing placeholder
* Assessor selection
* FAQs
* Getting started CTA

---

# 12. ASSESSORS & PARTNERS

Route:

```text
/assessors-partners
```

Include:

* Assessor benefits
* Assessor role
* Specializations
* Qualifications
* Training
* Assessment process
* Channel partners
* Partner benefits
* Partner application CTA
* Relevant case study/content

---

# 13. CHANNEL PARTNERS

Route:

```text
/partners
```

Partner categories:

* CSR Consultants
* CA Firms & Company Secretaries
* ESG Advisors
* Green Finance Advisors
* Export Consultants
* Legal Firms
* Industry Associations
* Testing & Verification Labs

First version can use a clean listing/placeholder interface.

Architecture must allow backend-driven partner records later.

---

# 14. CASE STUDIES

Create:

```text
/case-studies
```

and:

```text
/case-studies/[slug]
```

Architecture must support multiple case studies.

Do not hardcode around one case study.

---

# 15. FAQ

Create:

```text
/faq
```

Use supplied FAQ content.

Build reusable accordion components.

Architecture should support dynamically managed FAQs.

---

# 16. BLOG / INSIGHTS

Create:

```text
/insights
```

and:

```text
/insights/[slug]
```

Basic content structure is sufficient initially.

Architecture should allow articles to eventually be managed from the CMS.

---

# 17. ADMIN / CMS

The backend/database already exists.

Before implementing CMS functionality:

1. Inspect the existing project.
2. Inspect the existing API.
3. Identify endpoints.
4. Identify models.
5. Identify authentication.
6. Reuse existing functionality.
7. Do NOT duplicate backend functionality.

Basic admin routes may include:

```text
/admin
/admin/certifications
/admin/case-studies
/admin/faqs
/admin/insights
/admin/partners
```

Admin should eventually support:

* Pages
* Certifications
* FAQs
* Case studies
* Insights/blog
* Partners
* Testimonials
* Website content

First implementation should prioritize simple functional CRUD.

Do not build an elaborate enterprise CMS.

---

# 18. COMPONENT ARCHITECTURE

Create reusable components such as:

* Header
* Footer
* Button
* Container
* Section
* Hero
* Card
* CertificationCard
* CertificationGrid
* CertificationDetails
* CTASection
* FAQAccordion
* Testimonial
* BlogCard
* CaseStudyCard
* PartnerCard
* Breadcrumbs
* ComparisonTable

Avoid giant page components.

Avoid duplicated certification markup.

---

# 19. DATA ARCHITECTURE

Repeated structured content should be represented as data.

For example:

```ts
Certification {
  id
  slug
  name
  tagline
  description
  audience
  industryImpact
  assessmentCriteria
  timeline
  investment
  validity
  keyBenefits
  faq
  status
}
```

Adapt this to the existing backend.

Do not blindly create a new schema.

Goal:

> Content should be data, not duplicated markup.

---

# 20. DESIGN PRINCIPLES

The website should feel:

* Premium
* Trustworthy
* Institutional
* Modern
* Sustainability-focused
* Clean
* Credible
* Content-rich without feeling cluttered

Avoid:

* Excessive gradients
* Excessive animation
* Generic SaaS appearance
* Excessive empty space
* Excessive glassmorphism
* Excessive rounded cards
* Excessive shadows

The reference website determines the final visual direction.

---

# 21. RESPONSIVENESS

The website MUST work on:

* Desktop
* Laptop
* Tablet
* Mobile

Pay particular attention to:

* Navigation
* Certification cards
* Tables
* Long content
* CTAs
* Forms
* Footer
* Typography

---

# 22. CONTENT ARCHITECTURE

Do not duplicate the same certification content across:

* Homepage
* Certification Hub
* Organizations
* Certification detail page

Prefer shared structured certification data.

The same principle applies to:

* FAQs
* Case studies
* Partners
* Insights
* Testimonials

---

# 23. SEO FOUNDATION

Implement:

* Page titles
* Meta descriptions
* Canonical URLs where appropriate
* Semantic headings
* H1/H2/H3 hierarchy
* Open Graph structure
* Image alt text
* Clean URLs

Do not spend excessive time on advanced SEO.

---

# 24. PERFORMANCE

Keep the website lightweight.

Avoid unnecessary packages.

Use:

* Reusable components
* Optimized images
* Lazy loading where appropriate
* Sensible code splitting

Do not sacrifice maintainability for micro-optimizations.

---

# 25. PLACEHOLDERS

Never invent missing business information.

Keep placeholders such as:

```text
[X]
[Y]
[Placeholder]
[To be confirmed]
```

This is especially important for:

* Pricing
* Statistics
* Certifications
* Accreditations
* Testimonials
* Contact details
* Links
* Impact metrics

---

# 26. CONTENT CLAIMS REQUIRING CONFIRMATION

Do not silently modify potentially sensitive claims involving:

* Certification timelines
* Certification validity
* Annual recertification
* Pricing
* Accreditation
* Recognition
* Investor claims
* Regulatory claims
* Organisation of Choice™ relationship
* Assessor independence
* Referral fees
* Training duration
* Impact statistics
* Testimonials

Preserve source content but flag questionable/placeholder items.

---

# 27. DEVELOPMENT WORKFLOW

Before coding:

## Step 1 — Read project memory

Read:

```text
CLAUDE.md
MEMORY.md
```

## Step 2 — Inspect repository

Understand:

* Framework
* Frontend
* Styling
* Existing components
* API
* Database
* Authentication
* Existing routes
* Existing assets
* Environment configuration

## Step 3 — Inspect backend integration

Determine exactly how the existing backend is intended to be consumed.

Do not rebuild it.

## Step 4 — Study reference website

Study the supplied reference website.

Identify:

* Header
* Typography
* Colors
* Spacing
* Cards
* Buttons
* Sections
* Footer
* Mobile behavior

## Step 5 — Build foundation

Create:

* Global styles
* Layout
* Header
* Footer
* Container
* Buttons
* Typography
* Responsive utilities

## Step 6 — Homepage

Build the homepage.

## Step 7 — Certification system

Build:

* Structured certification data
* Certification cards
* Hub
* Reusable detail page

## Step 8 — Remaining pages

Implement:

* About
* Organizations
* Assessors & Partners
* Partners
* Case Studies
* FAQ
* Insights

## Step 9 — CMS

Connect existing backend.

Implement basic CRUD.

## Step 10 — QA

Check:

* Desktop
* Tablet
* Mobile
* Navigation
* Console errors
* API errors
* Empty states
* Loading states
* Error states
* Overflow
* Typography
* Broken links

## Step 11 — Update MEMORY.md

Record:

* What was completed
* Files changed
* Architecture decisions
* Testing
* Known issues
* Remaining work

## Step 12 — Git

Review:

```bash
git status
git diff
```

Configure repository Git identity if necessary:

```bash
git config user.name "nesora-ops"
git config user.email "ops@nesora.co.in"
```

Create a meaningful commit.

Record the commit in `MEMORY.md`.

Push using the `nesora-ops` GitHub account when authorized/available.

---

# 28. DO NOT OVERBUILD

This is the BASE VERSION.

Do NOT spend significant time building:

* Complex animations
* Advanced personalization
* Advanced analytics
* Elaborate dashboards
* AI features
* Advanced search
* Certification scoring engines
* Payment systems
* Multi-language systems
* Complex permission systems

unless they already exist in the repository or are explicitly required.

We will add these later.

---

# 29. CODE QUALITY

Write production-quality code.

Prioritize:

* Readability
* Reusability
* Maintainability
* Type safety
* Sensible naming
* Small reusable components
* Separation of UI and data
* No unnecessary duplication

Avoid:

* Giant components
* Repeated certification markup
* Random inline styling
* Dead code
* Unused dependencies
* Temporary hacks

---

# 30. SECURITY

Never expose:

* API keys
* Database credentials
* Authentication secrets
* Private tokens
* `.env` values

Before committing, check staged files.

If you discover secrets already committed historically, do not attempt destructive history rewriting without explicit instruction.

---

# 31. DEFINITION OF DONE FOR BASE VERSION

The first/base implementation should have:

* Professional base styling
* Working navigation
* Homepage
* Certifications Hub
* Individual certification pages
* About
* Organizations
* Assessors & Partners
* Partners
* Case Studies
* FAQ
* Insights
* Responsive layouts
* Existing backend integration where applicable
* Basic CMS/admin functionality
* Reusable component architecture
* No major console errors
* No obvious mobile breakage

The website does NOT need to be visually perfect yet.

Priority:

**1. Correct structure**
**2. Correct content**
**3. Correct functionality**
**4. Responsive behavior**
**5. Clean architecture**
**6. Visual polish**

---

# 32. AGENT HANDOFF REQUIREMENT

Assume that at any moment another Claude agent may take over this repository.

Therefore:

Before ending a session, ensure:

```text
CLAUDE.md
MEMORY.md
```

accurately represent the project.

A new agent should be able to:

1. Read `CLAUDE.md`
2. Read `MEMORY.md`
3. Inspect Git status
4. Understand what has already been built
5. Understand what remains
6. Continue development safely

without asking the previous agent what happened.

---

# 33. FINAL RESPONSE AFTER EACH DEVELOPMENT SESSION

At the end of each execution/session, report briefly:

## Completed

* ...

## Files Changed

* ...

## Testing

* ...

## Known Issues

* ...

## Git

```text
Commit: <hash>
Message: <message>
```

## Next Step

* ...

And ensure the same information has been recorded in `MEMORY.md`.

---

# 34. MOST IMPORTANT RULE

Do not confuse **development speed** with **development quality**.

Use AI-assisted development aggressively where useful, but the final repository must be:

* Structured
* Maintainable
* Reusable
* Tested
* Documented
* Easy for another agent to continue

The objective is not merely to make the website appear on screen.

The objective is to establish a **clean base that can be expanded into the production BEW website without having to rewrite the project.**

Now:

**Read `CLAUDE.md` and `MEMORY.md` first.**

Then inspect the repository.

Then inspect the reference website.

Then build the base implementation.

Do not begin by asking unnecessary questions.
