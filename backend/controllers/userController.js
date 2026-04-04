const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

exports.getMe = catchAsync(async(req, res, next)=>{
    res.status(200).json({
        status:"success",
        user:{
              name:req.user.name,
              email:req.user.email,
              role: req.user.role
            }
    })
})

exports.getAllUsers = catchAsync(async(req, res, next)=>{
    const users = await User.find().select("-password");
    res.status(200).json({
        status:"success",
        data:users
    })
});