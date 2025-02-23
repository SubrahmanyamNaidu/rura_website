import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CreateVendor from "./pages/CreateVendor";
import AddProduct from "./pages/AddProduct";
import AdminVendorProducts from "./pages/AdminVendorProducts";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/create-vendor" element={<CreateVendor />} />
        <Route path="/vendor/add-product" element={<AddProduct />} />
        <Route path="/admin/vendor-products" element={<AdminVendorProducts />} />
        
      </Routes>
    </Router>
  )
}

export default App