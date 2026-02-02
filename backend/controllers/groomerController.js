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

