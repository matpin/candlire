import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

function Checkout({ cartItems }) {
  let token = localStorage.getItem("token");

  // Handles the checkout button and redirect to stripe for payment action
  async function handleCheckout() {
    try {
      await axios
        .post(`http://localhost:8000/create-checkout-session`, cartItems, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data);
          if (res.data) {
            window.location.href = res.data.url;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={() => handleCheckout()}>Checkout</Button>
    </div>
  );
}

export default Checkout;
