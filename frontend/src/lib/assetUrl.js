/** Turns "/uploads/products/x.png" into an absolute URL pointing at the API origin. */
export function getAssetBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return apiUrl.replace(/\/api\/?$/, "");
}

export function resolveAssetUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${getAssetBaseUrl()}${path}`;
}
