import apiClient from "./client";

/** POST /api/auth/login */
export async function loginAdmin(email, password) {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data; // { token, admin }
}

/** GET /api/auth/me */
export async function fetchCurrentAdmin() {
  const res = await apiClient.get("/auth/me");
  return res.data;
}

/** POST /api/auth/logout */
export async function logoutAdmin() {
  await apiClient.post("/auth/logout");
}
