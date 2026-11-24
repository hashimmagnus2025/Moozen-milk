import Container from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { fadeUp, scaleIn } from "@/lib/animations";

const STATS = [
  { value: 20, suffix: "+", label: "Years" },
  { value: 100, suffix: "+", label: "Products" },
  { value: 50, suffix: "K+", label: "Customers" },
  { value: 500, suffix: "+", label: "Partners" },
];

export default function Stats() {
  return (
    <section className="section-y relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-forest-dark text-cream">
      {/* Soft glow accents for depth */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gold/25 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-moss/30 blur-[120px]" />

      <Container className="relative">
        <Reveal variants={fadeUp} className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            By The Numbers
          </p>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-white sm:text-5xl">
            Trusted at a scale that still feels personal.
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label} variants={scaleIn}>
              <div className="group relative h-full rounded-3xl border border-white/15 bg-white/5 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/10">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block font-display text-5xl italic text-gold drop-shadow-sm sm:text-6xl"
                />
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-cream/80">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
