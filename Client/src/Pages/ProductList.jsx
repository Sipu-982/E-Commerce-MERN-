import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'Laptop';

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3004/api/product/filterProduct?category=${category}`
      );
      setProducts(response.data.filter_Products || []);
      setError('');
    } catch (err) {
      setProducts([]);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div className="p-6 bg-white">
      {loading && (
        <p className="text-center text-blue-600 font-medium">Loading products...</p>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 font-medium">No products to display.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <div
              key={product._id}
              className=" rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={
                  Array.isArray(product.imageUrls)
                    ? product.imageUrls[0]
                    : product.imageUrls
                }
                alt={product.title}
                className="w-[230px] h-[320px] object-contain rounded-md mb-3"
              />
              <h3 className="text-md font-semibold text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-blue-600 font-bold text-md mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
