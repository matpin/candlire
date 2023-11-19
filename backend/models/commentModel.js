const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema (
    {
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;