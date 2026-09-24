"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ICONS } from "@/lib/icon-map";
import { resolveAssetUrl } from "@/lib/assetUrl";
import { cn } from "@/lib/utils";

const TONES = {
  sage: "from-sage via-cream to-white",
  gold: "from-gold-light/80 via-cream to-white",
  cream: "from-cream-dark/60 via-cream to-white",
  dark: "from-moss/40 via-forest-dark to-forest-dark",
};

const ICON_TONES = {
  sage: "bg-forest text-cream",
  gold: "bg-gold text-forest-dark",
  cream: "bg-forest-dark text-gold",
  dark: "bg-gold text-forest-dark",
};

/**
 * Product/category visual. Renders the real uploaded photo when one
 * exists (`imageUrl`); otherwise falls back to an abstract, brand-original
 * gradient + icon placeholder so the storefront never shows a broken
 * image while a catalog is still being photographed.
 */
export default function ProductVisual({
  icon = "Milk",
  tone = "sage",
  imageUrl,
  imageAlt = "",
  className,
  iconClassName,
  float = false,
  priority = false,
}) {
  const Icon = ICONS[icon] ?? ICONS.Milk;

  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-[1.75rem] bg-cream-deep", className)}>
        <Image
          src={resolveAssetUrl(imageUrl)}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br",
        TONES[tone],
        className
      )}
    >
      <div aria-hidden className="bg-noise absolute inset-0 opacity-30" />
      <div
        aria-hidden
        className="absolute -bottom-8 -right-8 size-28 rounded-full bg-white/40 blur-2xl"
      />
      <motion.span
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-lg",
          ICON_TONES[tone],
          iconClassName ?? "size-16"
        )}
        animate={float ? { y: [0, -10, 0] } : undefined}
        transition={float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <Icon className="size-1/2" strokeWidth={1.6} />
      </motion.span>
    </div>
  );
}
