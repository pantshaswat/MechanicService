const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({

  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
    default: ''
  }
  // ... add more fields as needed
});

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = VehicleModel;
