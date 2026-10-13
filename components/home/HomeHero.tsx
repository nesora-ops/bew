import { ArrowDown } from "lucide-react";
import { HeroGlobe } from "@/components/home/HeroGlobe";
import { Container } from "@/components/ui/Section";

/**
 * Home page hero.
 *
 * Centred: an overline, the typeset "Better Earth" wordmark in the deep green, the
 * headline and one outlined call to action, with the turning globe rising from the
 * bottom of the screen. The wordmark is decorative (`aria-hidden`): the visible h1
 * carries the headline. It is typeset copy, not the logo, and it is the page's LCP
 * element; the globe loads after it, client-only.
 *
 * The globe's full circle sits below the fold, so scrolling reveals it as the bridge
 * into the statement. All copy comes from the page.
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
    <section className="relative overflow-x-clip">
      <Container>
        <div className="flex flex-col items-center pt-10 text-center sm:pt-14">
          <p className="font-mono text-xs font-medium tracking-[0.3em] text-accent uppercase">
            {overline}
          </p>
          <p
            aria-hidden="true"
            className="mt-4 font-display text-[14.4vw] leading-[0.9] font-extrabold tracking-[-0.055em] whitespace-nowrap text-accent-strong select-none sm:text-[8.7vw] xl:text-[7.95rem]"
          >
            <span className="block sm:inline">{first}</span>{" "}
            <span className="block sm:inline">{rest.join(" ")}</span>
          </p>
          <h1 className="mt-5 font-display text-2xl leading-tight font-medium tracking-[-0.015em] text-balance text-ink sm:text-3xl">
            {title}
          </h1>
          <a
            href={link.href}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-btn border border-ink/25 px-5 py-3 text-xs font-medium tracking-[0.14em] text-ink uppercase transition-colors duration-(--dur-micro) ease-calm hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            {link.label}
            <ArrowDown
              className="size-3.5 transition-transform duration-(--dur-ui) ease-calm group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Container>

      {/* The globe's box is reserved here so nothing shifts when the canvas loads.
          It may be wider than a phone screen; the section clips the sides. */}
      <div className="mt-6 flex justify-center sm:mt-8" aria-hidden="true">
        <div className="relative aspect-square w-[min(120vw,56rem)] shrink-0">
          <HeroGlobe />
        </div>
      </div>
    </section>
  );
}
