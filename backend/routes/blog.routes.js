const express = require("express");
const { body, param } = require("express-validator");
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();
const upload = createUploader("blogs");

const blogWriteRules = [
  body("title").isString().trim().notEmpty().withMessage("Title is required."),
  body("excerpt").isString().trim().notEmpty().withMessage("Excerpt is required."),
  body("content").isString().trim().notEmpty().withMessage("Content is required."),
];

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

router.post(
  "/",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("featuredImage"),
  blogWriteRules,
  validate,
  createBlog
);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("featuredImage"),
  param("id").isMongoId(),
  validate,
  updateBlog
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteBlog
);

module.exports = router;
