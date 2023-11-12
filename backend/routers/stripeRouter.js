const express = require("express");
const router = express.Router();
const {stripePayment, stripeWebHook} = require("../controllers/stripeController");
const verifyToken = require("../middleware/auth");

router.post('/create-checkout-session', verifyToken, stripePayment);
router.post('/webhook', express.raw({type: 'application/json'}), stripeWebHook)

module.exports = router;