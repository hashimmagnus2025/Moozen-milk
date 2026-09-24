const Testimonial = require("../models/Testimonial");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const { deleteUploadedFile } = require("../services/file.service");

// GET /api/testimonials
const getTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  sendResponse(res, 200, testimonials);
});

// POST /api/testimonials
const createTestimonial = asyncHandler(async (req, res) => {
  const image = req.file ? `/uploads/testimonials/${req.file.filename}` : undefined;
  const testimonial = await Testimonial.create({ ...req.body, image });
  sendResponse(res, 201, testimonial, "Testimonial created.");
});

// PUT /api/testimonials/:id
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found.");

  if (req.file) {
    await deleteUploadedFile(testimonial.image);
    req.body.image = `/uploads/testimonials/${req.file.filename}`;
  }

  Object.assign(testimonial, req.body);
  await testimonial.save();
  sendResponse(res, 200, testimonial, "Testimonial updated.");
});

// DELETE /api/testimonials/:id
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found.");
  await deleteUploadedFile(testimonial.image);
  sendResponse(res, 200, null, "Testimonial deleted.");
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
