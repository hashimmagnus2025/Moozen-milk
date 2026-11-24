"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import ResourceManager from "@/components/admin/ResourceManager";
import BlogForm from "@/components/admin/blogs/BlogForm";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/api/blogs";

const columns = [
  { key: "title", header: "Title", render: (row) => <span className="font-medium">{row.title}</span> },
  { key: "category", header: "Category", render: (row) => row.category || "—" },
  { key: "author", header: "Author" },
  {
    key: "published",
    header: "Status",
    render: (row) => <StatusBadge value={row.published ? "published" : "draft"} />,
  },
];

async function fetchAllBlogs() {
  const { items } = await fetchBlogs({ limit: 100 });
  return items;
}

export default function AdminBlogsPage() {
  return (
    <ResourceManager
      resourceLabel="Blog"
      columns={columns}
      searchKeys={["title", "category", "author"]}
      fetchAll={fetchAllBlogs}
      FormComponent={BlogForm}
      modalSize="lg"
      getFormInitialValues={(item) => ({
        title: item?.title ?? "",
        excerpt: item?.excerpt ?? "",
        content: item?.content ?? "",
        category: item?.category ?? "",
        author: item?.author ?? "Moozen Team",
        published: item?.published ?? false,
        featuredImage: item?.featuredImage ?? null,
      })}
      onCreate={(formData) => createBlog(formData)}
      onUpdate={(id, formData) => updateBlog(id, formData)}
      onDelete={(id) => deleteBlog(id)}
    />
  );
}
