import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function SuccessPayment() {
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  localStorage.removeItem(`cart_${decoded.id}`);
  
  return (
    <div>
        <h1>Payment completed</h1>
        <Link to="/">Return to Homepage</Link>
    </div>
  )
}

export default SuccessPayment;