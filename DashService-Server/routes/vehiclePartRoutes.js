const router = require("express").Router();

const {
  addVehiclePart,
  getAllVehiclePart,
  getVehiclePartById,
  deleteVehiclePartById,
  upload,
} = require("../controller/vehiclePartController");

router.post("/add", upload.single("vehiclePartImage"), addVehiclePart);
router.get("/getAll", getAllVehiclePart);
router.get("/get/:_id", getVehiclePartById);
router.delete("/delete/:_id", deleteVehiclePartById);

module.exports = router;
