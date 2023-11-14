import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Cart() {
  const [mergeCartItems, setMergeCartItems] = useState([]);
  const [count, setCount] = useState(1);
  let token = localStorage.getItem("token");
  let decoded;

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

  // let countProducts = mergeCartItems.reduce((sum, p) => sum + p.quantity, 0);

  // Deletes items from cart
  function handleDeleteItem(id) {
    const updateCart = mergeCartItems.filter((item) => item.productId !== id);
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
  }

  // Adds one item on local storage array
  function addQuantity(product) {
    const updateCart = mergeCartItems.map((update) => {
      if (update.productId === product.productId) {
        return {...update, quantity: product.quantity + 1}
      }
      return update;
    })
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
    window.location.reload();
    console.log(mergeCartItems);
  }

  // Removes one item from local storage array
  function removeQuantity(product) {
    const updateCart = mergeCartItems.map((update) => {
      if (update.productId === product.productId) {
        const updatedQuantity = Math.max(update.quantity - 1, 1);
        return {...update, quantity: updatedQuantity}
      }
      return update;
    })
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
    window.location.reload();
    console.log(mergeCartItems);
    
  }
 
  return (
    <div>
      <div>
        <div>
          {mergeCartItems.map((p) => (
            <div key={p.productId}>
              <Link to={`/product/${p.productId}`}>{p.productName}</Link>
              <p>{p.quantity}</p>
              <ButtonGroup
          style={{
            backgroundColor: "#f2f2f2",
            color: "#000",
            borderColor: "#000",
          }}
        >
          <Button
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
              borderColor: "#000",
            }}
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0)); removeQuantity(p);
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
              borderColor: "#000",
            }}
          >
            {" "}
            {count + p.quantity - 1}{" "}
          </Button>
          <Button
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
              borderColor: "#000",
            }}
            aria-label="increase"
            onClick={() => {
              setCount(count + 1); addQuantity(p);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
              <p>{p.productPrice} €</p>
              <button onClick={() => handleDeleteItem(p.productId)}>
                delete
              </button>
            </div>
          ))}
        </div>
        <div>
          {mergeCartItems.length !== 0 ? (
            <Checkout cartItems={mergeCartItems} />
          ) : (
            <div>
              <p>Your cart is empty</p>
              <Link to="/">Back to store...</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
