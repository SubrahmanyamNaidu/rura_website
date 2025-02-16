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
    //   setTimeout(() => navigate("/vendor/products"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            className="w-full p-2 border rounded mb-3"
            value={formData.product_name}
            onChange={handleChange}
            required
          />

          <textarea
            name="product_description"
            placeholder="Product Description"
            className="w-full p-2 border rounded mb-3"
            value={formData.product_description}
            onChange={handleChange}
            required
          />

          <label className="block font-semibold mb-2">Price by Measurement:</label>
          {Object.keys(formData.product_price_by_measurements).map((measurement) => (
            <input
              key={measurement}
              type="number"
              placeholder={`${measurement} Price`}
              className="w-full p-2 border rounded mb-3"
              value={formData.product_price_by_measurements[measurement]}
              onChange={(e) => handlePriceChange(e, measurement)}
              required
            />
          ))}

          <label className="block font-semibold mb-2">Discount by Measurement:</label>
          {Object.keys(formData.product_discount_by_measurements).map((measurement) => (
            <input
              key={measurement}
              type="number"
              placeholder={`${measurement} Discount`}
              className="w-full p-2 border rounded mb-3"
              value={formData.product_discount_by_measurements[measurement]}
              onChange={(e) => handleDiscountChange(e, measurement)}
            />
          ))}

          <label className="block font-semibold mb-2">Stock Availability:</label>
          {Object.keys(formData.product_availability_by_measurement).map((measurement) => (
            <input
              key={measurement}
              type="number"
              placeholder={`Available ${measurement}`}
              className="w-full p-2 border rounded mb-3"
              value={formData.product_availability_by_measurement[measurement]}
              onChange={(e) => handleAvailabilityChange(e, measurement)}
              required
            />
          ))}

          <input
            type="text"
            name="product_image_urls"
            placeholder="Image URLs (comma-separated)"
            className="w-full p-2 border rounded mb-3"
            value={formData.product_image_urls.join(", ")}
            onChange={(e) => setFormData({ ...formData, product_image_urls: e.target.value.split(", ") })}
            required
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
