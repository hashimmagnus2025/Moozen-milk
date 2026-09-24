import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import Accordion from "@/components/shared/Accordion";
import { fadeUp } from "@/lib/animations";

export const metadata = {
  title: "FAQ — Moozen",
  description: "Answers to common questions about Moozen's products, delivery and sourcing.",
};

const FAQS = [
  {
    question: "How fresh is Moozen milk when it reaches me?",
    answer:
      "Milk is collected each morning, chilled within two hours, and processed the same day. Depending on your city, it typically reaches you within 24–48 hours of collection.",
  },
  {
    question: "Is Moozen milk A2?",
    answer:
      "Our A2 Gold Milk is sourced exclusively from indigenous Gir and Sahiwal cows and tested to confirm A2 beta-casein purity. Our everyday milk lines are regular toned/full-cream milk.",
  },
  {
    question: "Do you deliver outside major cities?",
    answer:
      "We currently deliver across 25+ cities. Use the contact form with your pincode and we'll confirm whether we service your area.",
  },
  {
    question: "How do I become a Moozen distributor?",
    answer:
      "Reach out via the contact form with \"Distributor Inquiry\" as the subject, including your city and business details, and our partnerships team will follow up.",
  },
  {
    question: "What packaging do your products use?",
    answer:
      "The majority of our packaging is recyclable, and we're actively working toward fully plastic-neutral packaging across our range — see our About page for our sustainability commitments.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions."
        description="Can't find what you're looking for? Reach out and we'll get back to you personally."
        breadcrumb={[{ label: "FAQ" }]}
      />

      <Section background="cream" className="pt-14 lg:pt-16">
        <Reveal variants={fadeUp} className="mx-auto max-w-2xl">
          <Accordion items={FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
