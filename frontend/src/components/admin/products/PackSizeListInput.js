"use client";

import { Plus, X } from "lucide-react";
import { adminInputClass } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";

/**
 * Pack size rows (size + price), each with its own optional photo set —
 * e.g. the 500ml bottle and the 1L jug can show entirely different shots.
 * `files` is a parallel array (same index as `items`) holding the newly
 * picked File[] for that row's dropzone.
 */
export default function PackSizeListInput({ items, onChange, files, onFilesChange }) {
  const update = (index, key, value) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const add = () => {
    onChange([...items, { size: "", price: "" }]);
    onFilesChange([...files, []]);
  };

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index));
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const setRowFiles = (index, rowFiles) => {
    const next = [...files];
    next[index] = rowFiles;
    onFilesChange(next);
  };

  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-cream-dark/70 p-4">
          <div className="flex items-center gap-2">
            <input
              value={item.size ?? ""}
              onChange={(e) => update(i, "size", e.target.value)}
              placeholder="500ml"
              className={adminInputClass}
            />
            <input
              type="number"
              value={item.price ?? ""}
              onChange={(e) => update(i, "price", e.target.value)}
              placeholder="Price"
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

          <div className="mt-3">
            <ImageDropzone
              existingUrls={item.images ?? []}
              files={files[i] ?? []}
              onFilesChange={(rowFiles) => setRowFiles(i, rowFiles)}
              multiple
              maxFiles={6}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition-colors hover:text-forest-dark"
      >
        <Plus className="size-3.5" />
        Add pack size
      </button>
    </div>
  );
}
