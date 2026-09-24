import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import BlogCard from "@/components/blogs/BlogCard";
import { getLatestBlogs } from "@/lib/data/blogs";
import { safeFetch } from "@/lib/api/safeFetch";
import { slideIn } from "@/lib/animations";

export const metadata = {
  title: "Journal — Moozen",
  description: "Stories from the source — behind-the-scenes on sourcing, nutrition and the farmers behind Moozen.",
};

export default async function BlogsPage() {
  const posts = await safeFetch(getLatestBlogs(24), []);

  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title="Stories from the source."
        description="Behind-the-scenes on sourcing, nutrition and the farmers who make Moozen possible."
        breadcrumb={[{ label: "Blogs" }]}
      />

      <Section background="cream" className="pt-14 lg:pt-16">
        {posts.length === 0 ? (
          <p className="text-sm text-muted">No articles published yet — check back soon.</p>
        ) : (
          <RevealGroup
            variants={slideIn("up", 24)}
            stagger={0.08}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-cream-dark/60 bg-cream-dark/60 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <RevealItem key={post.slug}>
                <BlogCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
