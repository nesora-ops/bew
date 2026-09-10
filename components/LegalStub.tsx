import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Legal page stub.
 *
 * The source content document links to Terms, Privacy, Cookie Policy and an
 * Accessibility Statement from the footer but supplies no text for any of them.
 * Legal copy is not something to invent, so these routes exist to keep the footer
 * honest and are visibly marked as outstanding.
 */
export function LegalStub({ title, summary }: { title: string; summary: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={summary} align="left" />
      <Section bordered={false}>
        <Card className="max-w-3xl">
          <h2 className="text-base font-medium text-ink">Awaiting approved copy</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>
              {`[${title} copy to be supplied] — this page is a placeholder. Legal text must be drafted and approved before publication; none is present in the source content document.`}
            </PlaceholderText>
          </p>
        </Card>
      </Section>
    </>
  );
}
