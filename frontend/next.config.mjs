/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Lets next/image optimize uploaded product/category/blog/recipe/homepage
    // images served by the Express backend's /uploads static route.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
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
