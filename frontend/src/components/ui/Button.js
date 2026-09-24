"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-forest text-cream hover:bg-forest-dark shadow-[0_10px_30px_-12px_rgba(47,82,51,0.55)]",
  gold: "bg-gold text-forest-dark hover:bg-gold-light shadow-[0_10px_30px_-12px_rgba(232,163,76,0.55)]",
  outline:
    "bg-transparent text-forest border border-forest/30 hover:border-forest hover:bg-forest/5",
  ghost: "bg-transparent text-charcoal hover:bg-charcoal/5",
  light:
    "bg-cream text-forest-dark hover:bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]",
  danger:
    "bg-terracotta text-cream hover:bg-terracotta/90 shadow-[0_10px_30px_-12px_rgba(201,103,61,0.55)]",
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[0.95rem]",
  lg: "px-9 py-4 text-base",
};

/**
 * Shared CTA button. Renders a Next.js Link when `href` is provided,
 * otherwise a native <button>. `icon={false}` hides the trailing arrow.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  type = "button",
  ...props
}) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-300",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  };

  if (href) {
    return (
      <motion.div className="inline-block" {...motionProps}>
        <Link href={href} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={type} className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
}
