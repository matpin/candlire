const Message = require("../models/messageModel");

const createMessage = async (req, res) => {
    try {
        let {chatId, senderId, message} = req.body;
        let newMessage = await Message.create({chatId, senderId, message});
        res.status(200).send({msg: `Message created successfully`, newMessage});
        req.io.emit("newMessage", newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

const getMessagesByChatId = async (req, res) => {
    try {
        let messages = await Message.find({chatId: req.params.id}).populate("chatId").populate("senderId", "username");
        res.status(200).send(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {createMessage, getMessagesByChatId};