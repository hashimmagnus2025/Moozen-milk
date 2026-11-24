"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeUp, slideIn } from "@/lib/animations";

export default function SignatureProduct() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-forest-dark text-cream">
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden bg-gradient-to-br from-moss/30 via-forest-dark to-forest-dark px-8 py-20 sm:min-h-[32rem]">
          <div aria-hidden className="bg-noise absolute inset-0 opacity-20" />
          <motion.div style={{ y: visualY }} className="relative aspect-square w-full max-w-lg">
            <div aria-hidden className="absolute inset-4 rounded-full bg-gradient-to-br from-gold/30 via-gold-light/15 to-transparent blur-3xl" />
            <div aria-hidden className="absolute inset-16 rounded-full bg-gold/15 blur-2xl" />
            <Image
              src="/media/logo/bilonaghee.png"
              alt="Moozen mascot hand-churning bilona ghee in a clay pot"
              fill
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
              priority
            />
          </motion.div>

          <motion.div
            style={{ y: badgeY }}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-3 shadow-xl"
          >
            <Sparkles className="size-4 text-gold" strokeWidth={2} />
            <span className="text-xs font-semibold text-forest-dark">
              Small-batch, hand-finished
            </span>
          </motion.div>
        </div>

        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Reveal variants={slideIn("right")} className="max-w-lg">
            <CardEyebrow className="text-gold">The Signature</CardEyebrow>
            <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-cream sm:text-5xl">
              Bilona Ghee, made the way it was fifty years ago.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              Cultured curd, hand-churned in small batches, then simmered slow
              over a low flame until it turns deep gold. It&rsquo;s the
              product our founder&rsquo;s mother used to make — we just
              stopped letting it go out of stock.
            </p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              <div>
                <p className="font-display text-2xl italic text-gold">6hr</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cream/50">
                  Slow Simmered
                </p>
              </div>
              <div>
                <p className="font-display text-2xl italic text-gold">0</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cream/50">
                  Additives
                </p>
              </div>
              <div>
                <p className="font-display text-2xl italic text-gold">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cream/50">
                  Bilona Method
                </p>
              </div>
            </motion.div>
            <div className="mt-10">
              <Button href="/products/desi-cow-ghee" variant="gold" size="lg">
                Shop Signature Ghee
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
