import type { Metadata } from "next";
import {
  Building2,
  LineChart,
  Newspaper,
  Users,
} from "lucide-react";
import { getCaseStudies, getCertifications, getInsights } from "@/content";
import { headlineTimeline, journeyStages } from "@/content/journey";
import { HomeHero } from "@/components/home/HomeHero";
import { ProblemGrid } from "@/components/home/ProblemGrid";
import { Statement } from "@/components/home/Statement";
import { CertificationGrid } from "@/components/CertificationCard";
import { CtaSection } from "@/components/CtaSection";
import {
  CaseStudyCard,
  InsightCard,
  JourneyTimeline,
  Testimonial,
} from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card, FeatureCard, IconTile } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

export const metadata: Metadata = {
  title: "Better Earth Workplaces | The Global Sustainability Certification Authority",
  description:
    "Third-party verified credentials that prove your environmental and social impact to investors, customers, and stakeholders.",
  alternates: { canonical: "/" },
};

/** Source: BEW_Consolidated_Deduplicated.md §1 "The Problem We Solve". */
const problemPoints: [
  { label: string; title: string; description: string },
  { label: string; title: string; description: string },
] = [
  {
    label: "The Challenge",
    title: "Sustainability Claims Without Proof",
    description:
      "Organizations often rely on self-reported data without independent verification, creating stakeholder doubt.",
  },
  {
    label: "The Gap",
    title: "No Single Standard",
    description:
      "ISO standards, ESG reporting, CSR guidelines, and other frameworks can tell different stories. Organizations struggle to demonstrate comparability and often face expensive consultants, unclear pathways, and wasted resources.",
  },
];

const problemSolution = {
  label: "The Solution",
  title: "Independent, Credible Verification",
  description:
    "Better Earth Workplaces provides rigorous third-party certification aligned with global standards. Impact is measured, verified, documented, and designed to be recognized by investors, regulators, customers, and other stakeholders.",
};

/** Source: §1 "Why Choose Better Earth Workplaces". */
const differentiators = [
  {
    title: "Genuinely Independent",
    description:
      "We are not a consulting firm and do not sell remediation solutions to organizations we assess. Revenue comes from certification fees, creating alignment between our business and our credibility. Assessment and remediation remain separate.",
  },
  {
    title: "Standards Built on Evidence",
    description:
      "Certification criteria are developed using peer-reviewed research, global best practices, and stakeholder input. Standards evolve with the science and focus on real environmental and social impact.",
  },
  {
    title: "Transparent Process",
    description:
      "Organizations know in advance what they will be assessed on. Criteria are public, assessments are documented, and results are objective.",
  },
  {
    title: "Recognized Worldwide",
    description:
      "Standards are designed for international adoption, with an assessor network spanning multiple continents. Certifications are designed to work across borders and industries.",
  },
  {
    title: "Investor-Grade Credibility",
    description:
      "BEW certifications are designed for stakeholders involved in capital allocation. Metrics are quantified, reporting is standardized, and impact is intended to be benchmarkable.",
  },
];

/** Source: §1 "Calls to Action". */
const audienceCtas = [
  {
    icon: Building2,
    title: "Get Certified",
    description:
      "Prove environmental and social impact through third-party verification recognized by investors and customers.",
    action: { label: "Start Certification", href: "/organizations#get-started" },
    secondary: { label: "See our certifications", href: "/certifications" },
  },
  {
    icon: Users,
    title: "Join Our Network",
    description:
      "Become a BEW assessor or channel partner, build your practice, and access a pipeline of credible clients.",
    action: { label: "Apply as Assessor", href: "/assessors-partners" },
    secondary: { label: "Explore partnership tiers", href: "/partners" },
  },
  {
    icon: Newspaper,
    title: "Learn More About BEW",
    description:
      "Access information about the mission, market opportunity, impact, press releases, media resources, and team.",
    action: { label: "About BEW", href: "/about" },
    secondary: { label: "Leadership & governance", href: "/about#leadership" },
  },
];

/** Source: §1 "Trust Signals & Accreditations" — presented as potential signals. */
const trustSignals = [
  "ISO",
  "UN SDG alignment",
  "ESG framework alignment, e.g. ISSB",
  "Industry association membership",
  "Regulatory-body recognition",
];

export default function HomePage() {
  const certifications = getCertifications();
  const caseStudies = getCaseStudies();
  const insights = getInsights();

  return (
    <>
      {/* 1. Hero. Source §1 Hero: headline, secondary CTA, supporting text and stat,
          primary CTA. The subheading becomes the statement's caption. */}
      <HomeHero
        wordmark="Better Earth"
        title="The Global Sustainability Certification Authority"
        link={{ label: "Explore Our Certifications", href: "#certifications" }}
        card={{
          text: "No hidden requirements. Transparent process. Real impact.",
          stat: "Trusted by [X] organizations across [Y] countries",
          action: { label: "Start Your Certification", href: "/organizations#get-started" },
        }}
      />

      {/* Statement. Source §1 "Outcome" line, captioned by the hero subheading. */}
      <Statement
        lines={["Investor confidence.", "Stakeholder trust.", "Competitive advantage."]}
        caption="Third-party verified credentials that prove your environmental and social impact to investors, customers, and stakeholders."
      />

      {/* 2. The problem we solve */}
      <ProblemGrid
        heading={{
          eyebrow: "The problem we solve",
          title: "Stakeholders demand proof.",
          accent: "We provide it.",
          description:
            "Investors, customers, and employees are increasingly skeptical of unverified sustainability claims. Greenwashing is widespread, while sustainability frameworks remain fragmented.",
        }}
        points={problemPoints}
        solution={problemSolution}
      />

      {/* 3. Why Better Earth Workplaces */}
      <Section>
        <SectionHeading
          eyebrow="Why Better Earth Workplaces"
          title="Credibility is the product."
          description="Five reasons organizations choose BEW certification over self-declaration."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <li key={item.title}>
              <FeatureCard
                eyebrow={String(index + 1).padStart(2, "0")}
                title={item.title}
                description={item.description}
              />
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. Seven certification pathways */}
      <Section id="certifications">
        <SectionHeading
          eyebrow="Our certifications"
          title="Seven pathways to"
          accent="prove your impact."
          description="Choose the certification that aligns with your business priorities."
        />
        <div className="mt-12">
          <CertificationGrid certifications={certifications} />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-[15px] text-ink-subdued">
            Not sure which certification is right for you?
          </p>
          <Button href="/certifications#find-your-fit" variant="secondary" size="sm">
            Take Our 2-Minute Quiz
          </Button>
        </div>
      </Section>

      {/* 5. Certification journey */}
      <Section>
        <SectionHeading
          eyebrow="How certification works"
          title="Your certification journey,"
          accent="transparent & achievable."
          description={headlineTimeline}
        />
        <div className="mt-12">
          <JourneyTimeline stages={journeyStages} />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-subdued">
          <span>Transparent process</span>
          <span aria-hidden="true">→</span>
          <span>No hidden criteria</span>
          <span aria-hidden="true">→</span>
          <span>Real results</span>
        </div>
        <div className="mt-8">
          <Button href="/organizations#get-started">Start Your Certification</Button>
        </div>
      </Section>

      {/* 6. Social proof & impact */}
      <Section>
        <SectionHeading
          eyebrow="Social proof & impact"
          title="Trusted by leading organizations"
          description="Across industries and continents, organizations are proving their impact."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
          <Testimonial
            quote="The certification gave us credibility we could not have built alone. Our customers now trust our sustainability claims."
            attribution="[Name, Title]"
          />
        </div>
      </Section>

      {/* 7. Audience-specific CTAs */}
      <Section>
        <SectionHeading
          eyebrow="Where do you fit?"
          title="Three ways to work with BEW"
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {audienceCtas.map((item) => (
            <li key={item.title}>
              <Card className="flex h-full flex-col">
                <IconTile icon={item.icon} />
                <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-subdued">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button href={item.action.href} size="sm">
                    {item.action.label}
                  </Button>
                  <Button href={item.secondary.href} variant="ghost" size="sm">
                    {item.secondary.label}
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Insights & resources */}
      <Section>
        <SectionHeading
          eyebrow="Insights & resources"
          title="Insights & resources"
          description="Stay informed on sustainability trends, certification best practices, and industry analysis."
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {insights.map((insight) => (
            <li key={insight.slug}>
              <InsightCard insight={insight} />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/insights" variant="secondary">
            View All Resources
          </Button>
        </div>
      </Section>

      {/* 9. Trust signals & accreditations */}
      <Section>
        <SectionHeading
          eyebrow="Trust signals"
          title="Built on credibility"
          description="Alignment and recognition signals. Every relationship below requires verification before publication."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {trustSignals.map((signal) => (
            <li
              key={signal}
              className="rounded-btn border border-line bg-surface px-4 py-2 text-sm text-ink-subdued"
            >
              {signal}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Card>
            <IconTile icon={LineChart} />
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">Leadership</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink-subdued">
              <PlaceholderText>
                Better Earth Workplaces is founded and led by [Ketaki&apos;s name], with strategic
                guidance from a global advisory board of sustainability scientists,
                institutional investors, corporate sustainability officers, and policy
                leaders.
              </PlaceholderText>
            </p>
            <div className="mt-6">
              <Button href="/about#leadership" variant="secondary" size="sm">
                Meet Our Team
              </Button>
            </div>
          </Card>
          <Testimonial
            quote="Independent certification is the foundation of trust in ESG. Better Earth Workplaces brings institutional rigor to sustainability verification at scale."
            attribution="[Advisor name, Title, Organization]"
          />
        </div>
      </Section>

      {/* 10. Final CTA */}
      <CtaSection
        eyebrow="Get started"
        title="Ready to Prove Your Impact?"
        description="Get third-party certification in 2–3 months. Transparent process. No hidden fees. Real results. Investors, customers, and stakeholders will recognize your commitment."
        primary={{ label: "Start Your Certification", href: "/organizations#get-started" }}
        secondary={{ label: "Schedule a Consultation", href: "/contact" }}
      />
    </>
  );
}
