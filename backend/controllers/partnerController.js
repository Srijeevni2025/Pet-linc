const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Partner = require("../models/partnerModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Package = require("../models/packageModel");

// ─────────────────────────────────────────────────────────────
// POST /api/v1/partners/register           [admin only]
// Admin creates a partner profile for an existing user.
// The user's role is flipped to "partner" at the same time.
// Body: { userId, name, phone, city, aadhar, panNumber, incentivePercent? }
// ─────────────────────────────────────────────────────────────
exports.registerPartner = catchAsync(async (req, res, next) => {
    const { userId, name, phone, city, aadhar, panNumber, incentivePercent } = req.body;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new appError(404, "No user found with that ID."));
    }

    // Prevent double-registration
    const existing = await Partner.findOne({ userId });
    if (existing) {
        return next(new appError(400, "This user already has a partner profile."));
    }

    // Flip role on the User document
    await User.findByIdAndUpdate(userId, { role: "partner" });

    const partner = await Partner.create({
        userId,
        name,
        phone,
        city,
        aadhar,
        panNumber,
        ...(incentivePercent && { incentivePercent }),
    });

    res.status(201).json({
        status: "success",
        data: partner,
    });
});


// ─────────────────────────────────────────────────────────────
// GET /api/v1/partners/me                  [partner]
// Logged-in partner fetches their own profile.
// req.user is set by the existing protect middleware.
// ─────────────────────────────────────────────────────────────
exports.getMyProfile = catchAsync(async (req, res, next) => {
    const partner = await Partner.findOne({ userId: req.user._id });
    if (!partner) {
        return next(new appError(404, "Partner profile not found. Contact admin."));
    }

    res.status(200).json({
        status: "success",
        data: partner,
    });
});


// ─────────────────────────────────────────────────────────────
// POST /api/v1/partners/book               [partner]
// Partner books a grooming session on behalf of a customer.
// Mirrors createNewBooking in bookingController.js but:
//  - does NOT require a userId (customer may be offline/walk-in)
//  - stamps bookedByPartner, partnerId, partnerIncentive
//  - credits partner's pendingPayout ledger via instance method
// ─────────────────────────────────────────────────────────────
exports.partnerCreateBooking = catchAsync(async (req, res, next) => {
    const partner = await Partner.findOne({ userId: req.user._id });
    if (!partner) {
        return next(new appError(404, "Partner profile not found."));
    }
    if (!partner.isActive) {
        return next(new appError(403, "Your partner account has been deactivated. Contact admin."));
    }

    let {
        petName, type: petType, breed, age, weight, notes,
        address, pincode, lat, lng, city,
        date, timeSlot,
        addons,
        coupan, couponId, discount,
        mobile, aggression,
        productId,
        customerName:name
    } = req.body;
    console.log(name);
    lat = lat * 1;
    lng = lng * 1;

    // Fetch the package price — same as bookingController.createNewBooking
    const packageDoc = await Package.findById(productId).select("price");
    if (!packageDoc) {
        return next(new appError(404, "Package not found."));
    }

    const bookingMarkedPrice = packageDoc.price;
    const incentiveRate      = (partner.incentivePercent || 15) / 100;
    const partnerIncentive   = Math.round(Number(bookingMarkedPrice) * incentiveRate);

    const booking = await Booking.create({
        productId,
        name,
        // No userId — partner is booking for a walk-in / referred customer
        petName, petType, breed, age, weight, notes,
        mobile, aggression,
        address, pincode, lat, lng, city,
        date, timeSlot,
        addons: addons || [],
        coupan, discount,
        bookingMarkedPrice,
        status: "Pending",

        // ── Partner-specific fields ──
        bookedByPartner: true,
        partnerId:       partner._id,
        partnerIncentive,
        incentivePaid:   false,
    });

    // Credit the partner ledger (totalEarnings + pendingPayout + totalBookings)
    //await partner.creditIncentive(partnerIncentive);

    res.status(201).json({
        status: "success",
        data: booking,
        partnerIncentive,
    });
});


// ─────────────────────────────────────────────────────────────
// GET /api/v1/partners/bookings            [partner]
// All bookings created by the logged-in partner.
// ─────────────────────────────────────────────────────────────
exports.getMyBookings = catchAsync(async (req, res, next) => {
    const partner = await Partner.findOne({ userId: req.user._id });
    if (!partner) {
        return next(new appError(404, "Partner profile not found."));
    }

    const bookings = await Booking.find({ partnerId: partner._id })
        .populate("productId", "name price emoji tag")
        .populate("addons",    "name price")
        .sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: bookings.length,
        data: bookings,
    });
});


// ─────────────────────────────────────────────────────────────
// GET /api/v1/partners/earnings            [partner]
// Summary (totals from Partner doc) + per-booking breakdown.
// ─────────────────────────────────────────────────────────────
exports.getMyEarnings = catchAsync(async (req, res, next) => {
    const partner = await Partner.findOne({ userId: req.user._id });
    if (!partner) {
        return next(new appError(404, "Partner profile not found."));
    }

    const now        = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const allBookings = await Booking.find({ partnerId: partner._id })
        .populate("productId", "name price emoji")
        .sort({ createdAt: -1 });

    const thisMonthEarnings = allBookings
        .filter((b) => new Date(b.createdAt) >= monthStart)
        .reduce((sum, b) => sum + (b.partnerIncentive || 0), 0);

    res.status(200).json({
        status: "success",
        data: {
            totalEarnings:    partner.totalEarnings,
            pendingPayout:    partner.pendingPayout,
            totalPaidOut:     partner.totalPaidOut,
            thisMonthEarnings,
            totalBookings:    partner.totalBookings,
            incentivePercent: partner.incentivePercent,
            bookings:         allBookings,
        },
    });
});


// ─────────────────────────────────────────────────────────────
// PATCH /api/v1/partners/payout-details    [partner]
// Partner saves their bank / UPI info for payouts.
// ─────────────────────────────────────────────────────────────
exports.updatePayoutDetails = catchAsync(async (req, res, next) => {
    const { upiId, accountHolder, accountNumber, ifsc, bankName } = req.body;

    const partner = await Partner.findOneAndUpdate(
        { userId: req.user._id },
        { payoutDetails: { upiId, accountHolder, accountNumber, ifsc, bankName } },
        { new: true, runValidators: true }
    );

    if (!partner) {
        return next(new appError(404, "Partner profile not found."));
    }

    res.status(200).json({
        status: "success",
        data: partner,
    });
});


// ─────────────────────────────────────────────────────────────
// GET /api/v1/partners/admin/all           [admin]
// List every partner with their user info + earnings summary.
// ─────────────────────────────────────────────────────────────
exports.adminListPartners = catchAsync(async (req, res, next) => {
    const partners = await Partner.find()
        .populate("userId", "name email role")
        .sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: partners.length,
        data: partners,
    });
});


// ─────────────────────────────────────────────────────────────
// PATCH /api/v1/partners/admin/:partnerId/settle-payout  [admin]
// Admin records a payout and zeroes the pendingPayout ledger.
// Body: { amount }
// ─────────────────────────────────────────────────────────────
exports.adminSettlePayout = catchAsync(async (req, res, next) => {
    const partner = await Partner.findById(req.params.partnerId);
    if (!partner) {
        return next(new appError(404, "Partner not found."));
    }

    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return next(new appError(400, "Provide a valid payout amount."));
    }

    // Instance method on partnerModel clamps to pendingPayout
    const settled = await partner.settlePayout(Number(amount));

    // Mark all un-paid booking incentives as paid for audit trail
    await Booking.updateMany(
        { partnerId: partner._id, incentivePaid: false },
        { incentivePaid: true }
    );

    res.status(200).json({
        status: "success",
        message: `₹${settled} settled for ${partner.name}.`,
        data: partner,
    });
});


// ─────────────────────────────────────────────────────────────
// PATCH /api/v1/partners/admin/:partnerId/verify          [admin]
// Admin verifies a partner after KYC check.
// ─────────────────────────────────────────────────────────────
exports.adminVerifyPartner = catchAsync(async (req, res, next) => {
    const partner = await Partner.findByIdAndUpdate(
        req.params.partnerId,
        { isVerified: true },
        { new: true }
    );

    if (!partner) {
        return next(new appError(404, "Partner not found."));
    }

    res.status(200).json({
        status: "success",
        data: partner,
    });
});


// ─────────────────────────────────────────────────────────────
// PATCH /api/v1/partners/admin/:partnerId/toggle-active   [admin]
// Admin activates / deactivates a partner without deleting them.
// ─────────────────────────────────────────────────────────────
exports.adminToggleActive = catchAsync(async (req, res, next) => {
    const partner = await Partner.findById(req.params.partnerId);
    if (!partner) {
        return next(new appError(404, "Partner not found."));
    }

    partner.isActive = !partner.isActive;
    await partner.save();

    res.status(200).json({
        status: "success",
        message: `Partner ${partner.isActive ? "activated" : "deactivated"}.`,
        data: partner,
    });
});
