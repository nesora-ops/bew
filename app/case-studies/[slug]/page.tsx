import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/content";
import { CtaSection } from "@/components/CtaSection";
import { Breadcrumbs, Testimonial } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

export function generateStaticParams() {
  return getCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.challenge,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) notFound();

  const sections = [
    { title: "Challenge", body: caseStudy.challenge },
    { title: "Solution", body: caseStudy.solution },
    { title: "Result", body: caseStudy.result },
  ];

  return (
    <>
      <section className="border-b border-line">
        <Container>
          <div className="py-14 sm:py-20">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Case Studies", href: "/case-studies" },
                { label: caseStudy.category },
              ]}
            />
            <SectionHeading
              as="h1"
              eyebrow={caseStudy.category}
              title={caseStudy.title}
              description={`Certification: ${caseStudy.certification}`}
            />
          </div>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
                {section.title}
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-subdued">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl">
          <Testimonial
            quote={caseStudy.quote.text}
            attribution={caseStudy.quote.attribution}
          />
        </div>

        <div className="mt-10">
          <Button href="/case-studies" variant="secondary" size="sm">
            All case studies
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
