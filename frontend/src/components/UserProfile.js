import React, { useState } from "react";
import MyProducts from "./MyProducts";
import Favorites from "./Favorites";
import { Link } from "react-router-dom";
import MyOrders from "./MyOrders";
import SignIn from "./SignIn";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";
import Button from '@mui/material/Button';

function UserProfile() {
  let token = localStorage.getItem("token");
  const [option, setOption] = useState("myProducts");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  // Handles what component user should see
  function handler(value) {
    setOption(value);
  }

  return (
    <div className="profilePageContainer">
      {token ? (
        <div className="innerProfilePageContainer">
          <div className="profilePageSideBar">
            <div className="profileGreeting">Hello, {decoded.username} </div>
            <Link className="myProfileLinks" onClick={() => handler("myProducts")}>My Products</Link>
            <Link className="myProfileLinks" onClick={() => handler("myFavorites")}>My Favorites</Link>
            <Link className="myProfileLinks" onClick={() => handler("myOrders")}>My Orders</Link>
          </div>
          <div className="profilePageContent">
            {option === "myProducts" ? (
              <div>
                <div className="addButton">
                  <Link to="/create">
                    <Button variant="outlined" style={{color: "grey", borderBlockColor: "grey"}}>Add Product</Button>
                  </Link>
                </div>
                <div className="profileProductContent">
                  <MyProducts />
                </div>
              </div>
            ) : option === "myFavorites" ? (
              <Favorites />
            ) : option === "myOrders" ? (
              <MyOrders />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default UserProfile;
