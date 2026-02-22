const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
   
    "name":String,
    "price":Number,
    "city":String
})


const AddOn = mongoose.model('AddOn', addonSchema);
module.exports = AddOn;