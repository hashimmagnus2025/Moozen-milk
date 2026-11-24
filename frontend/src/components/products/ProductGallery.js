"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductVisual from "@/components/shared/ProductVisual";
import { cn } from "@/lib/utils";

const TONE_CYCLE = ["sage", "gold", "cream", "dark"];

function buildPlaceholderGallery(product) {
  // No product photography uploaded yet — derive a believable multi-angle
  // set from the same icon/tone pairing used across the card + visual system.
  const start = TONE_CYCLE.indexOf(product.tone);
  const rotated = [...TONE_CYCLE.slice(start), ...TONE_CYCLE.slice(0, start)];
  const labels = ["Front", "Detail", "Pack", "Lifestyle"];
  return rotated.map((tone, i) => ({ tone, icon: product.icon, label: labels[i], imageUrl: null }));
}

export default function ProductGallery({ product, activePackImages = [] }) {
  const images = useMemo(() => {
    // If the selected pack size has its own photo set, show only those —
    // otherwise fall back to the shared product gallery.
    const source = activePackImages.length > 0 ? activePackImages : product.images ?? [];
    const gallery = source.map((url, i) => ({ imageUrl: url, label: i === 0 ? "Front" : `Photo ${i + 1}` }));
    return gallery.length > 0 ? gallery : buildPlaceholderGallery(product);
  }, [product, activePackImages]);

  const [active, setActive] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [activePackImages]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row-reverse sm:gap-5">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-cream-dark/60 bg-white cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ transformOrigin: zoomOrigin }}
          >
            <motion.div
              animate={{ scale: isZooming ? 1.6 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: zoomOrigin }}
              className="h-full w-full"
            >
              <ProductVisual
                icon={images[active].icon}
                tone={images[active].tone}
                imageUrl={images[active].imageUrl}
                imageAlt={product.name}
                priority
                className="h-full w-full rounded-none"
                iconClassName="size-24 sm:size-28"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-forest-dark">
          {images[active].label}
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex min-w-0 gap-3 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-visible">
          {images.map((img, i) => (
            <button
              key={img.label}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${img.label} image`}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:w-full",
                active === i ? "border-forest" : "border-transparent hover:border-cream-dark"
              )}
            >
              <ProductVisual
                icon={img.icon}
                tone={img.tone}
                imageUrl={img.imageUrl}
                imageAlt={product.name}
                className="h-full w-full rounded-none"
                iconClassName="size-7"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
