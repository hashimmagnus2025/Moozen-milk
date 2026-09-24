import apiClient from "./client";

/** POST /api/contact */
export async function submitContactForm(payload) {
  const res = await apiClient.post("/contact", payload);
  return res.data;
}

/** GET /api/contact (admin) */
export async function fetchInquiries(params = {}) {
  const res = await apiClient.get("/contact", { params });
  return res.data;
}

/** PUT /api/contact/:id (admin) */
export async function updateInquiryStatus(id, status) {
  const res = await apiClient.put(`/contact/${id}`, { status });
  return res.data;
}

/** DELETE /api/contact/:id (admin) */
export async function deleteInquiry(id) {
  await apiClient.delete(`/contact/${id}`);
}
