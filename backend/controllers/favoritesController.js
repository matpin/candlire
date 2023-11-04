const User = require("../models/userModel");

// Toggles to favorite
const addRemoveFavorite = async (req, res) => {
    try {
        let productId = req.params.id;
        let user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).send({msg: `User not found`});
        }
        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
        } else {
            user.favorites = user.favorites.filter(f => f.toString() !== productId);  
        }
        await User.updateOne({_id: user._id}, {favorites: user.favorites});
        res.status(200).send({msg: `toggled`});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Gets user favorites
const getFavorites = async (req, res) => {
    try {
        let favorites = await User.findById(req.params.id).populate("favorites");
        res.status(500).send(favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {addRemoveFavorite, getFavorites};