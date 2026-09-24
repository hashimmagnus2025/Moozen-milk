"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/** App Router error boundary — replaces Next's default crash screen everywhere. */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100svh] items-center bg-cream">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-lg flex-col items-center rounded-[2rem] border border-cream-dark/60 bg-white/70 px-8 py-16 text-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <AlertTriangle className="size-7" strokeWidth={1.75} />
          </span>
          <h1 className="mt-6 font-display text-3xl italic leading-tight text-forest-dark sm:text-4xl">
            Something curdled on our end.
          </h1>
          <p className="mt-4 max-w-sm text-muted">
            We couldn&rsquo;t load this page right now. This is usually temporary —
            give it another try in a moment.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={() => reset()} variant="primary" icon={false}>
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="size-4" strokeWidth={2} />
                Try again
              </span>
            </Button>
            <Link
              href="/"
              className="text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
            >
              Back to homepage
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
