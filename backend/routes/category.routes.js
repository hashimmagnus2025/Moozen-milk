const express = require("express");
const { body, param } = require("express-validator");
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();
const upload = createUploader("categories");

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

router.post(
  "/",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  body("name").isString().trim().notEmpty().withMessage("Category name is required."),
  validate,
  createCategory
);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  param("id").isMongoId(),
  validate,
  updateCategory
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteCategory
);

module.exports = router;
