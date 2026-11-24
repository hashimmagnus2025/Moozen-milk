"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Small inline spinner — buttons, inline fetch states. */
export function Spinner({ className, size = 20 }) {
  return (
    <motion.span
      className={cn(
        "inline-block rounded-full border-2 border-current border-t-transparent",
        className
      )}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
      aria-label="Loading"
      role="status"
    />
  );
}

/** Shimmering placeholder block for cards/images while data loads. */
export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-cream-dark/60",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * Full-viewport brand loader — shown while a route/page is mounting.
 * Deliberately brief and understated: a mark draw-in, not a spinner circus.
 */
export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display text-3xl italic tracking-tight text-forest">
          Moozen
        </span>
        <motion.span
          className="h-px w-16 bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </motion.div>
    </motion.div>
  );
}
