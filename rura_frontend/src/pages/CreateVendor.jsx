import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateVendor = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/vendor/create",
        formData,
        { withCredentials: true } // Ensure cookies (admin auth) are sent
      );

      setSuccess("Vendor created successfully!");
    //   setTimeout(() => navigate("/admin/vendors"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create vendor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Vendor</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleCreateVendor}>
          <input
            type="text"
            name="name"
            placeholder="Vendor Name"
            className="w-full p-2 border rounded mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-3"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded">Create Vendor</button>
        </form>
      </div>
    </div>
  );
};

export default CreateVendor;
