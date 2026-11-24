"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf } from "lucide-react";
import Button from "@/components/ui/Button";
import PackSizeSelector from "@/components/products/PackSizeSelector";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ProductDetailPanel({ product, packIndex, onPackChange }) {
  const activePack = product.packSizes[packIndex];

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.1, 0.05)}>
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
          {product.subcategory ?? product.category}
        </span>
        {product.isNewArrival && (
          <span className="rounded-full bg-forest-dark px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            New
          </span>
        )}
        {product.isFeatured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest-dark">
            <Sparkles className="size-3" strokeWidth={2.5} />
            Featured
          </span>
        )}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="mt-4 text-balance-pretty font-display text-4xl italic leading-[1.08] text-forest-dark sm:text-5xl"
      >
        {product.name}
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
        {product.shortDescription}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2 text-sm text-moss">
        <Leaf className="size-4" strokeWidth={2} />
        100% natural &middot; No preservatives
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Pack Size</p>
        <div className="mt-3">
          <PackSizeSelector packSizes={product.packSizes} activeIndex={packIndex} onChange={onPackChange} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-5">
        <p className="font-display text-3xl italic text-forest-dark">
          &#8377;{activePack.price}
          <span className="ml-1 text-base not-italic text-muted">/ {activePack.size}</span>
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-4">
        <Button href="/contact" variant="primary" size="lg" icon={false} className="min-w-52 justify-center">
          Ask a Question
        </Button>
      </motion.div>
    </motion.div>
  );
}
