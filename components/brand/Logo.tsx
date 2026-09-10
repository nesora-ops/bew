/**
 * PLACEHOLDER LOGO.
 *
 * No BEW logo, wordmark or favicon exists in the project. This is a neutral stand-in
 * so the header, footer and favicon are not empty — it is NOT approved brand.
 * Replace `LogoMark` and drop in the real wordmark when brand assets arrive.
 *
 * Drawn with `currentColor` so it inherits colour from its context.
 */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      role="presentation"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 25c0-6 3.5-10 9-11-1 6-4 9-9 11Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M16 25c0-5-2.9-8.3-7.5-9.2C9.3 20.7 11.8 23.5 16 25Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path d="M16 25V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-7 text-accent" />
      <span className="text-[15px] leading-tight font-semibold tracking-[-0.02em] text-ink">
        Better Earth
        <span className="block text-[11px] font-medium tracking-[0.14em] text-ink-subdued uppercase">
          Workplaces
        </span>
      </span>
    </span>
  );
}
