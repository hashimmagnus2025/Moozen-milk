import Link from "next/link";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import Carousel from "@/components/ui/Carousel";
import ProductVisual from "@/components/shared/ProductVisual";
import { getNewArrivalProducts, getStartingPrice } from "@/lib/data/products";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeUp } from "@/lib/animations";

export default async function NewArrivals() {
  const products = await safeFetch(getNewArrivalProducts(6), []);
  if (products.length === 0) return null;

  return (
    <Section background="cream">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal variants={fadeUp} className="max-w-xl">
          <CardEyebrow>Just In</CardEyebrow>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
            New arrivals, still warm from the dairy.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.1}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">
            Fresh This Week
          </span>
        </Reveal>
      </div>

      <Carousel className="mt-12" itemClassName="w-40 sm:w-48">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block overflow-hidden rounded-2xl"
          >
            <ProductVisual
              icon={product.icon}
              tone={product.tone}
              imageUrl={product.images?.[0]}
              imageAlt={product.name}
              className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
              iconClassName="size-11"
            />
            <div className="mt-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-moss">
                {product.subcategory ?? product.category}
              </p>
              <h3 className="mt-1 font-display text-base italic leading-tight text-forest-dark">
                {product.name}
              </h3>
              <p className="mt-0.5 text-xs text-muted">From &#8377;{getStartingPrice(product)}</p>
            </div>
          </Link>
        ))}
      </Carousel>
    </Section>
  );
}
