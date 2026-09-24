/** Adapter over the real blog API — see data/products.js for the pattern this follows (and why cache()). */
import { cache } from "react";
import { fetchBlogs, fetchBlogBySlug } from "@/lib/api/blogs";

/** Backend has no "readTime" field — estimate it from the article body (~200 wpm). */
function estimateReadTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function normalizeBlog(b) {
  if (!b) return null;
  return {
    id: b._id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    image: b.featuredImage,
    category: b.category,
    author: b.author,
    readTime: estimateReadTime(b.content),
    createdAt: b.createdAt,
  };
}

export const getLatestBlogs = cache(async function getLatestBlogs(limit = 3) {
  const { items } = await fetchBlogs({ published: true, limit });
  return items.map(normalizeBlog);
});

export const getBlogBySlug = cache(async function getBlogBySlug(slug) {
  const blog = await fetchBlogBySlug(slug);
  return normalizeBlog(blog);
});
