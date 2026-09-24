const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settings.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");
const { createUploader } = require("../middleware/upload.middleware");

const router = express.Router();
const upload = createUploader("settings");

router.get("/", protect, requireRole("admin", "superadmin"), getSettings);
router.put("/", protect, requireRole("admin", "superadmin"), upload.single("logo"), updateSettings);

module.exports = router;
