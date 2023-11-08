import React from 'react'
import ProductItem from '../ProductItem'

function ProductsList({ productsArray, deleteProduct }) {
  return (
    <div>
        {productsArray.map(product => (
            <ProductItem key={product._id} product={product} deleteProduct={deleteProduct} />
        ))}
    </div>
  )
}

export default ProductsList;