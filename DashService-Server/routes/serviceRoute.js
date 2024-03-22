const router = require("express").Router();
const authorizedTo = require("../middlewares/authorizationMiddleware");
const {
  submitRequest,
  approveServiceCenter,
  getAllServiceCenter,
  getServiceCenter
} = require("../controller/serviceCenter");

router.post("/submit/:_id", submitRequest);
router.get("/getAll", authorizedTo(["Admin"]), getAllServiceCenter);
router.get("/get/:_id", getServiceCenter);
router.put("/approve/:_id", authorizedTo(["Admin"]), approveServiceCenter);
module.exports = router;
