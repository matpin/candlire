import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ product }) {
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <img className="productImage" src={product.image} alt="productImage" />
        <p className="productItemBrand">{product.brand}</p>
        <h4 className="productItemName">{product.name}</h4>
        <p className="productItemPrice">{product.price} €</p>
      </Link>
    </div>
  );
}

export default ProductItem;
