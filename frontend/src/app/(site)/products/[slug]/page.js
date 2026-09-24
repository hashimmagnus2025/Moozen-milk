import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import ProductShowcase from "@/components/products/ProductShowcase";
import ProductInfoTabs from "@/components/products/ProductInfoTabs";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getProductBySlug, getRelatedProducts, getStartingPrice } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";
import { SITE_URL } from "@/lib/siteUrl";

// Product data comes from a live, admin-managed backend (not build-time
// mock data), so this route renders per-request rather than via
// generateStaticParams — that keeps newly-added products visible
// immediately and, importantly, keeps notFound() returning a real 404
// instead of Next's cached-static-shell 200-with-noindex behavior.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Moozen`,
    description: product.shortDescription,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — Moozen`,
      description: product.shortDescription,
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, category] = await Promise.all([
    getRelatedProducts(product),
    getCategoryBySlug(product.category),
  ]);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: category?.name,
    brand: { "@type": "Brand", name: "Moozen" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: getStartingPrice(product),
      availability: product.status === "active" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Section background="cream" className="pb-0 pt-32 lg:pt-40">
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-forest-dark">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/products" className="transition-colors hover:text-forest-dark">
            Products
          </Link>
          {category && (
            <>
              <ChevronRight className="size-3" />
              <Link href={`/category/${category.slug}`} className="transition-colors hover:text-forest-dark">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="size-3" />
          <span className="text-forest-dark">{product.name}</span>
        </nav>

        <div className="grid gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20">
          <ProductShowcase product={product} />
        </div>
      </Section>

      <Section background="cream" className="pt-0">
        <div className="border-t border-cream-dark/70">
          <ProductInfoTabs product={product} />
        </div>
      </Section>

      <RelatedProducts products={related} />
    </>
  );
}
