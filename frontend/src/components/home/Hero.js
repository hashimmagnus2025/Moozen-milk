"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Leaf, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { fadeUp, staggerContainer, imageReveal, textReveal } from "@/lib/animations";

const HEADLINE_LINE_1 = ["Purity,", "poured"];
const HEADLINE_LINE_2 = ["straight", "from", "the", "source."];

function RevealWord({ children }) {
  return (
    <span className="inline-block overflow-hidden pb-2 align-top">
      <motion.span className="inline-block" variants={textReveal}>
        {children}
        {" "}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-gradient-to-b from-forest-dark via-blue-forest to-[#1274c4] text-cream lg:min-h-[100svh]"
    >
      {/* Ambient organic gradients — parallaxed against scroll */}
      <motion.div aria-hidden style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-8%] size-72 rounded-full bg-moss/25 blur-[80px] lg:-left-32 lg:size-[32rem] lg:blur-[110px]" />
        <div className="absolute right-[-20%] bottom-[8%] size-72 rounded-full bg-gold/15 blur-[90px] lg:right-[-15%] lg:top-1/3 lg:bottom-auto lg:size-[28rem] lg:bg-gold/20 lg:blur-[120px]" />
        <div className="absolute bottom-[-20%] left-1/4 size-[26rem] rounded-full bg-sage/10 blur-[100px]" />
        <div className="bg-noise absolute inset-0 opacity-[0.15]" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative grid items-center gap-12 pt-28 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-32 lg:pb-20">
          <motion.div style={{ y: contentY }} initial="hidden" animate="show" variants={staggerContainer(0.12, 0.1)} className="text-center lg:text-left">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
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
              <span className="block text-gold">
                {HEADLINE_LINE_2.map((w, i) => (
                  <RevealWord key={w} index={i + HEADLINE_LINE_1.length}>{w}</RevealWord>
                ))}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg lg:mx-0 lg:mt-7">
              Moozen brings India&rsquo;s dairy heritage into the modern home —
              milk, ghee and paneer crafted with honesty, delivered with care.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-10 lg:justify-start">
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

            <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-2 border-t border-white/15 pt-6 lg:mt-14 lg:flex lg:items-center lg:gap-8 lg:pt-8">
              <div>
                <p className="font-display text-2xl italic text-gold sm:text-3xl">40+</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-cream/65 sm:text-xs sm:tracking-[0.15em]">Years of Trust</p>
              </div>
              <div className="hidden h-10 w-px bg-white/10 lg:block" />
              <div>
                <p className="font-display text-2xl italic text-gold sm:text-3xl">3,000+</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-cream/65 sm:text-xs sm:tracking-[0.15em]">Partner Farmers</p>
              </div>
              <div className="hidden h-10 w-px bg-white/10 lg:block" />
              <div>
                <p className="font-display text-2xl italic text-gold sm:text-3xl">100%</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-cream/65 sm:text-xs sm:tracking-[0.15em]">Naturally Sourced</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Signature visual — hero product shot: Moozen Curd, 1 kg bucket */}
          <motion.div
            style={{ y: visualY }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[19rem] sm:max-w-md"
            initial="hidden"
            animate="show"
            variants={imageReveal}
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-sage/90 via-cream to-gold-light/70 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-6 rounded-[2rem] border border-white/40" />

            {/* Spotlight glow behind the product */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[42%] size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[70px]"
            />

            {/* Ground shadow — stays put so the product reads as floating above it */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[78%] h-6 w-[46%] -translate-x-1/2 rounded-full bg-charcoal/25 blur-md"
            />

            <motion.div
              className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="animate-sway">
                <div className="animate-float-slow transition-transform duration-300 hover:scale-105">
                  <Image
                    src="/media/products/crud-removebg-preview.png"
                    alt="Moozen Curd — 1 kg bucket"
                    width={500}
                    height={500}
                    priority
                    className="h-auto w-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl sm:bottom-4 sm:left-4 sm:gap-3 sm:px-5 sm:py-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-sage text-forest">
                <Leaf className="size-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-forest-dark">100% Farm Fresh</p>
                <p className="text-xs text-muted">No preservatives, ever</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-3 right-3 flex items-center gap-2 rounded-2xl bg-forest-dark px-3 py-2 text-cream shadow-xl sm:top-4 sm:right-4 sm:px-4 sm:py-3"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <ShieldCheck className="size-4 text-gold" strokeWidth={2} />
              <p className="text-xs font-semibold">Lab-Tested Daily</p>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/40">Scroll</span>
        <ChevronDown className="size-5 text-cream/50" />
      </motion.div>
    </section>
  );
}
