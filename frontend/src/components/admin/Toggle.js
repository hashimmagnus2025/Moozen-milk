"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Small labeled switch used for featured/newArrival/status flags. */
export default function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <label className={cn("inline-flex items-center gap-2.5", disabled ? "opacity-50" : "cursor-pointer")}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300",
          checked ? "bg-forest" : "bg-cream-dark"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="size-4.5 rounded-full bg-white shadow-sm"
          style={{ marginLeft: checked ? "calc(100% - 1.2rem)" : "0.2rem" }}
        />
      </button>
      {label && <span className="text-sm font-medium text-charcoal">{label}</span>}
    </label>
  );
}
