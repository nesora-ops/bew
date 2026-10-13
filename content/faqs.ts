import type { FaqGroup } from "./types";

/**
 * FAQs.
 *
 * Source: BEW_Consolidated_Deduplicated.md §3 "FAQ" (organization-facing groups)
 * and §9 "Certifications Hub FAQ".
 *
 * Several answers describe proposals the source itself marks as requiring
 * confirmation (multi-certification discounts, payment plans, badge policy,
 * post-assessment mentoring). Those are reproduced as written and flagged, not
 * silently resolved (PROMPT.md §26).
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "eligibility",
    title: "Eligibility & Fit",
    items: [
      {
        question: "Is my organization too small?",
        answer:
          "No. Certifications are designed for organizations of all sizes, with scope, effort, and pricing adjusted accordingly.",
      },
      {
        question: "Do I need to operate in a specific country?",
        answer:
          "No. BEW is a global authority. Remote assessment or training-partner support may be possible where local assessor coverage is unavailable.",
      },
      {
        question: "What if we already have ISO, B Corp, or another certification?",
        answer:
          "Existing certifications and third-party data can support the assessment but do not replace BEW's independent criteria.",
      },
    ],
  },
  {
    id: "assessment",
    title: "Assessment & Process",
    items: [
      {
        question: "What happens if we do not pass?",
        answer:
          "You receive detailed feedback on gaps and can reapply after remediation, typically after 12 months.",
      },
      {
        question: "Can we appeal?",
        answer:
          "Yes. An appeal can be requested within 30 days. An independent panel reviews the assessment and issues a final decision.",
      },
      {
        question: "How long is certification valid?",
        answer:
          "3 years, with annual recertification and compliance checks.",
      },
      {
        question: "Can we work with a consultant during assessment?",
        answer:
          "Yes. Consultants may assist with data collection, gap analysis, or remediation, but the assessment itself must remain independent.",
      },
    ],
  },
  {
    id: "costs",
    title: "Costs",
    items: [
      {
        question: "Are payment plans available?",
        answer:
          "Yes. A typical three-installment structure applies: application, assessment start, and certification decision. [Final policy to be confirmed]",
      },
      {
        question: "What about multiple certifications?",
        answer:
          "Organizations pursuing two or more certifications may receive 10–15% savings. [Discount to be confirmed]",
      },
    ],
  },
  {
    id: "using-certification",
    title: "Using Certification",
    items: [
      {
        question: "Can we use the BEW badge?",
        answer:
          "Yes. It may be used on websites, reports, packaging, and marketing materials, subject to usage guidelines. The badge should link to the public certification record. [Final badge policy to be confirmed]",
      },
      {
        question: "Can BEW certification appear in investor reports?",
        answer:
          "Yes. Certification is intended for use in ESG disclosures, annual reports, and investor decks.",
      },
      {
        question: "What if certification is lost?",
        answer:
          "The badge can no longer be used while certification is inactive. The directory remains transparent about status and date, and reapplication may occur the following year.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        question: "Where is a sample questionnaire available?",
        answer:
          "[Certification name] sample questionnaire: [Link to PDF]",
      },
      {
        question: "Is training available?",
        answer:
          "Yes: webinars, written guides, and one-on-one orientation calls.",
      },
      {
        question: "Who is the contact during the process?",
        answer:
          "The assessor is the primary contact. Broader BEW process questions can be directed to [certify@betterearthworkplace.com].",
      },
    ],
  },
];

/** FAQ shown on the certifications hub. Source: §9 "Certifications Hub FAQ". */
export const certificationsHubFaq: FaqGroup = {
  id: "certifications-hub",
  title: "Certifications FAQ",
  items: [
    {
      question: "Can I pursue multiple certifications?",
      answer:
        "Yes. Many organizations pursue 2–3 certifications aligned with material sustainability issues. Multi-certification discounts of 10–15% apply for two or more. [Discount to be confirmed]",
    },
    {
      question: "Which certification should we start with?",
      answer:
        "Use Find Your Fit or contact the team. We recommend starting with the certification addressing your organization's highest-material issue.",
    },
    {
      question: "Do we need to be perfect to get certified?",
      answer:
        "No. Certification requires genuine commitment and structured practices rather than perfection, and organizations may improve during assessment.",
    },
    {
      question: "How long does certification take?",
      answer:
        "The overall range is 8–16 weeks depending on the certification. Most organizations move from application to certification in 2–3 months.",
    },
    {
      question: "What if we do not pass?",
      answer:
        "Organizations receive detailed gap feedback and may reapply after implementing improvements, typically 12 months later. [Whether the previous assessor may mentor remediation is subject to confirmation against BEW's independence policy]",
    },
    {
      question: "Are there payment plans?",
      answer:
        "Yes. Payment is typically split into three installments. [Final policy to be confirmed]",
    },
    {
      question: "Can we use the badge in marketing?",
      answer:
        "Yes. The badge links to a public certification record, and BEW provides digital assets and usage guidelines. [Final badge policy and public-directory functionality to be confirmed]",
    },
  ],
};
