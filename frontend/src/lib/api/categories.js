import apiClient from "./client";

/** GET /api/categories */
export async function fetchCategories(params = {}) {
  const res = await apiClient.get("/categories", { params });
  return res.data;
}

/** GET /api/categories/:slug — resolves to null on 404 instead of throwing. */
export async function fetchCategoryBySlug(slug) {
  try {
    const res = await apiClient.get(`/categories/${slug}`);
    return res.data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

/** POST /api/categories (admin) */
export async function createCategory(formData) {
  const res = await apiClient.post("/categories", formData);
  return res.data;
}

/** PUT /api/categories/:id (admin) */
export async function updateCategory(id, formData) {
  const res = await apiClient.put(`/categories/${id}`, formData);
  return res.data;
}

/** DELETE /api/categories/:id (admin) */
export async function deleteCategory(id) {
  await apiClient.delete(`/categories/${id}`);
}
