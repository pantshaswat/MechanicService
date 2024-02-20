const mongoose = require("mongoose");

class Database {
  static async connect() {
    //Insert MONGODB_URI here
    const MONGODB_URI =
      "mongodb+srv://pantshaswat:dashservice@cluster0.r9oxzit.mongodb.net/?retryWrites=true&w=majority";
    try {
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Database;
