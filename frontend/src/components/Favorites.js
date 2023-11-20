import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";
import "./Favorites.css";

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  // Gets user favorites
  async function getFavorites() {
    await axios
      .get(`http://localhost:8000/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFavoritesList(res.data);
      });
  }

  useEffect(() => {
    getFavorites();
  }, []);

  // Removes favorite from user favorites page
  async function addRemoveFavorites(productId) {
    try {
      await axios
        .post(
          `http://localhost:8000/favorite/${productId}`,
          { productId: productId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setFavoritesList(favoritesList.filter((f) => f._id !== productId));
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
      setFavoritesList(JSON.parse(storedFavorites));
    }
  }, [decoded.id]);

  return (
    <div>
      {favoritesList.length !== 0 ? (
        <div className="myFavoritesContainer">
          {favoritesList.map((f, i) => (
        <div key={i} className="innerMyFavoritesContainer">
          <Link to={`/product/${f._id}`}>
            <img className="favoritesImage" src={f.image} alt="productImage" />
          </Link>
          <div className="favoritesDetailsFavIcon">
            <Link className="favoritesLinks" to={`/product/${f._id}`}>
              <p className="favoritesBrand">{f.brand}</p>
              <p className="favoritesName">{f.name}</p>
            </Link>
            <div>
              <FavoriteIcon
                onClick={() => addRemoveFavorites(f._id)}
                style={{ color: "#FF0000" }}
              />
            </div>
          </div>
          <Link className="favoritesLinks" to={`/product/${f._id}`}>
            <p className="favoritesPrice">{f.price} €</p>
          </Link>
        </div>
      ))}
        </div>
      ) : (
        <p className="noFavoritesYet">No favorites added yet.</p>
      )}
    </div>
  );
}

export default Favorites;