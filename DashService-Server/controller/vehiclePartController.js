const VehiclePartsModel = require("../models/vehicleParts");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/vehiclePartPhotos`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

async function addVehiclePart(req, res) {
  const body = req.body;
  let imageUrl;
  if (req.file) {
    console.log(req.file);
    imageUrl = `/vehiclePartPhotos/${req.file.filename}`;
  } else {
    imageUrl = "";
  }
  if (!(body.name && body.description)) {
    res.status(400).send("All inputs are required");
  }

  try {
    const vehiclePart = await VehiclePartsModel.create({
      name: body.name,
      description: body.description,
      photoUrl: imageUrl,
      price: body.price,
      category: body.category,
      amount: body.amount,
    });
    res.status(201).send(vehiclePart);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
async function getAllVehiclePart(req, res) {
  const allVehicleParts = await VehiclePartsModel.find({});
  if (!allVehicleParts) {
    return res.status(404).send("No vechile parts found");
  }
  return res.status(201).send(allVehicleParts);
}

async function getVehiclePartById(req, res) {
  const _id = req.params._id;
  const vehiclePartById = await VehiclePartsModel.findById({ _id: _id });
  if (!vehiclePartById) {
    res.status.send(404).send("Vehicle Part not found");
  }
  res.status(201).send(vehiclePartById);
}

async function deleteVehiclePartById(req, res) {
  const _id = req.params._id;
  const vehiclePartById = await VehiclePartsModel.findById({ _id: _id });
  if (!vehiclePartById) {
    res.status.send(404).send("Vehicle Part not found");
  }
  await VehiclePartsModel.deleteOne({ _id: _id });
  res.status(201).send("Deleted the vehicle");
}

module.exports = {
  addVehiclePart,
  getAllVehiclePart,
  getVehiclePartById,
  deleteVehiclePartById,
  upload,
};
