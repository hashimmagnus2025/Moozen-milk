"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

/**
 * Animated grid: cards fade/scale in and out via AnimatePresence while
 * `layout` on ProductCard smoothly reflows survivors whenever the
 * filtered/sorted list changes.
 */
export default function ProductGrid({ products, className }) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-cream-dark py-24 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-sage text-forest">
          <PackageSearch className="size-6" strokeWidth={1.5} />
        </span>
        <div>
          <p className="font-display text-xl italic text-forest-dark">No products found</p>
          <p className="mt-1 text-sm text-muted">Try adjusting your filters or search term.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
}
