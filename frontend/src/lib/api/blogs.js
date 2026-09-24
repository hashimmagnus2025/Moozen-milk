import apiClient from "./client";

/** GET /api/blogs */
export async function fetchBlogs(params = {}) {
  const res = await apiClient.get("/blogs", { params });
  return res.data;
}

/** GET /api/blogs/:slug — resolves to null on 404 instead of throwing. */
export async function fetchBlogBySlug(slug) {
  try {
    const res = await apiClient.get(`/blogs/${slug}`);
    return res.data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

/** POST /api/blogs (admin) */
export async function createBlog(formData) {
  const res = await apiClient.post("/blogs", formData);
  return res.data;
}

/** PUT /api/blogs/:id (admin) */
export async function updateBlog(id, formData) {
  const res = await apiClient.put(`/blogs/${id}`, formData);
  return res.data;
}

/** DELETE /api/blogs/:id (admin) */
export async function deleteBlog(id) {
  await apiClient.delete(`/blogs/${id}`);
}
