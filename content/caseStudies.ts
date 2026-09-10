import type { CaseStudy } from "./types";

/**
 * Case studies.
 *
 * Source: BEW_Consolidated_Deduplicated.md §6 "Case Studies" (and the same study as
 * §1 "Featured Case Study — Manufacturing", retained once per the source's own
 * consolidation note).
 *
 * The source states two further case studies are required, covering real estate and
 * hospitality, and that company names and figures must be replaced with documented,
 * publishable evidence before launch. Array-shaped so additions are data, not code.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "sustainable-manufacturer",
    title: "Environmental Impact — Sustainable Manufacturer",
    category: "Environmental Impact",
    certification: "Low Carbon Product",
    challenge:
      "A mid-size product manufacturer wanted to reduce supply-chain emissions and communicate progress to B2B customers but lacked credible third-party verification.",
    solution:
      "Low Carbon Product Certification with a supply-chain sustainability partner.",
    result:
      "Certification in 10 weeks, 18% reduction in Scope 3 emissions, and three enterprise contracts citing the BEW badge.",
    quote: {
      text: "The certification gave us credibility we could not have built alone.",
      attribution: "[CEO/Founder name]",
    },
  },
];
