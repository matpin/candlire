import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Cart.css";
import {
  increaseCartCount,
  decreaseCartCount,
  resetCartCount,
} from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Cart() {
  const [mergeCartItems, setMergeCartItems] = useState([]);
  const [count, setCount] = useState(1);
  let token = localStorage.getItem("token");
  let decoded;
  const dispatch = useDispatch();
  let totalPrice;

  if (token) {
    decoded = jwtDecode(token);
  }

  // Gets the products that are in the cart from local storage
  function showCart() {
    if (decoded) {
      let storedCart = JSON.parse(localStorage.getItem(`cart_${decoded.id}`));

      if (storedCart !== null) {
        setMergeCartItems(
          storedCart.reduce((acc, cur) => {
            let existingProduct = acc.find(
              (p) => p.productId === cur.productId
            );

            if (existingProduct) {
              existingProduct.quantity += cur.quantity;
            } else {
              acc.push({ ...cur });
            }

            return acc;
          }, [])
        );
      }
    }
  }

  useEffect(() => {
    showCart();
  }, []);

  if (decoded) {
    let storedCart = JSON.parse(localStorage.getItem(`cart_${decoded.id}`));
    if (storedCart !== null) {
      totalPrice = storedCart.reduce((acc, cur) => {
        if (cur.productPrice > 0) {
          return acc + cur.productPrice * cur.quantity;
        }
        return acc;
      }, 0);
    }
  }

  // Deletes items from cart
  function handleDeleteItem(id) {
    const updateCart = mergeCartItems.filter((item) => item.productId !== id);
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));

    if (mergeCartItems.length > 1) {
      dispatch(decreaseCartCount(1));
    } else if (mergeCartItems.length === 1) {
      dispatch(resetCartCount());
    }
  }

  // Adds one item on local storage array
  function addQuantity(product) {
    const updateCart = mergeCartItems.map((update) => {
      if (update.productId === product.productId) {
        dispatch(increaseCartCount(1));
        return { ...update, quantity: product.quantity + 1 };
      }
      return update;
    });
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
  }

  // Removes one item from local storage array
  function removeQuantity(product) {
    const updateCart = mergeCartItems.map((update) => {
      if (update.productId === product.productId) {
        const updatedQuantity = Math.max(update.quantity - 1, 1);
        dispatch(decreaseCartCount(1));
        return { ...update, quantity: updatedQuantity };
      }
      return update;
    });
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
  }

  function handleRemoveAll() {
    setMergeCartItems([]);
    localStorage.removeItem(`cart_${decoded.id}`);
    dispatch(resetCartCount());
  }

  return (
    <div className="cartContainer">
      <h1 className="cartTitle">Shopping Cart</h1>
      {mergeCartItems.length !== 0 ? (
        <div>
          <TableContainer component={Paper} sx={{ minWidth: "100%" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontFamily: "Lora",
                      fontWeight: "bold",
                      fontSize: "1em",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "Lora",
                      fontWeight: "bold",
                      fontSize: "1em",
                    }}
                    // align="right"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "Lora",
                      fontWeight: "bold",
                      fontSize: "1em",
                    }}
                    align="right"
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              {mergeCartItems.map((p) => (
                <TableBody key={p._id}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      style={{ fontFamily: "Lora" }}
                      component="th"
                      scope="o"
                    >
                      <div className="cartProductNameContainer">
                      <Link
                        to={`/product/${p.productId}`}
                        className="cartProductName"
                      >{p.productName}</Link>
                      <p className="removeProduct" onClick={() => handleDeleteItem(p.productId)}>Remove</p>
                      </div>
                    </TableCell>
                    <TableCell style={{ fontFamily: "Lora" }}>
                      <ButtonGroup
                        className="cartProductQuantity"
                      >
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#333",
                            borderColor: "gray",
                          }}
                          aria-label="reduce"
                          onClick={() => {
                            setCount(Math.max(count - 1, 0));
                            removeQuantity(p);
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#333",
                            borderColor: "gray",
                          }}
                        >
                          {" "}
                          {p.quantity}{" "}
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#333",
                            borderColor: "gray",
                          }}
                          aria-label="increase"
                          onClick={() => {
                            setCount(count + 1);
                            addQuantity(p);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell style={{ fontFamily: "Lora", fontSize: "1.1em" }} align="right">
                      {p.productPrice} €
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <div className="total">Total: {totalPrice} €</div>
          <div className="cartBottomContainer">
            <Button
              style={{
                backgroundColor: "red",
                fontFamily: "Lora",
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "1.1em",
                padding: "0.4em",
                width: "8em",
              }}
              onClick={handleRemoveAll}
            >
              Clear Cart
            </Button>
            <Checkout cartItems={mergeCartItems} />
          </div>
        </div>
      ) : (
        <div className="emptyCartContainer">
          <p>Your cart is empty</p>
          <Link className="backToStoreLink" to="/">
            Back to store...
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
