import Link from "next/link";
import { primaryNav } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * Floats over the page: the bar itself is transparent and ignores the pointer, and
 * each item (logo, nav links, CTA) is its own glass pill. Heroes pull up underneath
 * it with `-mt-header pt-header`. The full pill row needs `xl`; below that the menu
 * button opens the mobile sheet.
 */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 h-header">
      <Container className="h-full">
        <div className="flex h-full items-center justify-between gap-3">
          <Link
            href="/"
            className={`glass pointer-events-auto relative z-50 flex h-11 min-w-0 shrink items-center rounded-btn px-3.5 ${focusRing}`}
            aria-label="Better Earth Workplaces home"
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="pointer-events-auto hidden xl:block">
            <ul className="flex items-center gap-1.5">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`glass flex h-10 items-center rounded-btn px-3.5 text-[11px] font-medium tracking-[0.08em] whitespace-nowrap text-ink uppercase transition-colors duration-(--dur-micro) ease-calm hover:bg-surface hover:text-accent ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pointer-events-auto flex shrink-0 items-center gap-2">
            {/* Wrapper controls visibility: Button hard-codes `inline-flex`, which wins
                over a `hidden` utility passed via className. */}
            <span className="relative z-50 hidden sm:block">
              <Button href="/organizations#get-started" size="sm" className="shadow-float">
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
