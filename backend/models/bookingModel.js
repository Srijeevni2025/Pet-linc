const mongoose = require('mongoose');
const AddOn = require('./addonModel');
const Packages = require('./packageModel')
const User = require('./userModel');
const { type } = require('os');

const bookingSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'Packages'
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
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
    mobile:{
        type:String,
    },
    aggression:String,
    address:{
        type:String
    },
    pincode:{
        type:String
    },
    lat:String,
    lng:String,
    date:{
        type:Date
    },
    timeSlot:{
        type:String
    },
    addons:[{
        type:mongoose.Schema.ObjectId,
        ref:AddOn,
    }],
    coupan:String,
    discount:Number,
    bookingMarkedPrice:String,
    status:String,
    city:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    assignedGroomer:{
        type:String,
        
    },
    isRead:{
        type:Boolean,
        default:false
    },
    groomerAccepted:{
        type:Boolean,
        default:false
    },
    statusHistory:[{
        status:String,
        changedAt:{type:Date, default:Date.now},
        changedBy:String
    }],
        // ── PARTNER BOOKING FIELDS ──────────────────────────────
        bookedByPartner: {
            type: Boolean,
            default: false
        },
        partnerId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Partner',
            default: null
        },
        // 15% of bookingMarkedPrice, computed at booking creation time
        partnerIncentive: {
            type: Number,
            default: 0
        },
        // Track payout status for this booking's incentive
        incentivePaid: {
            type: Boolean,
            default: false
        }
        // ───────────────────────────────────────────────────────
})


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;