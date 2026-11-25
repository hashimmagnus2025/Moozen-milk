"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

        <div className="relative mx-auto aspect-[342/430] w-full max-w-md">
          {/* Brand-blue half-panel — the product sits partly within it */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-[4%] bottom-[3%] top-[40%] overflow-hidden rounded-[28px] bg-gradient-to-br from-forest to-forest-dark shadow-[0_40px_80px_-40px_rgba(7,61,107,0.6)]"
          >
            {/* Subtle top sheen + soft noise for a premium, lit panel */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
            <div aria-hidden className="bg-noise absolute inset-0 opacity-[0.12]" />
          </motion.div>

          {/* Grounding contact shadow so the products feel placed on a surface */}
          <div
            aria-hidden
            className="absolute bottom-[5%] left-1/2 h-5 w-3/5 -translate-x-1/2 rounded-[50%] bg-forest-dark/40 blur-lg"
          />

          {/* Cut-out artwork — breaks gently above the arch, with a soft idle float */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={imageReveal}
            className="relative h-full w-full"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <Image
                src="/media/Moozen_Fresh_Dairy_Quality_Showcase-removebg-preview.png"
                alt="Moozen dairy handled with hygienic care"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain drop-shadow-[0_26px_50px_rgba(11,95,165,0.3)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
