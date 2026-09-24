import apiClient from "./client";

/** POST /api/subscribers */
export async function subscribeToNewsletter(email) {
  const res = await apiClient.post("/subscribers", { email });
  return res.data;
}

/** GET /api/subscribers (admin) */
export async function fetchSubscribers(params = {}) {
  const res = await apiClient.get("/subscribers", { params });
  return res.data;
}

/** DELETE /api/subscribers/:id (admin) */
export async function deleteSubscriber(id) {
  await apiClient.delete(`/subscribers/${id}`);
}
