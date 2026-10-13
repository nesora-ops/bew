import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Closing call-to-action panel, used at the foot of most pages.
 *
 * Copy varies per page; the structure does not, which is why this is one component
 * rather than the same markup repeated nine times.
 */
export function CtaSection({
  eyebrow = "Get started",
  title,
  description,
  primary,
  secondary,
  tertiary,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tertiary?: { label: string; href: string };
  id?: string;
}) {
  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="rounded-[32px] bg-accent-soft px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-balance text-ink">
            <PlaceholderText>{title}</PlaceholderText>
          </h2>
          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-pretty text-ink-subdued">
              <PlaceholderText>{description}</PlaceholderText>
            </p>
          ) : null}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} className="w-full sm:w-auto">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="secondary" className="w-full sm:w-auto">
                {secondary.label}
              </Button>
            ) : null}
          </div>
          {tertiary ? (
            <p className="mt-5">
              <Button href={tertiary.href} variant="ghost" size="sm">
                {tertiary.label}
              </Button>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
