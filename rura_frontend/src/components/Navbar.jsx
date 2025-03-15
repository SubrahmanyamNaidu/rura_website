import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../slices/user";

const Navbar = () => {
  const user = useSelector((state) => state.user.payload); // Access user data from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1); // Replace with actual cart state

  // useEffect(() => {
  //   // Check if user is already logged in when the app loads
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:5000/api/auth/user", {
  //         withCredentials: true,
  //       });
  //       dispatch(updateUser(data)); // Set the user in Redux if already logged in
  //     } catch (err) {
  //       dispatch(updateUser(null)); // No user logged in
  //     }
  //   };

  //   fetchUser();
  // }, [dispatch]);

  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      // Clear user data from Redux state
      dispatch(updateUser(null));

      // Redirect user to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
        {user?.name && user?.name.slice(0,5)+"'s"} RURA CART 
        </Link>

        {/* Cart Icon (Always Visible) */}
        <Link to="/cart" className="relative md:hidden text-2xl m-1">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/products" className="hover:text-blue-500">Products</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>

        {/* Right Side: Cart & Authentication Links (Only for Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon for Desktop */}
          <Link to="/cart" className="relative text-2xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication Links */}
          {user ? (
            <>
              <Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Profile
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-300">
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-3xl text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>

          <ul className="text-gray-700 text-xl space-y-6 font-medium text-center">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>

          {/* Authentication Links */}
          <div className="mt-10 space-y-4 text-center">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block bg-blue-500 text-white px-6 py-3 rounded-lg text-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block bg-red-500 text-white px-6 py-3 rounded-lg text-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-500 text-white px-6 py-3 rounded-lg text-xl"
                onClick={() => setMenuOpen(false)}
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
