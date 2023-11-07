import { useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './components/AddProduct';

function App() {
  const [productsArray, setProductsArray] = useState([]);

  // Adds products
  async function addNewProduct(productBrand, productName, productCategory, productImage, productPrice, productDescription) {
    let newProduct = {
      brand: productBrand,
      name: productName,
      category: productCategory,
      image: productImage,
      price: productPrice,
      description: productDescription
    }
    try {
      await axios
        .post(`http://localhost:8000/create`, newProduct)
        .then((res) => {
          setProductsArray([res.data.newProduct, ...productsArray])
        })
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/create" element={<AddProduct addNewProduct={addNewProduct} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
