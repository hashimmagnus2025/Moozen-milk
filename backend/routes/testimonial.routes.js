const express = require("express");
const { body, param } = require("express-validator");
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();
const upload = createUploader("testimonials");

router.get("/", getTestimonials);

router.post(
  "/",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  body("name").isString().trim().notEmpty().withMessage("Name is required."),
  body("review").isString().trim().notEmpty().withMessage("Review is required."),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5."),
  validate,
  createTestimonial
);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  param("id").isMongoId(),
  validate,
  updateTestimonial
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteTestimonial
);

module.exports = router;
