const VehicleModel = require('../models/vehicleModel')
const userModel = require('../models/userModel');
const  ObjectId =  require('mongoose').Types.ObjectId;
const multer = require('multer');
const path = require('path');

//creating storage for vehicle photo
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,path.resolve('./public/vehiclePhotos'));
    },
    filename: function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    }
});
const upload = multer({storage: storage});

async function addVehicle(req,res){
    const body = req.body;
    const ownerUserId = req.params._id;
    let imageUrl;
    if(req.file){
        imageUrl = `/vehiclePhotos/${req.file.filename}`;
    } 
    else{
        imageUrl = '';
    }
    if(!(body.make && body.model && body.year && body.licenseNumber )){
        return res.status(400).send("All input required");
    }
    if(!ownerUserId){
        return res.status(400).send("No user id");
    }
    try {
        const userOwner = await userModel.findOne({_id: new ObjectId(ownerUserId)});
    if(!userOwner){
        return res.status(404).send("User not Found");
    }}
    catch(e){
        return res.status(400).send("Invalid user")
    }

    try{
        const vehicle = await VehicleModel.create({
            ownerUserId: ownerUserId,
            make: body.make,
            model:body.model,
            year: body.year,
            licenseNumber: body.licenseNumber,
            imageUrl: imageUrl
        });
    
        return res.status(201).send(vehicle);
    }
   catch(e){
    return res.status(500).send(`Error adding vehicle ${e}`);
   }
}

async function getAllVehicle(req,res){
    const allVehicle = await VehicleModel.find({});
    if(!allVehicle){
        return res.status(404).send("No vehicle found");
    }
    return res.status(201).send(allVehicle)
}
async function getAllVehicleOfUser(req,res){
    const ownerUserId = req.params._id;
    try {
        const userOwner = await userModel.findOne({_id: new ObjectId(ownerUserId)});
    if(!userOwner){
        return res.status(404).send("User not Found");
    }}
    catch(e){
        return res.status(400).send("Invalid user")
    }
    const allVehicleOfUser = await VehicleModel.findOne({ownerUserId: new ObjectId(ownerUserId)});
    return res.status(201).send(allVehicleOfUser);
}
async function getVehicleById(req,res){
    const vehicle_id = req.params._id;
    try{
        const vehicle = await VehicleModel.findOne({_id:new ObjectId(vehicle_id)});
        if(!vehicle){
            return res.status(404).send("Vehicle not Found");
        }
        return res.status(201).send(vehicle);
    }
    catch(e){
        return res.status(400).send("Invalid vehicle _id");
    }
}
async function deleteVehicleById(req,res){
    const vehicle_id = req.params._id;
    try{
        const vehicle = VehicleModel.findOne({_id: new ObjectId(vehicle_id)})
        if(!vehicle){
            return res.status(404).send("Vehicle not found");
        }
    }
    catch(e){
        return res.status(400).send("Invalid vehicle _id")
    }

    await VehicleModel.deleteOne({_id: new ObjectId(vehicle_id)});
    return res.status(201).send("Vehicle deleted successfully");

}

module.exports = {addVehicle,getAllVehicle,getAllVehicleOfUser, getVehicleById, deleteVehicleById, upload};