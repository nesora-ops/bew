"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { footerColumns, primaryNav } from "@/content/site";
import { Button } from "@/components/ui/Button";

/**
 * Mobile navigation.
 *
 * The only stateful client component on the site. Lists every route — including the
 * ones the desktop header does not have room for — so nothing is unreachable on a
 * small screen.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock scroll behind the panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const secondaryLinks = footerColumns
    .flatMap((column) => column.links)
    .filter((link) => !link.href.includes("#"))
    .filter(
      (link, index, all) =>
        all.findIndex((other) => other.href === link.href) === index &&
        !primaryNav.some((primary) => primary.href === link.href),
    );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-10 items-center justify-center rounded-btn border border-line bg-surface text-ink transition-colors hover:bg-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas"
        >
          <nav aria-label="Mobile" className="px-5 py-6">
            <ul className="flex flex-col">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block border-b border-line py-4 text-lg tracking-[-0.01em] text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block border-b border-line py-3.5 text-[15px] text-ink-subdued"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button href="/organizations#get-started" className="mt-6 w-full" onClick={close}>
              Start Your Certification
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
