import type { Metadata } from "next";
import { BadgeCheck, Layers, Scale } from "lucide-react";
import { getCertifications, getCertificationsHubFaq } from "@/content";
import { partnerCategories } from "@/content/partners";
import { PageHero } from "@/components/PageHero";
import { CertificationGrid } from "@/components/CertificationCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Stat, Testimonial } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Seven pathways to prove your impact. Each pathway is rigorously designed, independently assessed, and globally recognized.",
  alternates: { canonical: "/certifications" },
};

/** Source: BEW_Consolidated_Deduplicated.md §9 "Why Choose a BEW Certification?". */
const pillars = [
  {
    icon: BadgeCheck,
    title: "Credible",
    description:
      "Every BEW certification is backed by rigorous, independent assessment. Impact is verified by qualified professionals rather than self-reported: institutional-grade verification recognized by investors, customers, and regulators.",
  },
  {
    icon: Layers,
    title: "Comprehensive",
    description:
      "BEW covers material sustainability challenges across industries, including water security, carbon footprint, social impact, and workplace culture.",
  },
  {
    icon: Scale,
    title: "Comparable",
    description:
      "Standardized criteria allow benchmarking across peers, providing insight into performance relative to industry leaders on an anonymous and fair basis.",
  },
];

/** Source: §9 "Social Proof & Testimonials" — all figures unresolved. */
const featuredStats = [
  { value: "[X]+", label: "Organizations certified" },
  { value: "[Y]", label: "Countries" },
  { value: "[Z]K+", label: "People impacted" },
  { value: "[W]M", label: "Tons CO2 avoided annually" },
];

export default function CertificationsPage() {
  const certifications = getCertifications();
  const faq = getCertificationsHubFaq();

  return (
    <>
      <PageHero
        eyebrow="Certifications"
        title="Seven pathways to"
        accent="prove your impact."
        description="Choose the certification that aligns with your business priorities and stakeholder expectations. Each pathway is rigorously designed, independently assessed, and globally recognized."
        actions={
          <>
            <Button href="#find-your-fit">Find Your Fit</Button>
            <Button href="#comparison" variant="secondary">
              Compare Certifications
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Why choose a BEW certification?"
          title="Credible. Comprehensive."
          accent="Comparable."
          description="Across industries and continents, leading organizations are proving their sustainability impact with third-party verification that stakeholders trust."
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <FeatureCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pathways">
        <SectionHeading
          eyebrow="The seven certifications"
          title="Choose your pathway"
          description="Each certification page carries detailed criteria, timeline, investment, and FAQs."
        />
        <div className="mt-12">
          <CertificationGrid certifications={certifications} />
        </div>
      </Section>

      <Section id="find-your-fit">
        <SectionHeading
          eyebrow="Find your fit"
          title="Not sure which certification"
          accent="is right for you?"
          description="Answer a few quick questions and BEW will recommend the most relevant certification for your organization."
        />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-subdued">
          The Find Your Fit tool takes 2–3 minutes and asks about industry, key
          stakeholders, and sustainability priorities. It then matches the organization
          with the certification or certifications that best align with its business and
          stakeholder expectations.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* The interactive tool is not built yet; the source lists its URL as an
              outstanding launch-checklist item. */}
          <Button href="[Interactive Find Your Fit URL]">Start Quiz</Button>
          <Button href="#pathways" variant="secondary">
            Browse the certifications
          </Button>
        </div>
      </Section>

      <Section id="comparison">
        <SectionHeading
          eyebrow="Certification comparison"
          title="Compare the seven pathways"
          description="Timelines and investment ranges vary by certification and organization size."
        />
        <div className="mt-10">
          <ComparisonTable certifications={certifications} />
        </div>
        <div className="mt-8">
          <Button href="/organizations#investment" variant="secondary">
            View Full Pricing
          </Button>
        </div>
      </Section>

      <Section id="channel-partners">
        <SectionHeading
          eyebrow="Channel partner network"
          title="Need help with your"
          accent="certification journey?"
          description="A global network of channel partners can support organizations from readiness assessment through recertification."
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
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/partners" variant="secondary">
            Browse Channel Partners
          </Button>
          <Button href="/partners#become-a-partner" variant="secondary">
            Become a Channel Partner
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Social proof"
          title="Organizations across"
          accent="industries trust BEW."
          description="Leading companies worldwide are proving their impact with BEW certification."
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </dl>
        <div className="mt-12 max-w-3xl">
          <Testimonial
            quote="BEW certification gave us credible proof of our sustainability commitment, something our investors and customers demanded but we could not establish alone. The process was rigorous, transparent, and worth every hour of effort."
            attribution="[Name, Title, Company]"
          />
        </div>
        <div className="mt-8">
          <Button href="/case-studies" variant="secondary">
            View All Case Studies
          </Button>
        </div>
      </Section>

      <Section id="faq">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={faq.items} />
        </div>
      </Section>

      <CtaSection
        eyebrow="Get started"
        title="Ready to Prove Your Impact?"
        description="Start with the certification that matters most to your business and stakeholders. Choose your certification, review the criteria, and submit your eligibility form."
        primary={{ label: "Find Your Fit", href: "#find-your-fit" }}
        secondary={{ label: "Choose a Certification", href: "#pathways" }}
        tertiary={{ label: "Schedule a Consultation", href: "/contact" }}
      />
    </>
  );
}
