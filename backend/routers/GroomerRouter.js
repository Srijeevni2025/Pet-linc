const express = require("express");
const router = express.Router();
const groomerController = require('./../controllers/groomerController');
const authController = require('./../controllers/authController')
const groomerAuthController = require('./../controllers/groomerAuthController')
const groomerBookingController = require('./../controllers/groomerBookingController')
router.route('/register-groomer').post(authController.protect, authController.restrictTo('admin'), groomerController.registerGroomer)
router.route('/').get(authController.protect, authController.restrictTo('admin'), groomerController.getAllGroomers)
router.post("/login", groomerAuthController.groomerLogin);
router.get("/my-bookings", groomerAuthController.protectGroomer, groomerBookingController.getMyBookings);
router.get("/booking/:id", groomerAuthController.protectGroomer, groomerBookingController.getBookingById);
router.patch("/booking/:id/accept", groomerAuthController.protectGroomer, groomerBookingController.acceptOrRejectBooking);
router.patch("/booking/:id/status", groomerAuthController.protectGroomer, groomerBookingController.updateBookingStatus);

module.exports = router;