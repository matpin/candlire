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
      <Button style={{backgroundColor: "#000", fontFamily: "Lora", color: "#fff", textTransform: "capitalize", fontSize: "1.1em", padding: "0.4em", width: "8em"}} onClick={() => handleCheckout()}>Checkout</Button>
    </div>
  );
}

export default Checkout;
