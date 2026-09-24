"use client";

import { Plus, X } from "lucide-react";
import { adminInputClass } from "@/components/admin/FormField";

/** Editable list of two-field rows — nutrition (label/value) or pack sizes (size/price). */
export default function PairListInput({
  items,
  onChange,
  fieldA,
  fieldB,
  placeholderA,
  placeholderB,
  typeB = "text",
}) {
  const update = (index, key, value) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, { [fieldA]: "", [fieldB]: "" }]);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item[fieldA] ?? ""}
            onChange={(e) => update(i, fieldA, e.target.value)}
            placeholder={placeholderA}
            className={adminInputClass}
          />
          <input
            type={typeB}
            value={item[fieldB] ?? ""}
            onChange={(e) => update(i, fieldB, e.target.value)}
            placeholder={placeholderB}
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
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition-colors hover:text-forest-dark"
      >
        <Plus className="size-3.5" />
        Add row
      </button>
    </div>
  );
}
