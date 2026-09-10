import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to making this website usable by everyone.",
  alternates: { canonical: "/legal/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalStub
      title="Accessibility Statement"
      summary="Our commitment to making this website usable by everyone."
    />
  );
}
