import Section from "@/components/ui/Section";
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
    <Section background="dark" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-moss/20 blur-[100px]" />

      <Reveal variants={fadeUp} className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          By The Numbers
        </p>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] sm:text-5xl">
          Trusted at a scale that still feels personal.
        </h2>
      </Reveal>

      <RevealGroup
        stagger={0.12}
        className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <RevealItem key={stat.label} variants={scaleIn}>
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-4xl italic text-gold sm:text-5xl"
            />
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-cream/55">
              {stat.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
