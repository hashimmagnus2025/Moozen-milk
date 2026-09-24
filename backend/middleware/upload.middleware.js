const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
]);

const UPLOADS_ROOT = path.join(__dirname, "..", "uploads");

function uniqueFilename(originalName, mimetype) {
  const ext = ALLOWED_MIME_TYPES.get(mimetype);

  const base = path
    .basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  const stamp = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;

  return `${base || "file"}-${stamp}${ext}`;
}

function createUploader(folder, maxFiles = 6) {
  const destination = path.join(UPLOADS_ROOT, folder);

  // Local development ke liye folder create karo.
  // Vercel par local disk upload use nahi karna.
  if (process.env.VERCEL !== "1") {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (process.env.VERCEL === "1") {
        return cb(
          new ApiError(
            503,
            "File uploads are temporarily unavailable on the deployed server."
          )
        );
      }

      cb(null, destination);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        uniqueFilename(file.originalname, file.mimetype)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(
        new ApiError(
          400,
          "Only JPEG, PNG, WEBP or AVIF images are allowed."
        )
      );
    }

    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: env.maxUploadSizeMb * 1024 * 1024,
      files: maxFiles,
    },
  });
}

function toPublicPath(folder, file) {
  return `/uploads/${folder}/${file.filename}`;
}

module.exports = {
  createUploader,
  toPublicPath,
};