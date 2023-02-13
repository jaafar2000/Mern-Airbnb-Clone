const mongoose = require("mongoose");
const {Schema} = mongoose

const placeSchema  = new Schema({
  owner : {
    type :  mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  title : String ,
  address : String , 
  photos : [String],
  description : String ,
  perks : [String],
  extraInfo : String,
  checkin : Number,
  checkout : Number,
  maxGuests : Number,  
  price : Number,



})

const Placemodle = mongoose.model('Place'  , placeSchema) 

module.exports = Placemodle