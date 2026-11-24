const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/categories", require("./category.routes"));
router.use("/blogs", require("./blog.routes"));
router.use("/recipes", require("./recipe.routes"));
router.use("/testimonials", require("./testimonial.routes"));
router.use("/contact", require("./contact.routes"));
router.use("/subscribers", require("./subscriber.routes"));
router.use("/settings", require("./settings.routes"));

router.get("/health", (req, res) => res.json({ success: true, message: "API is healthy." }));

module.exports = router;
