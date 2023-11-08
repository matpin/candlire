import React from 'react'
import { Link } from 'react-router-dom';

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
         <Link to={`/edit/${product._id}`} className="editButton">
         <button>edit</button>
         </Link>
         <button onClick={() => handleDelete(product._id)}>delete</button>
    </div>
  )
}

export default ProductItem;