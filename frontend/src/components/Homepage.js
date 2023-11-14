import React from "react";
import homepageImage from "../../src/homepageImage7.jpg";
import "./Homepage.css";
import { Link } from "react-router-dom";
import LatestsProducts from "./LatestsProducts";
import BestSeller from "./BestSellers";

function Homepage() {
  let token = localStorage.getItem("token");

  return (
    <div >
      <div className="homepageContainer">
      <img className="homepageImage" src={homepageImage} alt="homepageImage" />
      {!token ? (
      <div className="introContainer">
          <p className="introParagraph">
          Candlire is a community for selling or buying handmade candles. <Link to="signin">Sign
          In / Sign Up</Link> to sell or buy.
        </p>
      </div>
      ) : ("")}
      </div>
      <BestSeller />
      <LatestsProducts />
    </div>
  );
}

export default Homepage;
