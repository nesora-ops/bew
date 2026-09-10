import type { JourneyStage } from "./types";

/**
 * The five-stage certification journey.
 *
 * Source: BEW_Consolidated_Deduplicated.md §1 "How Certification Works" and
 * §3 "Detailed Certification Journey". Shared by the homepage and /organizations
 * so the journey is described once, not twice (PROMPT.md §22).
 *
 * Note: the source flags its own inconsistency here — the headline range is
 * 8–12 weeks while stage-level timings imply longer. Both are reproduced as written;
 * stage-level timing is to be finalized before publication.
 */
export const headlineTimeline = "Approximately 8–12 weeks from preparation through certification.";

export const journeyStages: JourneyStage[] = [
  {
    stage: "Stage 1",
    title: "Explore & Qualify",
    timing: "Week 1",
    points: [
      "Choose a certification pathway.",
      "Review public criteria.",
      "Complete a brief eligibility check.",
    ],
  },
  {
    stage: "Stage 2",
    title: "Prepare & Gather",
    timing: "Weeks 2–4",
    points: [
      "Receive the assessment framework, sample questionnaire, preparation checklist, and estimated timeline.",
      "Gather operational data such as energy, water, waste, and emissions.",
      "Collect policies and procedures, supplier certifications, and regulatory filings.",
      "Compile impact metrics and outcome data.",
      "Select a qualified assessor from the BEW network.",
    ],
  },
  {
    stage: "Stage 3",
    title: "Assessment",
    timing: "Typically 4–6 weeks",
    points: [
      "Document review.",
      "Site verification or virtual walkthrough.",
      "Stakeholder interviews.",
      "Data validation.",
      "Scoring against BEW criteria.",
      "Regular check-ins and draft findings before the final report.",
    ],
  },
  {
    stage: "Stage 4",
    title: "Independent Review & Certification",
    timing: "Weeks 9–10",
    points: [
      "An independent review panel verifies correct application of criteria.",
      "Sufficiency and credibility of evidence is confirmed.",
      "Scoring consistency is checked.",
      "Absence of conflicts of interest is verified.",
    ],
  },
  {
    stage: "Stage 5",
    title: "Ongoing Compliance & Reporting",
    timing: "Annual checks, typically 2–4 weeks",
    points: [
      "Certification is valid for 3 years, with annual recertification and compliance checks.",
      "Annual checks are lighter-touch than the initial assessment.",
      "Certified organizations receive a digital badge, public directory listing, and impact dashboard.",
      "Reporting tools, partner network access, and press-release support are included.",
    ],
  },
];

/** Possible outcomes of Stage 4. Source: §1 Stage 4. */
export const certificationOutcomes = [
  {
    title: "Certified",
    description:
      "Meets the standard; receives a time-bound certification badge, dashboard access, and directory listing.",
  },
  {
    title: "Certified with Conditions",
    description:
      "Substantially meets the standard with minor gaps; typically 6–12 months for remediation and follow-up verification.",
  },
  {
    title: "Not Yet Certified",
    description:
      "Gaps must be addressed before reapplication, typically after 12 months.",
  },
];
