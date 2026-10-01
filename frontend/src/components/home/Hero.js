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
      className="relative flex min-h-[100vh] items-center overflow-hidden  text-cream"
    >
      {/* cow.svg as the hero backdrop — kept static (no scroll transform) since animating
          a full-bleed image on every scroll frame was causing visible scroll jank */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/media/cow.svg"
          alt=""
          fill
          priority
        className="object-cover object-[0%_50%] translate-x-[8%] lg:translate-x-[14%] lg:scale-[0.7]"
        />
        {/* Dark gradient overlay so the text stays readable over the illustration —
            eased off past mid-width so the cow keeps its own colour instead of
            reading as a flat blue silhouette */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-forest via-blue-forest/60 to-blue-forest/10" />
        {/* Solid strip behind the fixed navbar so the cow pattern doesn't bleed through it on scroll */}
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-blue-forest via-blue-forest/60 to-transparent" />
        {/* Gentle base-of-section fade so the scroll indicator stays legible regardless of the crop underneath */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-forest/70 to-transparent" />
      </div>

      {/* Ambient blur blobs — kept static; animating blurred layers on scroll was the cause of the jank */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] size-[32rem] rounded-full bg-moss/25 blur-[110px]" />
        <div className="absolute right-[-15%] top-1/3 size-[28rem] rounded-full bg-gold/20 blur-[120px]" />
        <div className="bg-noise absolute inset-0 opacity-[0.15]" />
      </div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative pt-28 pb-20 lg:pt-32">
          <motion.div
            style={{ y: contentY }}
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.12, 0.1)}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              <Leaf className="size-3.5" strokeWidth={2} />
              Farm-Fresh Since Generations
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.045, 0.35)}
              className="mt-7 text-balance-pretty font-display text-[2.75rem] italic leading-[1.05] sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="block">
                {HEADLINE_LINE_1.map((w, i) => (
                  <RevealWord key={w} index={i}>{w}</RevealWord>
                ))}
              </span>
              <span className="block text-gold">
                {HEADLINE_LINE_2.map((w, i) => (
                  <RevealWord key={w} index={i + HEADLINE_LINE_1.length}>{w}</RevealWord>
                ))}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-md text-lg leading-relaxed text-cream/70">
              Moozen brings India&rsquo;s dairy heritage into the modern home —
              milk, ghee and paneer crafted with honesty, delivered with care.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/products" variant="gold" size="lg">
                Explore Products
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                icon={false}
                className="border-white/25 text-cream hover:border-white hover:bg-white/10"
              >
                Our Story
              </Button>
            </motion.div> 

            <motion.div variants={fadeUp} className="mt-14 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-3xl italic text-gold">40+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cream/50">Years of Trust</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-display text-3xl italic text-gold">3,000+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cream/50">Partner Farmers</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="font-display text-3xl italic text-gold">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cream/50">Naturally Sourced</p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>



      <motion.div
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/40">Scroll</span>
        <ChevronDown className="size-5 text-cream/50" />
      </motion.div>
    </section>
  );
}
