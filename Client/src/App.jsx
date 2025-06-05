import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AppLayout from './Layout/AppLayout'
import Home from './Pages/Home'
// import Catagories from './Pages/Catagories'
import BannerCrousel from './Pages/BannerCrousel'
import Popular from './Pages/Popular'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProductList from './Pages/ProductList'

const App = () => {
  return (
    <div className="bg-gray-100">
   <Router>
    <Routes>
      <Route path='/' element={<AppLayout/>}>
       <Route index element={<Home/>}/>
         <Route path='products' element={<ProductList/>}/>
       {/* <Route path='catagories' element={<Catagories/>}/> */}
       <Route path='banner' element={<BannerCrousel/>}/>
       <Route path='popular' element={<Popular/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
      </Route>
    </Routes>
   </Router>
   </div>
  )
}

export default App