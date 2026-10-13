import { GLOBE_COLORS, GLOBE_FRAMES, type GlobeVariant } from "./config";
import { HERO_DOTS, HERO_GRATICULE, HORIZON_DOTS, HORIZON_GRATICULE } from "./poster-data";

/**
 * The globe's static poster: what visitors see before the live globe loads, and all
 * they see under reduced motion, Save-Data, low power or without WebGL.
 *
 * Inline SVG (not an image), so it is never an LCP candidate. Same frame, view and
 * colours as the live globe, so the cross-fade between them is quiet. Crisp lines
 * only; the gradients are the glass body's light and the limb's tint, not blur.
 */
export function GlobePoster({ variant = "hero" }: { variant?: GlobeVariant }) {
  const f = GLOBE_FRAMES[variant];
  const id = `globe-${variant}`;
  const isHero = variant === "hero";
  const dots = isHero ? HERO_DOTS : HORIZON_DOTS;
  const graticule = isHero ? HERO_GRATICULE : HORIZON_GRATICULE;
  // The orbit, matching the shader: a 1.2r by 0.3r ellipse turned 12.6 degrees.
  const orbit = { rx: f.r * 1.2, ry: f.r * 0.3, angle: -12.6 };

  return (
    <svg
      viewBox={`0 0 ${f.width} ${f.height}`}
      preserveAspectRatio={isHero ? "xMidYMid meet" : "xMidYMax slice"}
      aria-hidden="true"
      className="size-full"
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="1" stopColor={GLOBE_COLORS.body} stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id={`${id}-limb`} cx="50%" cy="50%" r="50%">
          <stop offset="0.82" stopColor={GLOBE_COLORS.glow} stopOpacity="0" />
          <stop offset="1" stopColor={GLOBE_COLORS.glow} stopOpacity="0.3" />
        </radialGradient>
        {isHero ? (
          <clipPath id={`${id}-near`}>
            <rect x={f.cx - orbit.rx - 20} y={f.cy} width={orbit.rx * 2 + 40} height={orbit.ry + 20} />
          </clipPath>
        ) : null}
      </defs>

      {isHero ? (
        <ellipse
          cx={f.cx}
          cy={f.cy}
          rx={orbit.rx}
          ry={orbit.ry}
          transform={`rotate(${orbit.angle} ${f.cx} ${f.cy})`}
          fill="none"
          stroke={GLOBE_COLORS.rim}
          strokeOpacity="0.45"
          strokeWidth="1.6"
        />
      ) : null}

      <circle
        cx={f.cx}
        cy={f.cy}
        r={f.r * 1.045}
        fill="none"
        stroke={GLOBE_COLORS.glow}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <circle cx={f.cx} cy={f.cy} r={f.r} fill={`url(#${id}-body)`} />
      <path
        d={graticule}
        fill="none"
        stroke={GLOBE_COLORS.line}
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d={dots}
        fill="none"
        stroke={GLOBE_COLORS.dot}
        strokeOpacity="0.9"
        strokeWidth={isHero ? 9 : 7}
        strokeLinecap="round"
      />
      <circle cx={f.cx} cy={f.cy} r={f.r} fill={`url(#${id}-limb)`} />
      <circle
        cx={f.cx}
        cy={f.cy}
        r={f.r}
        fill="none"
        stroke={GLOBE_COLORS.rim}
        strokeOpacity="0.8"
        strokeWidth="2"
      />

      {isHero ? (
        // Rotate first, then clip, so the clip selects the ring's near half.
        <g transform={`rotate(${orbit.angle} ${f.cx} ${f.cy})`}>
          <ellipse
            cx={f.cx}
            cy={f.cy}
            rx={orbit.rx}
            ry={orbit.ry}
            clipPath={`url(#${id}-near)`}
            fill="none"
            stroke={GLOBE_COLORS.rim}
            strokeOpacity="0.6"
            strokeWidth="1.6"
          />
        </g>
      ) : null}
    </svg>
  );
}
