import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { getCaseStudies, getCertifications } from "@/content";
import { partnerBenefits, partnerCategories } from "@/content/partners";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { BulletList, CaseStudyCard } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Assessors & Partners",
  description:
    "Become a BEW Assessor and lead independent verification of real environmental and social impact.",
  alternates: { canonical: "/assessors-partners" },
};

/** Source: BEW_Consolidated_Deduplicated.md §4 "Why Join BEW". */
const reasons = [
  {
    title: "Establish Credibility",
    description:
      "Assessors become part of an independent certification authority whose verification is intended to matter to investors, regulators, and markets.",
  },
  {
    title: "Expand Your Practice",
    description:
      "Assessors can work within their sustainability, environmental, audit, or industry specialization.",
  },
  {
    title: "Flexible, High-Value Work",
    description:
      "Assessments are project-based, typically involving 4–6 weeks of active work within an 8–12 week certification timeline.",
  },
  {
    title: "Revenue Stability & Growth",
    description:
      "Assessment referrals, transparent per-assessment fees, and volume bonuses for high performers. [Assessor fees to be confirmed]",
  },
  {
    title: "Professional Development",
    description:
      "Assessors receive training, updates on sustainability standards, and access to a global peer network.",
  },
  {
    title: "Work with Impact",
    description:
      "The role focuses on verification and constructive feedback rather than selling remediation to assessed organizations.",
  },
];

/** Source: §4 "The Assessor Role". */
const roleResponsibilities = [
  {
    title: "Conduct Structured Assessments",
    points: [
      "Review policies, procedures, and data",
      "Conduct site visits or virtual walkthroughs",
      "Interview stakeholders",
      "Validate claimed metrics",
      "Score organizations against BEW criteria",
      "Draft feedback reports covering findings, strengths, gaps, and recommendations",
    ],
  },
  {
    title: "Maintain Independence",
    points: [
      "Assessors cannot sell consulting or remediation services to organizations they assess.",
      "Where gap-closure support is needed, assessors may recommend consulting partners and may earn referral fees where applicable.",
      "An assessor cannot become the organization's primary consultant.",
    ],
  },
  {
    title: "Document & Report",
    points: [
      "Maintain clear audit trails",
      "Submit evidence and scoring to the review panel",
      "Respond to clarification requests",
      "Remain available for post-assessment questions",
    ],
  },
  {
    title: "Support Recertification",
    points: [
      "Assessors may continue as contacts for annual recertification, which is lighter-touch than the initial assessment.",
    ],
  },
  {
    title: "Continuous Learning",
    points: [
      "Participate in quarterly webinars and training",
      "Stay current with assessment frameworks",
      "Contribute feedback on criteria and processes",
      "Exchange best practices with peers",
    ],
  },
];

/** Source: §4 "Assessor Specializations". */
const specializations: Record<string, string> = {
  "water-neutral": "Water audits, supply-chain water risk, conservation technology",
  "green-real-estate":
    "Building energy efficiency, green-building standards, retrofit economics",
  "low-carbon-product":
    "Manufacturing, lifecycle assessment, supply-chain emissions",
  "carbon-neutral-product":
    "Carbon accounting, offsetting, emissions measurement",
  "green-hospitality":
    "Hospitality operations, guest engagement, waste and energy management",
  "csr-impact":
    "Community development, social-impact measurement, stakeholder engagement",
  "organisation-of-choice":
    "HR, employee engagement, workplace culture, governance",
};

const baselineQualifications = [
  "5+ years of relevant professional experience",
  "Domain expertise in at least one pathway",
  "Assessment or audit experience",
  "Bachelor's degree minimum; relevant credentials preferred",
  "Strong communication skills",
  "Commitment to independence and integrity",
];

const backgroundsSought = [
  "Sustainability and environmental consultants",
  "Environmental engineers and auditors",
  "Impact measurement specialists",
  "Chartered accountants and company secretaries",
  "CSR professionals with verification experience",
  "Hospitality operations managers",
  "Real estate and construction professionals",
  "Supply-chain and procurement specialists",
  "Industry association and policy experts",
  "Academic sustainability, environmental, and social-impact researchers",
];

/** Source: §4 "Training & Onboarding". */
const trainingModules = [
  {
    title: "Module 1: BEW Fundamentals",
    duration: "2 days",
    points: [
      "History, mission, governance",
      "Independence and conflict-of-interest policies",
      "Three certification pathways",
      "Technology platform and assessor portal",
    ],
  },
  {
    title: "Module 2: Assessment Methodology",
    duration: "3 days",
    points: [
      "Structured interviews",
      "Document review",
      "Data validation",
      "Site inspection",
      "Evidence gathering and scoring",
      "Report writing",
    ],
  },
  {
    title: "Module 3: Specialization",
    duration: "3–5 days",
    points: [
      "Certification-specific criteria",
      "Sample assessments and case studies",
      "Common organizational gaps",
      "Best practices",
      "Q&A with BEW certification leadership",
    ],
  },
  {
    title: "Module 4: Practical Exercise",
    duration: "2 weeks",
    points: ["Mock assessment", "Draft report", "Feedback", "Revision and resubmission"],
  },
];

const ongoingSupport = [
  "Monthly office hours",
  "Quarterly webinars",
  "Assessor community forum",
  "Annual assessor recertification",
  "Continuing-education credits",
];

const howOrganizationsFindAssessors = [
  "Organization chooses a certification pathway.",
  "Organization browses the assessor network.",
  "Profiles are filtered by certification, geography, industry, and availability.",
  "Organization reviews assessor expertise, background, past clients, reviews, and availability.",
  "Organization requests an engagement.",
];

export default function AssessorsPartnersPage() {
  const certifications = getCertifications();
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Assessors & partners"
        title="Join the global sustainability"
        accent="certification authority."
        description="Become a BEW Assessor and lead independent verification of real environmental and social impact. Build your practice. Build your reputation. Build your revenue."
        actions={
          <>
            <Button href="/contact">Apply as an Assessor</Button>
            <Button href="/partners" variant="secondary">
              Become a Channel Partner
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Why join BEW"
          title="Independent work,"
          accent="with weight behind it."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <FeatureCard title={reason.title} description={reason.description} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="assessor-role">
        <SectionHeading
          eyebrow="The assessor role"
          title="What assessors do"
          description="Typical active engagement is 4–6 weeks."
        />
        <ol className="mt-12 border-t border-line">
          {roleResponsibilities.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-4 border-b border-line py-8 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <p className="font-mono text-xs tracking-widest text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <div className="mt-3">
                  <BulletList items={item.points} />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Card className="mt-10 flex gap-4 border-accent/40 bg-accent-soft">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h3 className="text-base font-medium text-ink">
              Independence policy requires confirmation
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
              The source permits assessor referral fees for consulting partners while
              prohibiting assessors from consulting their own assessed organizations. The
              conflict-of-interest policy must be made explicit before publication.
            </p>
          </div>
        </Card>
      </Section>

      <Section id="specializations">
        <SectionHeading
          eyebrow="Assessor specializations"
          title="Specialize in one pathway, or several"
        />
        <dl className="mt-12 border-t border-line">
          {certifications.map((certification) => (
            <div
              key={certification.slug}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[280px_1fr] sm:gap-8"
            >
              <dt className="font-medium text-ink">{certification.shortName}</dt>
              <dd className="text-[15px] text-ink-subdued">
                {specializations[certification.slug]}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="qualifications">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Required qualifications" title="Baseline" />
            <div className="mt-8">
              <BulletList items={baselineQualifications} />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Backgrounds sought"
              title="Who we look for"
              description="BEW seeks assessors across geographies, industries, and backgrounds, including emerging markets and niche specialties."
            />
            <div className="mt-8">
              <BulletList items={backgroundsSought} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="training">
        <SectionHeading
          eyebrow="Training & onboarding"
          title="Four modules"
          description="Source-stated training duration: 2–3 weeks online, with flexible scheduling. Module totals can appear longer because practical work overlaps other modules. The final schedule requires confirmation."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2">
          {trainingModules.map((module) => (
            <li key={module.title}>
              <Card className="h-full">
                <p className="font-mono text-xs tracking-widest text-accent uppercase">
                  {module.duration}
                </p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.01em] text-ink">
                  {module.title}
                </h3>
                <div className="mt-4">
                  <BulletList items={module.points} />
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
          Ongoing support
        </h3>
        <BulletList items={ongoingSupport} columns={2} />
      </Section>

      <Section id="finding-assessors">
        <SectionHeading
          eyebrow="How organizations find assessors"
          title="Chosen, not assigned"
          description="The assessor can accept, decline, or propose changes to scope, timeline, or fees."
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howOrganizationsFindAssessors.map((step, index) => (
            <li key={step}>
              <FeatureCard
                eyebrow={String(index + 1).padStart(2, "0")}
                title={step}
                description=""
              />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="channel-partners">
        <SectionHeading
          eyebrow="Channel partners"
          title="Grow your practice"
          accent="alongside BEW."
          description="Certified channel partners support organizations from readiness assessment through recertification."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {partnerCategories.map((partner) => (
            <li
              key={partner.name}
              className="rounded-btn border border-line bg-surface px-4 py-2 text-sm text-ink-subdued"
            >
              {partner.name}
            </li>
          ))}
        </ul>
        <h3 className="mt-12 mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
          Partner benefits
        </h3>
        <BulletList items={partnerBenefits} columns={2} />
        <div className="mt-10">
          <Button href="/partners">Explore Channel Partnership</Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Case studies"
          title="Assessment in practice"
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <CaseStudyCard caseStudy={caseStudy} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection
        eyebrow="Join us"
        title="Apply to the assessor network"
        description="Tell us your specialization, geography, and availability."
        primary={{ label: "Apply as an Assessor", href: "/contact" }}
        secondary={{ label: "Become a Channel Partner", href: "/partners" }}
      />
    </>
  );
}
