const express = require("express");
const router = express.Router();
const {stripePayment} = require("../controllers/stripeController");
const verifyToken = require("../middleware/auth");

router.post('/create-checkout-session', stripePayment);

module.exports = router;