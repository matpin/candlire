import React from 'react'

function ProductItem({ product }) {
  return (
    <div>
         <img className="productImage" src={product.image} alt="productImage" />
         <p className="productItemBrand">{product.brand}</p>
         <h4 className="productItemName">{product.name}</h4>
         <p className="productItemPrice">{product.price} €</p>
    </div>
  )
}

export default ProductItem;