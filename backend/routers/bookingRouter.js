const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController')
const addonController = require('./../controllers/addonController');

router.route('/create-new-booking').post(authController.protect, bookingController.createNewBooking)
router.route('/get-all-bookings').get(authController.protect, bookingController.getAllBookings);
router.route('/create-addon').post(addonController.createAddon)
router.route('/get-all-addons').get(addonController.getAllAddons);
router.route('/get-all-bookings-for-dashboard').get(authController.protect, authController.restrictTo("admin"), bookingController.getAllBookingsForDashboard)
router.route('/change-booking-status/:id').patch(authController.protect, authController.restrictTo("admin"), bookingController.changeStatus);
router.route('/change-read-status/:id').patch(authController.protect, authController.restrictTo('admin'),bookingController.changeReadStatus)
router.route('/assign-groomer/:id').patch(authController.protect, authController.restrictTo('admin'), bookingController.assignGroomer)
module.exports = router;