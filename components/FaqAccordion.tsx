import { Plus } from "lucide-react";
import type { FaqGroup, FaqItem } from "@/content";
import { PlaceholderText } from "@/components/ui/PlaceholderText";

/**
 * FAQ accordion.
 *
 * Native <details>/<summary>: no JavaScript, keyboard-accessible for free, and the
 * answers are in the DOM for crawlers. Nothing here needs a client component.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-medium tracking-[-0.01em] text-ink marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <Plus
              className="mt-1 size-4 shrink-0 text-ink-subdued transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed text-ink-subdued">
            <PlaceholderText>{item.answer}</PlaceholderText>
          </p>
        </details>
      ))}
    </div>
  );
}

export function FaqGroups({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.id} id={group.id}>
          <h3 className="mb-4 font-mono text-xs font-medium tracking-widest text-ink-subdued uppercase">
            {group.title}
          </h3>
          <FaqAccordion items={group.items} />
        </div>
      ))}
    </div>
  );
}
