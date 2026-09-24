"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import ProductVisual from "@/components/shared/ProductVisual";
import { fadeUp, scaleIn } from "@/lib/animations";

export default function ProductCategories({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <Section background="cream">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal variants={fadeUp} className="max-w-xl">
          <CardEyebrow>Shop By Category</CardEyebrow>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
            One dairy, every essential.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.1}>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
          >
            View all categories
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealGroup
        stagger={0.07}
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
      >
        {categories.map((cat) => (
          <RevealItem key={cat.slug} variants={scaleIn}>
            <Link
              href={`/category/${cat.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-cream-dark/60 bg-white/70 p-4"
            >
              <ProductVisual
                icon={cat.icon}
                tone={cat.tone}
                imageUrl={cat.image}
                imageAlt={cat.name}
                className="aspect-[5/4] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                iconClassName="size-12"
              />
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-display text-xl italic text-forest-dark">{cat.name}</h3>
                <motion.span
                  className="flex size-9 items-center justify-center rounded-full bg-sage text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream"
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowUpRight className="size-4" strokeWidth={2.25} />
                </motion.span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
