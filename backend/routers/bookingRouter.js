const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController')
const addonController = require('./../controllers/addonController');

router.route('/create-new-booking').post(authController.protect, bookingController.createNewBooking)
router.route('/get-all-bookings').get(authController.protect, bookingController.getAllBookings);
router.route('/create-addon').post(addonController.createAddon)
router.route('/get-all-addons').get(addonController.getAllAddons);
router.route('/get-all-bookings-for-dashboard').get(bookingController.getAllBookingsForDashboard)

module.exports = router;