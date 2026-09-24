import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import Card, { CardTitle, CardText } from "@/components/ui/Card";
import ContactForm from "@/components/contact/ContactForm";
import { fadeUp, slideIn } from "@/lib/animations";

export const metadata = {
  title: "Contact Us — Moozen",
  description: "Get in touch with the Moozen team for orders, partnerships or questions.",
};

const CONTACT_DETAILS = [
  {
    icon: Mail,
    title: "Email Us",
    text: "hello@moozen-milk.example",
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "+91 788 788 8822",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Moozen Dairy Farm, Pune, Maharashtra, India",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="We'd love to hear from you."
        description="Questions about an order, a bulk enquiry, or just want to say hello — the team reads every message."
        breadcrumb={[{ label: "Contact" }]}
      />

      <Section background="cream" className="pt-14 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal variants={slideIn("left")} className="flex flex-col gap-5">
            {CONTACT_DETAILS.map(({ icon: Icon, title, text }) => (
              <Card key={title} tone="solid" hover={false} className="flex items-start gap-4 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <CardTitle className="mt-0 text-lg">{title}</CardTitle>
                  <CardText className="mt-1">{text}</CardText>
                </div>
              </Card>
            ))}
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
