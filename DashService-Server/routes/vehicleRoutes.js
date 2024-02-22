const router = require('express').Router();

const {addVehicle, getAllVehicle, getAllVehicleOfUser,getVehicleById, deleteVehicleById} = require('../controller/vehicleController');

router.post('/add/:_id',addVehicle);
router.get('/getAll',getAllVehicle);
router.get('/getOwnersAll/:_id',getAllVehicleOfUser);
router.get('/byId/:_id',getVehicleById);
router.delete('/byId/:_id',deleteVehicleById);

module.exports = router