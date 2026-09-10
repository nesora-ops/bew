import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { PlaceholderText } from "./PlaceholderText";

/**
 * Card primitives.
 *
 * The reference's card: white surface, single hairline border, modest radius, no
 * shadow at rest. Icons sit in a tinted accent square.
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
      className={`rounded-card border border-line bg-surface p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function IconTile({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span className="mb-5 inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
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
        <p className="mb-2 font-mono text-xs tracking-widest text-ink-subdued uppercase">
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
      className={`group block h-full rounded-card border border-line bg-surface p-6 transition-colors duration-200 ease-out hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:p-7 ${className}`}
    >
      {children}
    </Link>
  );
}
