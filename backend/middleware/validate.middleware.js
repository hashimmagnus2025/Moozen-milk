const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

/** Runs after an express-validator chain; turns failures into a 422 ApiError. */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, "Validation failed.", errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })));
  }
  next();
}

module.exports = validate;
