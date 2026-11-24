/**
 * Bootstraps the first admin account from env vars. There is no public
 * "register admin" endpoint by design — admins are created via this
 * script (or later, by a superadmin from inside the dashboard).
 *
 * Usage: npm run seed:admin
 */
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const env = require("../config/env");
const Admin = require("../models/Admin");

async function run() {
  const name = process.env.SEED_ADMIN_NAME || "Admin";
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@vrinda.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    console.error("SEED_ADMIN_PASSWORD must be set in .env and at least 8 characters.");
    process.exit(1);
  }

  await connectDB();

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email} — nothing to do.`);
  } else {
    await Admin.create({ name, email, password, role: "superadmin" });
    console.log(`Created admin ${email}.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
