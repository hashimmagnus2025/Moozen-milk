/**
 * The backend Product/Category schemas store real image paths, but no
 * photography exists yet. Until it does, every product/category is
 * rendered through the abstract ProductVisual placeholder — this maps
 * a category slug to the icon + color tone it should use there.
 */
const CATEGORY_VISUALS = {
  milk: { icon: "Milk", tone: "sage" },
  paneer: { icon: "Box", tone: "cream" },
  curd: { icon: "Soup", tone: "gold" },
  ghee: { icon: "Droplet", tone: "sage" },
  butter: { icon: "Square", tone: "gold" },
  cheese: { icon: "Grid2x2", tone: "cream" },
  yogurt: { icon: "CupSoda", tone: "sage" },
  beverages: { icon: "GlassWater", tone: "gold" },
  sweets: { icon: "Cake", tone: "cream" },
};

const DEFAULT_VISUAL = { icon: "Milk", tone: "sage" };

export function getCategoryVisual(slug) {
  return CATEGORY_VISUALS[slug] ?? DEFAULT_VISUAL;
}
