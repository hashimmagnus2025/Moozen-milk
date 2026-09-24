"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Button from "@/components/ui/Button";
import { getStartingPrice } from "@/lib/data/products";

const PAGE_SIZE = 8;

function sortProducts(products, sort) {
  const list = [...products];
  switch (sort) {
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "price-asc":
      return list.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
    case "price-desc":
      return list.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
    case "newest":
      return list.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
    case "featured":
    default:
      return list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}

/**
 * Client-side filter/sort/paginate over the full product list. Filtering
 * stays in the browser since the mock dataset is small; once this reads
 * from the Express API, swap the `useMemo` filter chain for query params
 * passed to `getAllProducts()` and this component's shape barely changes.
 */
export default function ProductsExplorer({
  products,
  categories,
  initialCategory = "all",
  initialFeaturedOnly = false,
  initialNewOnly = false,
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [featuredOnly, setFeaturedOnly] = useState(initialFeaturedOnly);
  const [newOnly, setNewOnly] = useState(initialNewOnly);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (featuredOnly && !p.isFeatured) return false;
      if (newOnly && !p.isNewArrival) return false;
      if (q && !`${p.name} ${p.shortDescription} ${p.category}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
    return sortProducts(list, sort);
  }, [products, activeCategory, featuredOnly, newOnly, search, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const updateAndReset = (setter) => (value) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div>
      <ProductFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={updateAndReset(setActiveCategory)}
        search={search}
        onSearchChange={updateAndReset(setSearch)}
        sort={sort}
        onSortChange={setSort}
        featuredOnly={featuredOnly}
        onFeaturedToggle={() => updateAndReset(setFeaturedOnly)(!featuredOnly)}
        newOnly={newOnly}
        onNewToggle={() => updateAndReset(setNewOnly)(!newOnly)}
      />

      <p className="mt-6 text-sm text-muted">
        Showing <span className="font-semibold text-forest-dark">{visible.length}</span> of{" "}
        {filtered.length} products
      </p>

      <ProductGrid products={visible} className="mt-6" />

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            size="md"
            icon={false}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More Products
          </Button>
        </motion.div>
      )}
    </div>
  );
}
