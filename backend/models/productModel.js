const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: String,
    productName: String,
    category: {
      type: String,
      enum: ["all_season", "christmas", "halloween", "summer", "easter"],
    },
    image: {
      type: String,
      validate: {
        validator: function (value) {
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlRegex.test(value);
        },
        message: "Invalid URL format",
      },
    },
    price: Number,
    description: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
