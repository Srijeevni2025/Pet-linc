const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
  
const groomerSchema = new mongoose.Schema({
    logo:String,
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Please provide with email id."],
        validate:{
            validator:isEmail,
            message:"please input valid email id."
        }
    },
    address:{
        type:String
    }, 
    about:{
        type:String
    },
    city:{
        type:String
    }

})


const GroomingCenter = mongoose.model('GroomingCenter', groomerSchema);

module.exports = GroomingCenter;