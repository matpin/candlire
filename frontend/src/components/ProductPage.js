import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ProductPage({ deleteProduct }) {
  const [product, setProduct] = useState({});
  const [favoritesArray, setFavoritesArray] = useState([]);
  const { id } = useParams();
  let token = localStorage.getItem("token");
  let decoded;

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
  }

  // Adds product on user favorites
  async function addFavorites() {
    try {
      await axios
        .post(
          `http://localhost:8000/favorite/${id}`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
            console.log(res.data);
          setFavoritesArray(res.data.favorites);
          localStorage.setItem("favorites", JSON.stringify(res.data.favorites));
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoritesArray(favoritesFromStorage);
  }, []);

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
                    onClick={addFavorites}
                    style={{ color: "#FF0000" }}
                  />
                ) : (
                  <FavoriteBorderIcon onClick={addFavorites} />
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
        <p>{product.price}</p>
        <p>{product.description}</p>
        {/* <button>Contact with seller</button> */}
      </div>
    </div>
  );
}

export default ProductPage;