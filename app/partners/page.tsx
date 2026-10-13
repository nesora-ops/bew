import type { Metadata } from "next";
import {
  partnerBenefits,
  partnerCategories,
  partnerSupportActivities,
} from "@/content/partners";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { BulletList, PartnerCard } from "@/components/content-blocks";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

export const metadata: Metadata = {
  title: "Channel Partners",
  description:
    "A global network of channel partners supporting organizations from readiness assessment through recertification.",
  alternates: { canonical: "/partners" },
};

/**
 * Channel partners.
 *
 * Source: BEW_Consolidated_Deduplicated.md §5 "Channel Partners".
 *
 * The source names no partner firms, so this is a category listing rather than a
 * directory. The partner-record shape lives in content/partners.ts, ready to be fed
 * from the backend when the partner directory exists.
 */
export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Channel partners"
        title="Grow your practice by"
        accent="growing verified impact."
        description="A global network of channel partners can support organizations from readiness assessment through recertification."
        actions={
          <>
            <Button href="#become-a-partner">Become a Channel Partner</Button>
            <Button href="#categories" variant="secondary">
              Browse Partner Categories
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Why organizations use channel partners"
          title="Support across the journey"
          description="Partners help organizations arrive at assessment prepared, without compromising the independence of the assessment itself."
        />
        <div className="mt-8 max-w-2xl">
          <BulletList items={partnerSupportActivities} />
        </div>
      </Section>

      <Section id="categories">
        <SectionHeading
          eyebrow="Partner categories"
          title="Eight kinds of partner"
          description="Firms that already advise organizations on the things BEW certification measures."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((partner) => (
            <li key={partner.name}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="directory">
        <SectionHeading
          eyebrow="Partner directory"
          title="Find a partner"
          description="A searchable directory of certified channel partners will be published here."
        />
        <Card className="mt-10">
          <p className="text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>
              [Partner Directory]: no partner records have been supplied yet. The
              directory will be populated from the certification platform once partner
              records exist.
            </PlaceholderText>
          </p>
        </Card>
      </Section>

      <Section id="benefits">
        <SectionHeading
          eyebrow="Partner benefits"
          title="What partnership gives your practice"
          description="Certified channel partners may receive the following."
        />
        <div className="mt-8 max-w-3xl">
          <BulletList items={partnerBenefits} />
        </div>
        <p className="mt-8 max-w-3xl text-sm text-ink-subdued">
          <PlaceholderText>
            The revenue-share percentage and tier thresholds require confirmation before
            publication, alongside the conflict-of-interest policy governing referral
            fees. [Channel partner revenue-share percentages]
          </PlaceholderText>
        </p>
      </Section>

      <CtaSection
        id="become-a-partner"
        eyebrow="Partner with us"
        title="Become a Channel Partner"
        description="Tell us about your practice, the clients you advise, and the certifications you want to support."
        primary={{ label: "Apply to Partner", href: "/contact" }}
        secondary={{ label: "Talk to the team", href: "/contact" }}
      />
    </>
  );
}
