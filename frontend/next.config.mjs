// The uploaded photos (product/category/blog/recipe/homepage) are served by
// the Express backend's /uploads static route. In local dev that's
// http://localhost:5000; in production it's the deployed API origin. We derive
// the allow-list entry from NEXT_PUBLIC_API_URL so next/image optimization
// works in every environment without hardcoding the Vercel domain — and
// whichever host that resolves to (e.g. moozen-milk.vercel.app) is accepted.
function uploadsRemotePattern() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;
  try {
    const { protocol, hostname, port } = new URL(apiUrl);
    return {
      protocol: protocol.replace(":", ""),
      hostname,
      port: port || "",
      pathname: "/uploads/**",
    };
  } catch {
    return null;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This project is deployed as a multi-service Vercel app (frontend +
    // Express backend in one project). In that topology Vercel's built-in
    // /_next/image optimizer route is not served for the frontend service,
    // so EVERY optimized image — local public assets (logo) and remote
    // uploads alike — 404s. Serving images unoptimized makes next/image emit
    // plain <img> tags pointing straight at the real URLs (which all return
    // 200), so they render reliably. The remotePatterns below are kept for
    // local `next dev`, where the optimizer does run.
    unoptimized: true,
    // Lets next/image optimize uploaded product/category/blog/recipe/homepage
    // images served by the Express backend's /uploads static route.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
      // Production/preview API origin, derived from NEXT_PUBLIC_API_URL.
      ...(uploadsRemotePattern() ? [uploadsRemotePattern()] : []),
    ],
    // Next 16 blocks image optimization for hostnames that resolve to a
    // private/local IP by default (SSRF hardening). The backend runs on
    // localhost in this private, single-machine dev setup — deploying
    // against a real public API domain makes this a no-op there.
    dangerouslyAllowLocalIP: true,
    // Next defaults optimized images to Content-Disposition: attachment
    // (a defense against SVG-based XSS). The backend's upload middleware
    // only ever accepts JPEG/PNG/WEBP/AVIF (never SVG — see
    // backend/middleware/upload.middleware.js), so there's no script-
    // execution risk here, and "inline" is required for <Image> to
    // actually render uploaded product/category photos instead of
    // prompting a download.
    contentDispositionType: "inline",
  },
};

export default nextConfig;
