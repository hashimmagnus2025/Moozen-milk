const app = require("../app");
const connectDB = require("../config/db");

let isConnected = false;

async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
}

module.exports = handler;