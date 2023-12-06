const mongoose = require("mongoose");

const userSchema = new mongoose.mongoose.Schema({
    username: {
        type: String,
        minlength: 4
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: String,
    isAdmin: {type: Boolean, default: false},
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;