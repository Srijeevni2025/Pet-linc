const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Packages = require('./../models/packageModel');

exports.createPackage = catchAsync(async(req, res, next)=>{
    const {name, city, price, emoji, tag, features, freeServices} = req.body;
    
    const package = await Packages.create({name, city, price, emoji, tag, features, freeServices});
    if(!package){
        return next(new appError(401, "package could not be created."));
    }

    res.status(200).json({
        status:"success",
        data:package
    })
})

exports.getAllPackages = catchAsync(async(req, res, next)=>{
    const searchCity = req.params?.city;
    const packages = await Packages.find({city:searchCity});
    
    res.status(200).json({
        status:"success",
        data:packages
    })
})