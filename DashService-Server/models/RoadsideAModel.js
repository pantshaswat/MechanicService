const mongoose = require("mongoose");

const RoadsideAModelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    centerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter",
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const RoadsideAModel = mongoose.model("RoadsideAModel", RoadsideAModelSchema);

module.exports = RoadsideAModel;
