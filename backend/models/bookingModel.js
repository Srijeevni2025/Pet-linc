const mongoose = require('mongoose');
const AddOn = require('./addonModel');
const Packages = require('./packageModel')

const bookingSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'Packages'
    },
    userId:mongoose.Schema.ObjectId,
    petName:{
        type:String,
        required:[true, "A pet name must be there."]
    },
    petType:{
        type:String,
    },
    breed:{
        type:String,
    },
    age:{
        type:Number,
    },
    weight:{
        type:Number
    },
    notes:{
        type:String,
    },
    address:{
        type:String
    },
    date:{
        type:Date
    },
    timeSlot:{
        type:String
    },
    addons:[{
        type:mongoose.Schema.ObjectId,
        ref:AddOn,
    }]
})


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;