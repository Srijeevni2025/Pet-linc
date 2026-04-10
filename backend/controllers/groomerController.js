const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Groomer = require('./../models/groomerModel');

exports.registerGroomer = catchAsync(async(req, res, next)=>{
   
    const groomer = await Groomer.create(req.body.data);
    
    if(!groomer){
        return next(new appError(404, "Couldn't add new groomer to database"));
    }

    res.status(201).json({
        status:"success",
        data:groomer
    })
})


exports.getAllGroomers = catchAsync(async(req, res, next)=>{
    const groomers = await Groomer.find();
    res.status(200).json({
        status:"success",
        data:groomers
    })
})


exports.changeAvailability = catchAsync(async(req, res, next)=>{
const { date, unblock } = req.body;

  if (!date) return res.status(400).json({ message: "date is required" });

  const groomer = await Groomer.findById(req.params.id);
  if (!groomer) return res.status(404).json({ message: "Groomer not found" });

  if (unblock) {
    groomer.unavailableDates = (groomer.unavailableDates || []).filter(d => d !== date);
  } else {
    if (!groomer.unavailableDates) groomer.unavailableDates = [];
    if (!groomer.unavailableDates.includes(date)) {
      groomer.unavailableDates.push(date);
    }
  }

  await groomer.save();
  res.json({ success: true, data: groomer });
})