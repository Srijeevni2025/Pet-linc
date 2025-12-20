const Coupans = require('../models/coupanModel');
const AddOn = require('./../models/addonModel')
const catchAsync = require('./../utils/catchAsync')

exports.createAddon = catchAsync(async(req, res, next)=>{
    const {id, name, price} = req.body;
    const addon = await AddOn.create({id, name, price});
    res.status(200).json({
        status:"success",
        data:addon
    })

})

exports.getAllAddons = catchAsync(async(req, res, next)=>{
    let addons = await AddOn.find();
    const coupans = await Coupans.find();
    
    res.status(200).json({
        status:"success",
        data:addons,
        coupans
    })
})