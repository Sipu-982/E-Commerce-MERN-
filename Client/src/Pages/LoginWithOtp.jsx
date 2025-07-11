import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcLeft } from "react-icons/fc";

const LoginWithOtp = () => {
    const [email,setEmail]= useState('')
    const [loading,setLoading]= useState('')
    const navigate = useNavigate()
    const handleLogin = async (e)=>{
    e.preventDefault()
   try {
    setLoading(true)
       const response = await axios.post("http://localhost:3004/api/auth/loginWithOtp",{
        email
       })
       alert(response.data.message)
       setEmail('')
       navigate('/verifyOtp',{state:{email}})
   } catch (error) {
     alert(error.response?.data?.message || "Something went wrong!")

   }
   finally{
    setLoading(false)
   }
    }
    if(loading){
return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="flex justify-center bg-[#048424] items-center w-full min-h-[70vh]">
          <div className="form-content text-white w-full max-w-[450px] min-h-[40vh] p-6 rounded-lg mx-5 border border-black">
            <h2 className="text-2xl font-bold mb-4 text-black">Send OTP via Email</h2>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    placeholder="Enter email" id='email' name='email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded border border-gray-700 text-black"
                  />
                </div>
                   <button type='submit' className='p-2 mt-4 bg-green-700 transition-all  duration-500 hover:opacity-75 cursor-pointer text-white  rounded shadow'>Send OTP</button>    
           <div className="flex justify-start"><Link to='/login' className='flex items-center gap-x-2 text-black p-2 text-[18px] text-center'><span><FcLeft size={20}/></span><span>Back</span></Link></div>
            </form>
          </div>
        </div>
    
  )
}

export default LoginWithOtp