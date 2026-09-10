import { Fragment } from "react";

/**
 * Renders copy from the source content document, marking bracketed tokens as
 * placeholders.
 *
 * The source document deliberately leaves business facts unresolved — `[X]`,
 * `[Y]`, `[Placeholder]`, `[To be confirmed]`, `[certify@betterearthworkplace.com]`.
 * PROMPT.md §25/§26 requires these to survive into the site rather than be replaced
 * with invented values. Wrapping them in `[data-placeholder]` keeps them visible on
 * the page and greppable in CI, so nothing quietly hardens into fake copy.
 */
const PLACEHOLDER_PATTERN = /\[[^\]]+\]/g;

export function PlaceholderText({ children }: { children: string }) {
  const segments = children.split(PLACEHOLDER_PATTERN);
  const matches = children.match(PLACEHOLDER_PATTERN) ?? [];

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={index}>
          {segment}
          {matches[index] ? (
            <span data-placeholder title="Unresolved placeholder from the source content document">
              {matches[index]}
            </span>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

/** True when a string still carries an unresolved placeholder. */
export function hasPlaceholder(text: string): boolean {
  return /\[[^\]]+\]/.test(text);
}
