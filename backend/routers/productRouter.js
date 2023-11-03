const express = require("express");
const router = express.Router();
const {createProduct, getProducts, deleteProduct, updateProduct, searchProduct, getProductById} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/products", getProducts);
router.get("/:id", getProductById);
router.get("/", searchProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;