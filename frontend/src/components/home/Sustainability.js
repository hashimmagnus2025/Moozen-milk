import Link from "next/link";
import { Droplets, Recycle, Sprout, Sun, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import { fadeUp, slideIn, scaleIn } from "@/lib/animations";

const PILLARS = [
  { icon: Droplets, value: "40%", label: "Less water used per litre vs. 2015" },
  { icon: Recycle, value: "70%", label: "Packaging now recyclable or reusable" },
  { icon: Sprout, value: "12K", label: "Trees planted with farmer partners" },
  { icon: Sun, value: "30%", label: "Dairy energy from solar by 2027" },
];

export default function Sustainability() {
  return (
    <section className="section-y relative overflow-hidden bg-forest-dark text-cream">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 size-96 rounded-full bg-moss/25 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 size-80 rounded-full bg-gold/15 blur-[110px]" />
      </div>

      <div className="container-premium relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal variants={slideIn("left")}>
            <CardEyebrow className="text-gold">Sustainability</CardEyebrow>
            <h2 className="mt-4 text-balance-pretty font-display text-4xl italic leading-[1.1] text-cream sm:text-5xl">
              Good for your table, gentler on the land it came from.
            </h2>
          </Reveal>
          <Reveal variants={fadeUp} delay={0.1}>
            <p className="max-w-lg text-lg leading-relaxed text-cream/70">
              Purity doesn&rsquo;t stop at the product. We&rsquo;re investing
              in water recycling, solar-powered chilling centres, and
              reforestation alongside the very farms that supply us.
            </p>
            <Link
              href="/sustainability"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
            >
              See our full impact report
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.1}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 lg:grid-cols-4"
        >
          {PILLARS.map(({ icon: Icon, value, label }) => (
            <RevealItem key={label} variants={scaleIn}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-3xl italic text-gold">{value}</p>
                <p className="mt-1.5 text-sm leading-snug text-cream/60">{label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
