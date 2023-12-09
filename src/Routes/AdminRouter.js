const express = require("express");
const { checkAuthAdmin, Auth } = require("../Middleware/auth");
const {
  getAllUser,
  deleteSen,
  createSentiments,
  createNews,
  createDex,
  createResource,
  deleteDex,
  deleteNews,
  deleteResource,
  isAdmin,
} = require("../Controllers/AdminController");
const router = express.Router();

router
  .route("/sentiments")
  .post(Auth, checkAuthAdmin("admin"), createSentiments);
router.route("/news").post(Auth, checkAuthAdmin("admin"), createNews);
router.route("/dex").post(Auth, checkAuthAdmin("admin"), createDex);
router.route("/resource").post(Auth, checkAuthAdmin("admin"), createResource);
router.route("/allusers").get(getAllUser);
router.route("/del-sen/:id").delete(Auth, checkAuthAdmin("admin"), deleteSen);
router.route("/del-dex/:id").delete(Auth, checkAuthAdmin("admin"), deleteDex);
router.route("/del-news/:id").delete(Auth, checkAuthAdmin("admin"), deleteNews);
router
  .route("/del-res/:id")
  .delete(Auth, checkAuthAdmin("admin"), deleteResource);
router.route("/isad").get(Auth, checkAuthAdmin("admin"), isAdmin);
router.route("/isad").get(Auth, isAdmin);
module.exports = router;
