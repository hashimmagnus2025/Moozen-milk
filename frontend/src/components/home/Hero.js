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
      className="relative flex items-start overflow-hidden bg-[#f7f4e8] min-h-[125vw] text-forest-dark lg:items-center lg:min-h-[100svh]"
    >
      {/* Product collage background — full-bleed on mobile, right-side on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:left-[38%] lg:right-0 xl:left-[30%]"
      >
        {/* Mobile artwork — full-screen scene behind the content */}
        <Image
          src="/media/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom lg:hidden"
        />

        {/* Desktop artwork */}
        <Image
          src="/media/hero-3.png"
          alt=""
          fill
          priority
          sizes="70vw"
          className="hidden object-contain object-[70%_50%] lg:block"
        />

        {/* Mobile: soft cream scrim at the top so the headline stays readable over the sky */}
        <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-[#f7f4e8] via-[#f7f4e8]/35 to-transparent lg:hidden" />

        {/* Desktop fades */}
        <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-[#f7f4e8] lg:from-0% lg:via-[#f7f4e8]/50 lg:via-20% lg:to-transparent lg:to-55%" />
        <div className="absolute inset-x-0 top-0 hidden h-56 bg-gradient-to-b from-[#f7f4e8] via-[#f7f4e8]/60 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-[#f7f4e8]/60 to-transparent lg:block" />
      </div>

      {/* Ambient background effects — desktop only (kept off the mobile photo) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
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
                {HEADLINE_LINE_1.map((word, index) => (
                  <RevealWord key={word} index={index}>
                    {word}
                  </RevealWord>
                ))}
              </span>

              <span className="block text-terracotta">
                {HEADLINE_LINE_2.map((word, index) => (
                  <RevealWord
                    key={word}
                    index={index + HEADLINE_LINE_1.length}
                  >
                    {word}
                  </RevealWord>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-base leading-relaxed text-charcoal/75 sm:text-lg lg:mt-7"
            >
              Moozen brings India&rsquo;s dairy heritage into the modern home —
              milk, ghee and paneer crafted with honesty, delivered with care.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-10"
            >
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
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-forest/50">
          Scroll
        </span>
        <ChevronDown className="size-5 text-forest/50" />
      </motion.div>
    </section>
  );
}