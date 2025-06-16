import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import CreateAddress from './CreateAddress';
import './Style.css';
import { MdLocalShipping } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa6";

Modal.setAppElement('#root');

const MakePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const finalPrice = location.state?.finalPrice || 0;

  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullAddress: '',
    paymentMethod: 'cod',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchAddresses();
  };

  const fetchAddresses = async () => {
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
        },});
      setAddress(response.data.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Failed to fetch addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    const addr = address[index];
    const fullAddress = `${addr.house}, ${addr.area}, ${addr.city}, ${addr.state}, ${addr.pincode} (${addr.type})`;
    setFormData(prev => ({
      ...prev,
      fullAddress,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (selectedAddressIndex === null) {
      alert("Please select an address.");
      return;
    }

    const selectedAddr = address[selectedAddressIndex];

    try {
       const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      const res = await axios.post("http://localhost:3004/api/payment/makePayment", {
        fullname: selectedAddr.fullname,
        phone: selectedAddr.phone,
        address: formData.fullAddress,
        paymentMethod: formData.paymentMethod,
        totalAmount: finalPrice
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Payment successful!");
      localStorage.removeItem("cartItems");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
   return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex lg:flex-row flex-col w-full gap-7 items-start bg-gray-100 p-4">
      {/* Address Section */}
      <div className="lg:w-1/2 w-full bg-white p-6 max-h-[500px] overflow-y-auto rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex text-center gap-x-3.5"><MdLocalShipping size={30} className='text-green-700' /> <span>Delivered Address</span></h2>
          <button onClick={openModal} className="p-2 rounded outline-2  outline-green-800 text-black bg-transparent flex gap-x-1 items-center shadow-lg  transition-all duration-500 hover:bg-green-700 hover:border-none hover:text-white cursor-pointer overflow-hidden"><FaRegPlusSquare />Add New Address</button>
        </div>
        <hr className="mb-4 text-gray-200" />

        {address.map((addr, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-start gap-2">
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddressIndex === index}
                onChange={() => handleAddressSelect(index)}
                className="mt-1"
              />
              <div>
                <p><strong>Name:</strong> {addr.fullname}</p>
                <p><strong>Phone:</strong> {addr.phone}</p>
                <p><strong>Address:</strong> {`${addr.house}, ${addr.area}, ${addr.city}, ${addr.state}, ${addr.pincode} (${addr.type})`}</p>
                <hr className="mt-3 text-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="lg:w-1/2  w-full">
        <form onSubmit={handlePayment} className="bg-white p-8 rounded shadow w-full min-w-[300px]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-x-3.5"><FaAmazonPay size={30} className='text-green-700 font-bold text-shadow-gray-600' />Payment Details</h2>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              value={selectedAddressIndex !== null ? address[selectedAddressIndex].fullname : ''}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              value={selectedAddressIndex !== null ? address[selectedAddressIndex].phone : ''}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Address</label>
            <textarea
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Pay ₹{finalPrice.toLocaleString()}
          </button>

          <Link to="/cart" className="block text-center text-blue-500 mt-4 hover:underline">
            ← Back to Cart
          </Link>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Address"
        className="modal-content"
        overlayClassName="custom-overlay"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-4  cursor-pointer hover:text-red-400 text-gray-900 p-1 rounded-2xl bg-gray-100 text-2xl font-bold"
        >
          ×
        </button>
        <CreateAddress onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default MakePayment;