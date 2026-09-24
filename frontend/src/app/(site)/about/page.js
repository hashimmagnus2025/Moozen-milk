import { Leaf, ShieldCheck, HeartHandshake, Recycle, Sprout, Sun } from "lucide-react";
import { GiFamilyTree } from "react-icons/gi";
import { PiDropFill } from "react-icons/pi";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Card, { CardEyebrow, CardTitle, CardText } from "@/components/ui/Card";
import Counter from "@/components/ui/Counter";
import FinalCta from "@/components/home/FinalCta";
import { fadeUp, slideIn, scaleIn } from "@/lib/animations";

export const metadata = {
  title: "About Us — Moozen",
  description:
    "Moozen is a farm-to-table dairy brand built on four decades of trust, 3,000+ partner farmers, and an uncompromising standard for purity.",
  openGraph: {
    title: "About Moozen — Pure Dairy, Honestly Made",
    description:
      "Moozen is a farm-to-table dairy brand built on four decades of trust, 3,000+ partner farmers, and an uncompromising standard for purity.",
  },
};

const VALUES = [
  { icon: Leaf, title: "Purity First", text: "No preservatives, no shortcuts — every product is exactly what it says it is." },
  { icon: ShieldCheck, title: "Rigorous Quality", text: "Every batch is lab-tested across 20+ parameters before it ever reaches you." },
  { icon: HeartHandshake, title: "Farmer Partnership", text: "Fair, above-market pricing for the 3,000+ families who supply us." },
  { icon: Recycle, title: "Sustainable by Design", text: "Water-conscious processing and recyclable packaging, not as an afterthought." },
];

const SUSTAINABILITY = [
  { icon: Sprout, text: "12,000+ trees planted alongside partner farms since 2018." },
  { icon: Sun, text: "Solar-assisted chilling centres across our collection network." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Moozen"
        title="Four decades of dairy, made the honest way."
        description="From a single courtyard outside Pune to a network of 3,000+ partner farms — the standard has never changed."
        breadcrumb={[{ label: "About" }]}
      />

      <Section background="cream">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal variants={slideIn("left")}>
            <CardEyebrow>Our Mission</CardEyebrow>
            <h2 className="mt-5 text-balance-pretty font-display text-4xl italic leading-[1.08] text-forest-dark sm:text-5xl">
              Bring India&rsquo;s dairy heritage into the modern home, without losing what made it worth keeping.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
              Moozen was founded in 1984 on a simple premise: milk should taste
              the way it did on the farm. Every decision since — from how we
              pay our farmers to how we chill our tankers — has been measured
              against that one standard.
            </p>
          </Reveal>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-forest via-forest-dark to-moss/70 shadow-[0_30px_70px_-24px_rgba(27,47,30,0.45)]" />
            <div aria-hidden className="bg-noise absolute inset-0 rounded-[2rem] opacity-15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <GiFamilyTree className="size-40 text-gold/70 sm:size-52" />
            </div>
          </div>
        </div>
      </Section>

      <Section background="deep">
        <Reveal variants={fadeUp} className="max-w-xl">
          <CardEyebrow>What We Stand For</CardEyebrow>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
            Values that show up in every litre.
          </h2>
        </Reveal>

        <RevealGroup stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} variants={scaleIn}>
              <Card className="h-full" tone="solid">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardText>{text}</CardText>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section background="dark" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-moss/20 blur-[100px]" />
        <Reveal variants={fadeUp} className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Quality &amp; Trust</p>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] sm:text-5xl">
            Trusted at a scale that still feels personal.
          </h2>
        </Reveal>

        <RevealGroup stagger={0.12} className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4">
          {[
            { value: 40, suffix: "+", label: "Years of Heritage" },
            { value: 3000, suffix: "+", label: "Partner Farmers" },
            { value: 20, suffix: "+", label: "Quality Checks per Batch" },
            { value: 25, suffix: "+", label: "Cities Served" },
          ].map((stat) => (
            <RevealItem key={stat.label} variants={scaleIn}>
              <Counter value={stat.value} suffix={stat.suffix} className="font-display text-4xl italic text-gold sm:text-5xl" />
              <p className="mt-2 text-sm uppercase tracking-[0.12em] text-cream/55">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section background="sage">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal variants={slideIn("left")}>
            <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-cream">
              <PiDropFill className="size-6" />
            </span>
            <h2 className="mt-6 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
              Sustainability, built in — not bolted on.
            </h2>
          </Reveal>

          <RevealGroup stagger={0.1} className="space-y-4">
            {SUSTAINABILITY.map(({ icon: Icon, text }, i) => (
              <RevealItem key={i} variants={fadeUp}>
                <Card tone="cream" hover={false} className="flex items-center gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm leading-relaxed text-charcoal">{text}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
