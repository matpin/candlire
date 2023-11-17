import React, { useEffect, useState } from "react";
import logo from "../../src/candlirelogo.png";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Searchbar from "./Searchbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { updateCartCount } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Navbar({ setProductsArray }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.count);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(anchorEl, "aaa");
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/products");
  };

  useEffect(() => {
    let decoded;
    if (token) {
      decoded = jwtDecode(token);
      let cart = localStorage.getItem(`cart_${decoded.id}`);
      if (cart) {
        let productCount = JSON.parse(cart).length;
        console.log(productCount);
        dispatch(updateCartCount(productCount));
      }
    }
  }, [token, dispatch]);

  // Handles log out and removes token from local storage
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
    <nav className="navbarContainer">
      <div className="navLeftSide">
        <div className="burgerIcon" hidden></div>
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
              color: "#333",
              marginTop: "1em",
              textTransform: "capitalize",
              fontSize: "1em",
            }}
            sx = {{"&:hover": {textDecoration: "underline"},}}
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
      {!token ? (
        <div className="navRightSide">
          <div className="navSearchBar">
            <Searchbar setProductsArray={setProductsArray} />
          </div>
          <Link to="/cart">
            <ShoppingCartIcon style={{ color: "#333", fontSize: "25" }} />
          </Link>
          <div>
          <Box style={{ padding: "0", margin: "0" }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu}>
                <PersonIcon style={{ color: "#333", fontSize: "30" }} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/signin" className="signUpInOut">
                  Sign In / Sign Up
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          </div>
        </div>
      ) : (
        <div className="navRightSide">
          <div className="navSearchBar">
            <Searchbar setProductsArray={setProductsArray} />
          </div>
          <Link to="/cart">
            {cartCount > 0 ? (
              <StyledBadge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon style={{ color: "#333", fontSize: "25" }} />
              </StyledBadge>
            ) : (
              <ShoppingCartIcon style={{ color: "#333", fontSize: "25" }} />
            )}
          </Link>
          <Box style={{ padding: "0", margin: "0" }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu}>
                <PersonIcon style={{ color: "#333", fontSize: "30" }} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link className="navMyProfileLink" to="/myprofile">
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link className="signUpInOut" onClick={handleLogout}>
                  Sign Out
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
