const Order = require("../models/orderModel");

// Creates the order
const createOrder = async (customer, data) => {
    try {
        const items = JSON.parse(customer.metadata.cart);
        const newOrder = await Order.create({
            userId: customer.metadata.userId,
            products: items,
            total: data.amount_total,
            shipping: data.shipping_details,
            delivery_status: data.status,
            payment_status: data.payment_status
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Gets user orders
const getOrders = async (req, res) => {
    try {
        let orders = await Order.find({userId: req.user.id}).sort({ createdAt: "desc" });
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createOrder, getOrders};