const rateLimit = require("express-rate-limit");
const env = require("../config/env");

/**
 * General API traffic guard. A production budget of 300 req/15min is too
 * tight for local dev, where Next's hot-reload re-renders server components
 * (each firing several backend calls) on every save — bump it way up outside
 * production so active dev sessions don't get 429s.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.nodeEnv === "production" ? 300 : 5000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

/** Tighter guard on login to slow down credential-stuffing/brute-force attempts. */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
});

module.exports = { apiLimiter, authLimiter };
