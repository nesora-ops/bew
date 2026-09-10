import { ArrowRight } from "lucide-react";
import type { Certification } from "@/content";
import { LinkCard } from "@/components/ui/Card";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

const categoryLabels: Record<Certification["category"], string> = {
  environmental: "Environmental",
  social: "Social Responsibility",
  workplace: "Workplace",
};

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <LinkCard href={`/certifications/${certification.slug}`}>
      <div className="flex h-full flex-col">
        <p className="font-mono text-xs tracking-widest text-ink-subdued uppercase">
          {categoryLabels[certification.category]}
        </p>
        <h3 className="mt-3 text-lg font-medium tracking-[-0.01em] text-ink">
          {certification.shortName}
        </h3>
        <p className="mt-1.5 text-[15px] text-accent">{certification.tagline}</p>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-subdued">
          <PlaceholderText>{certification.description}</PlaceholderText>
        </p>
        <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink">
          Learn more
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </p>
      </div>
    </LinkCard>
  );
}

export function CertificationGrid({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((certification) => (
        <li key={certification.slug}>
          <CertificationCard certification={certification} />
        </li>
      ))}
    </ul>
  );
}
