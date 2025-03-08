import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetchCategories();
    fetchProducts();
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:5000/api/categories");
  //     setCategories(data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Carousel */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
        >
          <SwiperSlide>
            <img src="https://source.unsplash.com/1600x900/?shopping" alt="Banner 1" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://source.unsplash.com/1600x900/?fashion" alt="Banner 2" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://source.unsplash.com/1600x900/?electronics" alt="Banner 3" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Product Categories */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link key={category._id} to={`/category/${category.name}`} className="block bg-white p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <img src={category.image} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full">No categories available</p>
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
                <img src={product.product_image_urls[0] || "https://via.placeholder.com/150"} alt={product.product_name} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-lg font-semibold mt-2">{product.product_name}</h3>
                <p className="text-gray-600">{product.product_description}</p>
                <p className="text-lg font-bold mt-2">₹{Object.values(product.product_price_by_measurements)[0]}</p>
                <Link to={`/product/${product._id}`} className="block bg-blue-500 text-white text-center mt-3 py-2 rounded-lg">View Details</Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
