import React, { useState } from "react";
import ProductsList from "./ProductsList";

function Catalog({ productsArray }) {
  const [priceOrder, setPriceOrder] = useState("desc");
  let sortedProductsArray = productsArray;

  function handleOrder(e) {
    console.log(e.target.value);
    setPriceOrder(e.target.value)
    if (priceOrder === "asc") {
      sortedProductsArray = productsArray.sort((a, b) => b.price - a.price);
    } else {
      sortedProductsArray = productsArray.sort((a, b) => a.price - b.price);
    }
    console.log(sortedProductsArray);
  }

  return (
    <div>
      <div>
        <select value={priceOrder} onChange={handleOrder}>
          <option value="">--Sort by--</option>
          <option value="asc">Price(Low to High)</option>
          <option value="desc">Price(High to Low)</option>
        </select>
      </div>
      <ProductsList productsArray={sortedProductsArray} />
    </div>
  );
}

export default Catalog;