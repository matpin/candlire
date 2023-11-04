const express = require("express");
const router = express.Router();
const {createOrder} = require("../controllers/orderController");
const verifyToken = require("../middleware/auth");

router.post("/order", verifyToken, createOrder);

module.exports = router;