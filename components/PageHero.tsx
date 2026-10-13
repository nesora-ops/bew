import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content-blocks";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Page hero.
 *
 * One hero for every route except the home page: an editorial, left-aligned
 * headline over the site-wide leaf shadows. It pulls up under the floating header
 * (`-mt-header pt-header`) so the page starts at the top edge. `accent` renders the
 * second headline line in the accent green.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  supporting,
  actions,
  breadcrumbs,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  /** Small line beneath the CTAs, e.g. a publication date. */
  supporting?: string;
  actions?: ReactNode;
  /** Trail for detail pages. */
  breadcrumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
}) {
  return (
    <section className="relative -mt-header overflow-x-clip pt-header">
      <Container>
        <div
          className={`pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28 ${
            align === "center" ? "text-center" : ""
          }`}
        >
          {breadcrumbs ? <Breadcrumbs trail={breadcrumbs} /> : null}
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            description={description}
            align={align}
          />
          {actions ? (
            <div
              className={`mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
                align === "center" ? "sm:justify-center" : ""
              }`}
            >
              {actions}
            </div>
          ) : null}
          {supporting ? (
            <p className="mt-6 text-sm text-ink-subdued">
              <PlaceholderText>{supporting}</PlaceholderText>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
