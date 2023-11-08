import React, { useEffect, useState, useRef } from "react";
import { storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct({ editProduct }) {
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const fileInputRef = useRef(null);

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

  // Gets products values
  async function getProduct() {
    try {
      await axios
        .get(`http://localhost:8000/product/${id}`)
        .then((res) => {
          setProduct(res.data);
          setProductBrand(res.data.brand);
          setProductName(res.data.name);
          setProductCategory(res.data.category);
          setProductImage(res.data.image);
          setProductPrice(res.data.price);
          setProductDescription(res.data.description);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

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

  async function handleSave(e, product) {
    e.preventDefault();
    product.brand = productBrand;
    product.name = productName;
    product.category = productCategory;
    product.image = productImage;
    product.price = productPrice;
    product.description = productDescription;
    if (!validForm) {
      return;
    }
    await editProduct(product);
  }

  return (
    <div>
      <h2>Edit Product</h2>
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
          <label>Current Image</label>
          {productImage && (
            <div>
              <img
                src={productImage}
                alt="Current"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
        </div>
        <div>
          <label>Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
            ref={fileInputRef}
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
        <button onClick={(e) => handleSave(e, product)}>Save</button>
      </form>
    </div>
  );
}

export default EditProduct;
