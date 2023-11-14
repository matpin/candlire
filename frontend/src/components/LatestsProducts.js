import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LatestsProducts.css";

function LatestsProducts() {
  const [latestProducts, setLatestProducts] = useState([]);

  // Gets the 4 latest products from database
  async function getLatests() {
    try {
      await axios.get(`http://localhost:8000/latests`).then((res) => {
        setLatestProducts(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLatests();
  }, []);

  return (
    <div>
      <h1 className="latestsTitle">Latest</h1>
      <div className="latestsContainer">
        {latestProducts.map((l) => (
          <div key={l._id} className="innerLatestsContainer">
            <Link to={`/product/${l._id}`} className="latestsLinks">
              <img
                className="latestProductsImage"
                src={l.image}
                alt="productImage"
              />
              <p className="latestProductsBrand">{l.brand}</p>
              <h4 className="latestProductsName">{l.name}</h4>
              <p className="latestProductsPrice">{l.price} €</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestsProducts;
