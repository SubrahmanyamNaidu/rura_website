import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../slices/cart"; // Import actions
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  // Get the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.payload);

  // Function to handle quantity increment
  const handleIncrement = (productId, measurement, currentQuantity) => {
    const newQuantity = currentQuantity + 1; // Increase the quantity by 1
    dispatch(incrementQuantity({ productId, measurement, quantity: newQuantity }));
  };

  // Function to handle quantity decrement
  const handleDecrement = (productId, measurement, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; // Decrease the quantity by 1
      dispatch(decrementQuantity({ productId, measurement, quantity: newQuantity }));
    }
  };

  // Function to remove item from cart
  const handleRemoveItem = (productId, measurement) => {
    dispatch(removeFromCart({ productId, measurement }));
  };

  // Calculate total price
  const calculatePrice = (item) => {
    const price = item.price;
    return price * item.quantity;
  };

  // Calculate total cart price
  const totalPrice = cartItems.reduce(
    (total, item) => total + calculatePrice(item),
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {cartItems?.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cartItems.map((item) => (
            <div key={item.productId + item.measurement} className="flex items-center justify-between border-b pb-4 mb-4">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">₹{item.price.toFixed(2)}</p>
                <p className="text-gray-600">Measurement: {item.measurement}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                  onClick={() => handleDecrement(item.productId, item.measurement, item.quantity)}
                >
                  -
                </button>
                <span className="mx-2 text-lg">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                  onClick={() => handleIncrement(item.productId, item.measurement, item.quantity)}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleRemoveItem(item.productId, item.measurement)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
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
