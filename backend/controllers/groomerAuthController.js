const jwt = require("jsonwebtoken");
const Groomer = require("../models/groomerModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

const signToken = (id) =>
  jwt.sign({ id, role: "groomer" }, process.env.JWT_SECRET, { expiresIn: "30d" });

// POST /api/v1/groomers/login
exports.groomerLogin = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password)
    return next(new appError(400, "Phone and password are required"));

  const groomer = await Groomer.findOne({ phone }).select("+password");

  if (!groomer || !(await groomer.checkPassword(password, groomer.password)))
    return next(new appError(401, "Invalid phone or password"));

  if (!groomer.isActive)
    return next(new appError(403, "Account deactivated. Contact admin."));

  const token = signToken(groomer._id);
  groomer.password = undefined;

  res.status(200).json({ status: "success", token, groomer });
});

// Middleware to protect groomer routes
exports.protectGroomer = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookiesToken = req.cookies?.jwt;

  if (!authHeader && !cookiesToken)
    return next(new appError(401, "You are not logged in"));

  if (!authHeader || !authHeader.startsWith("Bearer"))
    return next(new appError(401, "You are not logged in"));

  const token = cookiesToken || authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "groomer")
    return next(new appError(403, "Not authorized as groomer"));

  const groomer = await Groomer.findById(decoded.id);
  if (!groomer) return next(new appError(401, "Groomer no longer exists"));

  req.groomer = groomer;
  next();
});