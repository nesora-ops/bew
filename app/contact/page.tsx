import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Better Earth Workplaces team.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact.
 *
 * Source: BEW_Consolidated_Deduplicated.md §2 "Contact" and §3 "Get Started".
 *
 * No contact form is built here. The source supplies no form fields, and the master
 * prompt defers form handling — routing an enquiry needs a backend endpoint that does
 * not exist yet. Contact routes are listed as the source describes them.
 */
const routes = [
  {
    audience: "Organizations",
    description:
      "Certification enquiries, eligibility questions, and consultation scheduling.",
    action: "[Start Certification / Contact form]",
  },
  {
    audience: "Assessors & Partners",
    description:
      "Assessor applications, channel partnership, and network questions.",
    action: "[Partner With Us / Contact form]",
  },
  {
    audience: "Investors, Regulators & Media",
    description: "Press enquiries, media resources, and institutional questions.",
    action: "[Contact email] / [Schedule a call]",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Tell us what you need and we will route you to the right team."
      />

      <Section>
        <SectionHeading eyebrow="Who to contact" title="Three routes in" />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {routes.map((route) => (
            <li key={route.audience}>
              <Card className="h-full">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                  {route.audience}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-subdued">
                  {route.description}
                </p>
                <p className="mt-5 text-[15px]">
                  <PlaceholderText>{route.action}</PlaceholderText>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section bordered={false}>
        <SectionHeading eyebrow="Contact details" title="Reach us directly" />
        <dl className="mt-10 max-w-xl border-t border-line">
          {[
            { label: "Email", value: contact.email },
            { label: "Phone", value: contact.phone },
            { label: "Office hours", value: contact.officeHours },
            { label: "Schedule a call", value: contact.scheduling },
          ].map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-4"
            >
              <dt className="text-[15px] text-ink-subdued">{row.label}</dt>
              <dd className="text-[15px] text-ink">
                <PlaceholderText>{row.value}</PlaceholderText>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-xl text-sm text-ink-subdued">
          Every value above is an unresolved placeholder from the source content
          document and must be confirmed before launch.
        </p>
      </Section>
    </>
  );
}
