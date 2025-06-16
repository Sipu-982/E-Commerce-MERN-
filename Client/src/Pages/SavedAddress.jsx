import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";

const SavedAddress = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllAddress = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
        const response = await axios.get("http://localhost:3004/api/address/viewAddress",{
           headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        setAddress(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllAddress();
  }, []);

  const removeAddress = async (id) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this address?");
    if (!confirmRemove) return;

    try {
      await axios.delete(`http://localhost:3004/api/address/deleteAddress/${id}`);
      // Update the UI after deletion
      setAddress((prevAddresses) => prevAddresses.filter((info) => info._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (loading) {
return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!address || address.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span>Address is not available...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[65vh] flex flex-col items-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-3xl max-h-[500px] overflow-y-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Saved Addresses</h2>

        <div className="w-full space-y-2">
          {address.map((addr, index) => (
            <div key={index} className="w-full bg-white p-2 ">
                
              <p><span className='text-gray-600 font-medium'>Fullname:</span> {addr.fullname}</p>
              <p><span className='text-gray-600 font-medium'>Phone:</span> {addr.phone}</p>

              <div className="flex flex-wrap gap-4 mt-2">
                <p><span className='text-gray-600 font-medium'>Pincode:</span> {addr.pincode}</p>
                <p><span className='text-gray-600 font-medium'>State:</span> {addr.state}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                <p><span className='text-gray-600 font-medium'>City:</span> {addr.city}</p>
                <p><span className='text-gray-600 font-medium'>House:</span> {addr.house}</p>
                <p><span className='text-gray-600 font-medium'>Area:</span> {addr.area}</p>
                <p><span className='text-gray-600 font-medium'>Area Type:</span> {addr.type}</p>
              </div>

              <hr className="mt-3 text-gray-200" />
               <div className="flex justify-end"><button
                onClick={() => removeAddress(addr._id)}
                className="px-4 py-2 flex items-center cursor-pointer gap-x-2.5 text-[17px]  text-red-500  hover:text-red-600 transition"
              >
               <MdDeleteOutline size={20}/> <span>Remove Address</span>
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedAddress;
