"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Description", "Ingredients", "Benefits", "Nutrition"];

export default function ProductInfoTabs({ product }) {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-cream-dark/70">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-4 py-3 text-sm font-semibold transition-colors",
              active === tab ? "text-forest-dark" : "text-muted hover:text-charcoal"
            )}
          >
            {tab}
            {active === tab && (
              <motion.span
                layoutId="product-tab-underline"
                className="absolute inset-x-4 -bottom-px h-[2px] bg-forest"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {active === "Description" && (
              <p className="max-w-2xl text-base leading-relaxed text-muted">{product.description}</p>
            )}

            {active === "Ingredients" && (
              <ul className="flex flex-wrap gap-2.5">
                {product.ingredients.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-cream-dark bg-white/70 px-4 py-2 text-sm text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {active === "Benefits" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {active === "Nutrition" && (
              <div className="max-w-md overflow-hidden rounded-2xl border border-cream-dark/70">
                <p className="border-b border-cream-dark/70 bg-cream-deep px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  Typical values per 100g / 100ml
                </p>
                <dl>
                  {product.nutrition.map((row, i) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between px-5 py-3 text-sm",
                        i % 2 === 1 && "bg-cream-deep/50"
                      )}
                    >
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="font-semibold text-forest-dark">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
