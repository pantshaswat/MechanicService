const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId :{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    default:new mongoose.Types.ObjectId,
    },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: [String],
    trim: true,
  },
  role: {
    type: String,
    enum: ["ClientUser", "ServiceProvider", "Admin"],
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
