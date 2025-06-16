import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const findUser = async () => {
      try {
        const token = localStorage.getItem("authenticateSeller");
        console.log("Token from localStorage:", token);

        if (!token) {
          alert("No token found. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:3004/api/address/get-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.Orders);
        setLoading(false);
        console.log(response.data.message);
      } catch (error) {
        console.error("Orders fetching failed!", error);
        setLoading(false);
      }
    };

    findUser();
  }, []);

  if (loading) {
return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );  }

  if (!orders || orders.length === 0) {
    return <div className="text-center mt-10 text-gray-700 text-lg">Orders are empty...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Scrollable Container */}
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[500px] overflow-auto p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">My Orders</h2>

        {orders.map((addr, index) => (
          <div key={index} className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order #{index + 1}</h3>
            <p><span className="font-medium text-gray-600">Fullname:</span> {addr.fullname}</p>
            <p><span className="font-medium text-gray-600">Phone:</span> {addr.phone}</p>
            <p><span className="font-medium text-gray-600">Address:</span> {addr.address}</p>
            <p><span className="font-medium text-gray-600">Payment Method:</span> {addr.paymentMethod}</p>

            <div className="mt-2">
              <p className="font-medium text-gray-600">Products:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                {addr.productIds && addr.productIds.map((product, i) => (
                  <li key={i}>
                    {typeof product === 'string' ? product : product.name || "Product"}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-2"><span className="font-medium text-gray-600">Total Amount:</span> ₹{addr.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
