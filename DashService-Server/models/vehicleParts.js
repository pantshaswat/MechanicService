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
  // Add more fields as needed
});

const VehiclePartsModel = mongoose.model("VehicleParts", VehicleParts);

module.exports = VehiclePartsModel;
