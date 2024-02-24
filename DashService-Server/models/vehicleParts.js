const mongoose = require("mongoose");

const VehicleParts = new mongoose.Schema({
  // Define your schema fields here
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Engine", "Transmission", "Suspension", "Brakes", "Exhaust", "Electrical", "Interior", "Exterior","Others"],
    default: "Others",
  },
  amount: {
    type: Number,
    required: true,
    default: 10,
  },
});

const VehiclePartsModel = mongoose.model("VehicleParts", VehicleParts);

module.exports = VehiclePartsModel;
