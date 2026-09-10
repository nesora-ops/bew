import type { ReactNode } from "react";
import { PlaceholderText } from "./PlaceholderText";

/**
 * Layout primitives.
 *
 * Structure follows the reference site: full-bleed sections separated by hairline
 * bottom borders, content held in a centered 80rem container, and each section led by
 * a small uppercase eyebrow above a tight-tracking headline.
 */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  className = "",
  bordered = true,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Hairline bottom border, as the reference uses between sections. */
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-line" : ""} py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
      {children}
    </p>
  );
}

/**
 * Section heading.
 *
 * `accent` renders as a second line in the accent colour — the reference's signature
 * two-line headline treatment.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const isCentered = align === "center";
  const isDisplay = Heading === "h1";
  const size = isDisplay
    ? "text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[54px] lg:text-[68px]"
    : "text-[30px] leading-[1.1] tracking-[-0.01em] sm:text-[38px] lg:text-[46px]";
  // A display heading needs more room than body copy, or it breaks onto a third line.
  const width = isDisplay ? "max-w-5xl" : "max-w-3xl";

  return (
    <div className={`${isCentered ? `mx-auto ${width} text-center` : width}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className={`${size} font-medium text-balance text-ink`}>
        <PlaceholderText>{title}</PlaceholderText>
        {accent ? (
          <>
            <br />
            <span className="text-accent">
              <PlaceholderText>{accent}</PlaceholderText>
            </span>
          </>
        ) : null}
      </Heading>
      {description ? (
        <p
          className={`mt-5 text-[17px] leading-relaxed text-pretty text-ink-subdued sm:text-lg ${
            isCentered ? "mx-auto" : ""
          } ${isDisplay ? "max-w-2xl" : ""}`}
        >
          <PlaceholderText>{description}</PlaceholderText>
        </p>
      ) : null}
    </div>
  );
}
