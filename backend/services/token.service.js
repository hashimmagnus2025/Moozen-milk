const jwt = require("jsonwebtoken");
const env = require("../config/env");

function generateToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

module.exports = { generateToken, verifyToken };
