const Blog = require("../models/Blog");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const { deleteUploadedFile } = require("../services/file.service");

// GET /api/blogs
const getBlogs = asyncHandler(async (req, res) => {
  const { category, published, search, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (published !== undefined) filter.published = published === "true";
  if (search) filter.$text = { $search: search };

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 12, 1), 100);

  const [items, total] = await Promise.all([
    Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Blog.countDocuments(filter),
  ]);

  sendResponse(res, 200, {
    items,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/blogs/:slug
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) throw new ApiError(404, "Blog post not found.");
  sendResponse(res, 200, blog);
});

// POST /api/blogs
const createBlog = asyncHandler(async (req, res) => {
  const featuredImage = req.file ? `/uploads/blogs/${req.file.filename}` : null;
  const blog = await Blog.create({ ...req.body, featuredImage });
  sendResponse(res, 201, blog, "Blog post created.");
});

// PUT /api/blogs/:id
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog post not found.");

  if (req.file) {
    await deleteUploadedFile(blog.featuredImage);
    req.body.featuredImage = `/uploads/blogs/${req.file.filename}`;
  }

  Object.assign(blog, req.body);
  await blog.save();
  sendResponse(res, 200, blog, "Blog post updated.");
});

// DELETE /api/blogs/:id
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, "Blog post not found.");
  await deleteUploadedFile(blog.featuredImage);
  sendResponse(res, 200, null, "Blog post deleted.");
});

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
