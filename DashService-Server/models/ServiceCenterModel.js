const mongoose = require("mongoose");

const ServiceCenterModel = new mongoose.Schema({
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
  status: {
    type: String,
    required: true,
  },
});

const ServiceCenter = mongoose.model("ServiceCenter", ServiceCenterModel);

module.exports = ServiceCenter;
