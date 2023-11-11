import React from 'react';
import { Link } from 'react-router-dom';

function SuccessPayment() {
  return (
    <div>
        <h1>Payment completed</h1>
        <Link to="/">Return to Homepage</Link>
    </div>
  )
}

export default SuccessPayment;