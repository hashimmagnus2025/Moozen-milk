const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const env = require("./config/env");
const routes = require("./routes");
const { apiLimiter } = require("./middleware/rateLimiter.middleware");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  helmet({
    // The frontend (a separate origin) embeds product/category/blog/recipe
    // images directly via <img>. Helmet's default same-origin CORP silently
    // blocks that cross-origin load in the browser (ERR_BLOCKED_BY_RESPONSE) —
    // this is a public catalog API/asset host, so cross-origin reads are
    // intended; CORS above still controls who can call the JSON endpoints.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
// Allow the known frontends (local dev + deployed Vercel site). CLIENT_URL
// may be a single URL or a comma-separated list; everything is merged with a
// couple of sensible defaults so a missing/incomplete env var can't silently
// lock the real frontend out via CORS.
const allowedOrigins = [
  ...String(env.clientUrl || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  "http://localhost:3000",
  "https://moozen-milk-fr3t.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser requests (curl, server-to-server) have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitize());

if (env.nodeEnv !== "test") {
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
}

// Static, publicly served uploads — paths stored in MongoDB point here.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiLimiter, routes);

app.get("/", (req, res) => res.json({ success: true, message: "Vrinda API is running." }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
