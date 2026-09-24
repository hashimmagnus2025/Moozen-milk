import { SITE_URL } from "@/lib/siteUrl";
import { getAllProducts } from "@/lib/data/products";
import { getAllCategories } from "@/lib/data/categories";
import { getLatestBlogs } from "@/lib/data/blogs";
import { getLatestRecipes } from "@/lib/data/recipes";

const STATIC_ROUTES = ["", "/products", "/about", "/recipes", "/blogs", "/contact", "/faq"];

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [products, categories, blogs, recipes] = await Promise.all([
    getAllProducts().catch(() => []),
    getAllCategories().catch(() => []),
    getLatestBlogs(100).catch(() => []),
    getLatestRecipes(100).catch(() => []),
  ]);

  const productEntries = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogEntries = blogs.map((b) => ({
    url: `${SITE_URL}/blogs/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const recipeEntries = recipes.map((r) => ({
    url: `${SITE_URL}/recipes/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...blogEntries, ...recipeEntries];
}
