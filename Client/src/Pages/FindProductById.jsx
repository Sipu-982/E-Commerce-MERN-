import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FindProductById = ({addCart}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authenticateSeller");
        if (!token) {
          alert("No token found. Please log in again.");
          return;
        }

        const response = await axios.get(`http://localhost:3004/api/product/getProductById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProduct(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

    const [count,setCount]= useState(0)
    useEffect(()=>{
      console.log("useEffect triggered", count);
    }, [count])

  const handleRoute = ()=>{
   navigate('/')
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-red-500 text-center mt-10">Product not found</div>;
  }

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-[80vh]">
      <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left: Image */}
        <div className="md:w-1/2 p-4 flex justify-center items-center bg-gray-50">
          <img
            src={product.imageUrls}
            alt={product.title}
            className="object-contain max-w-[400px] h-[400px] w-full"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-gray-600"><span className="font-semibold text-blue-600">Brand:</span> {product.brand}</p>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-lg font-semibold text-green-600">
            ₹{product.price} <span className="line-through text-gray-400 text-base ml-2">₹{product.discountPrice}</span>
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-semibold text-blue-600">Category:</span> {product.category}
          </div>

          <button onClick={(e)=>{
        e.preventDefault()
        addCart(product)
       }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
          <div className="absolute left-4 cursor-pointer bottom-4"><button onClick={handleRoute}>Back</button>
</div>
      </div>
  
    </div>
  );
};

export default FindProductById;
