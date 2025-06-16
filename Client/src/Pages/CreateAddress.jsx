import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateAddress = () => {
  const [address, setAddress] = useState({
    fullname: '',
    phone: '',
    pincode: '',
    state: '',
    city: '',
    house: '',
    area: '',
    type: '',
    paymentMethod: 'cod',
  });
   
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FillAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      const response = await axios.post("http://localhost:3004/api/address/create", {
        fullname: address.fullname,
        phone: address.phone,
        pincode: address.pincode,
        state: address.state,
        city: address.city,
        house: address.house,
        area: address.area,
        type: address.type,
      },{ 
        headers: {
          Authorization: `Bearer ${token}`,
        },}
    );

      alert(response.data.message);
      console.log(response.data.data);
      navigate('/payment')
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  if (loading) {
return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ); }

  return (
    <div className="w-full min-h-[85vh] flex justify-center items-center  py-8">
      <form
        onSubmit={FillAddress}
        className="bg-white  p-8 rounded shadow-md w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">💳 Payment & Address Details</h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={address.fullname}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">House No./Building</label>
              <input
                type="text"
                name="house"
                value={address.house}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block mb-1 font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Area/Colony</label>
              <input
                type="text"
                name="area"
                value={address.area}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Payment Method</label>
              <select
                name="paymentMethod"
                value={address.paymentMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-gray-100"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Type - full width */}
        <div className="mt-6 mb-6 flex flex-wrap gap-6 items-center">
          <label className="font-semibold">Address Type:</label>
          <label>
            <input
              type="radio"
              name="type"
              value="Home"
              onChange={handleChange}
              checked={address.type === 'Home'}
              className="mr-1"
            />
            Home
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="Work"
              onChange={handleChange}
              checked={address.type === 'Work'}
              className="mr-1"
            />
            Work
          </label>
        </div>

        {/* Submit Button and Link */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Submit
        </button>

        <Link to="/cart" className="block text-center text-blue-600 mt-4 hover:underline">
          ← Back to Cart
        </Link>
      </form>
    </div>
  );
};

export default CreateAddress;
