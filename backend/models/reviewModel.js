const mongoose = require("mongoose");
const User = require("./../models/userModel");
const { schema } = require("../models/userModel");

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:User
    },
    review:{
        type:String
    },
    rating:{
        type:Number
    }
})

reviewSchema.pre('find', function(next){
    this.populate('userId')
    
    next();
})
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;