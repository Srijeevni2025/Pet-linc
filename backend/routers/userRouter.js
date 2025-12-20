const express = require("express");
const authController = require("./../controllers/authController")
const router = express.Router();
const userController = require("./../controllers/userController")

router.route("/").get(authController.getAllUsers)
router.route("/signup").post(authController.signup)
router.route("/login").post(authController.login);
router.route("/get-me").get(authController.protect, userController.getMe);
router.route("/logout").post(authController.logout)




module.exports = router;                