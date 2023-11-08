import React, { useState } from "react";
import { storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddProduct({ addNewProduct }) {
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const validForm = () => {
    return (
      productBrand.trim() !== "" &&
      productName.trim() !== "" &&
      productCategory !== "" &&
      productImage.trim() !== "" &&
      productPrice.trim() !== "" &&
      productDescription.trim() !== ""
    );
  };

  // Uploads images to firebase
  function handleUpload(e) {
    e.preventDefault();
    let imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProductImage(url);
      });
    });
  }

  // Handles the add products action
  async function handleClick(e) {
    e.preventDefault();
    if (!validForm) {
      alert("Fill all fields");
      return;
    }
    console.log(
      productBrand,
      productName,
      productCategory,
      productImage,
      productPrice,
      productDescription
    );
    await addNewProduct( productBrand, productName, productCategory, productImage, productPrice, productDescription);
  }
  
  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <div>
          <label>Brand Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductBrand(e.target.value);
            }}
            value={productBrand}
            spellCheck={false}
          />
        </div>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
            spellCheck={false}
          />
        </div>
        <div>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productCategory}
              label="Category"
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <MenuItem value="all_season">All season</MenuItem>
              <MenuItem value="christmas">Christmas</MenuItem>
              <MenuItem value="halloween">Halloween</MenuItem>
              <MenuItem value="summer">Summer</MenuItem>
              <MenuItem value="easter">Easter</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <label>Upload image</label>
          <input
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
            // value={productImage}
          />
          <button onClick={handleUpload}>ok</button>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            value={productPrice}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            value={productDescription}
          />
        </div>
        <button onClick={handleClick}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
