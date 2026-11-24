const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const { deleteUploadedFile } = require("../services/file.service");

// GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const categories = await Category.find(filter).sort({ name: 1 });
  sendResponse(res, 200, categories);
});

// GET /api/categories/:slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) throw new ApiError(404, "Category not found.");
  sendResponse(res, 200, category);
});

// POST /api/categories
const createCategory = asyncHandler(async (req, res) => {
  const image = req.file ? `/uploads/categories/${req.file.filename}` : null;
  const category = await Category.create({ ...req.body, image });
  sendResponse(res, 201, category, "Category created.");
});

// PUT /api/categories/:id
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found.");

  if (req.file) {
    await deleteUploadedFile(category.image);
    req.body.image = `/uploads/categories/${req.file.filename}`;
  }

  Object.assign(category, req.body);
  await category.save();
  sendResponse(res, 200, category, "Category updated.");
});

// DELETE /api/categories/:id
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, "Category not found.");
  await deleteUploadedFile(category.image);
  sendResponse(res, 200, null, "Category deleted.");
});

module.exports = { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory };
