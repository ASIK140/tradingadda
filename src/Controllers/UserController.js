const Users = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const ErrorHander = require("../Utils/ErrorHander");
const AsyncError = require("../Middleware/catchAsyncError");
const sendCookie = require("../Utils/Cookies");
const Sentiments = require("../Models/Admin/Sentiments");
const News = require("../Models/Admin/News");
const Dex = require("../Models/Admin/Dex");
const Resource = require("../Models/Admin/Resource");

//Register
exports.SignUp = AsyncError(async (req, res, next) => {
  let { name, email, phone, password, confirmpass, transactionID } = req.body;
  const checkEmail = await Users.findOne({ email });
  if (checkEmail) {
    return next(new ErrorHander(400, "This email is already registered"));
  }
  if (password != confirmpass) {
    return next(new ErrorHander(400, "password does not match"));
  }
  password = await bcrypt.hash(req.body.password, 10);

  const user = await Users.create({
    name,
    email,
    phone,
    password,
    transactionID,
  });

  sendCookie(user, 201, res);
});

//login
exports.SignIn = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander(400, "Envalid email & password"));
  }

  const isMatch = await user.comPass(password);
  if (!isMatch) {
    return next(new ErrorHander(400, "Envalid email & password"));
  }
  sendCookie(user, 200, res);
});

//Logout
exports.SignOut = AsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logout!!",
  });
});

//Update user
exports.paymentStatus = AsyncError(async (req, res) => {
  let user = await Users.findById(req.params.id);
  const newData = {
    payment: req.body.payment,
    role: req.body.role,
  };
  user = await Users.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
//Update profile
exports.updateProfile = AsyncError(async (req, res) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const user = await Users.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHander(500, "Somthing went wrong"));
  }
  res.status(200).json({
    user,
    success: true,
    message: "Profile Update Successfull",
  });
});
// Get all Sentiments
exports.getAllSen = AsyncError(async (req, res, next) => {
  const all = await Sentiments.find();
  res.status(200).json({
    success: true,
    Sentiments: all,
  });
});

// Get all Resource
exports.getAllRes = AsyncError(async (req, res, next) => {
  const all = await Resource.find();
  res.status(200).json({
    success: true,
    Resource: all,
  });
});
//Get All Dex
exports.getAllDex = AsyncError(async (req, res, next) => {
  const all = await Dex.find();
  res.status(200).json({
    success: true,
    Dex: all,
  });
});
// get All News
exports.getAllNews = AsyncError(async (req, res, next) => {
  const all = await News.find();
  res.status(200).json({
    success: true,
    News: all,
  });
});

//Check User

exports.isUser = AsyncError((req, res) => {
  const user = req.user;
  res.json({
    user,
    success: true,
  });
});

//Change Password
exports.changePass = AsyncError(async (req, res, next) => {
  const user = await Users.findById(req.user.id).select("+password");
  // console.log(user);
  const { oldpass, newpass, confirmpass } = req.body;
  const isMatch = await user.comPass(oldpass);
  if (!isMatch) {
    return next(new ErrorHander(400, "Invalid Password"));
  }
  if (newpass != confirmpass) {
    return next(new ErrorHander(400, "Password does not match"));
  }

  user.password = await bcrypt.hash(newpass, 10);
  await user.save();
  console.log(user);
  sendCookie(user, 200, res);
});
