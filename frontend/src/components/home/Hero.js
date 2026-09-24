"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Leaf, ShieldCheck } from "lucide-react";
import { PiDropFill } from "react-icons/pi";
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
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-blue-forest text-cream"
    >
      {/* Ambient organic gradients — parallaxed against scroll */}
      <motion.div aria-hidden style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] size-[32rem] rounded-full bg-moss/25 blur-[110px]" />
        <div className="absolute right-[-15%] top-1/3 size-[28rem] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-1/4 size-[26rem] rounded-full bg-sage/10 blur-[100px]" />
        <div className="bg-noise absolute inset-0 opacity-[0.15]" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative grid items-center gap-16 pt-28 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">
          <motion.div style={{ y: contentY }} initial="hidden" animate="show" variants={staggerContainer(0.12, 0.1)}>
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
                href="/our-story"
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

          {/* Signature visual — abstract product mark, no stock imagery needed */}
          <motion.div
            style={{ y: visualY }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
            initial="hidden"
            animate="show"
            variants={imageReveal}
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-sage/90 via-cream to-gold-light/70 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-6 rounded-[2rem] border border-white/40" />

            <motion.div
              className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest-dark/90 shadow-2xl"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <PiDropFill className="size-16 text-gold" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl"
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
              className="absolute -top-6 -right-4 flex items-center gap-2 rounded-2xl bg-forest-dark px-4 py-3 text-cream shadow-xl"
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
