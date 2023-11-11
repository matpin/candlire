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
            await User.findByIdAndUpdate(
                req.user.id,
                { $addToSet: { favorites: productId } },
                { new: true }
            );
        }  else {
            await User.findByIdAndUpdate(
                req.user.id,
                { $pull: { favorites: productId } },
                { new: true }
            );
        }
        console.log(user);
        let updatedUser = await User.findById(req.user.id);
        res.status(200).send({favorites: updatedUser.favorites});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

// Gets user favorites
const getFavorites = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).populate("favorites");
        console.log(user, "aa");
        res.status(200).send(user.favorites);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

module.exports = {addRemoveFavorite, getFavorites};