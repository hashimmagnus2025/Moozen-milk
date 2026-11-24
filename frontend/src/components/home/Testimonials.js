import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { fetchTestimonials } from "@/lib/api/testimonials";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeUp } from "@/lib/animations";

export default async function Testimonials() {
  const testimonials = await safeFetch(fetchTestimonials({ status: "published" }), []);
  if (testimonials.length === 0) return null;

  return (
    <Section background="cream">
      <Reveal variants={fadeUp} className="mx-auto max-w-2xl text-center">
        <CardEyebrow>Loved By Households</CardEyebrow>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          Word travels fast when it&rsquo;s honest.
        </h2>
      </Reveal>

      <TestimonialsCarousel testimonials={testimonials} />
    </Section>
  );
}
