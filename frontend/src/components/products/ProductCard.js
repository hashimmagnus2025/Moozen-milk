"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProductVisual from "@/components/shared/ProductVisual";
import { getStartingPrice } from "@/lib/data/products";
import { cn } from "@/lib/utils";

/**
 * The single reusable product card used across the products grid,
 * category pages, carousels and related-product rails. `layout` is left
 * enabled so filtering/sorting reflows animate instead of jump-cutting.
 */
export default function ProductCard({ product, className, priority = false }) {
  const price = getStartingPrice(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("h-full", className)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-dark/60 bg-white/80 p-4 transition-shadow duration-500 hover:shadow-[0_24px_48px_-20px_rgba(42,38,32,0.22)]"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <ProductVisual
            icon={product.icon}
            tone={product.tone}
            imageUrl={product.images?.[0]}
            imageAlt={product.name}
            className="aspect-square w-full transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            iconClassName="size-14"
            float={priority}
            priority={priority}
          />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNewArrival && (
              <span className="inline-flex items-center rounded-full bg-forest-dark px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-cream shadow-sm">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-forest-dark shadow-sm">
                <Sparkles className="size-3" strokeWidth={2.5} />
                Featured
              </span>
            )}
          </div>

          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-forest text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </motion.span>
        </div>

        <div className="mt-4 flex flex-1 flex-col px-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-moss">
            {product.subcategory ?? product.category}
          </p>
          <h3 className="mt-1.5 font-display text-xl italic leading-snug text-forest-dark">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-cream-dark/60 pt-3">
            <span className="text-sm font-semibold text-forest-dark">
              From &#8377;{price}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {product.packSizes.length > 1
                ? `${product.packSizes.length} sizes`
                : product.packSizes[0].size}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
