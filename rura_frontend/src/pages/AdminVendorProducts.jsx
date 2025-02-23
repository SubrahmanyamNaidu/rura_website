// For admin to see the products of vendors
import React, { useState } from "react";
import axios from "axios";

const AdminVendorProducts = () => {
  const [vendorId, setVendorId] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchVendorProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/admin/${vendorId}/products`,
        { withCredentials: true }
      );
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch vendor products");
      setProducts([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Vendor Products</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Vendor ID"
          className="p-2 border rounded-lg mr-2"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
        />
        <button
          onClick={fetchVendorProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Fetch Products
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Discount</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3">{product.product_name}</td>
                  <td className="p-3">
                    {Object.entries(product.product_price_by_measurements).map(([unit, price]) => (
                      <div key={unit}>
                        {unit}: ₹{price}
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    {Object.entries(product.product_discount_by_measurements).map(([unit, discount]) => (
                      <div key={unit}>
                        {unit}: ₹{discount}
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    {Object.entries(product.product_availability_by_measurement).map(([unit, stock]) => (
                      <div key={unit}>
                        {unit}: {stock}
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    <img
                      src={product.product_image_urls[0] || "https://via.placeholder.com/100"}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminVendorProducts;
