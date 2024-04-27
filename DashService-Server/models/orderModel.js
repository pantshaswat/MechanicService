const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parts: [{
            part: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "VehicleParts",
                required: true,
            },
            amount: {
                type: Number,
                required: true,
                default: 1,
            }
        }],
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamp: true,
    }
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;