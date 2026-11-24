const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    featuredImage: { type: String, default: null },
    category: { type: String, trim: true },
    author: { type: String, trim: true, default: "Vrinda Team" },
    published: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

blogSchema.pre("validate", function ensureSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  } else if (this.slug) {
    this.slug = slugify(this.slug);
  }
  next();
});

blogSchema.index({ title: "text", excerpt: "text" });

module.exports = mongoose.model("Blog", blogSchema);
