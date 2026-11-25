"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

const SOCIALS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/917887888822", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-dark text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] size-96 rounded-full bg-moss/20 blur-3xl"
      />

      <Container className="relative py-20 lg:py-20">
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
            <Link href="/" aria-label={SITE_CONFIG.name} className="inline-flex items-center rounded-2xl bg-white px-4 py-2.5 shadow-sm">
              <Image
                src="/media/logo/Moozen-logo.png"
                alt={SITE_CONFIG.name}
                width={150}
                height={62}
                className="h-10 w-auto object-contain"
              />
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
          <p>
            Designed and developed by{" "}
            <a
              href="https://magnusideas.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-cream/70 transition-colors hover:text-gold"
            >
              Magnus Ideas Pvt Ltd
            </a>
            {" "}&middot; &copy; {new Date().getFullYear()} Star Agro. All rights reserved.
          </p>
        
        </div>
      </Container>
    </footer>
  );
}
