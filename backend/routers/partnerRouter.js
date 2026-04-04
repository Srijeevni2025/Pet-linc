const express = require("express");
const router  = express.Router();

const { protect, restrictTo } = require("../controllers/authController");
// 'protect'    — your existing JWT cookie middleware (sets req.user)
// 'restrictTo' — your existing role guard (already in authController.js)

const {
    registerPartner,
    getMyProfile,
    partnerCreateBooking,
    getMyBookings,
    getMyEarnings,
    updatePayoutDetails,
    adminListPartners,
    adminSettlePayout,
    adminVerifyPartner,
    adminToggleActive,
} = require("../controllers/partnerController");


// ── All partner routes require a logged-in user ─────────────
router.use(protect);


// ── PARTNER SELF-SERVICE ROUTES ──────────────────────────────
router.get(  "/me",             restrictTo("partner", "admin"), getMyProfile);
router.post( "/book",           restrictTo("partner", "admin"), partnerCreateBooking);
router.get(  "/bookings",       restrictTo("partner", "admin"), getMyBookings);
router.get(  "/earnings",       restrictTo("partner", "admin"), getMyEarnings);
router.patch("/payout-details", restrictTo("partner", "admin"), updatePayoutDetails);


// ── ADMIN ROUTES ─────────────────────────────────────────────
router.post( "/register",                         restrictTo("admin"), registerPartner);
router.get(  "/admin/all",                        restrictTo("admin"), adminListPartners);
router.patch("/admin/:partnerId/settle-payout",   restrictTo("admin"), adminSettlePayout);
router.patch("/admin/:partnerId/verify",          restrictTo("admin"), adminVerifyPartner);
router.patch("/admin/:partnerId/toggle-active",   restrictTo("admin"), adminToggleActive);


module.exports = router;
