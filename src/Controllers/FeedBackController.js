const Feedback = require("../Models/FeedbackModel");
const ErrorHander = require("../Utils/ErrorHander");
const AsyncError = require("../Middleware/catchAsyncError");
exports.CreateFeedback = AsyncError(async (req, res, next) => {
  const { FirstName, LastName, Email, Comment } = req.body;
  const fBack = await Feedback.create({
    FirstName,
    LastName,
    Email,
    Comment,
  });

  res.status(200).json({
    success: true,
    fBack,
  });
});

exports.getALLFeedback = AsyncError(async (req, res, next) => {
  const fBack = await Feedback.find();
  res.status(200).json({
    success: true,
    feedback: fBack,
  });
});

exports.deleteFeedback = AsyncError(async (req, res, next) => {
  await Feedback.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "FeedBack Deleted",
  });
});
