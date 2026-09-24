const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const { deleteUploadedFiles } = require("../services/file.service");

// Pack-size images ride along in the same multipart request as the
// gallery images, under fieldnames "packImages_0", "packImages_1", ...
// (index into the packSizes array the client just sent), since each
// pack size can have its own photo set distinct from the shared gallery.
// Picking new files for a pack size replaces its whole image set, same
// as the shared gallery does.
function attachPackImages(packSizes, files) {
  return packSizes.map((pack, i) => {
    const matches = files.filter((f) => f.fieldname === `packImages_${i}`);
    if (matches.length === 0) return pack;
    return { ...pack, images: matches.map((f) => `/uploads/products/${f.filename}`) };
  });
}

async function resolveCategoryFilter(categoryParam) {
  if (!categoryParam) return null;
  if (mongoose.isValidObjectId(categoryParam)) return categoryParam;
  const category = await Category.findOne({ slug: categoryParam });
  return category ? category._id : new mongoose.Types.ObjectId(); // no match -> empty results
}

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured, newArrival, status, page = 1, limit = 20, sort } = req.query;

  const filter = {};
  const categoryId = await resolveCategoryFilter(category);
  if (categoryId) filter.category = categoryId;
  if (featured !== undefined) filter.featured = featured === "true";
  if (newArrival !== undefined) filter.newArrival = newArrival === "true";
  if (status) filter.status = status;
  if (search) filter.$text = { $search: search };

  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "name-asc": { productName: 1 },
    newest: { createdAt: -1 },
  };
  const sortOption = sortMap[sort] || { createdAt: -1 };

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  sendResponse(res, 200, {
    items,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/products/:slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category", "name slug");
  if (!product) throw new ApiError(404, "Product not found.");
  sendResponse(res, 200, product);
});

// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  ["ingredients", "benefits", "nutrition", "packSizes"].forEach((field) => {
    if (typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch {
        throw new ApiError(400, `${field} must be valid JSON.`);
      }
    }
  });

  if (!mongoose.isValidObjectId(body.category)) {
    throw new ApiError(400, "A valid category id is required.");
  }
  const categoryExists = await Category.exists({ _id: body.category });
  if (!categoryExists) throw new ApiError(404, "Category not found.");

  const files = req.files || [];
  const images = files.filter((f) => f.fieldname === "images").map((file) => `/uploads/products/${file.filename}`);
  if (Array.isArray(body.packSizes)) {
    body.packSizes = attachPackImages(body.packSizes, files);
  }

  const product = await Product.create({ ...body, images });
  sendResponse(res, 201, product, "Product created.");
});

// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found.");

  const body = { ...req.body };
  ["ingredients", "benefits", "nutrition", "packSizes"].forEach((field) => {
    if (typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch {
        throw new ApiError(400, `${field} must be valid JSON.`);
      }
    }
  });

  if (body.category && !mongoose.isValidObjectId(body.category)) {
    throw new ApiError(400, "A valid category id is required.");
  }

  const files = req.files || [];
  const newImages = files.filter((f) => f.fieldname === "images").map((file) => `/uploads/products/${file.filename}`);
  if (newImages.length > 0) {
    await deleteUploadedFiles(product.images);
    body.images = newImages;
  }

  if (Array.isArray(body.packSizes)) {
    const oldPackSizes = product.packSizes || [];
    body.packSizes = attachPackImages(body.packSizes, files);
    await Promise.all(
      body.packSizes.map((pack, i) => {
        const replaced = files.some((f) => f.fieldname === `packImages_${i}`);
        return replaced ? deleteUploadedFiles(oldPackSizes[i]?.images ?? []) : null;
      })
    );
  }

  Object.assign(product, body);
  await product.save();

  sendResponse(res, 200, product, "Product updated.");
});

// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found.");
  await deleteUploadedFiles(product.images);
  await deleteUploadedFiles((product.packSizes || []).flatMap((p) => p.images ?? []));
  sendResponse(res, 200, null, "Product deleted.");
});

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct };
