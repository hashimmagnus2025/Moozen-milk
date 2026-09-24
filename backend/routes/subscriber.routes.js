const express = require("express");
const { param, body } = require("express-validator");
const { subscribe, getSubscribers, deleteSubscriber } = require("../controllers/subscriber.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post(
  "/",
  body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
  validate,
  subscribe
);
router.get("/", protect, requireRole("admin", "superadmin"), getSubscribers);
router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteSubscriber
);

module.exports = router;
