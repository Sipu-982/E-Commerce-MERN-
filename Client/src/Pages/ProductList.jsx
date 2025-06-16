import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BsFillCartPlusFill } from "react-icons/bs";

const ProductList = ({addCart}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'Laptop';

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      const response = await axios.get(
        `http://localhost:3004/api/product/filterProduct?category=${category}`,{
           headers: {
          Authorization: `Bearer ${token}`,
        },
        }
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

  const [count,setCount]= useState(0)
    useEffect(()=>{
      console.log("useEffect triggered", count);
    }, [count])


  return (
    <div className="p-6 bg-gray-100">
      {loading && (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
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
            <Link to={`/findProduct/${product._id}`} key={product._id}>
            <div 
  
  className="bg-white w-[270px] p-3 border-1 border-gray-200 rounded hover:shadow-md transition relative"
>
  <img
    src={
      Array.isArray(product.imageUrls)
        ? product.imageUrls[0]
        : product.imageUrls
    }
    alt={product.title}
    className="w-[250px] h-[300px]  object-contain rounded-md mb-3"
  />

<div className="bg-white">
  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
  <p className="text-xs text-gray-500">{product.brand}</p>

  <div className="flex items-center space-x-2 mt-1">
    <span className="text-blue-600 font-bold text-base">₹{product.price}</span>
    {product.discountPrice && (
      <span className="text-gray-400 text-sm line-through">₹{product.discountPrice}</span>
    )}
    {product.ratings && (
      <span className="text-green-600 text-sm font-semibold">
        {product.ratings}
      </span>
    )}
 {/* <button onClick={addCart} className="mt-2 p-2 bg-amber-100 text-xl rounded-xl text-green-900 cursor-pointer transition hover:bg-black hover:text-gray-200">
<BsFillCartPlusFill /></button> */}

  </div> 
      <div className="flex justify-between">
      <p className="text-xs text-gray-500">{product.description}</p>
       <button onClick={(e)=>{
        e.preventDefault()
        addCart(product)
       }} className="mt-2 p-2 bg-amber-100 text-xl rounded-xl text-green-900 cursor-pointer transition hover:bg-black hover:text-gray-200">
<BsFillCartPlusFill /></button>

      </div>

  </div>
</div>
</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
