/**
 * Content accessors — the single seam between pages and content.
 *
 * Pages must import from here, never from the data modules directly. The admin/CMS is
 * being built on the existing backend and wired in later; when it lands, these
 * functions become async fetches and the pages above them stay untouched.
 */
import { certifications as allCertifications } from "./certifications";
import { caseStudies } from "./caseStudies";
import { certificationsHubFaq, faqGroups } from "./faqs";
import { insights } from "./insights";
import type { CaseStudy, Certification, FaqGroup, Insight } from "./types";

const certifications = allCertifications.filter((certification) => !certification.hidden);

export function getCertifications(): Certification[] {
  return certifications;
}

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((certification) => certification.slug === slug);
}

/** Other pathways, for the "related certifications" block on a detail page. */
export function getRelatedCertifications(slug: string, limit = 3): Certification[] {
  const current = getCertification(slug);
  if (!current) return certifications.slice(0, limit);

  const sameCategory = certifications.filter(
    (certification) =>
      certification.slug !== slug && certification.category === current.category,
  );
  const others = certifications.filter(
    (certification) =>
      certification.slug !== slug && certification.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getFaqGroups(): FaqGroup[] {
  return faqGroups;
}

export function getCertificationsHubFaq(): FaqGroup {
  return certificationsHubFaq;
}

export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getInsights(): Insight[] {
  return insights;
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export * from "./types";
