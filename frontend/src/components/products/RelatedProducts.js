import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/products/ProductCard";
import { fadeUp } from "@/lib/animations";

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <Section background="deep">
      <Reveal variants={fadeUp} className="max-w-xl">
        <CardEyebrow>You Might Also Like</CardEyebrow>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          More from this shelf.
        </h2>
      </Reveal>

      <Carousel className="mt-12" itemClassName="w-72 sm:w-80">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </Section>
  );
}
