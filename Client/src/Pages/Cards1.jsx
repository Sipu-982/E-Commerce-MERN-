import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cards1 = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPopularShirt = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      const res = await axios.get(
        'http://localhost:3004/api/product/filterProduct?category=Shirt',{
           headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );
      const filtered = res.data.filter_Products || [];
      setPopularProducts(filtered.slice(0, 4)); // Only 4 items
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularShirt();
  }, []);

  return (
    <div className="bg-white p-4 w-[490px] min-h-[590px] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Fashion Top Deals</h2>
        <button className="text-blue-600 hover:text-blue-800">
          <FaChevronRight />
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Products Grid */}
      {!loading && popularProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {popularProducts.map((product) => (
            <Link to='/products?category=Shirt'>
            <div
              key={product._id}
              className="border border-gray-200 w-[200px] rounded-md p-2 hover:shadow-md  transition"
            >
              <img
                src={
                  Array.isArray(product.imageUrls)
                    ? product.imageUrls[0]
                    : product.imageUrls
                }
                alt={product.title}
                className="w-full h-[200px] object-cover mb-2"
              />
              <p className="text-sm font-medium text-gray-800 truncate">
                {product.title}
              </p>
              <p className="text-green-600 text-sm font-semibold">Min. 50% Off</p>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards1;
