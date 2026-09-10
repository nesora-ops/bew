import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/content";
import { CtaSection } from "@/components/CtaSection";
import { Breadcrumbs } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

export function generateStaticParams() {
  return getInsights().map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) return {};

  return {
    title: insight.title,
    alternates: { canonical: `/insights/${insight.slug}` },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) notFound();

  return (
    <>
      <section className="border-b border-line">
        <Container>
          <div className="py-14 sm:py-20">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: insight.category },
              ]}
            />
            <SectionHeading as="h1" eyebrow={insight.category} title={insight.title} />
            <p className="mt-5 text-sm text-ink-subdued">
              <PlaceholderText>{insight.date}</PlaceholderText>
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Card className="max-w-3xl">
          <h2 className="text-base font-medium text-ink">Article not yet written</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>
              The source content document supplies this title as a suggested launch
              article but contains no body copy. [Article body to be supplied]
            </PlaceholderText>
          </p>
        </Card>
        <div className="mt-10">
          <Button href="/insights" variant="secondary" size="sm">
            All insights
          </Button>
        </div>
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
