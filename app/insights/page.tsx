import type { Metadata } from "next";
import { getInsights } from "@/content";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { InsightCard } from "@/components/content-blocks";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Sustainability trends, certification best practices, and industry analysis.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const insights = getInsights();

  return (
    <>
      <PageHero
        eyebrow="Insights & resources"
        title="Insights worth"
        accent="acting on."
        description="Stay informed on sustainability trends, certification best practices, and industry analysis."
      />

      <Section>
        <ul className="grid gap-4 lg:grid-cols-3">
          {insights.map((insight) => (
            <li key={insight.slug}>
              <InsightCard insight={insight} />
            </li>
          ))}
        </ul>

        <Card className="mt-10">
          <h2 className="text-base font-medium text-ink">Articles pending</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>
              The source supplies three article titles only. [3–5 blog articles with dates
              and preview text] are required before launch; article bodies have not been
              written.
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
