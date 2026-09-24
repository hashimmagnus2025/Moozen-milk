"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          isTransparent
            ? "bg-[#EBE9DA]"
            : "glass-nav border-b border-cream-dark/60 bg-cream/85 shadow-[0_8px_30px_-20px_rgba(42,38,32,0.4)]"
        )}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500",
              isTransparent ? "h-24" : "h-18 py-3"
            )}
          >
            <Link
              href="/"
              className="group flex shrink-0 items-center"
            >
              <Image
                src="/media/logo/Moozen-logo.png"
                alt="Moozen"
                width={180}
                height={90}
                priority
                className={cn(
                  "h-auto w-[155px] object-contain transition-transform duration-500",
                  "group-hover:scale-[1.03]"
                )}
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[0.925rem] font-medium tracking-tight transition-colors duration-300",
                      isTransparent
                        ? "text-forest-dark hover:text-charcoal/75"
                        : "text-charcoal/75 hover:text-forest-dark",
                      isActive && (isTransparent ? "text-forest-dark" : "text-charcoal/75")
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full",
                          isTransparent ? "bg-gold" : "bg-gold"
                        )}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Button href="/products" size="sm" variant={isTransparent ? "primary" : "primary"}>
                Shop Now
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                isTransparent
                  ? "text-forest-dark hover:bg-forest/5"
                  : "text-forest-dark hover:bg-forest/5"
              )}
            >
              <Menu strokeWidth={2} className="size-6" />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && <MobileMenu onClose={() => setIsMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
