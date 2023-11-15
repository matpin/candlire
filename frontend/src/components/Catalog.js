import React, { useState } from "react";
import ProductsList from "./ProductsList";
import "./Catalog.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Catalog({ productsArray }) {
  const [priceOrder, setPriceOrder] = useState("desc");
  let sortedProductsArray = productsArray;

  function handleOrder(e) {
    console.log(e.target.value);
    setPriceOrder(e.target.value);
    if (priceOrder === "asc") {
      sortedProductsArray = productsArray.sort((a, b) => b.price - a.price);
    } else {
      sortedProductsArray = productsArray.sort((a, b) => a.price - b.price);
    }
    console.log(sortedProductsArray);
  }

  return (
    <div className="catalogContainer">
      <div className="orderContainer">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priceOrder}
            label="Sort by"
            onChange={handleOrder}
          >
            <MenuItem value="asc">Price(Low to High)</MenuItem>
            <MenuItem value="desc">Price(High to Low)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h1 className="catalogTitle">Products</h1>
      <ProductsList productsArray={sortedProductsArray} />
    </div>
  );
}

export default Catalog;
