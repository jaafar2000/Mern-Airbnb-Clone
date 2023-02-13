const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true , ref:"Place"},
  checkIn: {
    type: Date,
    required: true,
  },
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  price: Number,
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
