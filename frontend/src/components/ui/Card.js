"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TONES = {
  cream: "bg-white/70 border border-cream-dark/70",
  sage: "bg-sage/60 border border-sage",
  dark: "bg-forest-dark text-cream border border-white/10",
  solid: "bg-white border border-cream-dark",
};

/**
 * Base premium card: rounded-3xl, soft elevation, gentle hover lift.
 * Set `hover={false}` for static cards (e.g. inside forms).
 */
export default function Card({
  children,
  className,
  tone = "cream",
  hover = true,
  as: Tag = "div",
  ...props
}) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={cn(
        "rounded-3xl p-6 sm:p-8 backdrop-blur-sm transition-shadow duration-500",
        "shadow-[0_2px_20px_-8px_rgba(42,38,32,0.12)]",
        TONES[tone],
        className
      )}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 24px 48px -16px rgba(42,38,32,0.22)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function CardEyebrow({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-moss",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3
      className={cn(
        "mt-3 font-display text-2xl leading-snug text-forest-dark",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardText({ children, className }) {
  return (
    <p className={cn("mt-2 text-[0.95rem] leading-relaxed text-muted", className)}>
      {children}
    </p>
  );
}
