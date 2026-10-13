import { ArrowDown } from "lucide-react";
import { Globe, GlobeGlow, GlobePin, GlobeSvg } from "@/components/ui/globe";
import { GLOBE_PINS } from "@/components/ui/globe-utils/svg-globe-path";
import { Container } from "@/components/ui/Section";

/**
 * Home page hero.
 *
 * A typeset wordmark in ink, with the green dotted globe rising beneath it over a
 * soft green glow. The wordmark is decorative (`aria-hidden`): the visible h1
 * carries the headline. It is typeset copy, not the logo, and it is the page's LCP
 * element; the globe never is.
 *
 * On scroll the globe lags slightly behind the page (`scroll-globe`). All copy
 * comes from the page, which takes it from the source doc.
 */
export function HomeHero({
  wordmark,
  title,
  link,
}: {
  wordmark: string;
  title: string;
  link: { label: string; href: string };
}) {
  const [first, ...rest] = wordmark.split(" ");

  return (
    <section className="relative overflow-x-clip">
      <Container>
        <div className="relative flex flex-col pt-6 pb-14 sm:pt-8 lg:pb-16">
          <p
            aria-hidden="true"
            className="relative z-10 font-display text-[14.4vw] leading-[0.86] font-extrabold tracking-[-0.055em] whitespace-nowrap text-ink select-none sm:text-[8.7vw] xl:text-[7.95rem]"
          >
            <span className="block sm:inline">{first}</span>{" "}
            <span className="block sm:inline">{rest.join(" ")}</span>
          </p>

          <div
            aria-hidden="true"
            className="scroll-globe pointer-events-none relative z-0 -mx-[30vw] -mt-[4vw] sm:-mx-[6vw] lg:-mx-8 lg:-mt-[3vw]"
          >
            <Globe>
              <GlobeGlow className="inset-x-[22%] top-[12%] bottom-[8%] bg-holo-deep/12" />
              <GlobeSvg className="relative opacity-55" />
              {GLOBE_PINS.map((pin) => (
                <GlobePin key={`${pin.x}-${pin.y}`} x={pin.x} y={pin.y} />
              ))}
            </Globe>
          </div>

          {/* Overlaps the globe's lower half, where its dots fade into the canvas. */}
          <div className="relative z-20 -mt-[14vw] max-w-md sm:-mt-[12vw] lg:-mt-[17vw] xl:-mt-[15rem]">
            <h1 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-accent-strong">
              {title}
            </h1>
            <a
              href={link.href}
              className="group mt-8 inline-flex items-center gap-2.5 border-t border-accent/25 pt-5 text-xs font-medium tracking-[0.16em] text-accent-strong uppercase transition-colors duration-(--dur-micro) ease-calm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              {link.label}
              <ArrowDown
                className="size-3.5 transition-transform duration-(--dur-ui) ease-calm group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
