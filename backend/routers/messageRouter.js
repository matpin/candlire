const express = require("express");
const router = express.Router();
const {createMessage, getMessagesByChatId} = require("../controllers/messageController");
const verifyToken = require("../middleware/auth");

router.post("/message", verifyToken, createMessage);
router.get("/messages/:id", verifyToken, getMessagesByChatId);

module.exports = router;