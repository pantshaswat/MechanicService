const VehicleModel = require("../models/vehicleModel");
const VehiclePartsModel = require("../models/vehicleParts");
const OrdersModel = require("../models/orderModel");

exports.getMarketplace = async (req, res) => {
  try {
    // http://localhost:3000/marketplace?page=2&limit=10&category=Engine&price=1000
    const page = parseInt(req.query.page) || 1; // by default, set page to 1
    const limit = parseInt(req.query.limit) || 10; // by default, set limit to 10 items per page
    const skip = (page - 1) * limit;

    const category = req.query.category;
    const price = req.query.price;

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (price) {
      filter.price = { $lte: price };
    }

    const data = await VehiclePartsModel.find(filter).skip(skip).limit(limit);
    res.send(data);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Error connecting to the database");
  }
};
exports.postToMarketplace = async (req, res) => {
  //only fetch
  return res.status(501);
};

exports.buyItem = async (req, res) => {
  try {
    const parts = req.body.orderItems;
    console.log("orderitem:", req.body);
    console.log("Parts:", parts);
    for (const part of parts) {
      const vehiclePart = await VehiclePartsModel.findById(part["_id"]);
      if (vehiclePart) {
        vehiclePart.amount -= part["amount"];
      }
      if (!vehiclePart) {
        return res.status(404).send("Vehicle part not found");
      }
      console.log("Vehicle part:", part);
      if (vehiclePart["amount"] < part.amount) {
        return res.status(400).send({
          message: `Insufficient amount of ${vehiclePart.name}`,
        });
      }
      await vehiclePart.save();
    }
    const order = new OrdersModel({
      userId: req.user._id,
      parts: parts.map((part) => ({
        part: part,
        amount: part.amount,
      })),
    });
    await order.save();
    return res.send({
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error buying item:", error);
    res.status(500).send({
      message: error.message,
    });
  }
};
