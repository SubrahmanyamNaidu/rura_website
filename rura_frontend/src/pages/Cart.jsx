import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Rice",
      price: 100,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Fresh Apples",
      price: 50,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
  ]); // Replace with actual cart state

  // Function to update quantity
  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <span className="mx-2 text-lg">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
      )}

      {/* Continue Shopping Button */}
      <div className="text-center mt-6">
        <Link to="/products" className="text-blue-500 font-semibold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
