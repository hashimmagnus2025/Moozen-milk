"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-5 flex items-center justify-between">
      <p className="text-xs text-muted">
        Page <span className="font-semibold text-charcoal">{page}</span> of {pageCount}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className={cn(
            "flex size-8 items-center justify-center rounded-full border border-cream-dark text-charcoal transition-colors",
            page <= 1 ? "opacity-30" : "hover:bg-forest hover:text-cream"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
          className={cn(
            "flex size-8 items-center justify-center rounded-full border border-cream-dark text-charcoal transition-colors",
            page >= pageCount ? "opacity-30" : "hover:bg-forest hover:text-cream"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
