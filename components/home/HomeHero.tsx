import { ArrowDown } from "lucide-react";
import { HeroGlobe } from "@/components/home/HeroGlobe";
import { Container } from "@/components/ui/Section";

/**
 * Home page hero, built to the user's mockup.
 *
 * Centred: a bold overline, the typeset "Better Earth" wordmark in the forest green,
 * the headline and a solid green call to action, then the globe. The wordmark is
 * decorative (`aria-hidden`): the visible h1 carries the headline. It is typeset
 * copy, not the logo.
 *
 * The globe (`--hero-globe` wide) hangs half out of the hero: its lower half sits on
 * the green band that follows, which starts at the globe's equator line.
 */
export function HomeHero({
  overline,
  wordmark,
  title,
  link,
}: {
  overline: string;
  wordmark: string;
  title: string;
  link: { label: string; href: string };
}) {
  const [first, ...rest] = wordmark.split(" ");

  return (
    <section className="relative flex min-h-[calc(100svh-var(--spacing-header))] flex-col overflow-x-clip">
      <Container className="flex flex-1 flex-col justify-center pb-10">
        <div className="flex flex-col items-center pt-8 text-center sm:pt-9">
          <p className="text-sm font-bold tracking-[0.3em] text-accent-strong uppercase [text-shadow:0_1px_1px_rgb(10_61_30/0.25),0_2px_12px_rgb(10_61_30/0.35)] sm:text-base">
            {overline}
          </p>
          <p
            aria-hidden="true"
            className="mt-3 font-display text-[14.4vw] leading-[0.9] font-extrabold tracking-[-0.055em] whitespace-nowrap text-accent-strong select-none sm:text-[8.1vw] xl:text-[7.25rem]"
          >
            <span className="block sm:inline">{first}</span>{" "}
            <span className="block sm:inline">{rest.join(" ")}</span>
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.375rem,2.12vw,1.93rem)] leading-tight font-medium tracking-[-0.015em] text-balance text-ink">
            {title}
          </h1>
          <a
            href={link.href}
            className="group mt-6 inline-flex items-center gap-2.5 rounded-btn bg-accent-strong px-6 py-3.5 text-xs font-medium tracking-[0.14em] text-canvas uppercase transition-colors duration-(--dur-micro) ease-calm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            {link.label}
            <ArrowDown
              className="size-3.5 transition-transform duration-(--dur-ui) ease-calm group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Container>

      {/* The square box is reserved before the client-only globe arrives. The hero is
          one screen tall (below the header) with the globe at its foot, so on landing
          the equator sits on the fold: the upper half shows and the green band starts
          just below. The lower half overhangs into the band. */}
      <div className="relative z-10 mx-auto mb-[calc(var(--hero-globe)*-0.5)] aspect-square w-(--hero-globe) shrink-0">
        <HeroGlobe />
      </div>
    </section>
  );
}
