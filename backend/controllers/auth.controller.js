const Admin = require("../models/Admin");
const { generateToken } = require("../services/token.service");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(admin);
  res.cookie("token", token, COOKIE_OPTIONS);

  sendResponse(res, 200, {
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  }, "Logged in successfully.");
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  sendResponse(res, 200, {
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    role: req.admin.role,
    createdAt: req.admin.createdAt,
  });
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  sendResponse(res, 200, null, "Logged out.");
});

module.exports = { login, getMe, logout };
