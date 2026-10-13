"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { footerColumns, primaryNav } from "@/content/site";
import { Button } from "@/components/ui/Button";

/**
 * Mobile navigation.
 *
 * A full-height sheet under the floating header, used below `xl` (where the pill row
 * does not fit). Lists every route, including the ones the desktop header has no
 * room for, so nothing is unreachable on a small screen. While open, the page behind
 * it is inert, focus starts on the first link, and Escape closes it and returns focus
 * to the toggle.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  // Lock scroll and make the covered page inert, so keyboard focus cannot wander
  // into content the sheet hides.
  useEffect(() => {
    if (!open) return;
    const behind = document.querySelectorAll<HTMLElement>("main, body > footer");
    document.body.style.overflow = "hidden";
    behind.forEach((element) => element.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = "";
      behind.forEach((element) => element.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // The sheet is hidden from `xl` up; close it so the scroll lock and inert go too.
    const wide = window.matchMedia("(min-width: 80rem)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
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
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="glass relative z-50 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-(--dur-micro) ease-calm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-0 z-40 overflow-y-auto bg-canvas pt-header"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6">
            <ul className="flex flex-col">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block border-b border-line py-4 font-display text-[28px] leading-tight font-medium tracking-[-0.02em] text-ink transition-colors rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-2.5 text-[15px] text-ink-subdued transition-colors rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button href="/organizations#get-started" className="mt-10 w-full" onClick={close}>
              Start Your Certification
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
