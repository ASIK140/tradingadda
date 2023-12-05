const { checkAuthAdmin, Auth } = require("../Middleware/auth");
const express = require("express");
const {
  CreateFeedback,
  getALLFeedback,
  deleteFeedback,
} = require("../Controllers/FeedBackController");
const router = express.Router();

router.route("/feedback").post(CreateFeedback);
router.route("/allfeed").get(Auth, checkAuthAdmin("admin"), getALLFeedback);
router.route("/del-feed").delete(Auth, checkAuthAdmin("admin"), deleteFeedback);

module.exports = router;
