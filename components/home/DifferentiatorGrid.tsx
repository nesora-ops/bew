import { Container, Eyebrow } from "@/components/ui/Section";

type Differentiator = { title: string; description: string };

/**
 * Home "Why Better Earth Workplaces" section: an architectural wireframe grid.
 *
 * Flush cells with no gaps, drawn with 1px hairlines. The grid carries the top and
 * left rules and every cell the right and bottom, so no line is ever doubled. On large
 * screens: three cells on top, then the fourth spanning two columns with a larger
 * title, and the fifth as the deep-green anchor. Below `lg` the cells stack.
 *
 * Expects exactly five items, in the order the source lists them.
 */
export function DifferentiatorGrid({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: Differentiator[];
}) {
  const [first, second, third, wide, anchor] = items;

  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance text-accent-strong">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-subdued sm:text-xl">
            {description}
          </p>
        </div>

        <ol className="mt-14 grid border-t border-l border-line lg:grid-cols-3">
          {[first, second, third].map((item, i) => (
            <li
              key={item.title}
              className="flex min-h-[19rem] flex-col gap-16 border-r border-b border-line p-8 transition-colors duration-(--dur-ui) ease-calm hover:bg-surface lg:p-10"
            >
              <Number value={i + 1} />
              <div>
                <h3 className="font-display text-[1.375rem] leading-tight font-medium tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-subdued">
                  {item.description}
                </p>
              </div>
            </li>
          ))}

          <li className="flex min-h-[19rem] flex-col gap-16 border-r border-b border-line p-8 transition-colors duration-(--dur-ui) ease-calm hover:bg-surface lg:col-span-2 lg:p-10">
            <Number value={4} />
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <h3 className="font-display text-4xl leading-[1.02] font-medium tracking-[-0.03em] text-balance text-ink lg:text-5xl">
                {wide.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-subdued">{wide.description}</p>
            </div>
          </li>

          {/* The anchor: forest green, lifted by a faint light from the top right. */}
          <li className="flex min-h-[19rem] flex-col gap-16 border-r border-b border-line bg-accent-strong bg-[radial-gradient(120%_90%_at_100%_0%,rgb(18_166_107/0.22),transparent_60%)] p-8 lg:p-10">
            <Number value={5} inverse />
            <div>
              <h3 className="font-display text-[1.375rem] leading-tight font-medium tracking-[-0.015em] text-white">
                {anchor.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{anchor.description}</p>
            </div>
          </li>
        </ol>
      </Container>
    </section>
  );
}

function Number({ value, inverse = false }: { value: number; inverse?: boolean }) {
  return (
    <p className={`font-mono text-sm ${inverse ? "text-holo" : "text-ink-subdued"}`}>
      {String(value).padStart(2, "0")}
    </p>
  );
}
