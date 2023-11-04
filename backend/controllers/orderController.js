const Order = require("../models/orderModel");

// Creates the order
const createOrder = async (req, res) => {
    try {
        let {userId, products, total, deliveryStatus} = req.body;
        let order = await Order.create({userId, products, total, deliveryStatus});
        console.log(order);
        res.status(200).send({msg: `New order added successfully`, order});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createOrder};