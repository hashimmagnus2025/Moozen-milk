const express = require("express");
const { body, param } = require("express-validator");
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/contact.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post(
  "/",
  body("name").isString().withMessage("Name must be text.").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  body("subject").isString().withMessage("Subject must be text.").trim().notEmpty().withMessage("Subject is required."),
  body("message").isString().withMessage("Message must be text.").trim().notEmpty().withMessage("Message is required."),
  body("phone").optional().isString().withMessage("Phone must be text.").trim(),
  validate,
  createInquiry
);

router.get("/", protect, requireRole("admin", "superadmin"), getInquiries);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  body("status").isIn(["new", "read", "resolved"]),
  validate,
  updateInquiryStatus
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteInquiry
);

module.exports = router;
