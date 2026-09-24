"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GiFamilyTree } from "react-icons/gi";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { slideIn, fadeUp } from "@/lib/animations";

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="section-y relative overflow-hidden bg-cream-deep">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <Reveal variants={slideIn("left")} className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
            Our Story
          </p>
          <h2 className="mt-5 text-balance-pretty font-display text-4xl italic leading-[1.08] text-forest-dark sm:text-5xl lg:text-[3.4rem]">
            It began with one cow, one family, and a refusal to cut corners.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            In 1984, our founder started delivering milk from a single
            courtyard in a small village outside Pune. Four decades on, the
            scale has changed — the standard hasn&rsquo;t. Every partnership,
            every process, every product still has to pass the same test:
            would we serve this to our own family?
          </p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Link
              href="/our-story"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
            >
              Read our full story
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </Reveal>

        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2.5rem] lg:order-2">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-[-8%] bg-gradient-to-br from-forest via-forest-dark to-moss/60"
          >
            <div aria-hidden className="bg-noise absolute inset-0 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <GiFamilyTree className="size-40 text-gold/70 sm:size-52" />
            </div>
          </motion.div>
          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl"
          >
            <p className="font-display text-lg italic text-forest-dark">Est. 1984</p>
            <p className="mt-0.5 text-xs text-muted">Pune, Maharashtra — where it all began.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
