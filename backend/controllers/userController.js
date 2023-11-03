const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUpUser = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({msg: "All fields required for sign up"});
        }
        let usernameFound = await User.findOne({ username });
        let emailFound = await User.findOne({ email });
        if (usernameFound || emailFound) {
            return res.status(400).send({msg: "User already exists"});
        }
        let hashedPass = await bcrypt.hash(password, +process.env.SALT);
        let user = await User.create({username, email, password: hashedPass});
        let token = jwt.sign({id: user._id, username: user.username}, process.env.PRIVATE_TOKEN, {expiresIn: "2h"});
        res.status(200).send({msg: "registered successfully", token});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {signUpUser};