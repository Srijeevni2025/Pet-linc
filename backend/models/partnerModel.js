const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Partners are distinct from groomers and regular users.
// They get a "partner" role in userModel, but this model stores
// their extra business profile — incentive rate, payout details,
// and a running ledger of earnings.

const partnerSchema = new mongoose.Schema(
  {
    // ── LINK TO USER ACCOUNT ─────────────────────────────────
    // Every partner must have a User account (role: "partner").
    // This ref ties the two together.
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A partner must be linked to a user account."],
      unique: true,
    },

    // ── BASIC PROFILE ────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Partner name is required."],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      unique: true,
    },

    city: {
      type: String,
      required: [true, "City is required."],
    },

    // ── VERIFICATION ─────────────────────────────────────────
    aadhar: {
      type: String,
      required: [true, "Aadhar number is required."],
    },

    panNumber: {
      type: String,
      required: [true, "PAN number is required."],
    },

    isVerified: {
      type: Boolean,
      default: false,   // admin flips this to true after KYC check
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ── INCENTIVE CONFIG ─────────────────────────────────────
    // Default 15%. Admin can override per partner.
    incentivePercent: {
      type: Number,
      default: 15,
      min: 0,
      max: 100,
    },

    // ── EARNINGS LEDGER ──────────────────────────────────────
    // Running total of all incentives earned (all time).
    totalEarnings: {
      type: Number,
      default: 0,
    },

    // Amount earned but not yet paid out.
    pendingPayout: {
      type: Number,
      default: 0,
    },

    // Amount already settled/paid.
    totalPaidOut: {
      type: Number,
      default: 0,
    },

    // ── PAYOUT DETAILS ───────────────────────────────────────
    payoutDetails: {
      upiId:         { type: String, default: "" },
      accountHolder: { type: String, default: "" },
      accountNumber: { type: String, default: "" },
      ifsc:          { type: String, default: "" },
      bankName:      { type: String, default: "" },
    },

    // ── STATS ────────────────────────────────────────────────
    totalBookings: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5.0,
    },
  },
  { timestamps: true }
);

// ── INSTANCE METHOD: credit incentive after a booking ──────
// Call this inside your createBooking controller when
// bookedByPartner === true.
//
// Usage:
//   const partner = await Partner.findById(partnerId);
//   await partner.creditIncentive(incentiveAmount);
//
partnerSchema.methods.creditIncentive = async function (amount) {
  this.totalEarnings  += amount;
  this.pendingPayout  += amount;
  this.totalBookings  += 1;
  await this.save();
};

// ── INSTANCE METHOD: mark a payout as settled ──────────────
// Call this from your admin payout controller.
//
// Usage:
//   await partner.settlePayout(payoutAmount);
//
partnerSchema.methods.settlePayout = async function (amount) {
  // Clamp — never go below 0
  const settled       = Math.min(amount, this.pendingPayout);
  this.pendingPayout  -= settled;
  this.totalPaidOut   += settled;
  await this.save();
  return settled;
};

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
