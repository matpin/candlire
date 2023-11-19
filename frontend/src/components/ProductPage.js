import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ProductPage.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { increaseCartCount } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductPage({ deleteProduct }) {
  const [product, setProduct] = useState({});
  const [favoritesArray, setFavoritesArray] = useState([]);
  const { id } = useParams();
  let token = localStorage.getItem("token");
  let decoded;
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [cartArray, setCartArray] = useState([]);
  const dispatch = useDispatch();
  const [commentsArray, setCommentsArray] = useState([]);

  if (token) {
    decoded = jwtDecode(token);
  }

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Gets product by it's id
  async function getProduct() {
    try {
      await axios
        .get(`http://localhost:8000/product/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  // Handles the button when clicked for delete
  async function handleDelete(productId) {
    deleteProduct(productId);
    navigate("/");
  }

  // Adds or removes product on user favorites
  async function addRemoveFavorites() {
    try {
      await axios
        .post(
          `http://localhost:8000/favorite/${id}`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setFavoritesArray(res.data.favorites);
          localStorage.setItem(
            `favorites_${decoded.id}`,
            JSON.stringify(res.data.favorites)
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let storedFavorites = localStorage.getItem(`favorites_${decoded?.id}`);
    if (storedFavorites) {
      setFavoritesArray(JSON.parse(storedFavorites));
    }
  }, [decoded?.id]);

  // Adds products to local storage for shopping cart
  function addToCart(productId, productName, quantity, productPrice) {
    let cart = {
      productId: productId,
      productName: productName,
      quantity: quantity,
      productPrice: productPrice,
    };

    const oldCart =
      JSON.parse(localStorage.getItem(`cart_${decoded?.id}`)) || [];
    setCartArray([cart, ...cartArray]);
    localStorage.setItem(
      `cart_${decoded?.id}`,
      JSON.stringify([...oldCart, cart])
    );
    dispatch(increaseCartCount(1));
  }

  useEffect(() => {}, [cartArray]);

  function alertToSignIn() {
    return;
  }

  // Adds the comments to database
  async function addComment(commentBody, commentId = null) {
    let newComment = {
      text: commentBody,
      productId: id,
      parentId: commentId,
    };
    await axios
      .post(`http://localhost:8000/comment`, newComment, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // setCommentsArray([...commentsArray, res.data.newComment]);
        getComments()
      });
  }

  // Gets the comments from database
  async function getComments() {
    try {
      await axios
        .get(`http://localhost:8000/comment/${id}`)
        .then((res) => {
          setCommentsArray(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="productsPageContainer">
      <div className="productSection">
        <div className="productsPageLeftSide">
          <img
            className="productPageImage"
            src={product.image}
            alt="productImage"
          />
        </div>
        <div className="productsPageRightSide">
          <div className="productPageBrand">{product.brand}</div>
          <div className="productPageTopContainer">
            <div className="productPageNameContainer">
              <p className="productPageName">{product.name}</p>
            </div>
            <div className="productPageFavContainer">
              {token ? (
                <div className="productPageFav">
                  {favoritesArray.includes(product._id) ? (
                    <FavoriteIcon
                      onClick={addRemoveFavorites}
                      style={{ color: "#FF0000" }}
                    />
                  ) : (
                    <FavoriteBorderIcon onClick={addRemoveFavorites} />
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="productPageEditDelete">
              {token && product.owner === decoded.id ? (
                <>
                  <Link to={`/edit/${product._id}`} className="editButton">
                    <EditIcon
                      style={{ color: "#333" }}
                      sx={{ fontSize: "1.4em" }}
                    />
                  </Link>
                  <ClearIcon
                    style={{ color: "#333" }}
                    onClick={() => handleDelete(product._id)}
                    sx={{ fontSize: "1.4em" }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <p className="productPagePrice">{product.price} €</p>
          <div className="quantityButtons">
            <h4>Quantity</h4>
            <ButtonGroup
              style={{
                width: "100%",
                height: "5vh",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#000",
                }}
                aria-label="reduce"
                onClick={() => {
                  setCount(Math.max(count - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#000",
                  borderRadius: "5%",
                }}
              >
                {" "}
                {count}{" "}
              </Button>
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#000",
                  borderRadius: "5%",
                }}
                aria-label="increase"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
          <div className="addToCartButtonContainer">
            {token ? (
              <>
                <Button
                  style={{
                    backgroundColor: "#f2f2f2",
                    color: "#000",
                    borderColor: "#000",
                    width: "100%",
                    height: "5vh",
                    fontSize: "1em",
                  }}
                  variant="outlined"
                  onClick={() => {
                    addToCart(product._id, product.name, count, product.price);
                    handleClick();
                  }}
                >
                  Add to cart
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Product added to cart!
                  </Alert>
                </Snackbar>
              </>
            ) : (
              <>
                <Button
                  style={{
                    backgroundColor: "#f2f2f2",
                    color: "#000",
                    borderColor: "#000",
                    width: "100%",
                    height: "5vh",
                    fontSize: "1em",
                  }}
                  variant="outlined"
                  onClick={() => {
                    alertToSignIn();
                    handleClick();
                  }}
                >
                  Add to cart
                </Button>
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
                    You have to sign in first!
                  </Alert>
                </Snackbar>
              </>
            )}
          </div>
          <div className="productPageDescContainer">
            <h4>Description</h4>
            <p className="productPageDesc">{product.description}</p>
          </div>
          {/* <button>Contact with seller</button> */}
        </div>
      </div>
      <div>
        <AddComment addComment={addComment} />
        {commentsArray.map((comment, i) => (
          <div key={i}>
            <CommentItem comment={comment} commentsArray={commentsArray} addComment={addComment} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
