import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    product_price_by_measurements: { kg: 0, "500gms": 0 },
    product_discount_by_measurements: { kg: 0, "500gms": 0 },
    product_measurement_types: ["kg", "500gms"],
    product_availability_by_measurement: { kg: 0, "500gms": 0 },
    product_description: "",
    product_image_urls: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e, measurement) => {
    setFormData({
      ...formData,
      product_price_by_measurements: {
        ...formData.product_price_by_measurements,
        [measurement]: e.target.value,
      },
    });
  };

  const handleDiscountChange = (e, measurement) => {
    setFormData({
      ...formData,
      product_discount_by_measurements: {
        ...formData.product_discount_by_measurements,
        [measurement]: e.target.value,
      },
    });
  };

  const handleAvailabilityChange = (e, measurement) => {
    setFormData({
      ...formData,
      product_availability_by_measurement: {
        ...formData.product_availability_by_measurement,
        [measurement]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/vendor/add/product",
        formData,
        { withCredentials: true } // Ensure authentication cookies are sent
      );

      setSuccess(`Product ${formData.product_name} added successfully!`);
      setTimeout(() => navigate("/vendor/add-product"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-500">Add Product</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="product_name" className="block text-sm font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="product_description" className="block text-sm font-semibold mb-1">
              Product Description
            </label>
            <textarea
              name="product_description"
              placeholder="Describe your product"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={formData.product_description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price by Measurement */}
          <div>
            <label className="block text-sm font-semibold mb-2">Price by Measurement</label>
            {Object.keys(formData.product_price_by_measurements).map((measurement) => (
              <div key={measurement} className="mb-4">
                <label className="block text-sm">{measurement.toUpperCase()} Price</label>
                <input
                  type="number"
                  placeholder={`${measurement} Price`}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.product_price_by_measurements[measurement]}
                  onChange={(e) => handlePriceChange(e, measurement)}
                  required
                />
              </div>
            ))}
          </div>

          {/* Discount by Measurement */}
          <div>
            <label className="block text-sm font-semibold mb-2">Discount by Measurement</label>
            {Object.keys(formData.product_discount_by_measurements).map((measurement) => (
              <div key={measurement} className="mb-4">
                <label className="block text-sm">{measurement.toUpperCase()} Discount</label>
                <input
                  type="number"
                  placeholder={`${measurement} Discount`}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.product_discount_by_measurements[measurement]}
                  onChange={(e) => handleDiscountChange(e, measurement)}
                />
              </div>
            ))}
          </div>

          {/* Stock Availability */}
          <div>
            <label className="block text-sm font-semibold mb-2">Stock Availability</label>
            {Object.keys(formData.product_availability_by_measurement).map((measurement) => (
              <div key={measurement} className="mb-4">
                <label className="block text-sm">{measurement.toUpperCase()} Available</label>
                <input
                  type="number"
                  placeholder={`Available ${measurement}`}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.product_availability_by_measurement[measurement]}
                  onChange={(e) => handleAvailabilityChange(e, measurement)}
                  required
                />
              </div>
            ))}
          </div>

          {/* Image URLs */}
          <div>
            <label htmlFor="product_image_urls" className="block text-sm font-semibold mb-1">
              Image URLs (comma-separated)
            </label>
            <input
              type="text"
              name="product_image_urls"
              placeholder="Enter image URLs separated by commas"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.product_image_urls.join(", ")}
              onChange={(e) => setFormData({ ...formData, product_image_urls: e.target.value.split(", ") })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={!formData.product_name || !formData.product_description || !formData.product_image_urls.length}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
