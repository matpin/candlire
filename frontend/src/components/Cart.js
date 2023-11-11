import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function Cart() {
    const [mergeCartItems, setMergeCartItems] = useState([]);
  let token = localStorage.getItem("token");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  }

  // Gets the products that are in the cart from local storage
  function showCart() {
    let storedCart = JSON.parse(localStorage.getItem(`cart_${decoded.id}`));

  setMergeCartItems(storedCart.reduce((acc, cur) => {
    let existingProduct = acc.find((p) => p.productId === cur.productId);

    if (existingProduct) {
      existingProduct.quantity += cur.quantity;
    } else {
      acc.push({ ...cur });
    }

    return acc;
  }, []))}

  useEffect(() => {
    showCart();
  }, [])

  // let countProducts = mergeCartItems.reduce((sum, p) => sum + p.quantity, 0);

  // Deletes items from cart
  function handleDeleteItem(id) {
    const updateCart = mergeCartItems.filter(item => item.productId !== id);
    setMergeCartItems(updateCart);
    localStorage.setItem(`cart_${decoded.id}`, JSON.stringify(updateCart));
  }

  console.log(mergeCartItems);
  return (
    <div>
      <div>
        {mergeCartItems.map((p) => (
          <div key={p.productId}>
            <Link to={`/product/${p.productId}`}>{p.productName}</Link>
            <p>{p.quantity}</p>
            <p>{p.productPrice} €</p>
            <button onClick={() => handleDeleteItem(p.productId)}>delete</button>
          </div>
        ))}
      </div>
      <div>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
