import type { MetadataRoute } from "next";
import { getCaseStudies, getCertifications, getInsights } from "@/content";
import { site } from "@/content/site";

/** Static top-level routes. Dynamic routes are appended from content below. */
const staticRoutes = [
  "/",
  "/about",
  "/organizations",
  "/assessors-partners",
  "/partners",
  "/certifications",
  "/case-studies",
  "/faq",
  "/insights",
  "/contact",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = [
    ...getCertifications().map((certification) => `/certifications/${certification.slug}`),
    ...getCaseStudies().map((caseStudy) => `/case-studies/${caseStudy.slug}`),
    ...getInsights().map((insight) => `/insights/${insight.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
