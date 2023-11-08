import React from 'react'
import ProductItem from '../ProductItem'

function ProductsList({ productsArray }) {
  return (
    <div>
        {productsArray.map(product => (
            <ProductItem key={product._id} product={product} />
        ))}
    </div>
  )
}

export default ProductsList;