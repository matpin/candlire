import React, { useState } from "react";
import MyProducts from "./MyProducts";
import Favorites from "./Favorites";
import { Link } from "react-router-dom";
import MyOrders from "./MyOrders";
import SignIn from "./SignIn";

function UserProfile() {
  let token = localStorage.getItem("token");
  const [option, setOption] = useState("myProducts");

  function handler(value) {
    setOption(value);
    console.log();
  }

  return (
    <div className="profilePageContainer">
      {token ? (
        <div>
          <div className="profilePageSideBar">
        <ul>
          <li onClick={() => handler("myProducts")}>My Products</li>
          <li onClick={() => handler("myFavorites")}>My Favorites</li>
          <li onClick={() => handler("myOrders")}>My Orders</li>
        </ul>
      </div>
      <div className="profilePageContent">
        <div>
          {option === "myProducts" ? (
            <div>
              <div>
                <Link to="/create">
                  <button>Add Product</button>
                </Link>
              </div>
              <MyProducts />
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
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default UserProfile;
