"use client";

import { Plus, X } from "lucide-react";
import { adminInputClass } from "@/components/admin/FormField";
import { cn } from "@/lib/utils";

/** Editable list of plain strings — ingredients, benefits, recipe steps, etc. */
export default function ListInput({ items, onChange, placeholder = "Add an item...", multiline = false }) {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-2">
      {items.map((item, i) =>
        multiline ? (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-2.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-[0.65rem] font-semibold text-forest">
              {i + 1}
            </span>
            <textarea
              value={item}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
              className={cn(adminInputClass, "resize-none")}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2 flex size-6 shrink-0 items-center justify-center rounded-full text-muted hover:bg-terracotta/10 hover:text-terracotta"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <div key={i} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={adminInputClass}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-terracotta/10 hover:text-terracotta"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )
      )}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition-colors hover:text-forest-dark"
      >
        <Plus className="size-3.5" />
        Add item
      </button>
    </div>
  );
}
