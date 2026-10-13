import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Button, rendered as a link.
 *
 * A pill (the `--radius-btn` token): medium weight, a subtle press-scale, the calm
 * easing curve, and a visible focus ring with an offset. Every CTA on this site
 * navigates, so there is no <button> variant until something needs one.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.005em] rounded-btn transition-[background-color,border-color,color,transform] duration-(--dur-ui) ease-calm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary:
    "border border-line bg-surface text-ink hover:border-transparent hover:bg-ink hover:text-white",
  ghost: "text-ink-subdued hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Side effect on activation — used by the mobile nav to close itself. */
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Placeholder destinations from the source content document have no route to go to.
  // Render them as disabled-looking spans rather than links that lead nowhere.
  if (href.startsWith("[")) {
    return (
      <span
        className={`${classes} cursor-not-allowed opacity-60`}
        title="Destination not yet supplied"
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
