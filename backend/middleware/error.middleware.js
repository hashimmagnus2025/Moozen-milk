const multer = require("multer");
const ApiError = require("../utils/ApiError");

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found — ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error.";
  let details = err.details || null;

  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "File is too large." : err.message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed.";
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} "${err.keyValue[field]}" is already in use.` : "Duplicate value.";
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Not authorized — invalid or expired token.";
  }

  if (process.env.NODE_ENV !== "production" && statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(process.env.NODE_ENV !== "production" && statusCode >= 500 ? { stack: err.stack } : {}),
  });
}

module.exports = { notFound, errorHandler };
