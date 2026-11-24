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

        <motion.div
          className="relative mx-auto aspect-[342/430] w-full max-w-md"
       
        >
          {/* Soft rounded-square (squircle) shape behind the artwork */}
          <div
            aria-hidden
            className="absolute -left-6 -top-10 -right-12 -bottom-5 bg-gradient-to-br from-sky-200/90 via-sky-100/80 to-sky-50/50 rounded-[28%]"
          />
          {/* Cut-out artwork floating on top of the shape */}
          <Image
            src="/media/moozen_hygiene_342x430-removebg-preview.png"
            alt="Moozen dairy handled with hygienic care"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="relative object-contain drop-shadow-[0_18px_40px_rgba(27,47,30,0.18)]"
          />
        </motion.div>
      </div>
    </Section>
  );
}
