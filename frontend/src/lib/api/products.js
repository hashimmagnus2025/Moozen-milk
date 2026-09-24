import apiClient from "./client";

/** GET /api/products — returns { items, pagination } as sent by the API. */
export async function fetchProducts(params = {}) {
  const res = await apiClient.get("/products", { params });
  return res.data;
}

/** GET /api/products/:slug — resolves to null on 404 instead of throwing. */
export async function fetchProductBySlug(slug) {
  try {
    const res = await apiClient.get(`/products/${slug}`);
    return res.data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

/** POST /api/products (admin) — `formData` is a FormData instance, images included. */
export async function createProduct(formData) {
  const res = await apiClient.post("/products", formData);
  return res.data;
}

/** PUT /api/products/:id (admin) */
export async function updateProduct(id, formData) {
  const res = await apiClient.put(`/products/${id}`, formData);
  return res.data;
}

/** DELETE /api/products/:id (admin) */
export async function deleteProduct(id) {
  await apiClient.delete(`/products/${id}`);
}
