import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CalendarClock, ShieldCheck, Wallet } from "lucide-react";
import {
  getCertification,
  getCertifications,
  getCertificationsHubFaq,
  getRelatedCertifications,
} from "@/content";
import { CertificationGrid } from "@/components/CertificationCard";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Breadcrumbs, BulletList } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * ONE template for all seven certification pathways (PROMPT.md §9).
 *
 * Everything on this page comes from the certification record, so adding or editing a
 * pathway is a data change — never a new page.
 */

export function generateStaticParams() {
  return getCertifications().map((certification) => ({ slug: certification.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/certifications/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const certification = getCertification(slug);

  if (!certification) return {};

  return {
    title: certification.name,
    description: certification.description,
    alternates: { canonical: `/certifications/${certification.slug}` },
    openGraph: {
      title: `${certification.name} | Better Earth Workplaces`,
      description: certification.description,
    },
  };
}

export default async function CertificationPage({
  params,
}: PageProps<"/certifications/[slug]">) {
  const { slug } = await params;
  const certification = getCertification(slug);

  if (!certification) notFound();

  const related = getRelatedCertifications(slug);
  const faq = getCertificationsHubFaq();

  const facts = [
    { icon: CalendarClock, label: "Assessment timeline", value: certification.timeline },
    { icon: ShieldCheck, label: "Validity", value: certification.validity },
    { icon: Wallet, label: "Investment", value: certification.investment },
  ];

  return (
    <>
      <section className="border-b border-line">
        <Container>
          <div className="py-14 sm:py-20">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Certifications", href: "/certifications" },
                { label: certification.shortName },
              ]}
            />
            <SectionHeading
              as="h1"
              eyebrow={certification.category}
              title={certification.name}
              description={certification.tagline}
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/organizations#get-started">Start Your Certification</Button>
              {/* The sample questionnaire PDF is an outstanding launch-checklist item. */}
              <Button href="[Link to sample questionnaire PDF]" variant="secondary">
                Download Sample Questionnaire
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <section className="border-b border-line bg-surface">
        <Container>
          <dl className="grid gap-px sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="py-8 sm:pr-8">
                <dt className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink-subdued uppercase">
                  <fact.icon className="size-4" aria-hidden="true" />
                  {fact.label}
                </dt>
                <dd className="mt-3 text-lg font-medium tracking-[-0.01em] text-ink">
                  <PlaceholderText>{fact.value}</PlaceholderText>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Who it's for" title="Built for these organizations" />
          <div>
            <BulletList items={certification.audience} columns={2} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Industry impact" title="Why it matters" />
          <div>
            <p className="text-[17px] leading-relaxed text-ink-subdued">
              <PlaceholderText>{certification.industryImpact}</PlaceholderText>
            </p>
            <p className="mt-8 text-[17px] leading-relaxed text-ink-subdued">
              <span className="font-medium text-ink">Key benefit. </span>
              <PlaceholderText>{certification.keyBenefit}</PlaceholderText>
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Assessment criteria"
            title="What we assess"
            description="Criteria are public before you apply. Nothing is assessed that you have not seen."
          />
          <div>
            <BulletList items={certification.assessmentCriteria} />
          </div>
        </div>
      </Section>

      {certification.note ? (
        <Section>
          <Card className="flex gap-4 border-accent/40 bg-accent-soft">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-base font-medium text-ink">
                Requires confirmation before publication
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
                {certification.note}
              </p>
            </div>
          </Card>
        </Section>
      ) : null}

      <Section id="faq">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={faq.items} />
        </div>
        <div className="mt-8">
          <Button href="/faq" variant="secondary" size="sm">
            See all FAQs
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Related certifications"
          title="Other pathways"
          description="Many organizations pursue two or three certifications aligned with their most material issues."
        />
        <div className="mt-12">
          <CertificationGrid certifications={related} />
        </div>
      </Section>

      <CtaSection
        eyebrow="Get started"
        title={`Ready to pursue ${certification.shortName}?`}
        description="Review the criteria, complete the eligibility check, and choose an assessor from the BEW network."
        primary={{ label: "Start Your Certification", href: "/organizations#get-started" }}
        secondary={{ label: "Compare Certifications", href: "/certifications#comparison" }}
      />
    </>
  );
}
