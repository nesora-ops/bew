import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Home page hero.
 *
 * A giant typeset wordmark in ink, with an empty slot beneath it where the hero
 * globe will go. The wordmark is decorative (`aria-hidden`): the visible h1 carries
 * the headline. It is typeset copy, not the logo, and it is the page's LCP element.
 *
 * On scroll the globe slot lags slightly behind the page (`scroll-globe`). All copy
 * comes from the page, which takes it from the source doc.
 */
export function HomeHero({
  wordmark,
  title,
  link,
  card,
}: {
  wordmark: string;
  title: string;
  link: { label: string; href: string };
  card: { text: string; stat: string; action: { label: string; href: string } };
}) {
  const [first, ...rest] = wordmark.split(" ");

  return (
    <section className="relative overflow-x-clip">
      <Container>
        <div className="relative flex flex-col pt-6 pb-14 sm:pt-8 lg:pb-16">
          <p
            aria-hidden="true"
            className="relative z-10 font-display text-[24vw] leading-[0.86] font-extrabold tracking-[-0.055em] whitespace-nowrap text-ink select-none sm:text-[14.5vw] xl:text-[13.25rem]"
          >
            <span className="block sm:inline">{first}</span>{" "}
            <span className="block sm:inline">{rest.join(" ")}</span>
          </p>

          {/* Empty slot for the hero globe, which the user is supplying. It keeps the
              old globe's box (aspect 1259/477) so the layout holds when it lands. */}
          <div
            aria-hidden="true"
            data-globe-slot
            className="scroll-globe pointer-events-none relative z-0 -mx-[30vw] -mt-[4vw] aspect-[1259/477] sm:-mx-[6vw] lg:-mx-8 lg:-mt-[3vw]"
          />

          {/* Overlaps the lower part of the globe slot. */}
          <div className="relative z-20 -mt-[14vw] grid gap-10 sm:-mt-[12vw] lg:-mt-[17vw] lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end xl:-mt-[15rem]">
            <div className="max-w-md">
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

            <div className="glass max-w-sm rounded-[24px] p-5 sm:p-6">
              <HoloArc />
              <p className="mt-4 font-display text-lg leading-snug font-medium tracking-[-0.01em] text-accent-strong">
                {card.text}
              </p>
              <p className="mt-2 text-sm text-accent">
                <PlaceholderText>{card.stat}</PlaceholderText>
              </p>
              <Button href={card.action.href} size="sm" className="mt-5">
                {card.action.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A small horizon arc for the hero card, drawn in the site's greens. */
function HoloArc() {
  return (
    <svg viewBox="0 0 280 64" aria-hidden="true" className="h-14 w-full">
      <path d="M-8 64C40 14 240 14 288 64" fill="none" stroke="#12a66b" strokeWidth="1.5" />
      <path
        d="M-8 64C40 4 240 4 288 64"
        fill="none"
        stroke="#2ee59d"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path d="M60 64C80 40 110 30 140 28M220 64C200 40 170 30 140 28" fill="none" stroke="#2f7a52" strokeOpacity="0.4" />
      <path
        d="M96 52h0M112 46h0M128 42h0M144 41h0M160 43h0M176 47h0M188 53h0M120 54h0M136 50h0M152 50h0M168 55h0"
        stroke="#1d5a3a"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
