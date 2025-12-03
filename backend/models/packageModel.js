const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name:String,
    price:String,
    emoji:String,
    tag:String,
    features:[String],
    freeServices:[String]
})


const Packages = mongoose.model("Packages", packageSchema);
module.exports = Packages;