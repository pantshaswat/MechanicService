const serviceCenter = require("../models/serviceCenterModel");
const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//get service center
async function getAllServiceCenter(req, res) {
  console.log("Getting service center");
  try {
    const center = await serviceCenter.find();
    res.status(200).send(center);
  } catch (error) {
    console.error("Error getting service center:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getServiceCenter(req,res){
  try {
    const _id = req.params._id;
    const serveCenter = await serviceCenter.findOne({ownerUserId: _id});
    return res.status(200).send(serveCenter)
  } catch (error) {
    console.log('error getting srvice center')
    return res.status(400).send(error)
  }
}
async function approveServiceCenter(req, res) {
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
    const center = await serviceCenter.findOne({ ownerUserId: user_id });
    await serviceCenter.updateOne(
      { ownerUserId: new ObjectId(user_id) },
      { status: "true" }
    );
    res.status(200).send("Service center approved");
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function submitRequest(req, res) {
  const user_id = req.params._id;
  try {
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
    const data = req.body;
    const formData = {
      ownerUserId: user_id,
      name: data.name,
      address: data.address,
      panCard: data.panCard,
      about: data.about,
      phoneNumber: data.phoneNumber,
    };

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
module.exports = { submitRequest, approveServiceCenter, getAllServiceCenter,getServiceCenter };
