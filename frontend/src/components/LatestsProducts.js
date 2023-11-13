import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./LatestsProducts.css";

function LatestsProducts() {
    const [latestProducts, setLatestProducts] = useState([]);

    async function getLatests() {
        try {
          await axios
            .get(`http://localhost:8000/latests`)
            .then((res) => {
                setLatestProducts(res.data);
            })
        } catch (error) {
            console.log(error);
        }
      }
    
      useEffect(() => {
        getLatests();
      }, []);

  return (
    <div>
        <h1>Latests</h1>
        {latestProducts.map((l => (
            <div key={l._id}>
                <Link to={`/product/${l._id}`}>
                    <img className="latestProductsImage" src={l.image} alt="productImage" />
                    <p>{l.brand}</p>
                    <h4>{l.name}</h4>
                    <p>{l.price} €</p>
                </Link>
            </div>
        )))}
    </div>
  )
}

export default LatestsProducts