const catchAsync = require("../utils/catchAsync");
const User = require("./../models/reviewModel");

exports.getMe = catchAsync(async(req, res, next)=>{
    res.status(200).json({
        status:"success",
        user:{
              name:req.user.name,
              email:req.user.email
            }
    })
})