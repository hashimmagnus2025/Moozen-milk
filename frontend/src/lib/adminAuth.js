/**
 * Client-side JWT storage for the admin panel. The backend also sets an
 * httpOnly cookie on login, but we drive auth from this token so the
 * same shared Axios instance can attach `Authorization: Bearer <token>`
 * to admin requests without relying on cross-origin cookie plumbing.
 */
const TOKEN_KEY = "moozen_admin_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}
