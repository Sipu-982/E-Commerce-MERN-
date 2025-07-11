import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHandPointLeft } from "react-icons/fa";
import { IoMdRemove } from "react-icons/io";
import { MdAdd } from "react-icons/md";

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  const parsePrice = (value) => {
    const clean = typeof value === 'string' ? value.replace(/[^\d.]/g, '') : value;
    const number = parseFloat(clean);
    return isNaN(number) ? 0 : number;
  };

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      const parsed = JSON.parse(stored).map(item => ({
        ...item,
        quantity: item.quantity || 1,
        price: item.price || "0",
        discountPrice: item.discountPrice || "0"
      }));
      setCartItems(parsed);
      updateCartState(parsed);
    }
  }, [setCartCount]);

  const updateCartState = (updatedCart) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    const totalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleRemove = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this product?');
    if (!confirmDelete) return;

    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    updateCartState(updatedCart);
  };

  const handleIncrement = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
    updateCartState(updated);
  };

  const handleDecrement = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
      updateCartState(updated);
    } else {
      handleRemove(index);
    }
  };

  const addProductPrice = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );
  const addDiscountPrice = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.discountPrice) * item.quantity,
    0
  );
  const couponPrice = 699;
  const finalPrice = addProductPrice - couponPrice;

  const buyRoute= ()=>{
    navigate('/payment',{
          state: { finalPrice: finalPrice }
    })
  }
  return (
    <div className="p-6 bg-gray-100 min-h-[80vh] gap-x-9 flex justify-center flex-wrap">
      {/* Left Section: Cart Items */}
      <div className="w-full md:max-w-[650px] max-h-[500px] bg-white p-6 overflow-y-auto rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 pb-2">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center py-12">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-300 pb-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={Array.isArray(item.imageUrls) ? item.imageUrls[0] : item.imageUrls}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <div className="flex items-center gap-x-3">
                      <p className="text-green-600 font-medium">
                        ₹{(parsePrice(item.price) * item.quantity).toLocaleString()}
                      </p>
                      <del className="text-blue-600 font-medium">
                        ₹{(parsePrice(item.discountPrice) * item.quantity).toLocaleString()}
                      </del>
                    </div>
                    <p className='text-sm text-gray-500'>{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={() => handleDecrement(index)}
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                      <IoMdRemove />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(index)}
                      className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                      <MdAdd />
                    </button>
                  </div>
                          
                       </div>
              </div>
            ))}
            <hr className="border-t border-gray-200 mt-4" />
          </div>
        )}
      </div>

      {/* Right Section: Summary */}
      <div className="flex flex-col w-full md:w-[400px] gap-y-5 mt-6 md:mt-0 bg-white h-[500px] rounded p-6 shadow-md">
        {cartItems.length > 0 && (
          <>
            <div className="font-semibold text-[1rem] flex justify-between">
              <span>Items Price ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items):</span>
              <span className="text-green-700">
                ₹{addProductPrice.toLocaleString()}
              </span>
            </div>

            <div className="font-semibold text-[1rem] flex justify-between">
              <span>Discount Price:</span>
              <span className="text-green-700">
                -₹{addDiscountPrice.toLocaleString()}
              </span>
            </div>

            <div className="font-semibold text-[1rem] flex justify-between">
              <span>Coupon for you:</span>
              <span className="text-green-700">
                -₹{couponPrice.toLocaleString()}
              </span>
            </div>

            <div className="font-semibold text-[1rem] flex justify-between">
              <span>Total Price:</span>
              <span className="text-green-700">
                ₹{finalPrice > 0 ? finalPrice.toLocaleString() : 0}
              </span>
            </div>
          </>
        )}
        <div className="pt-3">
          <button className='w-full p-2 bg-orange-600 text-white cursor-pointer rounded' onClick={buyRoute}>Buy Now</button>
        </div>
        <div>
          <Link to="/" className="text-lg flex items-center gap-x-2 hover:text-green-500">
            <FaHandPointLeft size={20} className="text-green-400" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
