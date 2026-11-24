"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const panelVariants = {
  hidden: { clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" },
  show: {
    clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const SOCIALS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function MobileMenu({ onClose }) {
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed inset-0 z-60 flex flex-col bg-forest-dark text-cream lg:hidden"
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="font-display text-2xl italic">{SITE_CONFIG.name}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20"
        >
          <X strokeWidth={2} className="size-6" />
        </button>
      </div>

      <motion.nav
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col justify-center gap-2 px-6"
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <motion.div key={link.href} variants={linkVariants} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center justify-between border-b border-white/10 py-4 font-display text-[2.4rem] leading-none italic transition-colors sm:text-5xl",
                  isActive ? "text-gold" : "text-cream/90 hover:text-gold"
                )}
              >
                <span>
                  <span className="mr-3 text-base not-italic text-cream/40">
                    0{i + 1}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight className="size-7 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <motion.div
        variants={linkVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 border-t border-white/10 px-6 py-8"
      >
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center justify-center rounded-full bg-gold px-8 py-4 text-center font-semibold text-forest-dark transition-colors hover:bg-gold-light"
        >
          Shop Now
        </Link>
        <div className="flex items-center justify-center gap-6">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-cream/60 transition-colors hover:text-gold"
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
