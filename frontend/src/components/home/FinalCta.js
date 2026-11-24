import { Leaf } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { scaleIn } from "@/lib/animations";

export default function FinalCta() {
  return (
    <Section background="cream">
      <Reveal
        variants={scaleIn}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sage via-cream to-gold-light/60 px-8 py-16 text-center sm:px-16 sm:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-40" />
        <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-forest text-cream">
          <Leaf className="size-6" strokeWidth={1.75} />
        </span>
        <h2 className="relative mx-auto mt-6 max-w-2xl text-balance-pretty font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          Goodness worth bringing home.
        </h2>
        <p className="relative mx-auto mt-5 max-w-md text-muted">
          Join thousands of households who&rsquo;ve made the switch to purer,
          fresher, more honest dairy.
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/products" variant="primary" size="lg">
            Shop Products
          </Button>
          <Button href="/contact" variant="outline" size="lg" icon={false}>
            Become a Distributor
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
