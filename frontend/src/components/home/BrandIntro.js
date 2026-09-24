"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { PiDropFill } from "react-icons/pi";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import { fadeUp, slideIn, imageReveal } from "@/lib/animations";

export default function BrandIntro() {
  return (
    <Section background="cream" className="overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal variants={slideIn("left")}>
          <CardEyebrow>The Moozen Promise</CardEyebrow>
          <h2 className="mt-5 text-balance-pretty font-display text-[2.75rem] italic leading-[1.05] text-forest-dark sm:text-6xl">
            Pure goodness.
            <br />
            Crafted with care.
          </h2>

          <div className="mt-8 max-w-lg space-y-5">
            <p className="text-lg leading-relaxed text-muted">
              We work directly with over three thousand smallholder farmers
              across India, paying fair prices and collecting milk within
              hours of the morning pour. Nothing is diluted, nothing is
              rushed — the result is dairy that tastes the way it did
              generations ago.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              From our chilling centres to your doorstep, every batch is
              temperature-tracked, lab-tested and handled with a level of
              care usually reserved for far more delicate things.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={imageReveal}
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-forest via-forest-dark to-moss/70 shadow-[0_30px_70px_-24px_rgba(27,47,30,0.45)]" />
          <div aria-hidden className="bg-noise absolute inset-0 rounded-[2rem] opacity-15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="flex size-32 items-center justify-center rounded-full bg-gold/90 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PiDropFill className="size-14 text-forest-dark" />
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 -right-5 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-sage text-forest">
              <Leaf className="size-4.5" strokeWidth={2} />
            </span>
            <p className="text-xs font-semibold text-forest-dark">Since 1984</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
