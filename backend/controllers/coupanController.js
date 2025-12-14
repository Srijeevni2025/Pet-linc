const catchAsync = require('../utils/catchAsync');
const Coupan = require('./../models/coupanModel');

exports.createCoupan = catchAsync(async(req, res, next)=>{
    const {coupan, percent} = req.body;
    const newCoupan = await Coupan.create({coupan, percent});
    res.status(200).json({
        status: "success",
        data:newCoupan
    })
})

exports.getAllCoupans = catchAsync(async(req, res, next)=>{
    const coupans = await Coupan.find();
    res.status(200).json({
        status:"success",
        data:coupans
    })
})