const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const packSizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
  },
  { _id: false }
);

const nutritionRowSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: String, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    nutrition: { type: [nutritionRowSchema], default: [] },
    packSizes: {
      type: [packSizeSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one pack size is required.",
      },
    },
    price: { type: Number, required: true, min: 0 },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

productSchema.pre("validate", function ensureSlug(next) {
  if (!this.slug && this.productName) {
    this.slug = slugify(this.productName);
  } else if (this.slug) {
    this.slug = slugify(this.slug);
  }
  next();
});

productSchema.index({ productName: "text", shortDescription: "text" });

module.exports = mongoose.model("Product", productSchema);
