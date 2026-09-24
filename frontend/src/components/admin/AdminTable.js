"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/Loading";
import { cn } from "@/lib/utils";

/**
 * Generic admin list table: pass `columns` ({key, header, render, className})
 * and `rows`. Handles its own loading skeleton and empty state so every
 * resource manager doesn't have to re-implement them.
 */
export default function AdminTable({ columns, rows, keyField = "_id", loading, emptyMessage = "Nothing here yet." }) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-cream-dark/70 bg-white">
        <div className="divide-y divide-cream-dark/60">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <Skeleton className="h-4 w-full max-w-xs rounded-full" />
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="ml-auto h-4 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-cream-dark bg-white/60 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-cream-deep text-muted">
          <Inbox className="size-5" strokeWidth={1.5} />
        </span>
        <p className="text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-cream-dark/70 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-cream-dark/70 bg-cream-deep/60">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn("px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {rows.map((row) => (
              <motion.tr
                key={row[keyField]}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b border-cream-dark/50 last:border-0 hover:bg-cream/60"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-5 py-3.5 align-middle text-charcoal", col.className)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
