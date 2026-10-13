import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { PlaceholderText } from "./PlaceholderText";

/**
 * Card primitives.
 *
 * A soft surface with one hairline border and a generous radius. Grid cards stay
 * flat (no shadow); only floating elements get elevation. Icons sit in a round
 * tinted tile.
 */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-7 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function IconTile({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span className="mb-6 inline-flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
      <Icon className="size-5" />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  eyebrow,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <Card className="h-full">
      {icon ? <IconTile icon={icon} /> : null}
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs tracking-widest text-ink-subdued uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
        <PlaceholderText>{title}</PlaceholderText>
      </h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-subdued">
        <PlaceholderText>{description}</PlaceholderText>
      </p>
    </Card>
  );
}

/** Card whose whole surface is a link. */
export function LinkCard({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group block h-full rounded-card border border-line bg-surface p-7 transition-[border-color,background-color] duration-(--dur-ui) ease-calm hover:border-ink/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:p-8 ${className}`}
    >
      {children}
    </Link>
  );
}
