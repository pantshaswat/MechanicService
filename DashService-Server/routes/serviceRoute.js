const router = require("express").Router();

const { submitRequest } = require("../controller/serviceCenter");

router.post("/submit/:_id", submitRequest);

module.exports = router;
