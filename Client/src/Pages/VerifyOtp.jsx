import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcLeft } from "react-icons/fc";

const VerifyOtp = () => {
    // const [email,setEmail] = useState('')
    const [otp,setOtp]= useState('')
    const location=useLocation()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate() 
    const email = location.state?.email || '';
    const handleVerify= async (e)=>{
        e.preventDefault()
       setLoading(true)

        try {
            const response = await axios.post("http://localhost:3004/api/auth/verifyOtpLogin",{
                email,otp
            })
            alert(response.data.message)
            console.log(response.data.Data);
            const {token,Data}= response.data;
            localStorage.setItem("authenticateSeller", token)

      const userInfo = {
        fullname: Data.fullname,
        email: Data.email,
        phone: Data.phone,
        profile: Data.profile
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    
            console.log(token);
            console.log(Data);
            setOtp('')
          navigate('/')
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
            <form className="flex flex-col gap-4" onSubmit={handleVerify}>
                <h2 className="text-2xl font-bold mb-2 text-black">OTP Verification</h2>
    <p className="text-sm text-black mb-4 text-left">
      Please enter the 6-digit OTP sent to your email <span className='text-blue-700'>{email}</span>. This is to verify your identity and ensure secure login.
    </p>
               
                <div className="form-field">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="password"
                    placeholder="Enter 6 digits OTP" id='otp' name='otp'
                    value={otp} onChange={(e) => setOtp(e.target.value)}
                    className="p-2 rounded border border-gray-700 text-black"
                  />
                </div>
                   <button type='submit' className='p-2 mt-4 bg-green-800 transition-all duration-500 hover:opacity-75 cursor-pointer text-white rounded-[30px]'>Verify OTP</button>  
                   <div className="flex justify-center">
                    <p className="text-sm text-black">Didn't receive the OTP? &nbsp;<Link to='/loginOtp' className='text-blue-800'>Resend OTP</Link></p>
                    </div>  
                               <div className="flex justify-start"><Link to='/loginOtp' className='flex items-center gap-x-2 text-black p-2 text-[18px] text-center'><span><FcLeft size={20}/></span><span>Back</span></Link></div>
                    
            </form>
          </div>
        </div>
  )
}

export default VerifyOtp