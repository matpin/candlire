import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BestSellers.css";

function BestSeller() {
  const [bestSellers, setBestSellers] = useState([]);

  // Gets the 4 best sellers from database
  async function getBestSellers() {
    try {
      await axios.get(`http://localhost:8000/bestseller`).then((res) => {
        setBestSellers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBestSellers();
  }, []);

  return (
    <div className="bestSellerContainer">
      <h1 className="bestSellerTitle">Best sellers</h1>
      <div className="innerBestSellerContainer">
        {bestSellers.map((b) => (
          <div key={b._id} className="innerBestSeller">
            <Link to={`/product/${b._id}`} className="bestSellerLinks">
              <img
                className="bestSellerImage"
                src={b.image}
                alt="productImage"
              />
              <p className="bestSellerBrand">{b.brand}</p>
              <h4 className="bestSellerName">{b.name}</h4>
              <p className="bestSellerPrice">{b.price} €</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;