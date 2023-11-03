const express = require("express");
const router = express.Router();
const addRemoveFavorite = require("../controllers/favoritesController");
const verifyToken = require("../middleware/auth");

router.post("/favorites/:id", verifyToken, addRemoveFavorite);

module.exports = router;