import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeUp } from "@/lib/animations";

export default async function FeaturedProducts() {
  const products = await safeFetch(getFeaturedProducts(5), []);
  if (products.length === 0) return null;

  return (
    <Section background="deep">
      <Reveal variants={fadeUp} className="max-w-xl">
        <CardEyebrow>Featured</CardEyebrow>
        <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          The pantry staples worth the switch.
        </h2>
      </Reveal>

      <Carousel className="mt-12" itemClassName="w-[78vw] xs:w-72 sm:w-80">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="w-full" priority />
        ))}
      </Carousel>
    </Section>
  );
}
