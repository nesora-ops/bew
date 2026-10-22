import Link from "next/link";
import type { Certification } from "@/content";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * Certification comparison table.
 *
 * Source: BEW_Consolidated_Deduplicated.md §9 "Certification Comparison".
 *
 * Scrolls inside its own container rather than forcing the page to scroll sideways —
 * six columns cannot fit a phone (PROMPT.md §21).
 */
export function ComparisonTable({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of the three BEW certification pathways
        </caption>
        <thead>
          <tr className="border-b border-line">
            {[
              "Certification",
              "Primary industries",
              "Assessment timeline",
              "Small org investment",
              "Key stakeholder",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="py-3 pr-6 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {certifications.map((certification) => (
            <tr key={certification.slug} className="border-b border-line align-top">
              <th scope="row" className="py-4 pr-6 font-medium text-ink">
                <Link
                  href={`/certifications/${certification.slug}`}
                  className="hover:text-accent"
                >
                  {certification.shortName}
                </Link>
              </th>
              <td className="py-4 pr-6 text-ink-subdued">
                {certification.comparison.primaryIndustries}
              </td>
              <td className="py-4 pr-6 text-ink-subdued">{certification.timeline}</td>
              <td className="py-4 pr-6 text-ink-subdued">
                <PlaceholderText>
                  {`[${certification.comparison.smallOrgInvestment}]`}
                </PlaceholderText>
              </td>
              <td className="py-4 pr-6 text-ink-subdued">
                {certification.comparison.keyStakeholder}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
