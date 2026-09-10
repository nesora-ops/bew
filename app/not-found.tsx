import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container>
      <div className="py-28 text-center sm:py-36">
        <p className="font-mono text-xs tracking-widest text-ink-subdued uppercase">
          404
        </p>
        <h1 className="mt-4 text-[36px] leading-[1.1] font-medium tracking-[-0.02em] text-ink sm:text-[48px]">
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
    </Container>
  );
}
