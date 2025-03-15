import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State to store the selected measurement and quantity for each product
  const [selectedMeasurements, setSelectedMeasurements] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);

      // Initialize selectedMeasurements state after products are fetched
      const initialMeasurements = data.reduce((acc, product) => {
        acc[product._id] = {
          measurement: product.product_measurement_types[0],
          quantity: 1,
        };
        return acc;
      }, {});
      setSelectedMeasurements(initialMeasurements);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  // Function to add product to the cart
  const addProductToCart = (product, measurement, quantity) => {
    // Add product to cart with measurement and quantity
    dispatch(addToCart({
      productId: product._id,
      name: product.product_name,
      price: calculatePrice(product, measurement, quantity),  // Calculate the price with discount
      image: product.product_image_urls[0] || "https://via.placeholder.com/150", // Image URL
      measurement: measurement,
      quantity: quantity
    }));
    alert(`Added ${product.product_name} with ${measurement} and quantity ${quantity} to cart`);
  };

  // Function to calculate the final price based on measurement and quantity
  const calculatePrice = (product, measurement, quantity) => {
    const price = product.product_price_by_measurements[measurement] || 0;
    const discount = product.product_discount_by_measurements[measurement] || 0;
    const discountedPrice = price - (price * discount) / 100; // Apply discount
    return discountedPrice * quantity; // Multiply by quantity
  };

  // Handle measurement change
  const handleMeasurementChange = (productId, newMeasurement) => {
    setSelectedMeasurements({
      ...selectedMeasurements,
      [productId]: {
        ...selectedMeasurements[productId],
        measurement: newMeasurement,
      },
    });
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedMeasurements({
      ...selectedMeasurements,
      [productId]: {
        ...selectedMeasurements[productId],
        quantity: parseInt(newQuantity, 10) || 1,
      },
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const selectedMeasurement = selectedMeasurements[product._id]?.measurement;
            const quantity = selectedMeasurements[product._id]?.quantity;
            const finalPrice = calculatePrice(product, selectedMeasurement, quantity);

            return (
              <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
                <img
                  src={product.product_image_urls[0] || "https://via.placeholder.com/150"}
                  alt={product.product_name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2">{product.product_name}</h3>
                <p className="text-gray-600">{product.product_description}</p>

                {/* Measurement selection and price calculation */}
                <div className="mt-2">
                  <label
                    htmlFor={`measurement-${product._id}`}
                    className="block font-semibold text-sm"
                  >
                    Select Measurement
                  </label>
                  <select
                    id={`measurement-${product._id}`}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={selectedMeasurement}
                    onChange={(e) => handleMeasurementChange(product._id, e.target.value)}
                  >
                    {product.product_measurement_types.map((measurement) => (
                      <option key={measurement} value={measurement}>
                        {measurement}
                      </option>
                    ))}
                  </select>

                  {/* Quantity Input */}
                  <div className="mt-2 flex items-center">
                    <label htmlFor="quantity" className="mr-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      className="w-20 p-2 border rounded-md"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    />
                  </div>

                  {/* Display Price */}
                  <p className="text-lg font-bold mt-2">₹{finalPrice.toFixed(2)}</p>

                  {/* Discount display */}
                  <p className="text-sm text-red-500 mt-1">
                    {product.product_discount_by_measurements[selectedMeasurement] > 0
                      ? `Discount: ${product.product_discount_by_measurements[selectedMeasurement]}%`
                      : "No Discount"}
                  </p>
                </div>

                {/* Add to cart button */}
                <div className="mt-4 flex justify-between">
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addProductToCart(product, selectedMeasurement, quantity)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
