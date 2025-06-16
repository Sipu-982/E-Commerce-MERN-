import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { GoogleLoginButton } from "react-social-login-buttons";
// import "react-social-login-buttons/lib/social-login-buttons.css";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:3004/api/auth/loginUser", {
        email, password
      })

      alert(response.data.message)
      const { token, Data } = response.data
      localStorage.setItem("authenticateSeller", token)

      const userInfo = {
        fullname: Data.fullname,
        email: Data.email,
        phone: Data.phone,
        profile: Data.profile
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      setTimeout(()=>{
        navigate('/')
      },2000)
      setEmail('')
      setPassword('')
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#048424] items-center w-full min-h-[70vh]">
      <div className="form-content text-white w-full max-w-[500px] min-h-[55vh] p-6 rounded-lg mx-5 border border-black">
        <h2 className="text-2xl font-bold mb-4 text-black">Login to Your Account</h2>
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

            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password" autoComplete='on'
                placeholder="Enter password" id='password' name='password'
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded border border-gray-700 text-black"
              />
            </div>

          <div className="flex pt-[15px] items-center space-x-3">
            <button
              type="submit"
              className="bg-[#046c11] w-full hover:bg-green-700 p-2 cursor-pointer transition-all duration-500 rounded-[30px] text-white font-medium"
            >
              Submit
            </button>
          </div>
                      <div className="flex justify-center"><span className='text-center text-lg text-gray-700'>OR</span></div>

          <div className="form-feild flex justify-center text-center">
            <Link to='/loginOtp' className='bg-blue-900 w-full hover:bg-blue-400 p-2 rounded-[30px] text-white transition-all duration-500 font-medium' >Login Via OTP</Link>
          </div>
           <div className="text-black text-center">
                <p>New User? &nbsp;<Link to='/register'>Create an account</Link></p>
              </div>
              
        </form>
      </div>
    </div>
  )
}

export default Login
