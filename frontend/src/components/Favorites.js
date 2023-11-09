import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  const { id } = useParams();
  let token = localStorage.getItem("token");

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

  // Removes favorite from user favorites array
  async function addFavorites(productId) {
    try {
      await axios
        .post(
            `http://localhost:8000/favorite/${id}`,
          { productId: productId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setFavoritesList(favoritesList.filter((f) => f._id !== productId));
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
    setFavoritesList(favoritesFromStorage);
  }, []);


  return (
    <div>
      <h1>My favorites</h1>
      {favoritesList.map((f, i) => (
        <div key={i}>
          <Link to={`/product/${f._id}`}>
            <img className="favoritesImage" src={f.image} alt="productImage" />
          </Link>
          <div>
            <div>
              <Link to={`/product/${f._id}`}>
                <p>{f.brand}</p>
                <p>{f.name}</p>
              </Link>
            </div>
            <div>
              <FavoriteIcon
                onClick={() => addFavorites(f._id)}
                style={{ color: "#FF0000" }}
              />
            </div>
          </div>
          <Link to={`/product/${f._id}`}>
            <p>{f.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
