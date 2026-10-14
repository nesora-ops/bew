"use client";

import dynamic from "next/dynamic";

/**
 * Loads the hero globe on the client only, in its own chunk, so the canvas code never
 * sits in the way of the hero text. The parent reserves the globe's square box, so
 * nothing shifts when it arrives.
 */
const InteractiveGlobe = dynamic(() => import("./InteractiveGlobe"), { ssr: false });

export function HeroGlobe() {
  return <InteractiveGlobe />;
}
