import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products"); // Update with actual API URL
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    // Replace with actual cart state management (e.g., Redux or Context API)
    alert(`Added ${product.product_name} to cart`);
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
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={product.product_image_urls[0] || "https://via.placeholder.com/150"}
                alt={product.product_name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{product.product_name}</h3>
              <p className="text-gray-600">{product.product_description}</p>
              <p className="text-lg font-bold mt-2">₹{Object.values(product.product_price_by_measurements)[0]}</p>

              <div className="mt-4 flex justify-between">
                <Link to={`/product/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
