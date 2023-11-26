import React, { useEffect, useState } from "react";
import logo from "../../src/candlirelogo.png";
import { Link, useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
        navigate("/products");
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
        setProductsArray(res.data);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <nav className="navbarContainer">
        <div className="navLeftSide">
          <div className="burgerIcon" hidden>
            <MenuIcon
              style={{
                color: "#333",
                fontSize: "30",
                marginRight: "0.5em",
                marginLeft: "0.5em",
                fontWeight: "bolder",
              }}
              onClick={() => setShowSideNav(true)}
            />
            {showSideNav ? (
              <div className="sideNavContainer">
                <ClearIcon
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "gray",
                    width: "100%",
                    paddingBottom: "0.1em",
                  }}
                  onClick={() => setShowSideNav(false)}
                />
                <div className="navSide">
                  <Link className="navMenuItemsLinks" to="/">
                    Home
                  </Link>
                  <div className="productsContainerDropdown">
                    <Link className="navMenuItemsLinks">
                      Products <ArrowDropDownIcon />
                    </Link>
                    <div className="dropdown">
                      <div
                        onClick={() => {
                          getAllProducts();
                        }}
                      >
                        <Link className="navProductsLink">All Products</Link>
                      </div>
                      <div
                        onClick={() => {
                          getByCategory("all_season");
                        }}
                      >
                        <Link className="navProductsLink">All Season</Link>
                      </div>
                      <div
                        onClick={() => {
                          getByCategory("christmas");
                        }}
                      >
                        <Link className="navProductsLink">Christmas</Link>
                      </div>
                      <div
                        onClick={() => {
                          getByCategory("halloween");
                        }}
                      >
                        <Link className="navProductsLink">Halloween</Link>
                      </div>
                      <div
                        onClick={() => {
                          getByCategory("summer");
                        }}
                      >
                        <Link className="navProductsLink">Summer</Link>
                      </div>
                      <div
                        onClick={() => {
                          getByCategory("easter");
                        }}
                      >
                        <Link className="navProductsLink">Easter</Link>
                      </div>
                    </div>
                  </div>
                  <Link to="/aboutus" className="navMenuItemsLinks">
                    About us
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <img
            onClick={handleReturnHome}
            className="logo"
            src={logo}
            alt="candlireImage"
          />
        </div>
        <div className="middleSide">
          <Link className="navMenuItemsLinks" to="/">
            Home
          </Link>
          <div className="productsContainerDropdown">
            <Link className="navMenuItemsLinks">
              Products <ArrowDropDownIcon />
            </Link>
            <div className="dropdown">
              <div
                onClick={() => {
                  getAllProducts();
                }}
              >
                <Link className="navProductsLink">All Products</Link>
              </div>
              <div
                onClick={() => {
                  getByCategory("all_season");
                }}
              >
                <Link className="navProductsLink">All Season</Link>
              </div>
              <div
                onClick={() => {
                  getByCategory("christmas");
                }}
              >
                <Link className="navProductsLink">Christmas</Link>
              </div>
              <div
                onClick={() => {
                  getByCategory("halloween");
                }}
              >
                <Link className="navProductsLink">Halloween</Link>
              </div>
              <div
                onClick={() => {
                  getByCategory("summer");
                }}
              >
                <Link className="navProductsLink">Summer</Link>
              </div>
              <div
                onClick={() => {
                  getByCategory("easter");
                }}
              >
                <Link className="navProductsLink">Easter</Link>
              </div>
            </div>
          </div>
          <Link to="/aboutus" className="navMenuItemsLinks">
            About us
          </Link>
        </div>
        {!token ? (
          <div className="navRightSide">
            <div className="navSearchBar" onClick={() => setIsClicked(true)}>
              {isClicked && showSearchBar ? (
                  <Searchbar
                setProductsArray={setProductsArray}
                setIsClicked={setIsClicked} />
              ) : (
                <SearchIcon
                  sx={{ fontSize: "2em" }}
                  style={{ color: "#333", marginRight: "0.3em" }}
                  onClick={() => setShowSearchBar(true)}
                />
              )}
            </div>
            <Link style={{ marginTop: "0.1em" }} to="/cart">
              <LocalMallIcon style={{ color: "#333", fontSize: "27" }} />
            </Link>
            <Box style={{ padding: "0", margin: "0" }}>
              <Tooltip title="Open profile">
                <Button onClick={handleOpenUserMenu}>
                  <PersonIcon
                    style={{
                      color: "#333",
                      fontSize: "30",
                      padding: "0",
                      margin: "0",
                    }}
                  />
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
        ) : (
          <div className="navRightSide">
            <div className="navSearchBar" onClick={() => setIsClicked(true)}>
              {isClicked && showSearchBar ? (
                <Searchbar
                  setProductsArray={setProductsArray}
                  setIsClicked={setIsClicked}
                />
              ) : (
                <SearchIcon
                  sx={{ fontSize: "2em" }}
                  style={{ color: "#333" }}
                  onClick={() => setShowSearchBar(true)}
                />
              )}
            </div>
            <Link to="/cart">
              {cartCount > 0 ? (
                <StyledBadge badgeContent={cartCount} color="secondary">
                  <LocalMallIcon style={{ color: "#333", fontSize: "25" }} />
                </StyledBadge>
              ) : (
                <LocalMallIcon style={{ color: "#333", fontSize: "25" }} />
              )}
            </Link>
            <Box style={{ padding: "0", margin: "0" }}>
              <Tooltip title="Open profile">
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
      {showSearchBar ? (
        <div hidden className="navSearchBarContainer">
        <Searchbar setProductsArray={setProductsArray} setIsClicked={setIsClicked} />
        <ClearIcon onClick={() => setShowSearchBar(false)} />
      </div>
      ) : ("")}
    </>
  );
}

export default Navbar;
