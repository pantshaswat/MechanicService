const router = require('express').Router();

const{addVehiclePart, getAllVehiclePart, getVehiclePartById, deleteVehiclePartById} = require('../controller/vehiclePartController');

router.post('/add',addVehiclePart);
router.get('/getAll',getAllVehiclePart);
router.get('/get/:_id',getVehiclePartById);
router.delete('/delete/:_id',deleteVehiclePartById);