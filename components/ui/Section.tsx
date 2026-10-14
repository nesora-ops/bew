import type { ReactNode } from "react";
import { PlaceholderText } from "./PlaceholderText";

/**
 * Layout primitives.
 *
 * Sections are separated by whitespace rather than rules; content sits in a centred
 * 80rem container, and each section is led by a small uppercase eyebrow above a
 * display headline set in the display face.
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
  bordered = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Optional hairline bottom border. Sections are separated by whitespace by default. */
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-line" : ""} py-20 sm:py-28 lg:py-32 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <p
      className={`mb-5 font-mono text-xs font-medium tracking-widest uppercase ${
        inverse ? "text-canvas/65" : "text-ink-subdued"
      }`}
    >
      {children}
    </p>
  );
}

/**
 * Section heading.
 *
 * `accent` renders as a second line in the accent green. `inverse` sets it for a dark
 * green surface.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  as: Heading = "h2",
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  inverse?: boolean;
}) {
  const isCentered = align === "center";
  const isDisplay = Heading === "h1";
  const size = isDisplay
    ? "text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.028em] [word-spacing:0.04em]"
    : "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.02em] [word-spacing:0.03em]";
  // A display heading needs more room than body copy, or it breaks onto a third line.
  const width = isDisplay ? "max-w-5xl" : "max-w-3xl";

  return (
    <div className={`${isCentered ? `mx-auto ${width} text-center` : width}`}>
      {eyebrow ? <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow> : null}
      <Heading className={`font-display ${size} text-balance ${inverse ? "text-canvas" : "text-ink"}`}>
        <PlaceholderText>{title}</PlaceholderText>
        {accent ? (
          <>
            <br />
            <span className={inverse ? "text-accent-soft-strong" : "text-accent"}>
              <PlaceholderText>{accent}</PlaceholderText>
            </span>
          </>
        ) : null}
      </Heading>
      {description ? (
        <p
          className={`mt-6 text-[17px] leading-relaxed text-pretty sm:text-lg ${
            inverse ? "text-canvas/80" : "text-ink-subdued"
          } ${
            isCentered ? "mx-auto" : ""
          } ${isDisplay ? "max-w-2xl" : ""}`}
        >
          <PlaceholderText>{description}</PlaceholderText>
        </p>
      ) : null}
    </div>
  );
}
