const Coupans = require('../models/coupanModel');
const AddOn = require('./../models/addonModel')
const catchAsync = require('./../utils/catchAsync')

exports.createAddon = catchAsync(async(req, res, next)=>{
    const {id, name, price, city} = req.body;
    
    const addon = await AddOn.create({id, name, price, city});
    res.status(200).json({
        status:"success",
        data:addon
    })

})

exports.getAllAddons = catchAsync(async(req, res, next)=>{
    const currentCity = req.params?.city;
    let addons = await AddOn.find({city:currentCity});
    const coupans = await Coupans.find();
    
    res.status(200).json({
        status:"success",
        data:addons,
        coupans
    })
})