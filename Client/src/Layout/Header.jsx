import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TbUserCircle } from "react-icons/tb";
import { PiShoppingCartDuotone } from "react-icons/pi";
import "./Header.css"; // Make sure your Header.css exists for any custom styles
import { IoSearch } from "react-icons/io5";
import logo from '../Images/logo-img.png'
const Header = ({ count }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // For search suggestions
  const [showUserDropdown, setShowUserDropdown] = useState(false); // For user actions dropdown
  const navigate = useNavigate();
  const userDropdownRef = useRef(null); // Ref for detecting clicks outside the user dropdown

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      try {
        const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
        const res = await axios.get(`http://localhost:3004/api/product/searchProduct?title=${query}`,{
           headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if (res.status === 200 && res.data.data.length > 0) {
          const category = res.data.data[0].category; // Assuming the first result's category is sufficient
          navigate(`/products?category=${category}`);
        }
        setShowDropdown(false);
      } catch (err) {
        console.error('Search failed:', err);
        alert("No matching products found.");
      }
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      try {
        const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
        const res = await axios.get(`http://localhost:3004/api/product/searchProduct?title=${value}`,{
           headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        setSuggestions(res.data.data);
        setShowDropdown(true);
      } catch (error) {
        console.log("Autocomplete failed", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (title, category) => {
    setQuery(title);
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/products?category=${category}`);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isLogin = !!userInfo;
  const fullname = userInfo?.fullname || "User";
  const email = userInfo?.email || "User";
  const profile = userInfo?.profile || "";

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload(); 
  };

  // Toggle user dropdown visibility
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownRef]);


  return (
    <div className='sticky top-0 w-full bg-white min-h-[65px] shadow flex justify-between items-center py-2 px-7 z-50'>
      <div className="logo text-xl font-semibold">
        <Link to='/' className='flex items-center'><img src={logo} className='w-10 h-10 object-contain' alt="" /> Ebuy</Link>
      </div>

      {/* Search bar with dropdown */}
      <div className="relative w-[400px] lg:w-xl">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleSearch}
          placeholder="Search for Product, brand and more..."
          className='w-full h-[40px] bg-gray-50 border-1 border-gray-50 rounded px-4 py-2 text-sm'
        />
        <button
          onClick={handleSearch}
          className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-2.5 cursor-pointer rounded text-sm hover:bg-blue-700"
        >
          <IoSearch size={20} />

        </button>

        {/* Autocomplete Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto shadow-sm rounded text-sm">
            {suggestions.map((item) => (
              <li
                key={item._id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSuggestionClick(item.title, item.category)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-x-8 items-center">
        {!isLogin ? (
          <Link to='/login' className='flex gap-2 items-center text-lg hover:text-blue-600'>
            <TbUserCircle size={22} />
            <span>Login</span>
          </Link>
        ) : (
          <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleUserDropdown} ref={userDropdownRef}>
            {/* User Profile and Name - Clickable area */}
            {profile && (
              <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            )}
            <div className="flex flex-col text-sm">
            <span className="text-gray-500 font-medium">{fullname}</span>
            <span className="text-gray-500 font-medium">{email}</span>
            </div>
            <svg
                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>

            {showUserDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <Link
                      to="/profile" // Adjust this path as per your routing
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-address" // Adjust this path as per your routing
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Saved Addresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-orders" // Adjust this path as per your routing
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserDropdown(false); // Close dropdown on logout
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <Link to="/cart" className='relative flex gap-x-2 items-center text-lg hover:text-blue-600'>
          <PiShoppingCartDuotone size={22} />
          <span className="absolute bottom-3 left-4 text-sm px-1 bg-red-500 text-white rounded-full">{count}</span>
         
        </Link>
      </div>
    </div>
  );
};

export default Header;