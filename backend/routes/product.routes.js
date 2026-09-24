const express = require("express");
const { body, param, query } = require("express-validator");
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();
// 6 gallery images + multiple pack-size-specific images per request.
const upload = createUploader("products", 30);

const productWriteRules = [
  body("productName").isString().trim().notEmpty().withMessage("Product name is required."),
  body("shortDescription").isString().trim().notEmpty().withMessage("Short description is required."),
  body("description").isString().trim().notEmpty().withMessage("Description is required."),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number."),
];

router.get("/", query("page").optional().isInt({ min: 1 }), validate, getProducts);
router.get("/:slug", getProductBySlug);

router.post(
  "/",
  protect,
  requireRole("admin", "superadmin"),
  upload.any(),
  productWriteRules,
  validate,
  createProduct
);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  upload.any(),
  param("id").isMongoId(),
  validate,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteProduct
);

module.exports = router;
