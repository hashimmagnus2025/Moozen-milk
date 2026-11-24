const express = require("express");
const { body, param } = require("express-validator");
const {
  getRecipes,
  getRecipeBySlug,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();
const upload = createUploader("recipes");

const recipeWriteRules = [
  body("title").isString().trim().notEmpty().withMessage("Title is required."),
  body("description").isString().trim().notEmpty().withMessage("Description is required."),
  body("preparationTime").isString().trim().notEmpty().withMessage("Preparation time is required."),
  body("cookingTime").isString().trim().notEmpty().withMessage("Cooking time is required."),
];

router.get("/", getRecipes);
router.get("/:slug", getRecipeBySlug);

router.post(
  "/",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  recipeWriteRules,
  validate,
  createRecipe
);

router.put(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  upload.single("image"),
  param("id").isMongoId(),
  validate,
  updateRecipe
);

router.delete(
  "/:id",
  protect,
  requireRole("admin", "superadmin"),
  param("id").isMongoId(),
  validate,
  deleteRecipe
);

module.exports = router;
