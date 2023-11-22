import React, { useEffect, useState, useRef } from "react";
import { storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleImageSave = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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

  // Handles the edit
  async function handleSave(e, product) {
    e.preventDefault();
    product.brand = productBrand;
    product.name = productName;
    product.category = productCategory;
    product.image = productImage;
    product.price = productPrice;
    product.description = productDescription;
    if (
      product.brand.trim() === "" ||
      product.name.trim() === "" ||
      product.category.trim() === "" ||
      product.image.trim() === "" ||
      product.price === "" ||
      product.description.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }
    await editProduct(product);
    navigate(`/product/${id}`);
  }

  return (
    <div className="editProductContainer">
      <h2 className="editProductHead">Edit Product</h2>
      <form className="editFormContainer">
        <div className="editBrandContainer">
          <label>Brand Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductBrand(e.target.value);
            }}
            value={productBrand}
            spellCheck={false}
            className="editInputs"
          />
        </div>
        <div className="editNameContainer">
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
            spellCheck={false}
            className="editInputs"
          />
        </div>
        <div className="editCategoryContainer">
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
                fontFamily: "Lora",
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
        <div className="editImageContainer">
          <div className="editCurrentImageContainer">
            <label>Current Image</label>
            {productImage && (
              <div>
                <img
                  src={productImage}
                  alt="Current"
                  style={{ maxWidth: "80px", marginTop: "0.4em" }}
                />
              </div>
            )}
          </div>
          <div className="uploadNewImageContainer">
            <label>Upload New Image</label>
            <div className="editUploadImageButtonContainer">
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
              <p className="editImageDetails">
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
                      <CheckIcon style={{ color: "green" }} disabled />
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
                        handleImageSave();
                        setIsClicked(true);
                      }}
                    >
                      Save
                    </Button>
                  )}
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
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
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
        </div>
        <div className="editPriceContainer">
          <label>Price</label>
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            value={productPrice}
            className="editInputs"
          />
        </div>
        <div className="editDescriptionContainer">
          <label>Description</label>
          <textarea
            type="text"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            value={productDescription}
            className="editTextArea"
          />
        </div>
        <Button
          style={{
            fontFamily: "Lora",
            color: "#333",
            backgroundColor: "#f2f2f2",
            height: "5vh",
            marginTop: "1em",
          }}
          onClick={(e) => handleSave(e, product)}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditProduct;
