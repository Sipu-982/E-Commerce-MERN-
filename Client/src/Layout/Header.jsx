import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TbUserCircle } from "react-icons/tb";
import { PiShoppingCartDuotone } from "react-icons/pi";
import "./Header.css";

const Header = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      try {
        const res = await axios.get(`http://localhost:3004/api/product/searchProduct?title=${query}`);
        if (res.status === 200 && res.data.data.length > 0) {
          const category = res.data.data[0].category;
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
        const res = await axios.get(`http://localhost:3004/api/product/searchProduct?title=${value}`);
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

  return (
    <div className='sticky top-0 w-full bg-white min-h-[65px] flex justify-between items-center py-2 px-7 z-50'>
      <div className="logo text-xl font-semibold">
        <Link to='/'>Ebuy</Link>
      </div>

      {/* Search bar with dropdown */}
      <div className="relative w-[400px] lg:w-xl">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleSearch}
          placeholder="Search for Product, brand and more..."
          className='w-full h-[40px] bg-blue-50 border border-gray-200 rounded px-4 py-2 text-sm'
        />
        <button
          onClick={handleSearch}
          className="absolute top-1.5 right-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Search
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
        <Link to='/login' className='flex gap-x-2 items-center text-lg hover:text-blue-600'>
          <TbUserCircle size={22} />
          <span>Login</span>
        </Link>
        <button className='flex gap-x-2 items-center text-lg hover:text-blue-600'>
          <PiShoppingCartDuotone size={22} />
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
