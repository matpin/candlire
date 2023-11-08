import React from 'react'

function ProductItem({ product, deleteProduct }) {

    async function handleDelete(productId) {
        deleteProduct(productId);
    }
  return (
    <div>
         <img className="productImage" src={product.image} alt="productImage" />
         <p className="productItemBrand">{product.brand}</p>
         <h4 className="productItemName">{product.name}</h4>
         <p className="productItemPrice">{product.price} €</p>
         <button>edit</button>
         <button onClick={() => handleDelete(product._id)}>delete</button>
    </div>
  )
}

export default ProductItem;