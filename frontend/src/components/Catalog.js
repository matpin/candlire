import React from 'react';
import ProductsList from './ProductsList';

function Catalog({ productsArray }) {
  return (
    <div>
        <ProductsList productsArray={productsArray} />
    </div>
  )
}

export default Catalog;