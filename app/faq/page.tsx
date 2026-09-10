import type { Metadata } from "next";
import { getCertificationsHubFaq, getFaqGroups } from "@/content";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion, FaqGroups } from "@/components/FaqAccordion";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Eligibility, assessment, costs, using your certification, and support — answered.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const groups = getFaqGroups();
  const hubFaq = getCertificationsHubFaq();

  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Frequently asked"
        accent="questions."
        description="Eligibility, assessment, costs, using your certification, and support."
      />

      <Section>
        <SectionHeading eyebrow="Certifications" title="Choosing a certification" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={hubFaq.items} />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="For organizations" title="Certification in practice" />
        <div className="mt-12 max-w-3xl">
          <FaqGroups groups={groups} />
        </div>
      </Section>

      <CtaSection
        eyebrow="Still have questions?"
        title="Talk to the team"
        description="Schedule a 20-minute consultation and we will walk you through the pathway that fits."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore Our Certifications", href: "/certifications" }}
      />
    </>
  );
}
