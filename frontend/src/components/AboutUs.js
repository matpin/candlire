import React from "react";
import aboutUsImage2 from "../../src/aboutUsImage2.jpg";
import aboutUsImage from "../../src/aboutUsImage.jpg";
import "./AboutUs.css";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="aboutUsContainer">
      <div className="aboutUsTop">
        <div className="aboutUsImageContainer">
          <img
            className="aboutUsImage"
            src={aboutUsImage2}
            alt="homepageImage"
          />
        </div>
        <div className="aboutUsContentTop">
          <div className="aboutUsHead">
            <h1 className="aboutUsName">Candlire </h1>
            <h3 className="aboutUsMoto">"Crafting Light, Igniting Community"</h3>
          </div>
          <p className="aboutUsParagraph">
            Welcome to Candlire, where the art of illumination meets the spirit
            of community. Candlire isn't just a name; it's a fusion of "candle"
            and "fire," an enchanting anagram of "campfire." Here, we've crafted
            a haven for enthusiasts who appreciate the warmth and charm of
            handmade candles. Whether you're a passionate artisan seeking a
            platform to showcase your creations or a discerning buyer in search
            of unique, artisanal candles, you've found your home.
          </p>
        </div>
      </div>
      <hr className="separation"></hr>
      <div className="aboutUsBottom">
        <p className="aboutUsContentBottom">
          Our community is a melting pot of creativity and craftsmanship, where
          each flicker tells a story, and every wax creation is a testament to
          the dedication of its maker. We believe in the power of handmade,
          where every imperfection is a mark of authenticity, and every pour of
          wax is a labor of love.
          <br />
          <br />
          To fully immerse yourself in the Candlire experience,{" "}
          <Link className="aboutUsLink" to="/signin">sign in</Link> to buy, comment, or favorite, and
          become an integral part of our luminous world. At Candlire, we're not
          just a platform; we're a collective of candle enthusiasts, creators,
          and connoisseurs. Come, be a part of our glowing community, where the
          flame of creativity never wanes, and the glow of connection burns
          bright."
        </p>
        <div className="aboutUsImageContainerBottom">
          <img
            className="aboutUsBottomImage"
            src={aboutUsImage}
            alt="homepageImage"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
