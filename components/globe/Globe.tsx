"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GlobeVariant } from "./config";

/**
 * Client wrapper for the hologram globe.
 *
 * Renders the server-made poster (passed in as `children`, so its path data is not
 * shipped twice) and a canvas that starts hidden. The markup is the same on server
 * and client; every capability check runs in an effect. After the page has loaded
 * and the browser is idle, it imports the WebGL module and fades the live globe in
 * over the poster. The poster stays for reduced motion, Save-Data, low-power devices,
 * missing WebGL, or a lost context.
 */
export function Globe({
  children,
  variant = "hero",
  className = "",
}: {
  children: ReactNode;
  variant?: GlobeVariant;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const lowPower =
      nav.connection?.saveData === true ||
      (nav.hardwareConcurrency ?? 8) <= 2 ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
    if (reducedMotion.matches || lowPower) return;

    let cancelled = false;
    let handle: { destroy: () => void } | null = null;
    let idle = 0;
    // Safari has no requestIdleCallback; the DOM types assume it always exists.
    const hasIdle =
      typeof (window as { requestIdleCallback?: unknown }).requestIdleCallback === "function";

    const start = () => {
      import("./globe-gl").then(({ createGlobe }) => {
        if (cancelled) return;
        handle = createGlobe(canvas, {
          variant,
          onReady: () => !cancelled && setLive(true),
          onLost: () => !cancelled && setLive(false),
        });
      });
    };
    const schedule = () => {
      idle = hasIdle
        ? window.requestIdleCallback(start, { timeout: 2500 })
        : window.setTimeout(start, 1200);
    };
    // If the visitor turns on reduced motion mid-visit, drop back to the poster.
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      handle?.destroy();
      handle = null;
      setLive(false);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      reducedMotion.removeEventListener("change", onMotionChange);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      handle?.destroy();
    };
  }, [variant]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`size-full transition-opacity duration-(--dur-hero) ease-calm ${
          live ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 size-full transition-opacity duration-(--dur-hero) ease-calm ${
          live ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
