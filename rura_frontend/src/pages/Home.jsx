import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-gray-700">Explore amazing products at the best prices.</p>
        <div className="mt-4">
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Login</a>
          <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
