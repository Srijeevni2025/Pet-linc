const AddOn = require("../models/addonModel");
const catchAsync = require("../utils/catchAsync");
const Booking = require('./../models/bookingModel')


exports.createNewBooking = catchAsync(async(req, res, next)=>{
    const {petName, type:petType, breed, age, weight, notes, address, date, timeSlot, addons} = req.body;
    
    
    const userId = req.user._id;

    const productId = req.body.productId;
    const booking = await Booking.create({userId, productId, petName, petType, breed, age, weight, notes, address, date, timeSlot, addons});

    res.status(200).json({
        status:"success",
        data:booking
    })
})

exports.getAllBookings = catchAsync(async(req, res, next)=>{
    const userId = req.user._id;
    
    const bookings = await Booking.find({userId:userId}).populate('addons productId');
    res.status(200).json({
        status:"success",
        data:bookings
    })
})

exports.getAllBookingsForDashboard = catchAsync(async(req, res, next)=>{
   
    
    const bookings = await Booking.find().select(-'password').populate('addons productId userId');
    res.status(200).json({
        status:"success",
        data:bookings
    })
})