import Link from "next/link";
import { ArrowRight, ChevronRight, Quote } from "lucide-react";
import type { CaseStudy, Insight, JourneyStage, PartnerCategory } from "@/content";
import { Card, LinkCard } from "@/components/ui/Card";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/** Breadcrumbs for detail pages. */
export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subdued">
        {trail.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-accent">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {crumb.label}
              </span>
            )}
            {index < trail.length - 1 ? (
              <ChevronRight className="size-3.5" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A single statistic. Values are placeholders throughout the source. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="text-[28px] leading-none font-medium tracking-[-0.02em] text-ink sm:text-[34px]">
        <PlaceholderText>{value}</PlaceholderText>
      </p>
      <p className="mt-2.5 text-sm text-ink-subdued">{label}</p>
    </div>
  );
}

export function Testimonial({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="rounded-card border border-line bg-surface p-7 sm:p-9">
      <Quote className="size-6 text-accent" aria-hidden="true" />
      <blockquote className="mt-5 text-lg leading-relaxed tracking-[-0.01em] text-balance text-ink sm:text-xl">
        <PlaceholderText>{quote}</PlaceholderText>
      </blockquote>
      <figcaption className="mt-5 text-sm text-ink-subdued">
        <PlaceholderText>{attribution}</PlaceholderText>
      </figcaption>
    </figure>
  );
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <LinkCard href={`/case-studies/${caseStudy.slug}`}>
      <p className="font-mono text-xs tracking-widest text-ink-subdued uppercase">
        {caseStudy.category}
      </p>
      <h3 className="mt-3 text-lg font-medium tracking-[-0.01em] text-ink">
        {caseStudy.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-subdued">
        {caseStudy.challenge}
      </p>
      <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink">
        Read the case study
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </p>
    </LinkCard>
  );
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <LinkCard href={`/insights/${insight.slug}`}>
      <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink-subdued uppercase">
        <span>{insight.category}</span>
        <span aria-hidden="true">·</span>
        <span>
          <PlaceholderText>{insight.date}</PlaceholderText>
        </span>
      </div>
      <h3 className="mt-3 text-lg leading-snug font-medium tracking-[-0.01em] text-ink">
        {insight.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-subdued">
        <PlaceholderText>{insight.excerpt}</PlaceholderText>
      </p>
    </LinkCard>
  );
}

export function PartnerCard({ partner }: { partner: PartnerCategory }) {
  return (
    <Card className="h-full">
      <h3 className="text-base font-medium tracking-[-0.01em] text-ink">{partner.name}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-subdued">
        {partner.description}
      </p>
    </Card>
  );
}

/** The five-stage certification journey, shared by the homepage and /organizations. */
export function JourneyTimeline({ stages }: { stages: JourneyStage[] }) {
  return (
    <ol className="border-t border-line">
      {stages.map((stage) => (
        <li
          key={stage.stage}
          className="grid gap-4 border-b border-line py-8 sm:grid-cols-[180px_1fr] sm:gap-8"
        >
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">
              {stage.stage}
            </p>
            <p className="mt-2 text-sm text-ink-subdued">{stage.timing}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium tracking-[-0.01em] text-ink">
              {stage.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {stage.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-[15px] leading-relaxed text-ink-subdued before:absolute before:top-2.5 before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
                >
                  <PlaceholderText>{point}</PlaceholderText>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Bulleted list used for criteria, benefits and audience lists. */
export function BulletList({
  items,
  columns = 1,
}: {
  items: string[];
  columns?: 1 | 2;
}) {
  return (
    <ul className={`grid gap-2.5 ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-8" : ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-[15px] leading-relaxed text-ink-subdued before:absolute before:top-2.5 before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
        >
          <PlaceholderText>{item}</PlaceholderText>
        </li>
      ))}
    </ul>
  );
}
