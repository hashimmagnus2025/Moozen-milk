"use client";

import { Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

export default function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  featuredOnly,
  onFeaturedToggle,
  newOnly,
  onNewToggle,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-cream-dark bg-white/80 py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-muted focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onFeaturedToggle}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              featuredOnly
                ? "border-gold bg-gold text-forest-dark"
                : "border-cream-dark bg-white/70 text-muted hover:border-gold/60"
            )}
          >
            <Sparkles className="size-3.5" strokeWidth={2.25} />
            Featured
          </button>
          <button
            type="button"
            onClick={onNewToggle}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              newOnly
                ? "border-forest bg-forest text-cream"
                : "border-cream-dark bg-white/70 text-muted hover:border-forest/50"
            )}
          >
            <Star className="size-3.5" strokeWidth={2.25} />
            New Arrivals
          </button>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none rounded-full border border-cream-dark bg-white/70 py-2.5 pl-9 pr-8 text-xs font-semibold uppercase tracking-wide text-charcoal focus:border-forest/40 focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "border-forest bg-forest text-cream"
              : "border-cream-dark bg-white/60 text-charcoal/70 hover:border-forest/40"
          )}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat.slug
                ? "border-forest bg-forest text-cream"
                : "border-cream-dark bg-white/60 text-charcoal/70 hover:border-forest/40"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
