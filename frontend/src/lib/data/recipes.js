/** Adapter over the real recipe API — see data/products.js for the pattern this follows (and why cache()). */
import { cache } from "react";
import { fetchRecipes, fetchRecipeBySlug } from "@/lib/api/recipes";

function parseMinutes(text = "") {
  const match = String(text).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

/** Backend has no "difficulty" field — derive a fair estimate from recipe complexity. */
function estimateDifficulty(recipe) {
  const steps = (recipe.ingredients?.length ?? 0) + (recipe.instructions?.length ?? 0);
  if (steps <= 8) return "Easy";
  if (steps <= 14) return "Medium";
  return "Hard";
}

function normalizeRecipe(r) {
  if (!r) return null;
  const totalMinutes = parseMinutes(r.preparationTime) + parseMinutes(r.cookingTime);

  return {
    id: r._id,
    title: r.title,
    slug: r.slug,
    excerpt: r.description,
    description: r.description,
    image: r.image,
    ingredients: r.ingredients ?? [],
    instructions: r.instructions ?? [],
    preparationTime: r.preparationTime,
    cookingTime: r.cookingTime,
    time: totalMinutes > 0 ? `${totalMinutes} min` : r.preparationTime,
    difficulty: estimateDifficulty(r),
  };
}

export const getLatestRecipes = cache(async function getLatestRecipes(limit = 3) {
  const { items } = await fetchRecipes({ limit });
  return items.map(normalizeRecipe);
});

export const getRecipeBySlug = cache(async function getRecipeBySlug(slug) {
  const recipe = await fetchRecipeBySlug(slug);
  return normalizeRecipe(recipe);
});
