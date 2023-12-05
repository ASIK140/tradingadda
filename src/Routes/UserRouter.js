const express = require("express");
const {
  SignUp,
  SignIn,
  paymentStatus,
  SignOut,
  getAllSen,
  getAllDex,
  getAllNews,
  getAllRes,
  isUser,
  updateProfile,
  changePass,
} = require("../Controllers/UserController");
const { checkAuthAdmin, Auth } = require("../Middleware/auth");

const router = express.Router();

router.route("/sign-up").post(SignUp);
router.route("/sign-in").post(SignIn);
router.route("/sign-out").get(SignOut);
router
  .route("/update-user/:id")
  .put(Auth, checkAuthAdmin("admin"), paymentStatus);
router.route("/sentiments").get(getAllSen);
router.route("/dex").get(getAllDex);
router.route("/news").get(getAllNews);
router.route("/resource").get(getAllRes);
router.route("/user").get(Auth, isUser);
router.route("/update-profile/:id").put(Auth, updateProfile);
router.route("/change-password/:id").put(Auth, changePass);

module.exports = router;
