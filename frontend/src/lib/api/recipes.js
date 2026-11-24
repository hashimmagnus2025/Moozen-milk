import apiClient from "./client";

/** GET /api/recipes */
export async function fetchRecipes(params = {}) {
  const res = await apiClient.get("/recipes", { params });
  return res.data;
}

/** GET /api/recipes/:slug — resolves to null on 404 instead of throwing. */
export async function fetchRecipeBySlug(slug) {
  try {
    const res = await apiClient.get(`/recipes/${slug}`);
    return res.data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

/** POST /api/recipes (admin) */
export async function createRecipe(formData) {
  const res = await apiClient.post("/recipes", formData);
  return res.data;
}

/** PUT /api/recipes/:id (admin) */
export async function updateRecipe(id, formData) {
  const res = await apiClient.put(`/recipes/${id}`, formData);
  return res.data;
}

/** DELETE /api/recipes/:id (admin) */
export async function deleteRecipe(id) {
  await apiClient.delete(`/recipes/${id}`);
}
