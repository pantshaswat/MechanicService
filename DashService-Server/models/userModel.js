const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
>>>>>>> 754a1ccb256ec7cf932cd7629d337c7b20534721
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
