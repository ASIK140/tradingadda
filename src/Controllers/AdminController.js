const Feedback = require("../Models/FeedbackModel");
const ErrorHander = require("../Utils/ErrorHander");
const AsyncError = require("../Middleware/catchAsyncError");
const Sentiments = require("../Models/Admin/Sentiments");
const News = require("../Models/Admin/News");
const Dex = require("../Models/Admin/Dex");
const Users = require("../Models/UserModel");
const Resource = require("../Models/Admin/Resource");

exports.createSentiments = AsyncError(async (req, res, next) => {
  const { Title, Url, Description } = req.body;
  const sems = await Sentiments.create({
    Title,
    Url,
    Description,
  });

  res.status(200).json({
    success: true,
    sems,
  });
});
exports.createNews = AsyncError(async (req, res, next) => {
  const { Title, Url, Description } = req.body;
  const news = await News.create({
    Title,
    Url,
    Description,
  });

  res.status(200).json({
    success: true,
    news,
  });
});

exports.createDex = AsyncError(async (req, res, next) => {
  const { Title, Url, Description } = req.body;
  const dex = await Dex.create({
    Title,
    Url,
    Description,
  });

  res.status(200).json({
    success: true,
    dex,
  });
});

exports.createResource = AsyncError(async (req, res, next) => {
  const { Title, Url, Description } = req.body;
  const data = await Resource.create({
    Title,
    Url,
    Description,
  });

  res.status(200).json({
    success: true,
    data,
  });
});
//All user --Admin
exports.getAllUser = AsyncError(async (req, res, next) => {
  const allusers = await Users.find();
  res.status(200).json({
    success: true,
    users: allusers,
  });
});

//Delete Sentiments
exports.deleteSen = AsyncError(async (req, res, next) => {
  await Sentiments.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Sentiment Deleted",
  });
});

exports.deleteDex = AsyncError(async (req, res, next) => {
  await Dex.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Dex Signal Deleted",
  });
});

exports.deleteNews = AsyncError(async (req, res, next) => {
  await News.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "News Deleted",
  });
});

exports.deleteResource = AsyncError(async (req, res, next) => {
  await Resource.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Resource Deleted",
  });
});

//Check Admin

exports.isAdmin = AsyncError((req, res) => {
  res.status(200).json({
    success: true,
    message: "This is a Authorized User",
  });
});
