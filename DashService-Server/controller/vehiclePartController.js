const VehiclePartsModel = require('../models/vehicleParts')

async function addVehiclePart(req, res) {
    const body = req.body;
    if (!(body.name && body.description)) {
        res.status(400).send("All inputs are required");
    }
    const vehiclePart = await VehiclePartsModel.create({
        name: body.name,
        description: body.description,
        photoUrl: body.photoUrl
    });
    res.status(201).send(vehiclePart);
}
async function getAllVehiclePart(req, res) {
    const allVehicleParts = await VehiclePartsModel.find({});
    if (!allVehicleParts) {
        return res.status(404).send("No vechile parts found");
    }
    return res.status(201).send(allVehicleParts)
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

module.exports = { addVehiclePart, getAllVehiclePart, getVehiclePartById, deleteVehiclePartById }