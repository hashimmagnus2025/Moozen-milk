const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: null },
    review: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
