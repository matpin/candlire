const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUpUser = async (req, res) => {
    try {
        let {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({msg: "All fields required for sign up", username, email, password});
        }
        let usernameFound = await User.findOne({ username });
        let emailFound = await User.findOne({ email });
        if (usernameFound || emailFound) {
            return res.status(400).send({msg: "User already exists", usernameFound, emailFound});
        }
        let hashedPass = await bcrypt.hash(password, +process.env.SALT);
        let user = await User.create({username, email, password: hashedPass});
        let token = jwt.sign({id: user._id, username: user.username, isAdmin: user.isAdmin}, process.env.PRIVATE_TOKEN, {expiresIn: "2h"});
        res.status(200).send({msg: "registered successfully", token});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

const signInUser = async (req, res) => {
    try {
        let {username, password} = req.body;
        if (!username || !password) {
            return res.status(401).send({msg: "All fields required for login", username, password});
        }
        let userFound = await User.findOne({ username });
        if (userFound) {
            let validPass = await bcrypt.compare(password, userFound.password);
            if (!validPass) {
                return res.status(404).send({msg: "Incorrect password", validPass});
            } else {
                let token = jwt.sign({id: userFound._id, username: userFound.username, favorites: userFound.favorites, isAdmin: userFound.isAdmin}, process.env.PRIVATE_TOKEN, {expiresIn: "2h"});
                return res.status(200).send({msg: "User logged in successfully", token});
            }
        } else {
            return res.status(401).send({msg: "No user found with this username. Please ensure you're using the correct username or consider signing up!", userFound})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {signUpUser, signInUser};