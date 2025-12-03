const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");

exports.createReview = catchAsync(async(req, res, next)=>{
    
    const userId = req.user.id;
    const {review, rating} = req.body;

    const newReview = await Review.create({userId, review, rating})
 

    res.status(200).json({
        status:"success",
        data:newReview
    })
})

exports.getAllReviews = catchAsync(async(req, res, next)=>{
    const reviews = await Review.find();
    res.status(200).json({
        status:"success",
        data:reviews
    })
})