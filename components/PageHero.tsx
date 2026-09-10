import type { ReactNode } from "react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Page hero.
 *
 * One hero for every route. `accent` renders the second headline line in the accent
 * colour — the reference site's signature treatment.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  supporting,
  actions,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  /** Small line beneath the CTAs, e.g. the homepage's reassurance text. */
  supporting?: string;
  actions?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="border-b border-line">
      <Container>
        <div
          className={`py-20 sm:py-24 lg:py-32 ${align === "center" ? "text-center" : ""}`}
        >
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
              className={`mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
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
