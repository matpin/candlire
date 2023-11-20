import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import UserProfile from "./components/UserProfile";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import SuccessPayment from "./components/SuccessPayment";
import PageNotFound from "./components/PageNotFound";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";

function App() {
  const [productsArray, setProductsArray] = useState([]);
  let token = localStorage.getItem("token");

  // Gets all items
  async function getAllProducts() {
    try {
      await axios.get(`http://localhost:8000/products`).then((res) => {
        setProductsArray(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  // Adds products
  async function addNewProduct(
    productBrand,
    productName,
    productCategory,
    productImage,
    productPrice,
    productDescription
  ) {
    let newProduct = {
      brand: productBrand,
      name: productName,
      category: productCategory,
      image: productImage,
      price: productPrice,
      description: productDescription,
    };
    try {
      await axios
        .post(`http://localhost:8000/create`, newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // setProductsArray([res.data.newProduct, ...productsArray])
        });
    } catch (error) {
      console.log(error);
    }
  }

  // Deletes a product
  async function deleteProduct(id) {
    try {
      await axios
        .delete(`http://localhost:8000/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setProductsArray(
            productsArray.filter((deleteProduct) => {
              return deleteProduct._id !== id;
            })
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(editedProduct) {
    try {
      await axios
        .put(`http://localhost:8000/${editedProduct._id}`, editedProduct, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setProductsArray(
            productsArray.map((updateProduct) => {
              if (updateProduct._id === editedProduct._id) {
                return { ...updateProduct, ...editedProduct };
              }
              return updateProduct;
            })
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar setProductsArray={setProductsArray} />
        <Routes className="contentContainer">
          <Route path="/" element={<Homepage />} />
          <Route
            path="/products"
            element={<Catalog productsArray={productsArray} />}
          />
          <Route
            path="/create"
            element={<AddProduct addNewProduct={addNewProduct} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                deleteProduct={deleteProduct}
                setProductsArray={setProductsArray}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={<EditProduct editProduct={editProduct} />}
          />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout_success" element={<SuccessPayment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
