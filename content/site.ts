import type { FooterColumn, NavLink } from "./types";

/**
 * Site-level content: brand, navigation, footer, contact.
 *
 * Source: BEW_Consolidated_Deduplicated.md §1 "Footer" and §3 "Get Started".
 */
export const site = {
  name: "Better Earth Workplaces",
  shortName: "BEW",
  tagline: "The Global Sustainability Certification Authority",
  description:
    "Third-party verified credentials that prove your environmental and social impact to investors, customers, and stakeholders.",
  /** Replace with the production domain once confirmed. */
  url: "https://betterearthworkplace.com",
} as const;

/**
 * Contact details. Every value below is an unconfirmed placeholder in the source —
 * the launch checklist requires the email to be confirmed and the rest supplied.
 */
export const contact = {
  email: "[certify@betterearthworkplace.com]",
  phone: "[Phone placeholder]",
  officeHours: "[Office hours placeholder]",
  scheduling: "[Scheduling link placeholder]",
} as const;

/** Primary header navigation. Remaining routes are reachable from the footer. */
export const primaryNav: NavLink[] = [
  { label: "Certifications", href: "/certifications" },
  { label: "For Organizations", href: "/organizations" },
  { label: "Assessors & Partners", href: "/assessors-partners" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

/**
 * Footer columns.
 *
 * Source §1 "Footer" also lists Careers, Press & Media and Impact Reports. Those have
 * no route in the agreed scope (PROMPT.md §6) and no source copy, so they are held
 * back rather than shipped as dead links — recorded as pending in MEMORY.md.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "For Organizations",
    links: [
      { label: "Start Certification", href: "/organizations#get-started" },
      { label: "Our Certifications", href: "/certifications" },
      { label: "Pricing & Investment", href: "/organizations#investment" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "For Assessors",
    links: [
      { label: "Become an Assessor", href: "/assessors-partners" },
      { label: "Assessor Network", href: "/assessors-partners#assessor-role" },
      { label: "Training & Onboarding", href: "/assessors-partners#training" },
      { label: "Channel Partners", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Better Earth Workplaces", href: "/about" },
      { label: "Leadership & Governance", href: "/about#leadership" },
      { label: "Impact & Reporting", href: "/about#impact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Accessibility Statement", href: "/legal/accessibility" },
    ],
  },
];

/** Source §1 "Footer" — social handles are an outstanding launch-checklist item. */
export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: "[LinkedIn URL placeholder]" },
  { label: "Twitter", href: "[Twitter URL placeholder]" },
];
