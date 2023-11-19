const Comment = require("../models/commentModel");
const Product = require("../models/productModel");

const createComment = async (req, res) => {
    try {
        let { text, productId, parentId } = req.body;
        let product = await Product.findById(productId);
        let newComment;

        // Creates comment or replied comment for a product
        if (parentId) {
            newComment = await Comment.create({
                text, 
                user: req.user.id, 
                product: product.id, 
                parentId: parentId
            });
            await Comment.findByIdAndUpdate(parentId, { $push: { replies: newComment._id }})
            res.status(200).send({msg: `New comment added successfully`, newComment});
        } else {
            newComment = await Comment.create({
                text, 
                user: req.user.id, 
                product: product.id,
            });
            res.status(200).send({msg: `New comment added successfully`, newComment});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: `Internal error`});
    }
}

const getCommentById = async (req, res) => {
    try {
        const productId = req.params.id;
        const comments = await Comment.find({ product: productId }).sort({ createdAt: "desc" });
    
        if (!comments || comments.length === 0) {
          return;
        }
    
        // Maps comments to their parent comments
        let parentComments = comments.filter(comment => !comment.parentId);
    
        // Recursively populate replies for each parent comment
        async function populateReplies(comment) {
          let populatedComment = await Comment.populate(comment, { path: 'replies', options: { sort: { createdAt: 'desc' } } });
    
          if (populatedComment.replies && populatedComment.replies.length > 0) {
            for (let reply of populatedComment.replies) {
                await populateReplies(reply);
              }
          }
          return populatedComment;
        };
    
        // Populates replies for each parent comment
        let fullyPopulatedComments = [];
        for (let comment of parentComments) {
            let fullyPopulatedComment = await populateReplies(comment);
            fullyPopulatedComments.push(fullyPopulatedComment);
          }
    
        res.status(200).send(fullyPopulatedComments);
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: `Internal error` });
      }
}

module.exports = {createComment, getCommentById};