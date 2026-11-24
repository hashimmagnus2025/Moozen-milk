<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Wraps route content so navigations fade the new page in instead of hard-cutting.
 *
 * There is deliberately no exit animation / mode="wait": that held the outgoing
 * page until its exit finished and only then mounted the new one, so any slow
 * route (e.g. the homepage waiting on API data) left <main> empty and the page
 * looked blank after clicking the navbar logo.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="show"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
=======
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Wraps route content so navigations cross-fade instead of hard-cutting. */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
>>>>>>> backup-remote-c9b989c
