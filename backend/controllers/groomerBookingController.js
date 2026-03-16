const Booking = require("../models/bookingModel");
const Groomer = require("../models/groomerModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { default: mongoose } = require("mongoose");
const { castObject } = require("../models/userModel");

// GET /api/v1/groomers/my-bookings
exports.getMyBookings = catchAsync(async (req, res, next) => {
    console.log(req.groomer._id);
  const bookings = await Booking.find({ assignedGroomer: req.groomer._id })
    .populate("productId", "name price tag freeServices")
    .populate("userId", "name email")
    .populate("addons", "name price")
    .sort({ date: -1 });

  res.status(200).json({ status: "success", bookings });
});

// GET /api/v1/groomers/booking/:id
exports.getBookingById = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
  const booking = await Booking.findById(req.params.id)
    .populate("productId", "name price tag freeServices")
    .populate("userId", "name email")
    .populate("addons", "name price");

  if (!booking) return next(new appError(404, "Booking not found"));
  console.log("assignedGroomer:", booking.assignedGroomer?.toString());
  console.log("req.groomer._id:", req.groomer._id.toString());
  if (booking.assignedGroomer?.toString() !== req.groomer._id.toString())
    return next(new appError(403, "Not authorized to view this booking"));

  res.status(200).json({ status: "success", booking });
});

// PATCH /api/v1/groomers/booking/:id/accept
exports.acceptOrRejectBooking = catchAsync(async (req, res, next) => {
  const { accepted } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) return next(new appError(404, "Booking not found"));

  if (booking.assignedGroomer?.toString() !== req.groomer._id.toString())
    return next(new appError(403, "Not authorized"));

  if (accepted) {
    booking.groomerAccepted = true;
    booking.statusHistory.push({
      status: "accepted_by_groomer",
      changedBy: req.groomer.name,
    });
  } else {
    booking.groomerAccepted = false;
    booking.status = "cancelled";
    booking.assignedGroomer = null;
    booking.statusHistory.push({
      status: "rejected_by_groomer",
      changedBy: req.groomer.name,
    });
  }

  await booking.save();
  res.status(200).json({ status: "success", booking });
});

// PATCH /api/v1/groomers/booking/:id/status
exports.updateBookingStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowed = ["on_the_way", "completed"];

  if (!allowed.includes(status))
    return next(new appError(400, `Status must be one of: ${allowed.join(", ")}`));

  const booking = await Booking.findById(req.params.id);
  if (!booking) return next(new appError(404, "Booking not found"));

  if (booking.assignedGroomer?.toString() !== req.groomer._id.toString())
    return next(new appError(403, "Not authorized"));

  if (!booking.groomerAccepted)
    return next(new appError(400, "Please accept the booking first"));

  booking.status = status;
  booking.statusHistory.push({ status, changedBy: req.groomer.name });

  // Update groomer earnings when completed
  if (status === "completed") {
    const amount =
      (Number(booking.bookingMarkedPrice) || 0) -
      (Number(booking.discount) || 0);
    const groomerCut = Math.round(
      amount * (1 - req.groomer.commissionPercent / 100)
    );
    await Groomer.findByIdAndUpdate(req.groomer._id, {
      $inc: { totalJobs: 1, totalEarnings: groomerCut, walletBalance: groomerCut },
    });
  }

  await booking.save();
  res.status(200).json({ status: "success", booking });
});