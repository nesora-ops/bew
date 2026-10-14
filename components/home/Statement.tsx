import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Section";

/**
 * The home page's centred statement, after the hero, on the green band: off-white
 * type with the middle line in the pale green.
 *
 * As it scrolls into view the statement rises in, a thin line draws down, then the
 * icon and caption appear. The motion is CSS scroll-driven (`.statement*` in
 * globals.css): no JavaScript, only where the browser supports scroll timelines, and
 * never under reduced motion. Elsewhere it is simply static and fully visible.
 */
export function Statement({ lines, caption }: { lines: string[]; caption: string }) {
  return (
    <section className="statement py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="statement-text font-display text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.04] font-medium tracking-[-0.03em] text-balance text-canvas [word-spacing:0.04em]">
            {lines.map((line, i) => (
              <span key={line} className={`block ${i === 1 ? "text-accent-soft-strong" : ""}`}>
                {line}
              </span>
            ))}
          </h2>
          <span
            aria-hidden="true"
            className="statement-line mx-auto mt-14 block h-16 w-px bg-canvas/35"
          />
          <div className="statement-after">
            <BadgeCheck className="mx-auto mt-5 size-5 text-accent-soft-strong" aria-hidden="true" />
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-balance text-canvas/80">
              {caption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
