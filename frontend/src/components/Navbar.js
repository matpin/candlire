import React from "react";
import logo from "../../src/candlirelogo.png";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } else {
      return;
    }
  }

  function handleReturnHome(e) {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  }

  return (
    <div>
      {!token ? (
        <nav>
          <div>
            <div hidden></div>
            <img
              onClick={handleReturnHome}
              className="logo"
              src={logo}
              alt="candlireImage"
            />
            <p>Products</p>
          </div>
          <div>
            <ShoppingCartIcon />
            <Link to="/signin">Sign In /</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      ) : (
        <nav>
            <div>
            <div hidden></div>
            <img
              onClick={handleReturnHome}
              className="logo"
              src={logo}
              alt="candlireImage"
            />
            <p>Products</p>
          </div>
          <div>
            <Link><PersonIcon /></Link>
            <Link><ShoppingCartIcon /></Link>
            <p onClick={handleLogout}>Sign Out</p>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
