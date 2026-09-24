const fs = require("fs/promises");
const path = require("path");

const UPLOADS_ROOT = path.join(__dirname, "..", "uploads");

/**
 * Deletes a previously-uploaded file given its public path (e.g.
 * "/uploads/products/167-milk.jpg"). Silently ignores missing files so
 * callers don't need to check existence first.
 */
async function deleteUploadedFile(publicPath) {
  if (!publicPath) return;
  const relative = publicPath.replace(/^\/?uploads\//, "");
  const absolute = path.join(UPLOADS_ROOT, relative);

  // Guard against path traversal — resolved path must stay inside /uploads.
  if (!absolute.startsWith(UPLOADS_ROOT)) return;

  try {
    await fs.unlink(absolute);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

async function deleteUploadedFiles(publicPaths = []) {
  await Promise.all(publicPaths.map((p) => deleteUploadedFile(p)));
}

module.exports = { deleteUploadedFile, deleteUploadedFiles };
