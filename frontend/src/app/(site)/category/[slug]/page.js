import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import ProductsExplorer from "@/components/products/ProductsExplorer";
import { getAllProducts } from "@/lib/data/products";
import { getAllCategories, getCategoryBySlug } from "@/lib/data/categories";
import { SITE_URL } from "@/lib/siteUrl";

// See products/[slug]/page.js for why this is force-dynamic rather
// than statically generated — same live-backend/correct-404 reasoning.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Moozen`,
    description: category.description,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
        breadcrumb={[{ label: "Products", href: "/products" }, { label: category.name }]}
      />
      <Section background="cream" className="pt-14 lg:pt-16">
        <ProductsExplorer products={products} categories={categories} initialCategory={category.slug} />
      </Section>
    </>
  );
}
