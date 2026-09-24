"use client";

import { useRef, useState, useEffect, Children } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight horizontal scroll-snap carousel with arrow controls.
 * No external carousel library — native scroll + snap keeps it light
 * and lets touch/trackpad scrolling work for free on mobile.
 */
export default function Carousel({ children, className, itemClassName }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const items = Children.toArray(children);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <motion.button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByAmount(-1)}
          disabled={!canPrev}
          whileHover={canPrev ? { scale: 1.06 } : undefined}
          whileTap={canPrev ? { scale: 0.94 } : undefined}
          className={cn(
            "flex size-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors",
            canPrev ? "hover:bg-forest hover:text-cream" : "cursor-not-allowed opacity-30"
          )}
        >
          <ArrowLeft className="size-4" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next"
          onClick={() => scrollByAmount(1)}
          disabled={!canNext}
          whileHover={canNext ? { scale: 1.06 } : undefined}
          whileTap={canNext ? { scale: 0.94 } : undefined}
          className={cn(
            "flex size-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors",
            canNext ? "hover:bg-forest hover:text-cream" : "cursor-not-allowed opacity-30"
          )}
        >
          <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </div>
  );
}
