import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Better Earth Workplaces uses cookies and similar technologies.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalStub
      title="Cookie Policy"
      summary="How Better Earth Workplaces uses cookies and similar technologies."
    />
  );
}
