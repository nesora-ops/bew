import type { PartnerCategory } from "./types";

/**
 * Channel partner content.
 *
 * Source: BEW_Consolidated_Deduplicated.md §5 "Channel Partners" and
 * §9 "Channel Partner Network".
 *
 * The eight categories come from the source verbatim. Descriptions summarize the
 * support activities the source lists; no partner firms are named, because none are
 * given in the source. This shape is what backend-driven partner records will fill.
 */
export const partnerCategories: PartnerCategory[] = [
  {
    name: "CSR Consultants",
    description:
      "Advise on programme design, community engagement, and impact measurement ahead of CSR Impact certification.",
  },
  {
    name: "CA Firms & Company Secretaries",
    description:
      "Support governance, statutory filings, and the documentation trail assessments rely on.",
  },
  {
    name: "ESG Advisors",
    description:
      "Map material issues, prepare disclosures, and align certification with wider ESG reporting.",
  },
  {
    name: "Green Finance Advisors",
    description:
      "Connect verified impact to capital — sustainability-linked finance, green bonds, and investor reporting.",
  },
  {
    name: "Export Consultants",
    description:
      "Help exporters meet the sustainability expectations of overseas buyers and regulated markets.",
  },
  {
    name: "Legal Firms",
    description:
      "Advise on regulatory readiness, claims substantiation, and contractual sustainability commitments.",
  },
  {
    name: "Industry Associations",
    description:
      "Bring certification pathways to their membership and support sector-wide benchmarking.",
  },
  {
    name: "Testing & Verification Labs",
    description:
      "Provide the third-party testing and measurement that underpins evidence submitted for assessment.",
  },
];

/** What partners do for organizations. Source: §5 "Why Organizations Use Channel Partners". */
export const partnerSupportActivities = [
  "Gap analysis and readiness assessment",
  "Data collection and organization",
  "Third-party testing and verification",
  "Remediation planning",
  "Impact reporting and communication",
];

/**
 * Partner benefits. Source: §5 "Partner Benefits".
 *
 * The source presents these as benefits partners "may receive". The 20% revenue share
 * is one of the items the source flags for confirmation, alongside the independence
 * policy governing referral fees.
 */
export const partnerBenefits = [
  "Co-marketing support",
  "Logo placement on the BEW website",
  "Revenue share of 20% of certification fees for referred organizations",
  "Silver / Gold / Platinum tiers based on referral volume",
  "Exclusive training",
  "Early access to new certifications",
  "Lead-generation support",
];
