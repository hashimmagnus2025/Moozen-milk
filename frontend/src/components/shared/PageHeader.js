import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/animations";

/**
 * Shared editorial header for interior pages (products, category, etc.):
 * breadcrumb, eyebrow, large display headline and a supporting line.
 */
export default function PageHeader({ eyebrow, title, description, breadcrumb = [] }) {
  return (
    <Section background="deep" className="pb-14 pt-36 lg:pb-16 lg:pt-40">
      <Reveal variants={fadeUp}>
        {breadcrumb.length > 0 && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-forest-dark">
              Home
            </Link>
            {breadcrumb.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3" />
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-forest-dark">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-forest-dark">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-2xl text-balance-pretty font-display text-4xl italic leading-[1.08] text-forest-dark sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
        )}
      </Reveal>
    </Section>
  );
}
