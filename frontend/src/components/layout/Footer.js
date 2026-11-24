"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

const SOCIALS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-dark text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] size-96 rounded-full bg-moss/20 blur-3xl"
      />

      <Container className="relative py-20 lg:py-28">
        <Reveal variants={fadeUp} className="flex flex-col gap-6 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Stay Connected
            </p>
            <h3 className="mt-4 max-w-xl font-display text-3xl italic leading-tight sm:text-4xl">
              Fresh stories, seasonal recipes &amp; new arrivals — straight to your inbox.
            </h3>
          </div>

          <NewsletterForm />
        </Reveal>

        <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-3xl italic">
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/45">
                {heading}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-gold">FAQ</Link>
            <Link href="/admin/login" className="hover:text-gold">Admin</Link>
            <span>Crafted with care, in India.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
