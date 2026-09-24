/** Consistent success envelope: { success, data, message }. */
function sendResponse(res, statusCode, data = null, message = "Success") {
  return res.status(statusCode).json({ success: true, message, data });
}

module.exports = sendResponse;
