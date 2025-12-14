const mongoose = require("mongoose");

const coupanSchema = new mongoose.Schema({
    coupan:{
        type:String
    },
    percent:Number
})

const Coupan = mongoose.model('Coupan', coupanSchema);


module.exports = Coupan;