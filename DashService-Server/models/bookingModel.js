const mongoose = require("mongoose");

const date = new Date();

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  bookingDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  bookingTime: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  centerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCenter",
    required: true,
  },
  // other booking properties...
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
