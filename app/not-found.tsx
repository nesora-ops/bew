import { Globe, GlobeSvg } from "@/components/ui/globe";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * 404. The dotted globe rises behind the page's foot like the Earth's horizon
 * seen from orbit. Same globe component as the home hero.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-x-clip">
      <Container>
        <div className="relative z-10 pt-14 text-center sm:pt-20">
          <p className="font-display text-[clamp(6rem,24vw,15rem)] leading-[0.82] font-extrabold tracking-[-0.055em] text-accent">
            404
          </p>
          <h1 className="mt-8 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-accent-strong">
            Page not found
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[17px] text-ink-subdued">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">Back to home</Button>
            <Button href="/certifications" variant="secondary">
              Explore certifications
            </Button>
          </div>
        </div>
        <div className="pointer-events-none -mx-[20vw] -mt-[2vw] sm:mx-0">
          <Globe>
            <GlobeSvg />
          </Globe>
        </div>
      </Container>
    </section>
  );
}
