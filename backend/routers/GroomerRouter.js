const express = require("express");
const router = express.Router();
const groomerController = require('./../controllers/groomerController');
const authController = require('./../controllers/authController')


router.route('/register-groomer').post(authController.protect, authController.restrictTo('admin'), groomerController.registerGroomer)
router.route('/').get(authController.protect, authController.restrictTo('admin'), groomerController.getAllGroomers)

module.exports = router;