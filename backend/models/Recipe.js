const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: null },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    preparationTime: { type: String, required: true },
    cookingTime: { type: String, required: true },
  },
  { timestamps: true }
);

recipeSchema.pre("validate", function ensureSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  } else if (this.slug) {
    this.slug = slugify(this.slug);
  }
  next();
});

module.exports = mongoose.model("Recipe", recipeSchema);
