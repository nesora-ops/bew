import Link from "next/link";
import { primaryNav } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * Sticky, hairline bottom border, translucent background with a blur — the reference
 * site's header treatment.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0 shrink rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-label="Better Earth Workplaces home"
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-btn px-3 py-2 text-sm text-ink-subdued transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Wrapper controls visibility: Button hard-codes `inline-flex`, which wins
                over a `hidden` utility passed via className. */}
            <span className="hidden sm:block">
              <Button href="/organizations#get-started" size="sm">
                Start Your Certification
              </Button>
            </span>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
