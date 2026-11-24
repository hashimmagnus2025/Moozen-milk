import {
  GiFarmTractor,
  GiMilkCarton,
  GiMicroscope,
  GiFactory,
  GiCardboardBox,
} from "react-icons/gi";
import { Truck } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import { fadeUp, fadeIn } from "@/lib/animations";

const STEPS = [
  { icon: GiFarmTractor, title: "Farm", text: "Milk gathered fresh from partner farms every morning." },
  { icon: GiMilkCarton, title: "Collection", text: "Chilled within hours at our village collection centres." },
  { icon: GiMicroscope, title: "Testing", text: "Screened across 20+ parameters before it enters the line." },
  { icon: GiFactory, title: "Processing", text: "Pasteurised and prepared under strict hygiene standards." },
  { icon: GiCardboardBox, title: "Packaging", text: "Sealed in tamper-proof packs, ready for the cold chain." },
  { icon: Truck, title: "Delivery", text: "On your doorstep — fresh, fast, and full of care." },
];

export default function ProcessTimeline() {
  return (
    <Section background="cream">
      <Reveal variants={fadeUp} className="max-w-xl">
        <CardEyebrow>Farm to Table</CardEyebrow>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          Six steps. Zero shortcuts.
        </h2>
      </Reveal>

      <RevealGroup
        variants={fadeIn}
        stagger={0.12}
        className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
      >
        <div
          aria-hidden
          className="absolute top-8 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-moss/40 to-transparent lg:block"
        />
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <RevealItem key={title} className="relative flex flex-col items-start gap-4">
            <span className="relative z-10 flex size-16 items-center justify-center rounded-full border border-moss/30 bg-white text-forest shadow-sm">
              <Icon className="size-7" />
              <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-forest-dark">
                {i + 1}
              </span>
            </span>
            <div>
              <h3 className="font-display text-xl italic text-forest-dark">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
