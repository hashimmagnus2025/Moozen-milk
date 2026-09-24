/**
 * Adapter over the real product API. Every page/component in this app
 * was built against this exact shape (id, name, category-as-slug,
 * isFeatured/isNewArrival, icon/tone for the placeholder visuals) —
 * this file is the only place that knows the backend's actual field
 * names (productName, featured, populated category object, etc.), so
 * UI code never has to change when the API shape does.
 *
 * Each export is wrapped in React's `cache()` so that when a page and
 * its `generateMetadata` both request the same data (a very common
 * Next.js pattern), the underlying Axios call only fires once per
 * request instead of twice — Axios doesn't get Next's automatic fetch
 * memoization, so this is done explicitly.
 */
import { cache } from "react";
import { fetchProducts, fetchProductBySlug } from "@/lib/api/products";
import { getCategoryVisual } from "@/lib/visualMap";

function normalizeProduct(p) {
  if (!p) return null;
  const categorySlug = typeof p.category === "object" && p.category ? p.category.slug : p.category;
  const categoryName = typeof p.category === "object" && p.category ? p.category.name : undefined;
  const visual = getCategoryVisual(categorySlug);

  return {
    id: p._id,
    name: p.productName,
    slug: p.slug,
    category: categorySlug,
    categoryName,
    subcategory: p.subCategory,
    shortDescription: p.shortDescription,
    description: p.description,
    images: p.images ?? [],
    ingredients: p.ingredients ?? [],
    benefits: p.benefits ?? [],
    nutrition: p.nutrition ?? [],
    packSizes: p.packSizes ?? [],
    price: p.price,
    isFeatured: !!p.featured,
    isNewArrival: !!p.newArrival,
    status: p.status,
    icon: visual.icon,
    tone: visual.tone,
  };
}

export const getAllProducts = cache(async function getAllProducts() {
  const { items } = await fetchProducts({ status: "active", limit: 100 });
  return items.map(normalizeProduct);
});

export const getProductBySlug = cache(async function getProductBySlug(slug) {
  const product = await fetchProductBySlug(slug);
  return normalizeProduct(product);
});

export const getProductsByCategory = cache(async function getProductsByCategory(categorySlug) {
  const { items } = await fetchProducts({ category: categorySlug, status: "active", limit: 100 });
  return items.map(normalizeProduct);
});

export const getFeaturedProducts = cache(async function getFeaturedProducts(limit = 5) {
  const { items } = await fetchProducts({ featured: true, status: "active", limit });
  return items.map(normalizeProduct);
});

export const getNewArrivalProducts = cache(async function getNewArrivalProducts(limit = 6) {
  const { items } = await fetchProducts({ newArrival: true, status: "active", limit });
  return items.map(normalizeProduct);
});

export async function getRelatedProducts(product, limit = 4) {
  const { items } = await fetchProducts({
    category: product.category,
    status: "active",
    limit: limit + 1,
  });
  return items
    .map(normalizeProduct)
    .filter((p) => p.slug !== product.slug)
    .slice(0, limit);
}

export const searchProducts = cache(async function searchProducts(query) {
  if (!query?.trim()) return getAllProducts();
  const { items } = await fetchProducts({ search: query, status: "active", limit: 100 });
  return items.map(normalizeProduct);
});

export function getStartingPrice(product) {
  return Math.min(...product.packSizes.map((pack) => pack.price));
}
