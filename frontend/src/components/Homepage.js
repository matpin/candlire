import React from "react";
import homepageImage from "../../src/homepageImage7.jpg";
import "./Homepage.css";
import { Link } from "react-router-dom";
import LatestsProducts from "./LatestsProducts";
import BestSeller from "./BestSellers";
import blackFriday from "../../src/blackFriday.jpg";

function Homepage() {
  let token = localStorage.getItem("token");

  return (
    <div>
      <div className="homepageContainer">
        <div className="newsContainer">
          <div className="newsContent">
            <div className="newsHeadContainer">
              <h1 className="newsHead">Black Friday</h1>
              <h1 className="newsDetails">35% OFF everything!</h1>
            </div>
            <p className="newsParagraph">
              Use the promotion code on every checkout until 26/11/23.
            </p>
            <Link className="newsLink" to="/products">
              Shop now
            </Link>
          </div>
          <div className="newsImageContainer">
            <img
              className="newsImage"
              src={blackFriday}
              alt="blackFridayImage"
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
