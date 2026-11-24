const ContactInquiry = require("../models/ContactInquiry");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

// POST /api/contact
const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const inquiry = await ContactInquiry.create({ name, email, phone, subject, message });
  sendResponse(res, 201, inquiry, "Thanks for reaching out — we'll be in touch soon.");
});

// GET /api/contact
const getInquiries = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const inquiries = await ContactInquiry.find(filter).sort({ createdAt: -1 });
  sendResponse(res, 200, inquiries);
});

// PUT /api/contact/:id
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["new", "read", "resolved"].includes(status)) {
    throw new ApiError(400, "Status must be one of: new, read, resolved.");
  }
  const inquiry = await ContactInquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!inquiry) throw new ApiError(404, "Inquiry not found.");
  sendResponse(res, 200, inquiry, "Inquiry updated.");
});

// DELETE /api/contact/:id
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) throw new ApiError(404, "Inquiry not found.");
  sendResponse(res, 200, null, "Inquiry deleted.");
});

module.exports = { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry };
