import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import "./MyProducts.css";

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
    <div >
      {myProductsArray.length !== 0 ? (
        <div className="myProductsContainer">
          {myProductsArray.map((p, i) => (
          <div key={i} className="innerMyProductsContainer">
            <Link className="myProductsLinks" to={`/product/${p._id}`}>
              <img className="productsImage" src={p.image} alt="productImage" />
              <div className="productsDetails">
                <p className="myProductsBrand">{p.brand}</p>
                <p className="myProductsName">{p.name}</p>
              </div>
              <p className="myProductsPrice">{p.price} €</p>
            </Link>
          </div>
        ))}
        </div>
        
      ) : (
        <p className="noProductsYet">No products added yet.</p>
      )}
      
    </div>
  );
}

export default MyProducts;
