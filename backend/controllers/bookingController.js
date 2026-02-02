
const Package = require('./../models/packageModel')
const AddOn = require("../models/addonModel");
const catchAsync = require("../utils/catchAsync");
const Booking = require('./../models/bookingModel');
const appError = require('../utils/appError');


exports.createNewBooking = catchAsync(async(req, res, next)=>{
    let {petName, type:petType, breed, age, weight, notes, address, lat, lng, date, timeSlot, addons, coupan, couponId, discount, mobile, aggression } = req.body;
    lat = lat*1;
    lng = lng*1;
    
    const userId = req.user._id;

    const productId = req.body.productId;
    const bookingMarkedPrice = await Package.findById({_id:productId}).select('price');
    const booking = await Booking.create({userId, productId, petName, mobile, aggression, petType, breed, age, weight, notes, address, lat, lng, date, timeSlot, addons, coupan, discount,bookingMarkedPrice: bookingMarkedPrice.price});
    
    res.status(200).json({
        status:"success",
        data:booking
    })
})

// this controller function updates status of the booking from admin panel.
exports.changeStatus = catchAsync(async(req, res, next)=>{
    const booking_id = req?.params?.id;
    
    const booking = await Booking.findByIdAndUpdate(booking_id, {status:req.body.status})
    if(!booking){
        return next(new appError(400, "Unable to update. Something went wrong."))
    }
    res.status(200).json({
        status:"success"
    })
})

exports.changeReadStatus = catchAsync(async(req, res, next)=>{
    const booking_id = req?.params?.id;
    
    const booking = await Booking.findByIdAndUpdate(booking_id, {isRead:true})
    if(!booking){
        return next(new appError(400, "Unable to update. Something went wrong."))
    }
    res.status(200).json({
        status:"success"
    })
})


exports.assignGroomer = catchAsync(async(req, res, next)=>{
    const booking_id = req?.params?.id;
    if(process.env.ENV === 'development'){
        console.log(booking_id)
    }
    const booking = await Booking.findByIdAndUpdate(booking_id, {assignedGroomer:req.body.groomerId})

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



