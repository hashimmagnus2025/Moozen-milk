const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

// POST /api/subscribers
const subscribe = asyncHandler(async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  if (!email) throw new ApiError(400, "Email is required.");

  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    return sendResponse(res, 200, existing, "You're already subscribed.");
  }

  const subscriber = await NewsletterSubscriber.create({ email });
  sendResponse(res, 201, subscriber, "Subscribed successfully.");
});

// GET /api/subscribers
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
  sendResponse(res, 200, subscribers);
});

// DELETE /api/subscribers/:id
const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) throw new ApiError(404, "Subscriber not found.");
  sendResponse(res, 200, null, "Subscriber removed.");
});

module.exports = { subscribe, getSubscribers, deleteSubscriber };
