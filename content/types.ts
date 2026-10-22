/**
 * Content types.
 *
 * Every repeated block on the site is data, not markup (PROMPT.md §19, §22).
 * Copy is transcribed from BEW_Consolidated_Deduplicated.md — the single source of
 * truth. Bracketed tokens such as `[X]` are placeholders from that document and are
 * preserved verbatim; `<PlaceholderText>` renders them as visible placeholders.
 */

export type CertificationCategory = "environmental" | "social" | "workplace";

export interface Certification {
  slug: string;
  name: string;
  /** Short label for cards, tables and breadcrumbs. */
  shortName: string;
  tagline: string;
  category: CertificationCategory;
  /** One-line summary used on the homepage and hub cards. */
  description: string;
  audience: string[];
  industryImpact: string;
  assessmentCriteria: string[];
  timeline: string;
  validity: string;
  investment: string;
  keyBenefit: string;
  /** Row values for the certification comparison table. */
  comparison: {
    primaryIndustries: string;
    smallOrgInvestment: string;
    keyStakeholder: string;
  };
  /** Flagged claim requiring confirmation before publication (PROMPT.md §26). */
  note?: string;
  /** Kept in the data but left off the site: no card, no route, no sitemap entry. */
  hidden?: boolean;
}

export interface JourneyStage {
  stage: string;
  title: string;
  timing: string;
  points: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  certification: string;
  challenge: string;
  solution: string;
  result: string;
  quote: { text: string; attribution: string };
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface PartnerCategory {
  name: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
