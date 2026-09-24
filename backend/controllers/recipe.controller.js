const Recipe = require("../models/Recipe");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const { deleteUploadedFile } = require("../services/file.service");

function parseListField(body, field) {
  if (typeof body[field] === "string") {
    try {
      body[field] = JSON.parse(body[field]);
    } catch {
      throw new ApiError(400, `${field} must be valid JSON.`);
    }
  }
}

// GET /api/recipes
const getRecipes = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 12, 1), 100);

  const [items, total] = await Promise.all([
    Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Recipe.countDocuments(filter),
  ]);

  sendResponse(res, 200, {
    items,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/recipes/:slug
const getRecipeBySlug = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({ slug: req.params.slug });
  if (!recipe) throw new ApiError(404, "Recipe not found.");
  sendResponse(res, 200, recipe);
});

// POST /api/recipes
const createRecipe = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  parseListField(body, "ingredients");
  parseListField(body, "instructions");

  const image = req.file ? `/uploads/recipes/${req.file.filename}` : null;
  const recipe = await Recipe.create({ ...body, image });
  sendResponse(res, 201, recipe, "Recipe created.");
});

// PUT /api/recipes/:id
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) throw new ApiError(404, "Recipe not found.");

  const body = { ...req.body };
  parseListField(body, "ingredients");
  parseListField(body, "instructions");

  if (req.file) {
    await deleteUploadedFile(recipe.image);
    body.image = `/uploads/recipes/${req.file.filename}`;
  }

  Object.assign(recipe, body);
  await recipe.save();
  sendResponse(res, 200, recipe, "Recipe updated.");
});

// DELETE /api/recipes/:id
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) throw new ApiError(404, "Recipe not found.");
  await deleteUploadedFile(recipe.image);
  sendResponse(res, 200, null, "Recipe deleted.");
});

module.exports = { getRecipes, getRecipeBySlug, createRecipe, updateRecipe, deleteRecipe };
