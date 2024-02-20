const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
    enum: ["User", "ServiceCenter", "Admin"],
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
