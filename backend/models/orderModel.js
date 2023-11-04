const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        cartQuantity: Number
    }],
    total: Number,
    deliveryStatus: {type: String, default: "pending"}
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;