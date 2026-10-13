import type { ComponentProps } from "react";
import { SVG_GLOBE_PATH } from "@/components/ui/globe-utils/svg-globe-path";

/**
 * Dotted globe: the top of the Earth as a dome of land dots.
 *
 * Adapted from a shadcn-style globe component, in this codebase's idiom: no `cn`
 * helper, the site's green tokens instead of `--primary`/`--background`, and a
 * server component (it is pure SVG, so nothing ships to the client). The dot path
 * is generated from Natural Earth land by scripts/build-globe-data.mjs. The demo's
 * tooltips are left out: their prices and stock counts were invented data.
 */

export function Globe({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`relative flex aspect-[1259/477] w-full items-center justify-center ${className}`}
      {...props}
    />
  );
}

export function GlobeSvg({ className = "", children, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1259 477"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`size-full ${className}`}
      {...props}
    >
      <defs>
        {/* Dark green at the crown, fading into the canvas toward the base. */}
        <linearGradient
          id="globe-fade"
          x1="629.21"
          y1="-67.3351"
          x2="629.21"
          y2="627.144"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.274038" style={{ stopColor: "var(--color-accent)" }} />
          <stop offset="0.735577" style={{ stopColor: "var(--color-canvas)" }} />
        </linearGradient>
      </defs>

      <path
        d={SVG_GLOBE_PATH.limb}
        fill="none"
        stroke="url(#globe-fade)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <path
        d={SVG_GLOBE_PATH.dots}
        fill="none"
        stroke="url(#globe-fade)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {children}
    </svg>
  );
}

/**
 * A pulsing marker, placed over the globe at (x, y) in its 1259x477 frame.
 * Decorative: it carries no data. It is an HTML element rather than SVG so the
 * pulse runs on the compositor; an animated SVG child would repaint the whole
 * globe on every frame.
 */
export function GlobePin({
  x,
  y,
  className = "",
  ...props
}: ComponentProps<"span"> & { x: number; y: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ${className}`}
      style={{ left: `${(x / 1259) * 100}%`, top: `${(y / 477) * 100}%` }}
      {...props}
    >
      <span className="absolute -inset-2 animate-pulse rounded-full bg-accent/20" />
    </span>
  );
}

export default Globe;
