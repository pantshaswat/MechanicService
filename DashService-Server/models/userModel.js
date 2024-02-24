const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
<<<<<<< HEAD
<<<<<<< HEAD
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
    },
    phoneNumber:{
        type: [String],
        trim: true,
    } ,
    role:{
        type: String,
        enum:["ClientUser", "ServiceProvider","Admin"]
    }
=======
=======
  userId :{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    default:new mongoose.Types.ObjectId,
    },
>>>>>>> fc13e51837ed45def28968756f852dc5968b339e
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
