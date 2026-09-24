"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveAssetUrl } from "@/lib/assetUrl";

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif";

/**
 * File picker + drag/drop with live previews. Works in two shapes:
 * `multiple` (product gallery, returns a File[] via onFilesChange) or
 * single-image mode (category/blog/recipe/homepage hero).
 *
 * The backend replaces the whole image set on write (see
 * product.controller.js), so when editing, selecting new files means
 * "replace what's there" rather than "append" — the hint text below
 * makes that explicit instead of implying a merge that can't happen.
 */
export default function ImageDropzone({
  existingUrls = [],
  files = [],
  onFilesChange,
  multiple = false,
  maxFiles = 6,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (!incoming.length) return;
      const next = multiple ? [...files, ...incoming].slice(0, maxFiles) : [incoming[0]];
      onFilesChange(next);
    },
    [files, multiple, maxFiles, onFilesChange]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const willReplaceExisting = files.length > 0 && existingUrls.length > 0;

  return (
    <div>
      {existingUrls.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {willReplaceExisting ? "Current (will be replaced)" : "Current"}
          </p>
          <div className="flex flex-wrap gap-2">
            {existingUrls.map((url) => (
              <div
                key={url}
                className={cn(
                  "relative size-16 overflow-hidden rounded-lg border border-cream-dark bg-cream-deep",
                  willReplaceExisting && "opacity-40"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resolveAssetUrl(url)} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          isDragging ? "border-forest bg-sage/30" : "border-cream-dark hover:border-forest/40"
        )}
      >
        <UploadCloud className="size-6 text-moss" strokeWidth={1.5} />
        <p className="text-sm text-muted">
          <span className="font-semibold text-forest">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted/70">JPEG, PNG, WEBP or AVIF, up to 5MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative size-16 overflow-hidden rounded-lg border border-forest/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="size-4 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {existingUrls.length === 0 && files.length === 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted/70">
          <ImageOff className="size-3.5" />
          No images yet — the storefront will show a placeholder.
        </p>
      )}
    </div>
  );
}
