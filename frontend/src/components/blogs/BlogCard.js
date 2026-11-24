import Link from "next/link";
import { Newspaper, ArrowUpRight } from "lucide-react";

/** Shared editorial blog card used on the homepage teaser and the full /blogs listing. */
export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex h-full flex-col bg-white/80 p-7 transition-colors duration-300 hover:bg-white"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-sage text-forest">
        <Newspaper className="size-4.5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-moss">
        {post.category} &middot; {post.readTime}
      </p>
      <h3 className="mt-3 font-display text-xl italic leading-snug text-forest-dark">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-forest-dark">
        Read article
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
