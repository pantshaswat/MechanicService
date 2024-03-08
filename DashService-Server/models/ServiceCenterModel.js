const mongoose = require("mongoose");

const serviceCenterModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    default: "false",
  },
});

const serviceCenter = mongoose.model("ServiceCenter", serviceCenterModel);

module.exports = serviceCenter;
