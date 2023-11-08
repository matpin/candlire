import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';

function App() {
  const [productsArray, setProductsArray] = useState([]);

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
        .post(`http://localhost:8000/create`, newProduct)
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
        .delete(`http://localhost:8000/${id}`)
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
        .put(`http://localhost:8000/${editedProduct._id}`, editedProduct)
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
      <Routes>
      <Route path="/create" element={<AddProduct addNewProduct={addNewProduct} />} />
      <Route path="/" element={<ProductsList productsArray={productsArray} deleteProduct={deleteProduct} />} />
      <Route path="/edit/:id" element={<EditProduct editProduct={editProduct} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
