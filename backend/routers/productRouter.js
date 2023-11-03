const express = require("express");
const router = express.Router();
const {createProduct, getProducts, deleteProduct, updateProduct, searchProduct, getProductById} = require("../controllers/productController");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, createProduct);
router.get("/products", getProducts);
router.get("/:id", getProductById);
router.get("/", searchProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;