import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import "./SuccessPayment.css";

function SuccessPayment() {
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  localStorage.removeItem(`cart_${decoded.id}`);
  
  return (
    <div className="checkoutSuccessContainer">
        <h1 className="checkoutSuccessHead">Payment completed.</h1>
        <Link className="checkoutSuccessLink" to="/">Return to Homepage</Link>
    </div>
  )
}

export default SuccessPayment;