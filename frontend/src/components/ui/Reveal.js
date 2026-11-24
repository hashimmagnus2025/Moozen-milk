"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Pass `variants` to override the default fadeUp, or `stagger` to
 * automatically stagger direct motion children.
 */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  as = "div",
  delay = 0,
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  as = "div",
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, variants = fadeUp, className, as = "div", ...props }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag className={className} variants={variants} {...props}>
      {children}
    </MotionTag>
  );
}
