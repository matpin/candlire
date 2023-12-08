import axios from "axios";
import React, { useEffect, useState } from "react";

function SalesHistory() {
  let token = localStorage.getItem("token");
  const [salesList, setSalesList] = useState([]);

  // Gets sales history from database
  async function getMyOrders() {
    try {
      await axios
        .get(`http://localhost:8000/sales`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setSalesList(res.data);
        });
    } catch (error) {}
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  console.log(salesList);

  return (
    <div>
      {salesList.length !== 0 ? (
        <>
          
        </>
      ) : (
        <p>No sales history yet.</p>
      )}
    </div>
  );
}

export default SalesHistory;
