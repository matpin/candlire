const express = require("express");
const router = express.Router();
const {createChat, getChats} = require("../controllers/chatController");
const verifyToken = require("../middleware/auth");

router.post("/newchat", verifyToken, createChat);
router.get("/chats/:id", verifyToken, getChats);

module.exports = router;