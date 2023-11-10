import React, { useState } from 'react';
import MyProducts from './MyProducts';
import Favorites from './Favorites';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [option, setOption] = useState("myProducts");

  function handler(value) {
    setOption(value);
    console.log();
  }

  return (
    <div className="profilePageContainer">
      <div className="profilePageSideBar">
        <ul>
          <li onClick={() => handler("myProducts")}>My Products</li>
          <li onClick={() => handler("myFavorites")}>My Favorites</li>
        </ul>
      </div>
      <div className="profilePageContent">
        <div>
          <Link to="/create">
          <button>Add Product</button>
          </Link>
        </div>
        <div>
        {option === "myProducts" ? (<MyProducts />) : option === "myFavorites" ? (<Favorites />) : ("")}
        {/* {option === "myFavorites" ?? (<Favorites />) } */}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;