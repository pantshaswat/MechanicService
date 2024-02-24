const express = require("express");
const router = express.Router();

const marketPlaceController = require("../controller/marketplaceController");

router.get("/", marketPlaceController.getMarketplace);
router.post("/", marketPlaceController.postToMarketplace);
router.post("/buy", marketPlaceController.buyItem);


module.exports = router;