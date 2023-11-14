import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function MyProducts() {
    const [myProductsArray, setMyProductsArray] = useState([])
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  // Gets only products that user added
  function getMyProducts(owner) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8000/products`,
      headers: {
        "Content-Type": "application/json",
      },
      params: { body: JSON.stringify({ owner: owner }) },
    };

    axios
      .request(config)
      .then((res) => {
        setMyProductsArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getMyProducts(decoded.id);
  }, [decoded.id])

  return (
    <div>
      {myProductsArray.map((p, i) => (
        <div key={i}>
          <Link to={`/product/${p._id}`}>
            <img className="favoritesImage" src={p.image} alt="productImage" />
            <div>
              <p>{p.brand}</p>
              <p>{p.name}</p>
            </div>
            <p>{p.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
