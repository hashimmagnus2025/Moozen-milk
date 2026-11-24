/** Adapter over the real category API — see products.js for why this exists and why it's cache()-wrapped. */
import { cache } from "react";
import { fetchCategories, fetchCategoryBySlug } from "@/lib/api/categories";
import { getCategoryVisual } from "@/lib/visualMap";

function normalizeCategory(c) {
  if (!c) return null;
  const visual = getCategoryVisual(c.slug);
  return {
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
    icon: visual.icon,
    tone: visual.tone,
  };
}

export const getAllCategories = cache(async function getAllCategories() {
  const categories = await fetchCategories({ status: "active" });
  return categories.map(normalizeCategory);
});

export const getCategoryBySlug = cache(async function getCategoryBySlug(slug) {
  const category = await fetchCategoryBySlug(slug);
  return normalizeCategory(category);
});
