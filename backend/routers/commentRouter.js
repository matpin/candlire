const express = require("express");
const router = express.Router();
const {createComment, getCommentById} = require("../controllers/commentController");
const verifyToken = require("../middleware/auth");

router.post("/comment",verifyToken, createComment);
router.get("/comment/:id", getCommentById);

module.exports = router;