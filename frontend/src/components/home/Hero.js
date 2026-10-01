"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Leaf } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { fadeUp, staggerContainer, textReveal } from "@/lib/animations";

const HEADLINE_LINE_1 = ["Purity,", "poured"];
const HEADLINE_LINE_2 = ["straight", "from", "the", "source."];

function RevealWord({ children }) {
  return (
    <>
      <span className="inline-block overflow-hidden pb-2 align-top">
        <motion.span className="inline-block" variants={textReveal}>
          {children}
        </motion.span>
      </span>
      {" "}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-[#f7f4e8] pb-[58vw] text-forest-dark lg:min-h-[100svh] lg:pb-0"
    >
      {/* cow.svg as the hero backdrop — kept static (no scroll transform) since animating
          a full-bleed image on every scroll frame was causing visible scroll jank */}
      {/* On mobile the artwork sits in its own block under the copy (so the cow's face is
          never cut off or covered by text); from lg up it becomes the full-bleed backdrop. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 aspect-[3/2] lg:inset-0 lg:aspect-auto">
        <Image
          src="/media/cow.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[45%_60%] lg:object-[0%_50%] lg:translate-x-[14%] lg:scale-[0.7]"
        />
        {/* Mobile: blend the top edge of the artwork into the blue copy area.
            Desktop: left-to-right dark overlay so the text stays readable. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4e8] via-[#f7f4e8]/10 to-transparent lg:bg-gradient-to-r lg:from-[#f7f4e8] lg:from-30% lg:via-[#f7f4e8]/35 lg:to-transparent" />
        {/* Solid strip behind the fixed navbar so the cow pattern doesn't bleed through it on scroll */}
        <div className="absolute inset-x-0 top-0 hidden h-56 bg-gradient-to-b from-[#f7f4e8] via-[#f7f4e8]/60 to-transparent lg:block" />
        {/* Gentle base-of-section fade so the scroll indicator stays legible regardless of the crop underneath */}
        <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-[#f7f4e8]/60 to-transparent lg:block" />
      </div>

      {/* Ambient blur blobs — kept static; animating blurred layers on scroll was the cause of the jank */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] size-[32rem] rounded-full bg-sky-200/50 blur-[110px]" />
        <div className="absolute right-[-15%] top-1/3 size-[28rem] rounded-full bg-gold/15 blur-[120px]" />
              </div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative pt-28 pb-6 lg:pt-32 lg:pb-20">
          <motion.div
            style={{ y: contentY }}
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.12, 0.1)}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/80 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-forest shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
            >
              <Leaf className="size-3.5" strokeWidth={2} />
              Farm-Fresh Since Generations
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.045, 0.35)}
              className="mt-6 text-balance-pretty font-display text-[2.4rem] italic leading-[1.1] sm:text-6xl lg:mt-7 lg:text-[4.25rem] lg:leading-[1.05]"
            >
              <span className="block">
                {HEADLINE_LINE_1.map((w, i) => (
                  <RevealWord key={w} index={i}>{w}</RevealWord>
                ))}
              </span>
              <span className="block text-terracotta">
                {HEADLINE_LINE_2.map((w, i) => (
                  <RevealWord key={w} index={i + HEADLINE_LINE_1.length}>{w}</RevealWord>
                ))}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-charcoal/75 sm:text-lg lg:mt-7">
              Moozen brings India&rsquo;s dairy heritage into the modern home —
              milk, ghee and paneer crafted with honesty, delivered with care.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-10">
              <Button href="/products" variant="gold" size="lg">
                Explore Products
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                icon={false}
                className="border-forest/30 bg-white/60 text-forest-dark hover:border-forest hover:bg-white"
              >
                Our Story
              </Button>
            </motion.div> 

            <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-2 border-t border-forest/15 pt-6 lg:mt-14 lg:flex lg:items-center lg:gap-8 lg:pt-8">
              <div>
                <p className="font-display text-2xl italic text-forest sm:text-3xl">40+</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-charcoal/65 sm:text-xs sm:tracking-[0.15em]">Years of Trust</p>
              </div>
              <div className="hidden h-10 w-px bg-forest/15 lg:block" />
              <div>
                <p className="font-display text-2xl italic text-forest sm:text-3xl">3,000+</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-charcoal/65 sm:text-xs sm:tracking-[0.15em]">Partner Farmers</p>
              </div>
              <div className="hidden h-10 w-px bg-forest/15 lg:block" />
              <div>
                <p className="font-display text-2xl italic text-forest sm:text-3xl">100%</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-charcoal/65 sm:text-xs sm:tracking-[0.15em]">Naturally Sourced</p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>



      <motion.div
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-forest/50">Scroll</span>
        <ChevronDown className="size-5 text-forest/50" />
      </motion.div>
    </section>
  );
}
