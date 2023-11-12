const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: String,
        productName: String,
        quantity: Number,
        productPrice: String
    }],
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: {type: String, default: "pending"},
    payment_status: {type: String, required: true},
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;