import apiClient from "./client";

/** GET /api/testimonials */
export async function fetchTestimonials(params = {}) {
  const res = await apiClient.get("/testimonials", { params });
  return res.data;
}

/** POST /api/testimonials (admin) */
export async function createTestimonial(payload) {
  const res = await apiClient.post("/testimonials", payload);
  return res.data;
}

/** PUT /api/testimonials/:id (admin) */
export async function updateTestimonial(id, payload) {
  const res = await apiClient.put(`/testimonials/${id}`, payload);
  return res.data;
}

/** DELETE /api/testimonials/:id (admin) */
export async function deleteTestimonial(id) {
  await apiClient.delete(`/testimonials/${id}`);
}
