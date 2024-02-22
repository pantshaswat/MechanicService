const router = require('express').Router();
const { addVehicle, getAllVehicle, getAllVehicleOfUser, getVehicleById, deleteVehicleById, upload } = require('../controller/vehicleController');

router.post('/add/:_id', upload.single('vehicleImageUrl'), addVehicle);
router.get('/getAll', getAllVehicle);
router.get('/getOwnersAll/:_id', getAllVehicleOfUser);
router.get('/byId/:_id', getVehicleById);
router.delete('/byId/:_id', deleteVehicleById);

module.exports = router;
