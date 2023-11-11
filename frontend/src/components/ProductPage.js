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

function ProductPage({ deleteProduct }) {
  const [product, setProduct] = useState({});
  const [favoritesArray, setFavoritesArray] = useState([]);
  const { id } = useParams();
  let token = localStorage.getItem("token");
  let decoded;
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [cartArray, setCartArray] = useState([]);


  if (token) {
    decoded = jwtDecode(token);
  }

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
    let storedFavorites = localStorage.getItem(`favorites_${decoded.id}`);
    if (storedFavorites) {
      setFavoritesArray(JSON.parse(storedFavorites));
    }
  }, [decoded.id]);

  // Adds products to local storage for shopping cart
  function addToCart(productId, productName, quantity, productPrice) {
    let cart = {
      productId: productId,
      productName: productName,
      quantity: quantity,
      productPrice: productPrice
    }

    const oldCart = JSON.parse(localStorage.getItem(`cart_${decoded.id}`)) || [];
    setCartArray([cart, ...cartArray]);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify([...oldCart, cart]));
  }

  useEffect(() => {
  }, [cartArray])

  return (
    <div>
      <div>
        <img className="image2" src={product.image} alt="productImage" />
      </div>
      <div>
        <div>{product.brand}</div>
        <div>
          <div>
            <h1>{product.name}</h1>
            {token ? (
              <div>
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
          <div>
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
        <p>{product.price} €</p>
        <label>Quantity</label>
        <ButtonGroup
          style={{
            backgroundColor: "#f2f2f2",
            color: "#000",
            borderColor: "#000",
          }}
        >
          <Button
            style={{
              backgroundColor: "#f2f2f2",
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
              backgroundColor: "#f2f2f2",
              color: "#000",
              borderColor: "#000",
            }}
          >
            {" "}
            {count}{" "}
          </Button>
          <Button
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
              borderColor: "#000",
            }}
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button
          style={{
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "#000",
          }}
          variant="outlined"
          onClick={() => addToCart(product._id, product.name, count, product.price)}
        >
          Add to cart
        </Button>
        <p>{product.description}</p>
        {/* <button>Contact with seller</button> */}
      </div>
    </div>
  );
}

export default ProductPage;
