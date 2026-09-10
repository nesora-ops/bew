import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Better Earth Workplaces website and certification services.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalStub
      title="Terms of Service"
      summary="The terms governing use of the Better Earth Workplaces website and certification services."
    />
  );
}
