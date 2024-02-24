const mongoose = require("mongoose");
const userModel = require("./userModel");

const notificationSchema = new mongoose.Schema({

  receiverUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  isRead:{
    type: Boolean,
    default: false
  },
  notificationType:{
    type: String,
    enum:["general","booking","order","assistance","reminder"],
    default: "general"
  },
  metaData: {
    type: Object,
    default: {}
}
},
{
  timestamps: true
}
);
const Notification = mongoose.model("Notifications", notificationSchema);

module.exports = Notification;

