const express = require("express");
const { body } = require("express-validator");
const { login, getMe, logout } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post(
  "/login",
  authLimiter,
  body("email").isString().trim().notEmpty().withMessage("Email is required."),
  body("password").isString().notEmpty().withMessage("Password is required."),
  validate,
  login
);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;
