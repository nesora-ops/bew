import type { Metadata } from "next";
import { getCertifications, getFaqGroups } from "@/content";
import {
  certificationOutcomes,
  headlineTimeline,
  journeyStages,
} from "@/content/journey";
import { PageHero } from "@/components/PageHero";
import { CertificationGrid } from "@/components/CertificationCard";
import { CtaSection } from "@/components/CtaSection";
import { FaqGroups } from "@/components/FaqAccordion";
import { BulletList, JourneyTimeline } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "For Organizations",
  description:
    "Step-by-step certification that demonstrates real environmental and social impact to investors, customers, and your team.",
  alternates: { canonical: "/organizations" },
};

/** Source: BEW_Consolidated_Deduplicated.md §3 "Why Organizations Choose BEW". */
const reasons = [
  {
    title: "Investor Confidence",
    description:
      "Third-party verification signals that sustainability commitments are real, measured, and comparable.",
  },
  {
    title: "Customer Trust",
    description:
      "A BEW badge provides recognized verification rather than a self-reported claim and can support differentiation and premium positioning.",
  },
  {
    title: "Regulatory Readiness",
    description:
      "BEW is aligned with emerging ESG disclosure expectations, including SEC climate rules, EU CSRD, and ISSB standards.",
  },
  {
    title: "Employee & Stakeholder Alignment",
    description:
      "Certification provides tangible evidence that sustainability is embedded in operations rather than being only a marketing message.",
  },
  {
    title: "Benchmarking & Continuous Improvement",
    description:
      "The impact dashboard enables peer comparison, improvement planning, and year-over-year progress tracking.",
  },
];

/** Source: §3 "Total Timeline" and "Effort". */
const timelineBreakdown = [
  { label: "Preparation", value: "2–4 weeks" },
  { label: "Assessment", value: "4–6 weeks" },
  { label: "Review & decision", value: "2 weeks" },
  { label: "Total", value: "8–12 weeks (approximately 2–3 months)" },
];

const effort = [
  "Part-time involvement from 1–2 internal stakeholders",
  "External data collection where needed",
  "Minimal disruption to daily operations",
];

const included = [
  "Initial eligibility assessment",
  "Assessor assignment and coordination",
  "Structured assessment",
  "Detailed feedback report",
  "Independent review and certification decision",
  "3-year certification badge and digital assets",
  "1 year of impact dashboard access",
  "First annual recertification",
];

const notIncluded = [
  "Remediation consulting or gap-closure support",
  "Third-party testing or audits",
  "Marketing or PR services",
];

const dashboardCapabilities = [
  "Track impact metrics",
  "Benchmark against anonymized peers",
  "Generate reports",
  "Download certification documents",
  "Maintain audit trails",
  "Renew certification online",
];

const recognition = [
  "Digital badge",
  "Searchable public directory listing",
  "Press-release support",
  "Partner-network access",
  "Impact dashboard",
];

export default function OrganizationsPage() {
  const certifications = getCertifications();
  const faqGroups = getFaqGroups();

  return (
    <>
      <PageHero
        eyebrow="For organizations"
        title="Prove your sustainability."
        accent="Get recognized."
        description="Step-by-step certification that demonstrates real environmental and social impact to investors, customers, and your team."
        actions={
          <>
            <Button href="#get-started">Start Your Certification</Button>
            <Button href="/certifications" variant="secondary">
              Choose Your Certification
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Why organizations choose BEW"
          title="Five reasons certification"
          accent="earns its cost."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <FeatureCard title={reason.title} description={reason.description} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pathways">
        <SectionHeading
          eyebrow="Certification pathways"
          title="Seven pathways, one standard"
          description="Choose the certification that aligns with your most material sustainability issue."
        />
        <div className="mt-12">
          <CertificationGrid certifications={certifications} />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/certifications">Choose Your Certification</Button>
          <Button href="/certifications#find-your-fit" variant="secondary">
            Find Your Fit
          </Button>
        </div>
      </Section>

      <Section id="journey">
        <SectionHeading
          eyebrow="The certification journey"
          title="Transparent & achievable"
          description={headlineTimeline}
        />
        <div className="mt-12">
          <JourneyTimeline stages={journeyStages} />
        </div>

        <h3 className="mt-14 mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
          Possible outcomes
        </h3>
        <ul className="grid gap-4 lg:grid-cols-3">
          {certificationOutcomes.map((outcome) => (
            <li key={outcome.title}>
              <FeatureCard title={outcome.title} description={outcome.description} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="timeline">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Total timeline" title="How long it takes" />
            <dl className="mt-8 border-t border-line">
              {timelineBreakdown.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                >
                  <dt className="text-[15px] text-ink-subdued">{row.label}</dt>
                  <dd className="text-[15px] font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeading eyebrow="Effort" title="What it asks of your team" />
            <div className="mt-8">
              <BulletList items={effort} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="recognition">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Certification recognition"
              title="What you receive"
            />
            <div className="mt-8">
              <BulletList items={recognition} />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Dashboard & reporting"
              title="After certification"
              description="Certification is valid for 3 years, with annual compliance reporting. The typical annual check takes 2–4 weeks."
            />
            <div className="mt-8">
              <BulletList items={dashboardCapabilities} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="investment">
        <SectionHeading
          eyebrow="Cost & investment"
          title="Pricing varies by certification"
          accent="and organization size."
          description="Pricing is intended to be all-in for the certification process — no hidden fees."
        />

        <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Indicative certification investment by organization size
            </caption>
            <thead>
              <tr className="border-b border-line">
                {[
                  "Certification",
                  "Small org (<500 employees)",
                  "Mid-size (500–5,000)",
                  "Large (>5,000)",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="py-3 pr-6 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {certifications.map((certification) => (
                <tr key={certification.slug} className="border-b border-line">
                  <th scope="row" className="py-4 pr-6 font-medium text-ink">
                    {certification.shortName}
                  </th>
                  {["[$X]", "[$Y]", "[$Z]"].map((value, index) => (
                    <td key={index} className="py-4 pr-6 text-ink-subdued">
                      <PlaceholderText>{value}</PlaceholderText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-ink-subdued">
          <PlaceholderText>
            Pricing note: actual pricing must be filled in before publication. The source
            recommends transparent scaling by organization size, plus volume and
            multi-certification discounts. [Certification pricing by type and organization
            size]
          </PlaceholderText>
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">Included</h3>
            <div className="mt-5">
              <BulletList items={included} />
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
              Not included
            </h3>
            <div className="mt-5">
              <BulletList items={notIncluded} />
            </div>
          </Card>
        </div>
      </Section>

      <Section id="faq">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div className="mt-12 max-w-3xl">
          <FaqGroups groups={faqGroups} />
        </div>
      </Section>

      <Section id="get-started">
        <SectionHeading
          eyebrow="Get started"
          title="Ready to prove your impact?"
        />
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            "Identify the certification that fits your business.",
            "Review the criteria.",
            "Complete the 5-minute eligibility check.",
          ].map((step, index) => (
            <li key={step}>
              <FeatureCard
                eyebrow={String(index + 1).padStart(2, "0")}
                title={step}
                description=""
              />
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/certifications">Start Your Certification</Button>
          <Button href="/contact" variant="secondary">
            Schedule a 20-Minute Consultation
          </Button>
          <Button href="/assessors-partners" variant="secondary">
            Browse Our Assessor Network
          </Button>
        </div>
        <p className="mt-8 text-sm text-ink-subdued">
          <PlaceholderText>{contact.email}</PlaceholderText>
          {" · "}
          <PlaceholderText>{contact.phone}</PlaceholderText>
          {" · "}
          <PlaceholderText>{contact.officeHours}</PlaceholderText>
        </p>
      </Section>

      <CtaSection
        eyebrow="Get certified"
        title="Ready to Prove Your Impact?"
        description="Get third-party certification in 2–3 months. Transparent process. No hidden fees. Real results."
        primary={{ label: "Start Your Certification", href: "/certifications" }}
        secondary={{ label: "Schedule a Consultation", href: "/contact" }}
      />
    </>
  );
}
