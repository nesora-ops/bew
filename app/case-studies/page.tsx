import type { Metadata } from "next";
import { getCaseStudies } from "@/content";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { CaseStudyCard } from "@/components/content-blocks";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Organizations proving their environmental and social impact with BEW certification.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Organizations that"
        accent="made it official."
        description="Across industries and continents, organizations are proving their impact."
      />

      <Section>
        <ul className="grid gap-4 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <CaseStudyCard caseStudy={caseStudy} />
            </li>
          ))}
        </ul>

        <Card className="mt-10">
          <h2 className="text-base font-medium text-ink">More case studies to come</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>
              The source requires 1–2 further case studies covering different
              certification types and organization sizes, specifically real estate and
              hospitality. [Three detailed case studies] [Final case-study company names
              and evidence]
            </PlaceholderText>
          </p>
        </Card>
      </Section>

      <CtaSection
        eyebrow="Get started"
        title="Ready to Prove Your Impact?"
        primary={{ label: "Start Your Certification", href: "/organizations#get-started" }}
        secondary={{ label: "Explore Our Certifications", href: "/certifications" }}
      />
    </>
  );
}
