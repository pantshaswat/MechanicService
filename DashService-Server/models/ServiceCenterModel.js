const mongoose = require("mongoose");

const ServiceCenterModel = new mongoose.Schema({
  // Define your schema fields here

  centerid: {
    type: mongoose.Schema.Types.objectId,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

const ServiceCenter = mongoose.model("ServiceCenterModel", ServiceCenterModel);

module.exports = ServiceCenter;
