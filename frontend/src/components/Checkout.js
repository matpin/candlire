import axios from "axios";
import React from "react";
// import { jwtDecode } from "jwt-decode";

function Checkout({ cartItems }) {
  let token = localStorage.getItem("token");
//   let decoded;

//   if (token) {
//     decoded = jwtDecode(token);
//   }

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
      <button onClick={() => handleCheckout()}>Checkout</button>
    </div>
  );
}

export default Checkout;