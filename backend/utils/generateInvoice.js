/**
 * generateInvoice.js
 * -------------------
 * Streams a professional PDF invoice into an Express response.
 * Requires:  npm install pdfkit
 *
 * Usage inside a controller:
 *   const generateInvoice = require('./generateInvoice');
 *   generateInvoice(res, booking);          // booking must be populated
 */

const PDFDocument = require("pdfkit");

const ORANGE      = "#EA580C";
const DARK        = "#111827";
const MID_GRAY    = "#6B7280";
const LIGHT_GRAY  = "#F3F4F6";
const GREEN       = "#16A34A";
const WHITE       = "#FFFFFF";

/**
 * @param {import('express').Response} res
 * @param {Object} booking  - Mongoose doc with .populate('addons productId userId')
 */
function generateInvoice(res, booking) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 45,
    bufferPages: true,
    info: { Title: `Petlinc Invoice ${invoiceNo(booking)}`, Author: "Petlinc" },
  });

  // ── pipe straight to HTTP response ──────────────────────────────────────────
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="petlinc-invoice-${invoiceNo(booking)}.pdf"`
  );
  doc.pipe(res);

  const W    = doc.page.width  - 90; // usable width (margins = 45 each side)
  const LEFT = 45;
  let   y    = 45;

  // ── helpers ──────────────────────────────────────────────────────────────────

  function row(label, value, yPos, bold = false, valueColor = DARK) {
    doc
      .font(bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(9)
      .fillColor(MID_GRAY)
      .text(label, LEFT, yPos);
    doc
      .font(bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(9)
      .fillColor(valueColor)
      .text(value, LEFT + 140, yPos, { width: W - 140, align: "left" });
  }

  function hline(yPos, color = "#E5E7EB") {
    doc.moveTo(LEFT, yPos).lineTo(LEFT + W, yPos).strokeColor(color).lineWidth(0.5).stroke();
  }

  function tableRow(col1, col2, col3, yPos, isHeader = false) {
    const font  = isHeader ? "Helvetica-Bold" : "Helvetica";
    const color = isHeader ? WHITE : DARK;
    const bgY   = yPos - 5;

    if (isHeader) {
      doc.rect(LEFT, bgY, W, 22).fill(ORANGE);
    }

    doc
      .font(font).fontSize(9).fillColor(color)
      .text(col1, LEFT + 8,       yPos, { width: W * 0.55 })
      .text(col2, LEFT + W * 0.6, yPos, { width: W * 0.2, align: "right" })
      .text(col3, LEFT + W * 0.82,yPos, { width: W * 0.18, align: "right" });
  }

  // ── computed values ───────────────────────────────────────────────────────────

  const basePrice   = Number(booking.bookingMarkedPrice || 0);
  const addonsTotal = (booking.addons || []).reduce((s, a) => s + Number(a.price || 0), 0);
  const discount    = Number(booking.discount || 0);
  const grandTotal  = Math.max(basePrice + addonsTotal - discount, 0);

  const packageName = booking.productId?.name || "Grooming Package";
  const customerName =
    booking.userId?.name || booking.userId?.fullName || "Valued Customer";
  const bookingDate = new Date(booking.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const completedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 1 — HEADER BAR
  // ════════════════════════════════════════════════════════════════════════════

  // orange top bar
  doc.rect(0, 0, doc.page.width, 8).fill(ORANGE);

  y = 28;

  // brand name
  doc.font("Helvetica-Bold").fontSize(22).fillColor(ORANGE).text("Petlinc", LEFT, y);
  doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY).text("Professional Pet Grooming", LEFT, y + 26);

  // INVOICE label + number (top-right)
  doc.font("Helvetica-Bold").fontSize(20).fillColor(DARK)
    .text("INVOICE", 0, y, { align: "right", width: doc.page.width - LEFT });
  doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY)
    .text(invoiceNo(booking), 0, y + 26, { align: "right", width: doc.page.width - LEFT });

  y = 80;
  hline(y);

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 2 — BILLED TO  /  BOOKING DETAILS (two columns)
  // ════════════════════════════════════════════════════════════════════════════

  y = 90;
  const colR = LEFT + W * 0.55; // start of right column

  // left column — Billed To
  doc.font("Helvetica-Bold").fontSize(8).fillColor(ORANGE)
    .text("BILLED TO", LEFT, y);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK)
    .text(customerName, LEFT, y + 13);
  doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY)
    .text(booking.mobile || "", LEFT, y + 27)
    .text(booking.address || "", LEFT, y + 41, { width: W * 0.48 });

  // right column — Booking info
  doc.font("Helvetica-Bold").fontSize(8).fillColor(ORANGE)
    .text("BOOKING DETAILS", colR, y);

  const details = [
    ["Invoice No",    invoiceNo(booking)],
    ["Booking Date",  bookingDate],
    ["Completed On",  completedDate],
    ["Time Slot",     booking.timeSlot || "—"],
    ["Status",        "COMPLETED"],
  ];

  details.forEach(([label, value], i) => {
    const dy = y + 13 + i * 14;
    doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY).text(label + ":", colR, dy);
    doc
      .font(label === "Status" ? "Helvetica-Bold" : "Helvetica")
      .fontSize(9)
      .fillColor(label === "Status" ? GREEN : DARK)
      .text(value, colR + 85, dy);
  });

  y = y + 13 + details.length * 14 + 16;
  hline(y);

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 3 — PET INFO
  // ════════════════════════════════════════════════════════════════════════════

  y += 12;
  doc.font("Helvetica-Bold").fontSize(8).fillColor(ORANGE).text("PET INFORMATION", LEFT, y);
  y += 13;

  doc.rect(LEFT, y - 4, W, 22).fill(LIGHT_GRAY);

  const petFields = [
    ["Name",      booking.petName || "—"],
    ["Type",      booking.petType || "—"],
    ["Breed",     booking.breed   || "—"],
    ["Age",       booking.age     || "—"],
    ["Weight",    booking.weight ? `${booking.weight} kg` : "—"],
  ];

  const colW = W / petFields.length;
  petFields.forEach(([label, value], i) => {
    const x = LEFT + i * colW;
    doc.font("Helvetica").fontSize(7.5).fillColor(MID_GRAY).text(label, x + 6, y - 2);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK).text(value, x + 6, y + 8);
  });

  y += 26;
  hline(y);

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 4 — LINE ITEMS TABLE
  // ════════════════════════════════════════════════════════════════════════════

  y += 12;
  doc.font("Helvetica-Bold").fontSize(8).fillColor(ORANGE).text("SERVICES & ADD-ONS", LEFT, y);
  y += 13;

  // table header
  tableRow("Description", "Unit Price", "Amount", y, true);
  y += 22;

  // base package row
  const evenBg = () => { doc.rect(LEFT, y - 4, W, 20).fill("#FFF7ED"); };
  evenBg();
  tableRow(packageName, `Rs.${basePrice}`, `Rs.${basePrice}`, y);
  y += 20;

  // addons
  (booking.addons || []).forEach((addon, i) => {
    if (i % 2 === 0) { doc.rect(LEFT, y - 4, W, 20).fill(LIGHT_GRAY); }
    tableRow(addon.name || "Add-on", `Rs.${addon.price}`, `Rs.${addon.price}`, y);
    y += 20;
  });

  hline(y + 2, "#D1D5DB");
  y += 14;

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 5 — TOTALS
  // ════════════════════════════════════════════════════════════════════════════

  const totalX     = LEFT + W * 0.58;
  const totalValX  = LEFT + W * 0.82;
  const totalWidth = W * 0.18;

  function totalLine(label, value, bold = false, color = DARK) {
    doc
      .font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(9)
      .fillColor(bold ? color : MID_GRAY)
      .text(label, totalX, y, { width: W * 0.22 });
    doc
      .font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(9)
      .fillColor(color)
      .text(value, totalValX, y, { width: totalWidth, align: "right" });
    y += 16;
  }

  totalLine("Subtotal",  `Rs.${basePrice + addonsTotal}`);
  if (discount > 0) {
    totalLine(
      `Discount${booking.coupon ? ` (${booking.coupon})` : ""}`,
      `-Rs.${discount}`,
      false,
      GREEN
    );
  }

  // grand total box
  doc.rect(totalX - 6, y - 4, W - (totalX - LEFT) + 6, 26).fill(ORANGE);
  doc
    .font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
    .text("TOTAL PAID", totalX, y + 3, { width: W * 0.22 });
  doc
    .font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
    .text(`Rs.${grandTotal}`, totalValX, y + 3, { width: totalWidth, align: "right" });
  y += 34;

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 6 — NOTES / FOOTER
  // ════════════════════════════════════════════════════════════════════════════

  y += 10;
  hline(y);
  y += 12;

  if (booking.notes) {
    doc.font("Helvetica-Bold").fontSize(8).fillColor(ORANGE).text("NOTES", LEFT, y);
    y += 12;
    doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY)
      .text(booking.notes, LEFT, y, { width: W });
    y += doc.heightOfString(booking.notes, { width: W }) + 14;
  }

  // footer band
  const footerY = doc.page.height - 40;
  doc.rect(0, footerY, doc.page.width, 40).fill(LIGHT_GRAY);
  doc
    .font("Helvetica").fontSize(8).fillColor(MID_GRAY)
    .text(
      "Thank you for choosing Petlinc! For any queries contact us at support@petlinc.in",
      0, footerY + 8, { align: "center", width: doc.page.width }
    )
    .text(
      "This is a computer-generated invoice and does not require a signature.",
      0, footerY + 22, { align: "center", width: doc.page.width }
    );

  // orange bottom bar
  doc.rect(0, doc.page.height - 6, doc.page.width, 6).fill(ORANGE);

  doc.end();
}

// ── util ─────────────────────────────────────────────────────────────────────

function invoiceNo(booking) {
  return `INV-${String(booking._id).slice(-8).toUpperCase()}`;
}

module.exports = generateInvoice;

/**
 * generateInvoice.js
 * ───────────────────────────────────────────────────────────────────────────
 * Streams a polished A4 PDF invoice into an Express response using PDFKit.
 *
 * Install:  npm install pdfkit
 *
 * Usage in controller:
 *   const generateInvoice = require('../utils/generateInvoice');
 *   generateInvoice(res, booking, invoiceNumber);
 *
 * `booking` must be populated:  .populate('addons productId userId')
 */

// const PDFDocument = require("pdfkit");
// const path        = require("path");

// // ── Brand colours ─────────────────────────────────────────────────────────────
// const ORANGE       = "#F59E0B";
// const DARK         = "#1F2937";
// const MID_GRAY     = "#6B7280";
// const LIGHT_BG     = "#FFF7ED";
// const LIGHTER_BG   = "#F9FAFB";
// const WHITE        = "#FFFFFF";
// const GREEN        = "#16A34A";
// const GREEN_BG     = "#F0FDF4";
// const BORDER       = "#E5E7EB";
// const ORANGE_BORDER= "#FED7AA";

// // Adjust this path to wherever you store the logo on your server
// // const LOGO_PATH = path.join(__dirname, "../public/PetlincLogo.png");
// // const LOGO_PATH = "https://www.petlinc.in/"
// // ── A4 geometry ───────────────────────────────────────────────────────────────
// const PAGE_W = 595.28;
// const PAGE_H = 841.89;
// const MARGIN  = 42;
// const USE_W   = PAGE_W - MARGIN * 2;

// // ── Helpers ────────────────────────────────────────────────────────────────────

// function fmt(n) {
//   return `Rs. ${Number(n || 0).toLocaleString("en-IN")}`;
// }

// function formatDate(dateStr) {
//   return new Date(dateStr).toLocaleDateString("en-IN", {
//     day: "numeric", month: "long", year: "numeric",
//   });
// }

// function roundRect(doc, x, y, w, h, r, fillColor, strokeColor) {
//   doc.save()
//     .roundedRect(x, y, w, h, r)
//     .fillAndStroke(fillColor, strokeColor || fillColor)
//     .restore();
// }

// function hRule(doc, y, color = BORDER) {
//   doc.save()
//     .moveTo(MARGIN, y).lineTo(MARGIN + USE_W, y)
//     .strokeColor(color).lineWidth(0.5).stroke()
//     .restore();
// }

// function sectionHeader(doc, text, y) {
//   roundRect(doc, MARGIN, y, USE_W, 18, 3, ORANGE, ORANGE);
//   doc.font("Helvetica-Bold").fontSize(8).fillColor(WHITE)
//     .text(text, MARGIN + 8, y + 5, { width: USE_W - 16, lineBreak: false });
//   return y + 18 + 6;
// }

// function kvRow(doc, label, value, x, y, labelW = 90, maxW) {
//   const valW = maxW || (USE_W / 2 - labelW - 10);
//   doc.font("Helvetica").fontSize(8).fillColor(MID_GRAY)
//     .text(label, x, y, { width: labelW, lineBreak: false });
//   doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK)
//     .text(String(value || "—"), x + labelW, y, { width: valW, lineBreak: false });
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // MAIN EXPORT
// // ═══════════════════════════════════════════════════════════════════════════════

// function generateInvoice(res, booking, invoiceNumber) {
//   const doc = new PDFDocument({
//     size: "A4",
//     margin: 0,
//     bufferPages: true,
//     info: {
//       Title:   `Petlinc Invoice ${invoiceNumber}`,
//       Author:  "Petlinc",
//       Subject: "Grooming Service Invoice",
//     },
//   });

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename="petlinc-${invoiceNumber}.pdf"`
//   );
//   doc.pipe(res);

//   // ── Computed values ──────────────────────────────────────────────────────────
//   const basePrice   = Number(booking.bookingMarkedPrice || 0);
//   const addonsTotal = (booking.addons || []).reduce((s, a) => s + Number(a.price || 0), 0);
//   const discount    = Number(booking.discount || 0);
//   const grandTotal  = Math.max(basePrice + addonsTotal - discount, 0);

//   const packageName  = booking.productId?.name || "Grooming Package";
//   const customerName = booking.userId?.name || booking.userId?.fullName || "Valued Customer";
//   const bookingDate  = formatDate(booking.date);
//   const completedOn  = new Date().toLocaleDateString("en-IN", {
//     day: "numeric", month: "long", year: "numeric",
//   });

//   const aggressionLabel =
//     booking.aggression === "1" ? "Low" :
//     booking.aggression === "2" ? "Medium" :
//     booking.aggression === "3" ? "High" :
//     booking.aggression || "—";

//   let y = 0;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // TOP ORANGE BAR
//   // ══════════════════════════════════════════════════════════════════════════════
//   doc.rect(0, 0, PAGE_W, 8).fill(ORANGE);
//   y = 20;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // HEADER — Logo | Invoice number
//   // ══════════════════════════════════════════════════════════════════════════════
//   const logoW = 148;
//   const logoH = logoW * (530 / 2000);
//   try {
//     doc.image(LOGO_PATH, MARGIN, y, { width: logoW });
//   } catch (_) {
//     doc.font("Helvetica-Bold").fontSize(24).fillColor(ORANGE)
//       .text("PETLINC", MARGIN, y + 4);
//   }

//   // Right side — invoice label + number + date + status
//   doc.font("Helvetica-Bold").fontSize(10).fillColor(MID_GRAY)
//     .text("INVOICE", MARGIN, y + 2, { align: "right", width: USE_W });
//   doc.font("Helvetica-Bold").fontSize(21).fillColor(DARK)
//     .text(invoiceNumber, MARGIN, y + 14, { align: "right", width: USE_W });
//   doc.font("Helvetica").fontSize(8).fillColor(MID_GRAY)
//     .text(`Date Issued: ${completedOn}`, MARGIN, y + 39, { align: "right", width: USE_W });

//   // Status pill
//   const pillW = 108;
//   const pillX = PAGE_W - MARGIN - pillW;
//   const pillY = y + 51;
//   roundRect(doc, pillX, pillY, pillW, 16, 4, GREEN_BG, GREEN);
//   doc.font("Helvetica-Bold").fontSize(8).fillColor(GREEN)
//     .text("PAID & COMPLETED", pillX, pillY + 4, { width: pillW, align: "center", lineBreak: false });

//   y = y + Math.max(logoH, 70) + 12;
//   hRule(doc, y, ORANGE);
//   y += 14;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // BILLED TO  |  APPOINTMENT DETAILS
//   // ══════════════════════════════════════════════════════════════════════════════
//   const CARD_W = USE_W / 2 - 5;
//   const CARD_H = 74;
//   const rightX = MARGIN + CARD_W + 10;

//   // Left card — Billed To
//   roundRect(doc, MARGIN, y, CARD_W, CARD_H, 4, WHITE, BORDER);
//   // orange header strip
//   doc.save().roundedRect(MARGIN, y, CARD_W, 16, 4).fill(ORANGE);
//   doc.rect(MARGIN, y + 8, CARD_W, 8).fill(ORANGE).restore();
//   doc.font("Helvetica-Bold").fontSize(7.5).fillColor(WHITE)
//     .text("BILLED TO", MARGIN + 8, y + 5, { lineBreak: false });

//   let cy = y + 22;
//   kvRow(doc, "Customer", customerName, MARGIN + 8, cy, 58, CARD_W - 24); cy += 14;
//   kvRow(doc, "Mobile",   booking.mobile || "—", MARGIN + 8, cy, 58, CARD_W - 24); cy += 14;
//   kvRow(doc, "Address",  booking.address || "—", MARGIN + 8, cy, 58, CARD_W - 24);

//   // Right card — Appointment
//   roundRect(doc, rightX, y, CARD_W, CARD_H, 4, WHITE, BORDER);
//   doc.save().roundedRect(rightX, y, CARD_W, 16, 4).fill(ORANGE);
//   doc.rect(rightX, y + 8, CARD_W, 8).fill(ORANGE).restore();
//   doc.font("Helvetica-Bold").fontSize(7.5).fillColor(WHITE)
//     .text("APPOINTMENT", rightX + 8, y + 5, { lineBreak: false });

//   cy = y + 22;
//   kvRow(doc, "Date",      bookingDate,               rightX + 8, cy, 66, CARD_W - 24); cy += 14;
//   kvRow(doc, "Time Slot", booking.timeSlot || "—",   rightX + 8, cy, 66, CARD_W - 24); cy += 14;
//   kvRow(doc, "Completed", completedOn,               rightX + 8, cy, 66, CARD_W - 24);

//   y += CARD_H + 16;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // PET INFORMATION
//   // ══════════════════════════════════════════════════════════════════════════════
//   y = sectionHeader(doc, "PET INFORMATION", y);

//   const petFields = [
//     { label: "Name",      value: booking.petName  || "—" },
//     { label: "Type",      value: booking.petType  || "—" },
//     { label: "Breed",     value: booking.breed    || "—" },
//     { label: "Age",       value: booking.age ? `${booking.age} yrs` : "—" },
//     { label: "Weight",    value: booking.weight ? `${booking.weight} kg` : "—" },
//     { label: "Behaviour", value: aggressionLabel },
//   ];
//   const petColW = USE_W / petFields.length;

//   roundRect(doc, MARGIN, y, USE_W, 36, 3, LIGHT_BG, ORANGE_BORDER);
//   petFields.forEach((f, i) => {
//     const px = MARGIN + i * petColW;
//     if (i > 0) {
//       doc.save().moveTo(px, y + 5).lineTo(px, y + 31)
//         .strokeColor(ORANGE_BORDER).lineWidth(0.4).stroke().restore();
//     }
//     doc.font("Helvetica").fontSize(7.5).fillColor(MID_GRAY)
//       .text(f.label, px + 6, y + 7, { width: petColW - 8, lineBreak: false });
//     doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK)
//       .text(f.value, px + 6, y + 19, { width: petColW - 8, lineBreak: false });
//   });

//   y += 36 + 14;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // SERVICES TABLE
//   // ══════════════════════════════════════════════════════════════════════════════
//   y = sectionHeader(doc, "SERVICES & ADD-ONS", y);

//   const COL_NUM   = 22;
//   const COL_PRICE = 72;
//   const COL_DESC  = USE_W - COL_NUM - COL_PRICE;
//   const ROW_H     = 26;

//   // Header row
//   roundRect(doc, MARGIN, y, USE_W, ROW_H, 0, ORANGE, ORANGE);
//   doc.font("Helvetica-Bold").fontSize(9).fillColor(WHITE);
//   doc.text("#",           MARGIN + 6,                          y + 9, { width: COL_NUM,        lineBreak: false });
//   doc.text("Description", MARGIN + COL_NUM + 6,                y + 9, { width: COL_DESC - 12,  lineBreak: false });
//   doc.text("Amount",      MARGIN + COL_NUM + COL_DESC,         y + 9, { width: COL_PRICE - 6,  align: "right", lineBreak: false });
//   y += ROW_H;

//   const lineItems = [
//     { desc: packageName, price: basePrice },
//     ...(booking.addons || []).map((a) => ({ desc: a.name || "Add-on", price: a.price })),
//   ];

//   lineItems.forEach((item, idx) => {
//     const bg = idx % 2 === 0 ? WHITE : LIGHTER_BG;
//     doc.rect(MARGIN, y, USE_W, ROW_H).fill(bg);

//     doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY)
//       .text(String(idx + 1), MARGIN + 6, y + 9, { width: COL_NUM, lineBreak: false });
//     doc.font(idx === 0 ? "Helvetica-Bold" : "Helvetica").fontSize(9).fillColor(DARK)
//       .text(item.desc, MARGIN + COL_NUM + 6, y + 9, { width: COL_DESC - 12, lineBreak: false });
//     doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK)
//       .text(fmt(item.price), MARGIN + COL_NUM + COL_DESC, y + 9,
//             { width: COL_PRICE - 6, align: "right", lineBreak: false });

//     doc.save().moveTo(MARGIN, y + ROW_H).lineTo(MARGIN + USE_W, y + ROW_H)
//       .strokeColor(BORDER).lineWidth(0.3).stroke().restore();
//     y += ROW_H;
//   });

//   // Outer border for whole table
//   const tableTop = y - (lineItems.length + 1) * ROW_H;
//   doc.rect(MARGIN, tableTop, USE_W, (lineItems.length + 1) * ROW_H)
//     .stroke(BORDER);

//   y += 14;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // TOTALS BLOCK
//   // ══════════════════════════════════════════════════════════════════════════════
//   const TOTAL_W  = 168;
//   const TOTAL_X  = MARGIN + USE_W - TOTAL_W;
//   const TR_H     = 22;

//   // Subtotal
//   roundRect(doc, TOTAL_X, y, TOTAL_W, TR_H, 0, LIGHTER_BG, BORDER);
//   doc.font("Helvetica").fontSize(9).fillColor(MID_GRAY)
//     .text("Subtotal", TOTAL_X + 10, y + 7, { lineBreak: false });
//   doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK)
//     .text(fmt(basePrice + addonsTotal), TOTAL_X, y + 7,
//           { width: TOTAL_W - 10, align: "right", lineBreak: false });
//   y += TR_H;

//   // Discount row
//   if (discount > 0) {
//     roundRect(doc, TOTAL_X, y, TOTAL_W, TR_H, 0, GREEN_BG, GREEN);
//     const discLabel = booking.coupon ? `Discount (${booking.coupon})` : "Discount";
//     doc.font("Helvetica").fontSize(9).fillColor(GREEN)
//       .text(discLabel, TOTAL_X + 10, y + 7, { lineBreak: false });
//     doc.font("Helvetica-Bold").fontSize(9).fillColor(GREEN)
//       .text(`- ${fmt(discount)}`, TOTAL_X, y + 7,
//             { width: TOTAL_W - 10, align: "right", lineBreak: false });
//     y += TR_H;
//   }

//   // Grand total
//   roundRect(doc, TOTAL_X, y, TOTAL_W, TR_H + 4, 4, ORANGE, ORANGE);
//   doc.font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
//     .text("TOTAL PAID", TOTAL_X + 10, y + 8, { lineBreak: false });
//   doc.font("Helvetica-Bold").fontSize(11).fillColor(WHITE)
//     .text(fmt(grandTotal), TOTAL_X, y + 8,
//           { width: TOTAL_W - 10, align: "right", lineBreak: false });
//   y += TR_H + 4 + 18;

//   // ══════════════════════════════════════════════════════════════════════════════
//   // NOTES
//   // ══════════════════════════════════════════════════════════════════════════════
//   if (booking.notes) {
//     y = sectionHeader(doc, "NOTES", y);
//     const noteH = doc.heightOfString(booking.notes, { width: USE_W - 24 }) + 16;
//     roundRect(doc, MARGIN, y, USE_W, noteH, 3, LIGHT_BG, ORANGE_BORDER);
//     doc.font("Helvetica").fontSize(9).fillColor(DARK)
//       .text(booking.notes, MARGIN + 12, y + 8, { width: USE_W - 24 });
//     y += noteH + 16;
//   }

//   // ══════════════════════════════════════════════════════════════════════════════
//   // THANK YOU
//   // ══════════════════════════════════════════════════════════════════════════════
//   hRule(doc, y);
//   y += 14;
//   doc.font("Helvetica-Bold").fontSize(11).fillColor(ORANGE)
//     .text("Thank you for choosing Petlinc!", MARGIN, y, { align: "center", width: USE_W });
//   y += 18;
//   doc.font("Helvetica").fontSize(8).fillColor(MID_GRAY)
//     .text(
//       "This is a system-generated invoice and does not require a physical signature.\nFor any queries, reach us at support@petlinc.in",
//       MARGIN, y, { align: "center", width: USE_W }
//     );

//   // ══════════════════════════════════════════════════════════════════════════════
//   // BOTTOM FOOTER BAR
//   // ══════════════════════════════════════════════════════════════════════════════
//   doc.rect(0, PAGE_H - 28, PAGE_W, 28).fill(DARK);
//   doc.font("Helvetica").fontSize(8).fillColor(WHITE)
//     .text(
//       "Petlinc  |  support@petlinc.in  |  Connecting Pets With Care",
//       0, PAGE_H - 16, { align: "center", width: PAGE_W }
//     );

//   doc.end();
// }

// module.exports = generateInvoice;