const Product = require("../models/productModel");

// Creates product
const createProduct = async (req, res) => {
    try {
        let {brand, productName, category, image, price, description} = req.body;
        let product = await Product.create({brand, productName, category, image, price, description});
        res.status(200).send({msg: `New product added successfully`, product});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

const getProducts = async (req, res) => {
    try {
        let data = {};
        if (req.query.body !== undefined) {
            data = JSON.parse(req.query.body);
        }
        let products = await Product.find(data).sort({ createdAt: "desc" });
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createProduct, getProducts};