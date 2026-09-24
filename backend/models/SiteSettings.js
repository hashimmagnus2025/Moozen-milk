const mongoose = require("mongoose");

/**
 * Singleton document — general company/site settings edited from the
 * admin panel. Same singleton pattern as Homepage.js.
 */
const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    logo: { type: String, default: null },
    instagramUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
    footerText: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
