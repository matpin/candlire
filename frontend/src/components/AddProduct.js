import React, { useState } from "react";
import { storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddProduct({ addNewProduct }) {
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleSave = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
    if (
      productBrand.trim() === "" ||
      productName.trim() === "" ||
      productCategory.trim() === "" ||
      productImage.trim() === "" ||
      productPrice.trim() === "" ||
      productDescription.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }
    await addNewProduct(
      productBrand,
      productName,
      productCategory,
      productImage,
      productPrice,
      productDescription
    );
    navigate("/myprofile");
  }

  return (
    <div className="addProductContainer">
      <h2 className="addProductHead">Add Product</h2>
      <form className="addProductForm">
        <div className="addProductBrandContainer">
          <label>Brand Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductBrand(e.target.value);
            }}
            value={productBrand}
            spellCheck={false}
            className="addProductInputs"
          />
        </div>
        <div className="addProductNameContainer">
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
            spellCheck={false}
            className="addProductInputs"
          />
        </div>
        <div className="addProductCategoryContainer">
          <FormControl sx={{ width: "100%", marginTop: "1vh" }}>
            <InputLabel
              style={{ fontFamily: "Lora", fontSize: "1.03em", color: "#333" }}
              id="demo-simple-select-label"
            >
              Category
            </InputLabel>
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
              value={productCategory}
              label="Category"
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <MenuItem style={{ fontFamily: "Lora" }} value="all_season">
                All season
              </MenuItem>
              <MenuItem style={{ fontFamily: "Lora" }} value="christmas">
                Christmas
              </MenuItem>
              <MenuItem style={{ fontFamily: "Lora" }} value="halloween">
                Halloween
              </MenuItem>
              <MenuItem style={{ fontFamily: "Lora" }} value="summer">
                Summer
              </MenuItem>
              <MenuItem style={{ fontFamily: "Lora" }} value="easter">
                Easter
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="addProductImageContainer">
          <label>Upload image</label>
          <div className="uploadImageButtonContainer">
            <Button
              style={{
                fontFamily: "Lora",
                marginLeft: "1em",
                backgroundColor: "#333",
              }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            >
              Upload image
              <VisuallyHiddenInput type="file" />
            </Button>
            <p className="imageDetails">
              Click on the save button after uploading your image.
            </p>
            {imageUpload !== null ? (
              <>
              {isClicked ? (
                <Button
              style={{
                fontFamily: "Lora",
                color: "#333",
                backgroundColor: "#f2f2f2",
                marginRight: "1em",
              }}
            >
              <CheckIcon style={{ color: "green" }} disabled/>
            </Button>
              ) : (
                <Button
              style={{
                fontFamily: "Lora",
                color: "#333",
                backgroundColor: "#f2f2f2",
                marginRight: "1em",
              }}
              onClick={(e) => {
                handleUpload(e);
                handleSave();
                setIsClicked(true);
              }}
            >
              Save
            </Button>
              ) }
              </>
            ) : (
              <Button
              style={{
                fontFamily: "Lora",
                marginRight: "1em",
              }}
              disabled
            >
              Save
            </Button>
            )}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="info"
                sx={{ width: "100%" }}
              >
                Image saved.
              </Alert>
            </Snackbar>
          </div>
        </div>
        <div className="addProductPriceContainer">
          <label>Price</label>
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            value={productPrice}
            className="addProductInputs"
          />
        </div>
        <div className="addProductDescriptionContainer">
          <label>Description</label>
          <textarea
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            value={productDescription}
            className="addProductTextarea"
          />
        </div>
        {isClicked ? (
          <>
          <Button
          style={{
            fontFamily: "Lora",
            color: "#333",
            backgroundColor: "#f2f2f2",
            height: "5vh",
            marginTop: "1em",
          }}
          onClick={handleClick}
        >
          Add Product
        </Button>
          </>
        ) : (
          <>
          <Button
          style={{
            fontFamily: "Lora",
            color: "#333",
            backgroundColor: "#f2f2f2",
            height: "5vh",
            marginTop: "1em",
          }}
          onClick={() =>{handleAdd();}}
        >
          Add Product
        </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          You have to save your image first.
        </Alert>
      </Snackbar>
          </>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
