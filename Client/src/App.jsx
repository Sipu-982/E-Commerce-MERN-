import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Home from './Pages/Home';
import BannerCrousel from './Pages/BannerCrousel';
import Popular from './Pages/Popular';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProductList from './Pages/ProductList';
import FindProductById from './Pages/FindProductById';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import MyOrders from './Pages/MyOrders';
import SavedAddress from './Pages/SavedAddress';
import MakePayment from './Pages/MakePayment';
import CreateAddress from './Pages/CreateAddress';
import LoginWithOtp from './Pages/LoginWithOtp';
import VerifyOtp from './Pages/VerifyOtp';

const App = () => {
  // Get existing cart items from localStorage
  const [cartCount, setCartCount] = useState(() => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    return existingCart.length;
  });

  // Function to add item to cart and update localStorage and state
  const addToCart = (product) => {
    setCartCount((prev) => prev + 1);
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout count={cartCount} />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList addCart={addToCart} />} />
            <Route path="banner" element={<BannerCrousel />} />
            <Route path="popular" element={<Popular />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="findProduct/:id" element={<FindProductById addCart={addToCart} />} />
            <Route path="cart" element={<Cart setCartCount={setCartCount} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-address" element={<SavedAddress />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="payment" element={<MakePayment />} />
            <Route path="/createAddress" element={<CreateAddress />} />
            <Route path="/loginOtp" element={<LoginWithOtp />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
