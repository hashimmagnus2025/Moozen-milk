const fs = require("fs");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

// Ensure the fixed upload directories exist before anything tries to write to them.
["products", "categories", "blogs", "recipes", "homepage", "settings", "testimonials"].forEach((folder) => {
  fs.mkdirSync(path.join(__dirname, "uploads", folder), { recursive: true });
});

async function start() {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`Moozen API listening on port ${env.port} [${env.nodeEnv}]`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled promise rejection:", err);
});
