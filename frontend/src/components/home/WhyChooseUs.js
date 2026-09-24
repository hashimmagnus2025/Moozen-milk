import { Award, Leaf, ShieldCheck, Cpu, HeartHandshake, Recycle } from "lucide-react";
import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import Card, { CardEyebrow, CardTitle, CardText } from "@/components/ui/Card";
import { fadeUp, scaleIn } from "@/lib/animations";

const FEATURES = [
  {
    icon: Award,
    title: "Premium Quality",
    text: "Every batch meets a standard set decades ago and never lowered since.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    text: "Sourced within hours of milking — nothing sits, nothing is stockpiled.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Processing",
    text: "Automated, contact-minimal processing lines audited every quarter.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    text: "IoT-enabled cold chain tracking temperature from farm to fridge.",
  },
  {
    icon: HeartHandshake,
    title: "Farmer Support",
    text: "Fair, above-market pricing and training for over 3,000 partner families.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    text: "Recyclable packaging and water-positive dairy operations by design.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section background="deep">
      <Reveal variants={fadeUp} className="max-w-xl">
        <CardEyebrow>Why Moozen</CardEyebrow>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          Quality you can taste, trust you can see.
        </h2>
      </Reveal>

      <RevealGroup
        stagger={0.1}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map(({ icon: Icon, title, text }) => (
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
  );
}
