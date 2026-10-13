import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Section";

/**
 * Home page hero, built to the user's mockup.
 *
 * Centred: an overline, the typeset "Better Earth" wordmark in the forest green, the
 * headline, one supporting line and an outlined call to action, with the globe
 * rising from the bottom. The wordmark is decorative (`aria-hidden`): the visible h1
 * carries the headline. It is typeset copy, not the logo.
 *
 * The globe is the user's own artwork, cropped from the mockup into
 * `public/hero-globe.webp`: still, with no motion. Its background was turned pure
 * white, so `mix-blend-multiply` lets the canvas and leaf shadows show through it.
 */
export function HomeHero({
  overline,
  wordmark,
  title,
  description,
  link,
}: {
  overline: string;
  wordmark: string;
  title: string;
  description: string;
  link: { label: string; href: string };
}) {
  const [first, ...rest] = wordmark.split(" ");

  return (
    <section className="relative overflow-x-clip">
      <Container>
        <div className="flex flex-col items-center pt-8 text-center sm:pt-9">
          <p className="text-xs font-medium tracking-[0.28em] text-accent uppercase">
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
          <p className="mt-2 max-w-[33em] text-[15px] leading-snug text-balance text-ink-subdued">
            {description}
          </p>
          <a
            href={link.href}
            className="group mt-6 inline-flex items-center gap-2.5 rounded-btn border border-ink/25 px-5 py-3 text-xs font-medium tracking-[0.14em] text-ink uppercase transition-colors duration-(--dur-micro) ease-calm hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            {link.label}
            <ArrowDown
              className="size-3.5 transition-transform duration-(--dur-ui) ease-calm group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Container>

      {/* Wider than a phone screen on purpose; the section clips the sides. The base
          fades into the canvas, as in the mockup. */}
      <div className="mt-5 flex justify-center">
        <Image
          src="/hero-globe.webp"
          width={1312}
          height={588}
          alt=""
          priority
          sizes="(min-width: 640px) min(63vw, 56rem), 120vw"
          className="w-[120vw] max-w-none shrink-0 mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] sm:w-[min(63vw,56rem)]"
        />
      </div>
    </section>
  );
}
