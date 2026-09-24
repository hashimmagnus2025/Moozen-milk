"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Counter from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

/** Premium dashboard stat tile with an icon accent and optional deep link. */
export default function StatCard({ icon: Icon, label, value, href, tone = "sage", delay = 0 }) {
  const TONES = {
    sage: "bg-sage text-forest",
    gold: "bg-gold/20 text-terracotta",
    cream: "bg-cream-dark/60 text-forest-dark",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={href ? { y: -3 } : undefined}
      className="flex items-center gap-4 rounded-2xl border border-cream-dark/70 bg-white p-5 shadow-[0_2px_16px_-8px_rgba(42,38,32,0.12)] transition-shadow hover:shadow-[0_16px_32px_-16px_rgba(42,38,32,0.22)]"
    >
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl", TONES[tone])}>
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
        <Counter value={value} className="mt-0.5 block font-display text-2xl italic text-forest-dark" />
      </div>
    </motion.div>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
