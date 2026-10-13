import Link from "next/link";
import { contact, footerColumns, site, socialLinks } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Site footer.
 *
 * Brand block and tagline beside the link columns, above a baseline row. Contact
 * values are unresolved placeholders from the source document.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 font-display text-[22px] leading-snug font-medium tracking-[-0.015em] text-ink">
              {site.tagline}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((link) => (
                <li key={link.label} className="text-sm text-ink-subdued">
                  {/* Social URLs are outstanding launch-checklist items. */}
                  {link.label}{" "}
                  <span className="text-xs">
                    <PlaceholderText>{link.href}</PlaceholderText>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-mono text-xs font-medium tracking-widest text-ink uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-subdued transition-colors duration-(--dur-micro) ease-calm hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-sm text-ink-subdued sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              <PlaceholderText>{contact.email}</PlaceholderText>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <PlaceholderText>{contact.phone}</PlaceholderText>
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
