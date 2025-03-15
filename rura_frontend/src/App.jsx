import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";


import CreateVendor from "./pages/CreateVendor";
import AddProduct from "./pages/AddProduct";
import AdminVendorProducts from "./pages/AdminVendorProducts";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import {updateUser} from "./slices/user"
import axios from "axios";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
        dispatch(updateUser(data));
        console.log(data)
      } catch (err) {
        // console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/create-vendor" element={<CreateVendor />} />
        <Route path="/vendor/add-product" element={<AddProduct />} />
        <Route path="/admin/vendor-products" element={<AdminVendorProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App