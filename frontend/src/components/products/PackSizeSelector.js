"use client";

import { cn } from "@/lib/utils";

export default function PackSizeSelector({ packSizes, activeIndex, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {packSizes.map((pack, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={pack.size}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              "rounded-2xl border px-5 py-3 text-left transition-colors",
              isActive
                ? "border-forest bg-forest text-cream"
                : "border-cream-dark bg-white/70 text-charcoal hover:border-forest/40"
            )}
          >
            <span className="block text-sm font-semibold">{pack.size}</span>
            <span className={cn("block text-xs", isActive ? "text-cream/70" : "text-muted")}>
              &#8377;{pack.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}
