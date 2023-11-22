import React from 'react';
import ProductItem from './ProductItem'
import "./ProductsList.css";

function ProductsList({ productsArray, deleteProduct }) {
  return (
    <div className="productListContainer">
        {productsArray.map(product => (
            <ProductItem key={product._id} product={product} deleteProduct={deleteProduct} />
        ))}
    </div>
  )
}

export default ProductsList;