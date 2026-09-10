import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Better Earth Workplaces collects, uses, and protects personal data.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalStub
      title="Privacy Policy"
      summary="How Better Earth Workplaces collects, uses, and protects personal data."
    />
  );
}
