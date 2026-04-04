// partnerMutationFunction.js
// Partner-specific POST / PATCH calls — same conventions as mutationFunction.js
// (axios, VITE_BASE_URL, withCredentials: true)

import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_BASE_URL;

// ── POST /api/v1/partners/book ───────────────────────────────
// Partner creates a grooming booking on behalf of a customer.
// Required body fields (matches partnerController.partnerCreateBooking):
//   productId, petName, type (petType), breed, age, weight, aggression,
//   address, pincode, lat, lng, city, date, timeSlot, mobile
// Optional: addons[], notes, coupan, discount
//
// Use with react-query:
//   useMutation({ mutationFn: PartnerCreateBooking,
//     onSuccess: () => queryClient.invalidateQueries(["partnerBookings", "partnerEarnings"]) })
export async function PartnerCreateBooking(formData) {
  const res = await axios({
    method: "post",
    url: `${API_URL_BASE}/api/v1/partners/book`,
    headers: { "Content-Type": "application/json" },
    data: formData,
    withCredentials: true,
  });
  // Returns { status, data: booking, partnerIncentive }
  return res.data;
}

// ── PATCH /api/v1/partners/payout-details ───────────────────
// Partner saves their bank / UPI payout information.
// Body: { upiId?, accountHolder?, accountNumber?, ifsc?, bankName? }
export async function UpdatePartnerPayoutDetails(payoutData) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/partners/payout-details`,
    headers: { "Content-Type": "application/json" },
    data: payoutData,
    withCredentials: true,
  });
  return res.data.data;
}

// ── (Admin only) POST /api/v1/partners/register ─────────────
// Admin registers a new partner from an existing user account.
// Body: { userId, name, phone, city, aadhar, panNumber, incentivePercent? }
export async function AdminRegisterPartner(partnerData) {
  const res = await axios({
    method: "post",
    url: `${API_URL_BASE}/api/v1/partners/register`,
    headers: { "Content-Type": "application/json" },
    data: partnerData,
    withCredentials: true,
  });
  return res.data.data;
}

// ── (Admin only) PATCH /api/v1/partners/admin/:id/settle-payout
// Admin settles a partner's pending payout and zeroes the ledger.
// Body: { amount }
export async function AdminSettlePartnerPayout(partnerId, amount) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/partners/admin/${partnerId}/settle-payout`,
    headers: { "Content-Type": "application/json" },
    data: { amount },
    withCredentials: true,
  });
  return res.data;
}

// ── (Admin only) PATCH /api/v1/partners/admin/:id/verify ────
// Admin marks a partner as KYC-verified.
export async function AdminVerifyPartner(partnerId) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/partners/admin/${partnerId}/verify`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data.data;
}

// ── (Admin only) PATCH /api/v1/partners/admin/:id/toggle-active
// Admin activates or deactivates a partner account.
export async function AdminTogglePartnerActive(partnerId) {
  const res = await axios({
    method: "patch",
    url: `${API_URL_BASE}/api/v1/partners/admin/${partnerId}/toggle-active`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
}
