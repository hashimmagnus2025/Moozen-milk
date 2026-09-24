const SiteSettings = require("../models/SiteSettings");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const { deleteUploadedFile } = require("../services/file.service");

async function getSingleton() {
  let doc = await SiteSettings.findOne();
  if (!doc) doc = await SiteSettings.create({});
  return doc;
}

// GET /api/settings
const getSettings = asyncHandler(async (req, res) => {
  const settings = await getSingleton();
  sendResponse(res, 200, settings);
});

// PUT /api/settings
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getSingleton();

  const body = { ...req.body };
  if (req.file) {
    await deleteUploadedFile(settings.logo);
    body.logo = `/uploads/settings/${req.file.filename}`;
  }

  Object.assign(settings, body);
  await settings.save();
  sendResponse(res, 200, settings, "Settings updated.");
});

module.exports = { getSettings, updateSettings };
