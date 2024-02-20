const mongoose = require("mongoose");

const RoadsideAModelSchema = new mongoose.Schema(
  {
    // Define your schema fields here
    requestId: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    RequestTime: {
      type: Date,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  },
  {
    timestamp: true,
  }
);

const RoadsideAModel = mongoose.model("RoadsideAModel", RoadsideAModelSchema);

module.exports = RoadsideAModel;
