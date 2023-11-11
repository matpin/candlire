import React, { useState } from "react";
import logo from "../../src/candlirelogo.png";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Searchbar from "./Searchbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function Navbar({ setProductsArray }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(anchorEl, "aaa");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } else {
      return;
    }
  }

  // Return on Homepage when the logo clicked
  function handleReturnHome(e) {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  }

  // Gets all product from navbar dropdown
  async function getAllProducts() {
    try {
      await axios.get(`http://localhost:8000/products`).then((res) => {
        setProductsArray(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Gets products by category from navbar dropdown
  function getByCategory(category) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8000/products`,
      headers: {
        "Content-Type": "application/json",
      },
      params: { body: JSON.stringify({ category: category }) },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setProductsArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div>
              <Button
                // id="basic-button"
                style={{
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Products
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    getAllProducts();
                    handleClose();
                  }}
                >
                  All Products
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("all_season");
                    handleClose();
                  }}
                >
                  All Season
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("christmas");
                    handleClose();
                  }}
                >
                  Christmas
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("halloween");
                    handleClose();
                  }}
                >
                  Halloween
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("summer");
                    handleClose();
                  }}
                >
                  Summer
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("easter");
                    handleClose();
                  }}
                >
                  Easter
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div>
            <Searchbar setProductsArray={setProductsArray} />
          </div>
          <div>
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
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
            <div>
              <Button
                style={{
                  backgroundColor: "#f2f2f2",
                  color: "#000",
                }}
                // id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Products
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    getAllProducts();
                    handleClose();
                  }}
                >
                  All Products
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("all_season");
                    handleClose();
                  }}
                >
                  All Season
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("christmas");
                    handleClose();
                  }}
                >
                  Christmas
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("halloween");
                    handleClose();
                  }}
                >
                  Halloween
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("summer");
                    handleClose();
                  }}
                >
                  Summer
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    getByCategory("easter");
                    handleClose();
                  }}
                >
                  Easter
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div>
            <Searchbar setProductsArray={setProductsArray} />
          </div>
          <div>
            <Link to="/myprofile">
              <PersonIcon />
            </Link>
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
            <Link onClick={handleLogout}>Sign Out</Link>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
