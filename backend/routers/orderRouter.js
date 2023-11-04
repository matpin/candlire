const express = require("express");
const router = express.Router();
const {createOrder, getOrders} = require("../controllers/orderController");
const verifyToken = require("../middleware/auth");

router.post("/order", verifyToken, createOrder);
router.get("/orders", verifyToken, getOrders);

module.exports = router;