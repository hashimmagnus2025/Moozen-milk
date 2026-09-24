const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, trim: true },
    image: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

categorySchema.pre("validate", function ensureSlug(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  } else if (this.slug) {
    this.slug = slugify(this.slug);
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
