const express = require("express");
const router = express.Router();
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController")

router.route('/create-new-review').post(authController.protect, reviewController.createReview)
router.route('/get-all-reviews').get( reviewController.getAllReviews);

module.exports = router;