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

// Gets all products
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

// Gets product by it's id
const getProductById = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).send({msg: `Product not found`});
        }
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Searches for products by their brand or name 
const searchProduct = async (req, res) => {
    try {
        let products = await Product.find({
            $or: [
                { brand: { $regex: req.query.search, $options: 'i' } },
                { productName: { $regex: req.query.search, $options: 'i' } }
            ]
        }).sort({ createdAt: "desc" });
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Deletes a product
const deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id});
        res.status(200).send({msg: `Product deleted successfully`});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Updates a product
const updateProduct = async (req, res) => {
    try {
        await Product.updateOne({_id: req.params.id}, req.body);
        res.status(200).send({msg: `Product updated successfully`});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createProduct, getProducts, deleteProduct, updateProduct, searchProduct, getProductById};