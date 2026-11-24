"use client";

import { useState } from "react";
import ProductGallery from "@/components/products/ProductGallery";
import ProductDetailPanel from "@/components/products/ProductDetailPanel";

/**
 * Wires the pack-size selector to the gallery so switching pack size (e.g.
 * 500ml -> 1L) swaps in that pack's own photo when one is set. Needs to be
 * a client component since the product detail page itself is a server
 * component and can't hold this shared selection state.
 */
export default function ProductShowcase({ product }) {
  const [packIndex, setPackIndex] = useState(0);
  const activePackImages = product.packSizes[packIndex]?.images ?? [];

  return (
    <>
      <ProductGallery product={product} activePackImages={activePackImages} />
      <ProductDetailPanel product={product} packIndex={packIndex} onPackChange={setPackIndex} />
    </>
  );
}
