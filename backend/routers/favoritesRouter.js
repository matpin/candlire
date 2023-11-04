const express = require("express");
const router = express.Router();
const {addRemoveFavorite, getFavorites} = require("../controllers/favoritesController");
const verifyToken = require("../middleware/auth");

router.post("/favorite/:id", verifyToken, addRemoveFavorite);
router.get("/favorites/:id", verifyToken, getFavorites);

module.exports = router;