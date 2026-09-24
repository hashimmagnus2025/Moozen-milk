import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import ProductsExplorer from "@/components/products/ProductsExplorer";
import { getAllProducts } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";

export const metadata = {
  title: "All Products — Moozen",
  description: "Browse Moozen's full range of farm-fresh milk, ghee, paneer and more.",
};

export default async function ProductsPage({ searchParams }) {
  const [products, categories, params] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Shop Moozen"
        title="Every essential, made honestly."
        description="From everyday milk to small-batch ghee — filter, search and find exactly what your kitchen needs."
        breadcrumb={[{ label: "Products" }]}
      />
      <Section background="cream" className="pt-14 lg:pt-16">
        <ProductsExplorer
          products={products}
          categories={categories}
          initialFeaturedOnly={params?.filter === "featured"}
          initialNewOnly={params?.filter === "new"}
        />
      </Section>
    </>
  );
}
