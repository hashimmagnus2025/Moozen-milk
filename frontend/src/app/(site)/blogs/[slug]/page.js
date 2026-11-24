import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Newspaper } from "lucide-react";
import Section from "@/components/ui/Section";
import { getBlogBySlug } from "@/lib/data/blogs";
import { SITE_URL } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Moozen Journal`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blogs/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author || "Moozen" },
    publisher: { "@type": "Organization", name: "Moozen" },
    datePublished: post.createdAt,
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <Section background="cream" className="pb-20 pt-32 lg:pt-40">
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-forest-dark">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/blogs" className="transition-colors hover:text-forest-dark">Journal</Link>
        <ChevronRight className="size-3" />
        <span className="text-forest-dark">{post.title}</span>
      </nav>

      <div className="mx-auto max-w-2xl">
        <span className="flex size-12 items-center justify-center rounded-full bg-sage text-forest">
          <Newspaper className="size-5" strokeWidth={1.75} />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-moss">
          {post.category} &middot; {post.readTime} &middot; {post.author}
        </p>
        <h1 className="mt-3 text-balance-pretty font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-10 space-y-5 border-t border-cream-dark/70 pt-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-charcoal">
              {para}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
