const express = require("express");
const router = express.Router();
const {createProduct, getProducts, deleteProduct, updateProduct, searchProduct, getProductById, getLimitFour} = require("../controllers/productController");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.get("/", searchProduct);
router.get("/latests", getLimitFour);
router.delete("/:id", verifyToken, deleteProduct);
router.put("/:id", verifyToken, updateProduct);

module.exports = router;