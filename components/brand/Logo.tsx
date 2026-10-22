import Image from "next/image";

/**
 * The BEW lockup (public/bew-logo*.png): white lettering and green leaf on a navy
 * ground, supplied by the client as a flat image with no transparent version. It
 * is shown as its own navy tile, so it reads on both the glass header and the
 * light footer.
 */
export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <Image
      src="/bew-logo-512.png"
      alt="Better Earth Workplace"
      width={512}
      height={326}
      priority
      className={`w-auto rounded-[5px] ${className}`}
    />
  );
}
