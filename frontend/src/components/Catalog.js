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
    setPriceOrder(e.target.value);
    if (priceOrder === "asc") {
      sortedProductsArray = productsArray.sort((a, b) => b.price - a.price);
    } else {
      sortedProductsArray = productsArray.sort((a, b) => a.price - b.price);
    }
  }

  return (
    <div className="catalogContainer">
      <div className="orderContainer">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel style={{ fontFamily: "Lora", fontSize: "1.03em", color: "#333" }} id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            sx={{
              color: "#333",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              ".MuiSvgIcon-root ": {
                fill: "#333 !important",
              },
              fontFamily: "Lora"
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priceOrder}
            label="Sort by"
            onChange={handleOrder}
          >
            <MenuItem style={{ fontFamily: "Lora", color: "#333" }} value="asc">Price(Low to High)</MenuItem>
            <MenuItem style={{ fontFamily: "Lora", color: "#333" }} value="desc">Price(High to Low)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h1 className="catalogTitle">Products</h1>
      {sortedProductsArray.length !== 0 ? (
        <ProductsList productsArray={sortedProductsArray} />
      ) : (
        <p className="noResults">No results</p>
      )}
    </div>
  );
}

export default Catalog;
