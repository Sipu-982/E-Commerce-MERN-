import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductSlide = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPopularMobiles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      const res = await axios.get('http://localhost:3004/api/product/filterProduct?category=Mobile',{
         headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPopularProducts((res.data.filter_Products || []).slice(0, 8));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMobiles();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const CustomButtonGroup = ({ next, previous }) => {
    return (
     <div className="absolute top-1/2 -left-6 -right-6 flex justify-between px-4 transform -translate-y-1/2">
                 <button
                   onClick={previous}
                   className="bg-gray-50 text-neutral-800 p-3 w-12 h-25 rounded-lg shadow-md transition"
                 >
                   <FaChevronLeft size={20} />
                 </button>
                 <button
                   onClick={next}
                   className="bg-gray-50 text-neutral-800 p-3 w-12 rounded-lg shadow-md  transition"
                 >
                   <FaChevronRight size={20} />
                 </button>
               </div>
    );
  };

  return (
    <div className="bg-white m-4">
      <h2 className="text-xl font-bold py-5 px-3 text-gray-800">New Arrivals</h2>

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && popularProducts.length > 0 && (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlaySpeed={3000}
          transitionDuration={600}
          arrows={false}
          customButtonGroup={<CustomButtonGroup />}
        >
          {popularProducts.map((product) => (
            <div key={product._id} className="p-2 w-[250px]">
              <Link to='/products?category=Mobile'>
              <div className="p-3 transition">
                <img
                  src={Array.isArray(product.imageUrls) ? product.imageUrls[0] : product.imageUrls}
                  alt={product.title}
                  className="w-[150px] h-[200px] object-contain rounded"
                />
                <h3 className="text-md font-semibold mt-2">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
              </div>
              </Link>
            </div>

          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductSlide;
