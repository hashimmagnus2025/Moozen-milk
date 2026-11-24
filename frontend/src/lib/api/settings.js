import apiClient from "./client";

/** GET /api/settings (admin) */
export async function fetchSettings() {
  const res = await apiClient.get("/settings");
  return res.data;
}

/** PUT /api/settings (admin) — `body` is a FormData instance when replacing the logo. */
export async function updateSettings(body) {
  const res = await apiClient.put("/settings", body);
  return res.data;
}
