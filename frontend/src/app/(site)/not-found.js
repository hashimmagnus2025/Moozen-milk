import Link from "next/link";
import { Compass } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found — Moozen",
  robots: { index: false, follow: false },
};

/** Branded 404 for any unmatched public route. */
export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] items-center bg-cream">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-[2rem] border border-cream-dark/60 bg-white/70 px-8 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-sage text-forest">
            <Compass className="size-7" strokeWidth={1.5} />
          </span>
          <p className="mt-6 font-display text-6xl italic text-gold">404</p>
          <h1 className="mt-3 font-display text-3xl italic leading-tight text-forest-dark sm:text-4xl">
            This page wandered off the farm.
          </h1>
          <p className="mt-4 max-w-sm text-muted">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
            Let&rsquo;s get you back to fresh ground.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary" icon={false}>
              Back to homepage
            </Button>
            <Button href="/products" variant="outline" icon={false}>
              Shop products
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
