
const Package = require('./../models/packageModel')
const AddOn = require("../models/addonModel");
const catchAsync = require("../utils/catchAsync");
const Booking = require('./../models/bookingModel');
const appError = require('../utils/appError');


exports.createNewBooking = catchAsync(async(req, res, next)=>{
    let {petName, type:petType, breed, age, weight, notes, address, pincode, lat, city, lng, date, timeSlot, addons, coupan, couponId, discount, mobile, aggression } = req.body;
    lat = lat*1;
    lng = lng*1;
    
    const userId = req.user._id;

    const productId = req.body.productId;
    const bookingMarkedPrice = await Package.findById({_id:productId}).select('price');
    const booking = await Booking.create({userId, productId, petName, mobile, aggression, petType, breed, age, weight, notes, address, pincode, city, lat, lng, date, timeSlot, addons, coupan, discount,bookingMarkedPrice: bookingMarkedPrice.price});
    
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

    const oldBooking = await Booking.findById(booking_id);
  const oldGroomerId = oldBooking?.assignedGroomer?.toString();
   
    if(process.env.ENV === 'development'){
        console.log(booking_id)
    }
    const booking = await Booking.findByIdAndUpdate(booking_id, {assignedGroomer:req.body.groomerId, groomerAccepted:false})
   
    const io = req.app.get('io');
    const connectedGroomers = req.app.get('connectedGroomers');
        // ✅ Notify OLD groomer to remove booking from their list
  if (oldGroomerId && oldGroomerId !== req.body.groomerId) {
    const oldGroomerSocketId = connectedGroomers[oldGroomerId];
    if (oldGroomerSocketId) {
      io.to(oldGroomerSocketId).emit('booking_removed', {
        bookingId: booking_id,
      });
      console.log('✅ Notified old groomer to remove booking');
    }
  }

    const groomerSocketId = connectedGroomers[req.body.groomerId];
    if(groomerSocketId){
        io.to(groomerSocketId).emit('new_booking',{
      booking,
      message: 'You have a new booking assigned!',
    });
    console.log(`Notified groomer ${req.body.groomerId}`);
  } else {
    console.log(`Groomer ${req.body.groomerId} is not connected`);
  } 
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


// counting bookings per slot for a particular date. This is used in the admin panel to show how many bookings are there for a particular slot.

exports.getSlotAvailability = catchAsync(async(req, res, next)=>{
     const {date} = req.query;
     console.log(date)
     const start = new Date(date);
     start.setHours(0, 0, 0, 0);
     const end = new Date(date);
     end.setHours(23, 59, 59, 999);
        const bookings = await Booking.find({
            date:{$gte:start, $lte:end}, 
            status:{$nin:["cancelled by user", "cancelled"]}
                    }).select('timeSlot');   
        const slotCount = {};
        bookings.forEach(booking => {
            slotCount[booking.timeSlot] = (slotCount[booking.timeSlot] || 0) + 1;
        });     

        res.status(200).json({
            status:"success",
            data:slotCount
        })
    });





