import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import ProductPage from './components/ProductPage';

function App() {
  const [productsArray, setProductsArray] = useState([]);
  let token = localStorage.getItem("token");

  // Gets all items
  async function getAllProducts() {
    try {
      await axios
        .get(`http://localhost:8000/products`)
        .then((res) => {
          setProductsArray(res.data);
        })
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

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
        .post(`http://localhost:8000/create`, newProduct, {headers: {Authorization: `Bearer ${token}` }})
        .then((res) => {
          // setProductsArray([res.data.newProduct, ...productsArray])
        })
    } catch (error) {
        console.log(error);
    }
  }

  // Deletes a product
  async function deleteProduct(id) {
    try {
      await axios
        .delete(`http://localhost:8000/${id}`, {headers: {Authorization: `Bearer ${token}` }})
        .then(() => {
          setProductsArray(productsArray.filter(deleteProduct => {
            return deleteProduct._id !== id;
          }))
        })
    } catch (error) {
        console.log(error);
    }
  }

  async function editProduct(editedProduct) {
    try {
      await axios
        .put(`http://localhost:8000/${editedProduct._id}`, editedProduct, {headers: {Authorization: `Bearer ${token}` }})
        .then(() => {
          setProductsArray(productsArray.map(updateProduct => {
            if (updateProduct._id === editedProduct._id) {
              return {...updateProduct, ...editedProduct}
            }
            return updateProduct;
          }))
        })
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<ProductsList productsArray={productsArray} />} />
      <Route path="/create" element={<AddProduct addNewProduct={addNewProduct} />} />
      <Route path="/product/:id" element={<ProductPage deleteProduct={deleteProduct} />} />
      <Route path="/edit/:id" element={<EditProduct editProduct={editProduct} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
