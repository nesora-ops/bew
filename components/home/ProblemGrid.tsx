import { SectionHeading, Container } from "@/components/ui/Section";

type ProblemPoint = { label: string; title: string; description: string };

/**
 * Home "The problem we solve" section.
 *
 * An asymmetric editorial grid drawn with hairlines instead of cards: the heading
 * on the left, the challenge and the gap stacked in the middle, and the solution as
 * a solid deep-green panel on the right. The vertical rules run the full height of
 * the section, so the cells carry their own padding rather than the section.
 */
export function ProblemGrid({
  heading,
  points,
  solution,
}: {
  heading: { eyebrow: string; title: string; accent: string; description: string };
  points: [ProblemPoint, ProblemPoint];
  solution: ProblemPoint;
}) {
  return (
    <section className="my-12 border-y border-line sm:my-16">
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:border-x lg:border-line">
          <div className="py-16 sm:py-20 lg:py-28 lg:pr-12 lg:pl-10">
            <SectionHeading {...heading} />
          </div>

          <ol className="border-line lg:border-x">
            {points.map((point, i) => (
              <li
                key={point.label}
                className="border-t border-line py-10 sm:py-12 lg:px-8 lg:py-14 lg:first:border-t-0"
              >
                <Point index={i + 1} point={point} />
              </li>
            ))}
          </ol>

          <div className="pb-16 sm:pb-20 lg:p-3 lg:pb-3">
            <div className="flex h-full flex-col rounded-[6px] bg-accent-strong px-7 py-10 text-white sm:px-9 lg:py-14">
              <Point index={3} point={solution} inverse />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Point({
  index,
  point,
  inverse = false,
}: {
  index: number;
  point: ProblemPoint;
  inverse?: boolean;
}) {
  const number = String(index).padStart(2, "0");

  return (
    <>
      <p
        className={`font-mono text-[11px] font-medium tracking-[0.18em] uppercase ${
          inverse ? "text-white/60" : "text-ink-subdued"
        }`}
      >
        {number} / {point.label}
      </p>
      <p
        aria-hidden="true"
        className={`mt-4 font-display text-6xl leading-none font-normal tracking-[-0.04em] select-none lg:text-7xl ${
          inverse ? "text-white/20" : "text-accent/35"
        }`}
      >
        {number}
      </p>
      <h3
        className={`mt-6 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.015em] text-balance ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {point.title}
      </h3>
      <p
        className={`mt-3 text-[15px] leading-relaxed text-pretty ${
          inverse ? "text-white/80" : "text-ink-subdued"
        }`}
      >
        {point.description}
      </p>
    </>
  );
}
