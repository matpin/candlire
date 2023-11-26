import React from "react";
import homepageImage from "../../src/homepageImage7.jpg";
import "./Homepage.css";
import { Link } from "react-router-dom";
import LatestsProducts from "./LatestsProducts";
import BestSeller from "./BestSellers";
import christmasImage from "../../src/christmasImage2.jpg";

function Homepage() {
  let token = localStorage.getItem("token");

  return (
    <div>
      <div className="homepageContainer">
        <div className="newsContainer">
          <div className="newsContent">
            <div className="newsHeadContainer">
              <h1 className="newsHead">Christmas Sales</h1>
              <h1 className="newsDetails">10% OFF everything!</h1>
            </div>
            <p className="newsParagraph">
              Use the promotion code on every checkout. Ends 9/1/24.
            </p>
            <div hidden className="promotionCodeContainer">
            <p className="promotionCode">
              PROMOTION CODE: 
            </p>
            <p className="code">XMAS23</p>
            </div>
            <Link className="newsLink" to="/products">
              Shop now
            </Link>
          </div>
          <div className="newsImageContainer">
            <img
              className="newsImage"
              src={christmasImage}
              alt="christmasImage"
            />
          </div>
        </div>
        <BestSeller />
        <img
          className="homepageImage"
          src={homepageImage}
          alt="homepageImage"
        />
        {!token ? (
          <div className="introContainer">
            <p className="introParagraph">
              Candlire is a community for selling or buying handmade candles.{" "}
              <Link className="introParLink" to="/signin">Sign In / Sign Up</Link> to sell or buy.
            </p>
          </div>
        ) : (
          <div className="introContainer">
            <p className="introParagraph">
              Candlire, where the art of handmade candles sparks connections and
              kindles creativity. <br /> <Link className="introParLink" to="/aboutus">Learn more</Link>{" "}
              about us.
            </p>
          </div>
        )}
      </div>
      <LatestsProducts />
    </div>
  );
}

export default Homepage;
