const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const GroomingCenter = require("./../models/groomingCenterModel");


exports.createGroomingCenter = catchAsync(async(req, res, next)=>{
    const {name, email, address, about, city, rating} = req.body;
    const groomer = await GroomingCenter.create({name, email, address, about, city, rating});
    if(!groomer){
        return next(new appError(404, "Groomer could not be added."));
    }

    res.status(200).json({
        status:"success",
        data:groomer
    })
})

exports.getAllGroomers = catchAsync(async(req, res, next)=>{
    const groomers = await GroomingCenter.find();
    res.status(200).json({
        status:"success",
        data:groomers
    })
})

exports.getOneGroomer = catchAsync(async(req, res, next)=>{
    const id = req.params.id;
    const groomer = await GroomingCenter.findById({_id:id});
    if(!groomer){
        return next(new appError(404, "No groomer found with given id"));
    }
    res.status(200).json({
        status:"success",
        data:groomer
    })

})