import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">About Us</h1>
        
        <p className="text-gray-700 text-lg text-center">
          Welcome to <span className="font-bold">RURA CART</span>! We are committed to providing the best shopping experience by offering high-quality products at affordable prices.
        </p>

        <div className="mt-8 space-y-6">
          {/* Mission Section */}
          <div className="bg-blue-100 p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800">Our Mission</h2>
            <p className="text-gray-700 mt-2">
              Our mission is to make online shopping simple, reliable, and affordable. We work with trusted vendors to bring you the best products.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-green-100 p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-800">Why Choose Us?</h2>
            <ul className="list-disc ml-6 text-gray-700 mt-2">
              <li>Wide variety of products</li>
              <li>Affordable prices</li>
              <li>Fast delivery</li>
              <li>Secure payment options</li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="bg-yellow-100 p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-800">Get in Touch</h2>
            <p className="text-gray-700 mt-2">
              Have questions? Contact us via our 
              <a href="/contact" className="text-blue-600 font-semibold"> Contact Us</a> page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
