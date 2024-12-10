const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    orderId : mongoose.Schema.Types.ObjectId,
    total: Number,
    status: {
        type : String,
        default : "pending",
    },
    payment:String,
    updatedAt: {
        type: Date,
        default : new Date()

    }
})

module.exports = mongoose.model("Order",OrderSchema);