const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createChat = async (req,res) => {
    try {
        let {senderId, receiverId} = req.body;
        let chat = await Chat.findOne({senderId, receiverId});
        if (chat) {
            res.status(200).send(chat);
        } else {
            let newChat = await Chat.create({senderId, receiverId});
            res.status(200).send({msg: `Chat created successfully`, newChat});
            req.io.emit("newChat", newChat);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

const getChats = async (req, res) => {
    try {
        console.log(req.params);
        let chats = await Chat.find({ $or: [{ senderId: req.params.id }, { receiverId: req.params.id }] });
        res.status(200).send(chats);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createChat, getChats};