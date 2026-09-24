import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import BlogCard from "@/components/blogs/BlogCard";
import { getLatestBlogs } from "@/lib/data/blogs";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeUp, slideIn } from "@/lib/animations";

export default async function Blogs() {
  const posts = await safeFetch(getLatestBlogs(3), []);
  if (posts.length === 0) return null;

  return (
    <Section background="deep">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal variants={fadeUp} className="max-w-xl">
          <CardEyebrow>The Journal</CardEyebrow>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
            Stories from the source.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.1}>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
          >
            Visit the journal
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealGroup
        variants={slideIn("up", 24)}
        stagger={0.1}
        className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-cream-dark/60 bg-cream-dark/60 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <BlogCard post={post} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
