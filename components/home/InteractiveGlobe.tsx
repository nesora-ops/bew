"use client";

import { useEffect, useRef, useState } from "react";
import { LAND_GRID } from "@/components/ui/globe-utils/globe-land-grid";

/**
 * The home hero's globe: a dot-matrix Earth with a graticule, split in two tones at
 * its equator line. Above the line it is green on the off-white canvas; below it is
 * off-white on the green band that starts there.
 *
 * It is drawn on a canvas and re-projected on every frame it moves (orthographic),
 * because spinning a flat drawing with CSS flips it like a coin rather than turning a
 * sphere. Land comes from Natural Earth via LAND_GRID. The split stays fixed on
 * screen while the sphere turns behind it.
 *
 * It is still by default and only animates in response to the pointer:
 * - hover: the globe turns toward the pointer, up, down and sideways;
 * - drag: it follows the pointer on both axes and keeps spinning on release;
 * - click: a flick that spins it away from the centre.
 * When nothing moves, no frames are drawn. Under reduced motion, hover and momentum
 * are off and only direct dragging turns it.
 */

const DEG = Math.PI / 180;
/** Resting view: the Atlantic in the centre, the north tilted toward the viewer. */
const REST_YAW = 20 * DEG;
const REST_PITCH = 14 * DEG;
/** How far hovering at the globe's edge turns it. */
const HOVER_YAW = 32 * DEG;
const HOVER_PITCH = 20 * DEG;
const PITCH_LIMIT = 70 * DEG;
/** Radians per pixel dragged. */
const DRAG_RATE = 0.45 * DEG;
/** A click's spin, in radians per frame at the globe's edge. */
const FLICK = 9 * DEG;
/** Momentum kept per frame, and the share of the gap closed per frame when easing. */
const FRICTION = 0.95;
const EASE = 0.09;
const STILL = 1e-4;

type Line = Float32Array;

const toVec = (lat: number, lon: number): [number, number, number] => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

/** Land dots as unit vectors, flattened [x, y, z, x, y, z, ...]. */
function landPoints(): Float32Array {
  const { rows, cols, runs } = LAND_GRID;
  const out: number[] = [];
  runs.forEach((row, i) => {
    const lat = -90 + ((i + 0.5) * 180) / rows;
    const n = Math.max(1, Math.round(cols * Math.cos(lat * DEG)));
    for (let k = 0; k < row.length; k += 2) {
      for (let j = row[k]; j < row[k] + row[k + 1]; j++) {
        out.push(...toVec(lat, -180 + ((j + 0.5) * 360) / n));
      }
    }
  });
  return new Float32Array(out);
}

/** Parallels and meridians every 15 degrees, each as flattened unit vectors. */
function graticule(): Line[] {
  const lines: Line[] = [];
  for (let lat = -75; lat <= 75; lat += 15) {
    lines.push(new Float32Array(Array.from({ length: 121 }, (_, i) => toVec(lat, -180 + i * 3)).flat()));
  }
  for (let lon = -180; lon < 180; lon += 15) {
    lines.push(new Float32Array(Array.from({ length: 61 }, (_, i) => toVec(-90 + i * 3, lon)).flat()));
  }
  return lines;
}

function token(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const green = token("--color-accent-strong", "#0a3d1e");
    const paper = token("--color-canvas", "#f4f4f0");
    const land = landPoints();
    const lines = graticule();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Orientation: `base` is where momentum and dragging leave it, `hover` is the
    // pointer's offset on top, and `view` eases toward base + hover.
    const base = { yaw: REST_YAW, pitch: REST_PITCH };
    const hover = { yaw: 0, pitch: 0 };
    const view = { yaw: REST_YAW, pitch: REST_PITCH };
    const velocity = { yaw: 0, pitch: 0 };
    const drag = { active: false, id: -1, x: 0, y: 0, travelled: 0 };

    let size = 0;
    let dpr = 1;
    let raf = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas!.clientWidth;
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * dpr);
    }

    function draw() {
      const c = ctx!;
      const s = size * dpr;
      const half = s / 2;
      const r = half - dpr;
      const sinY = Math.sin(view.yaw);
      const cosY = Math.cos(view.yaw);
      const sinP = Math.sin(view.pitch);
      const cosP = Math.cos(view.pitch);

      // Turn about the polar axis, then tilt toward the viewer. Writes screen x, y and depth.
      const out = [0, 0, 0];
      const project = (v: Float32Array, i: number) => {
        const x0 = v[i];
        const y0 = v[i + 1];
        const z0 = v[i + 2];
        const x = x0 * cosY + z0 * sinY;
        const z1 = z0 * cosY - x0 * sinY;
        out[0] = half + r * x;
        out[1] = half - r * (y0 * cosP - z1 * sinP);
        out[2] = z1 * cosP + y0 * sinP;
      };

      c.clearRect(0, 0, s, s);

      const rim = new Path2D();
      rim.arc(half, half, r, 0, Math.PI * 2);

      const grid = new Path2D();
      for (const line of lines) {
        let open = false;
        for (let i = 0; i < line.length; i += 3) {
          project(line, i);
          if (out[2] <= 0) {
            open = false;
            continue;
          }
          if (open) grid.lineTo(out[0], out[1]);
          else grid.moveTo(out[0], out[1]);
          open = true;
        }
      }

      // Land dots in three depth bands per tone, so the limb fades and each band is one fill.
      const bands = [0.34, 0.67, 1];
      const top = bands.map(() => new Path2D());
      const bottom = bands.map(() => new Path2D());
      const dot = Math.max(0.9, size / 330) * dpr;
      for (let i = 0; i < land.length; i += 3) {
        project(land, i);
        const z = out[2];
        if (z <= 0.02) continue;
        const band = Math.min(2, Math.floor(z * 3));
        const radius = dot * (0.55 + 0.45 * z);
        const path = out[1] < half ? top[band] : bottom[band];
        path.moveTo(out[0] + radius, out[1]);
        path.arc(out[0], out[1], radius, 0, Math.PI * 2);
      }

      // Upper half: green on the off-white sphere.
      c.save();
      c.beginPath();
      c.rect(0, 0, s, half);
      c.clip();
      c.fillStyle = paper;
      c.fill(rim);
      c.lineWidth = 0.8 * dpr;
      c.strokeStyle = withAlpha(green, 0.22);
      c.stroke(grid);
      c.lineWidth = 1.2 * dpr;
      c.strokeStyle = withAlpha(green, 0.55);
      c.stroke(rim);
      c.restore();

      // Lower half: off-white on the green band, which shows through.
      c.save();
      c.beginPath();
      c.rect(0, half, s, half);
      c.clip();
      c.lineWidth = 0.8 * dpr;
      c.strokeStyle = withAlpha(paper, 0.26);
      c.stroke(grid);
      c.lineWidth = 1.2 * dpr;
      c.strokeStyle = withAlpha(paper, 0.7);
      c.stroke(rim);
      c.restore();

      bands.forEach((depth, band) => {
        c.fillStyle = withAlpha(green, 0.25 + 0.75 * depth);
        c.fill(top[band]);
        c.fillStyle = withAlpha(paper, 0.25 + 0.7 * depth);
        c.fill(bottom[band]);
      });
    }

    function tick() {
      raf = 0;
      if (!drag.active) {
        base.yaw += velocity.yaw;
        base.pitch = clamp(base.pitch + velocity.pitch, PITCH_LIMIT);
        velocity.yaw *= FRICTION;
        velocity.pitch *= FRICTION;
      }
      const targetYaw = base.yaw + hover.yaw;
      const targetPitch = clamp(base.pitch + hover.pitch, PITCH_LIMIT);
      view.yaw += (targetYaw - view.yaw) * EASE;
      view.pitch += (targetPitch - view.pitch) * EASE;
      draw();

      const settled =
        Math.abs(velocity.yaw) < STILL &&
        Math.abs(velocity.pitch) < STILL &&
        Math.abs(targetYaw - view.yaw) < STILL &&
        Math.abs(targetPitch - view.pitch) < STILL;
      if (!settled || drag.active) wake();
    }

    function wake() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    /** Pointer position relative to the centre, -1 to 1 across the globe. */
    function offset(e: PointerEvent) {
      const box = canvas!.getBoundingClientRect();
      return {
        x: clamp(((e.clientX - box.left) / box.width) * 2 - 1, 1),
        y: clamp(((e.clientY - box.top) / box.height) * 2 - 1, 1),
      };
    }

    function onMove(e: PointerEvent) {
      if (drag.active && e.pointerId === drag.id) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        drag.travelled += Math.abs(dx) + Math.abs(dy);
        base.yaw += dx * DRAG_RATE;
        base.pitch = clamp(base.pitch + dy * DRAG_RATE, PITCH_LIMIT);
        // Follow the finger closely while dragging, and remember the speed for the release.
        view.yaw = base.yaw + hover.yaw;
        view.pitch = clamp(base.pitch + hover.pitch, PITCH_LIMIT);
        velocity.yaw = velocity.yaw * 0.5 + dx * DRAG_RATE * 0.5;
        velocity.pitch = velocity.pitch * 0.5 + dy * DRAG_RATE * 0.5;
        wake();
        return;
      }
      if (e.pointerType !== "mouse" || reduced.matches) return;
      const { x, y } = offset(e);
      hover.yaw = x * HOVER_YAW;
      hover.pitch = y * HOVER_PITCH;
      wake();
    }

    function onDown(e: PointerEvent) {
      if (e.button !== 0) return;
      drag.active = true;
      drag.id = e.pointerId;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.travelled = 0;
      velocity.yaw = 0;
      velocity.pitch = 0;
      canvas!.setPointerCapture(e.pointerId);
      setGrabbing(true);
    }

    function onUp(e: PointerEvent) {
      if (!drag.active || e.pointerId !== drag.id) return;
      drag.active = false;
      setGrabbing(false);
      if (reduced.matches) {
        velocity.yaw = 0;
        velocity.pitch = 0;
      } else if (drag.travelled < 5) {
        // A click: flick the globe away from the centre, on both axes.
        const { x, y } = offset(e);
        velocity.yaw = x * FLICK;
        velocity.pitch = y * FLICK * 0.6;
      }
      wake();
    }

    function onLeave() {
      if (drag.active) return;
      hover.yaw = 0;
      hover.pitch = 0;
      wake();
    }

    resize();
    draw();
    setDrawn(true);

    const sizer = new ResizeObserver(() => {
      resize();
      draw();
    });
    sizer.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      sizer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`size-full touch-pan-y select-none transition-opacity duration-(--dur-hero) ease-calm ${
        drawn ? "opacity-100" : "opacity-0"
      } ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
    />
  );
}
