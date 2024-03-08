const serviceCenter = require("../models/serviceCenterModel");
const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

async function submitRequest(req, res) {
  const user_id = req.params._id;
  try {
    const user = await userModel.findOne({ _id: new ObjectId(user_id) });
    if (!user) {
      return res.status(404).send("User not found");
    }
    //change the field of role update
    await userModel.updateOne(
      { _id: new ObjectId(user_id) },
      { role: "serviceCenter" }
    );
    // await userModel.findByIdAndUpdate(
    //   user_id,
    //   { role: "serviceCenter" },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log("Something wrong when updating data!");
    //     }
    //     console.log(doc);
    //   }
    // );
    // Handle form data here
    const formData = req.body;
    console.log("Form Data:", formData);

    const ServiceCenterRequest = new serviceCenter(formData);
    const result = await ServiceCenterRequest.save(); //save this in database
    console.log("Database result:", result);

    // You can perform further processing or store the data in a database

    // Send a response back to the client
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { submitRequest };
