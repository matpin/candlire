import React from 'react';
import "./Footer.css";
import { Link } from 'react-router-dom';
import logo from "../../src/candlirelogo.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div className="footerContainer">
      <div className="titleLogoContainer">
      <img
          className="footerLogo"
          src={logo}
          alt="candlireImage"
        />
      <Link className="footerTitle" to="/">Candlire</Link>
      </div>
      <div className="footerDetails">
        <Link to="/" className="footerLinks">Home</Link>
        <Link to="aboutus" className="footerLinks">About us</Link>
      </div>
      <div className="socialMedia">
      <FacebookIcon style={{color: "#333", fontSize: "30"}} />
      <InstagramIcon style={{color: "#333", fontSize: "30"}} />
      </div>
      <p className="footerCopyrights">Candlire &copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  )
}

export default Footer;