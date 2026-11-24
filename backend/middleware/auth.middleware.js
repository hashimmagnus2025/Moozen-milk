const Admin = require("../models/Admin");
const { verifyToken } = require("../services/token.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

/** Requires a valid JWT (Authorization header or `token` cookie); attaches req.admin. */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Not authorized — no token provided.");
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(401, "Not authorized — invalid or expired token.");
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    throw new ApiError(401, "Not authorized — admin no longer exists.");
  }

  req.admin = admin;
  next();
});

/** Restricts a route to one or more admin roles. Use after `protect`. */
const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      throw new ApiError(403, "You do not have permission to perform this action.");
    }
    next();
  };

module.exports = { protect, requireRole };
