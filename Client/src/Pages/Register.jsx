import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import { Link } from 'react-router-dom'

const Register = () => {
    const [fullname,setFullname] = useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [file,setFile]= useState(null)
    const navigate= useNavigate()

    const createUser= async (e)=>{
        e.preventDefault();
        
        try {

            const formData= new FormData()
            formData.append('fullname',fullname)
            formData.append('email',email)
            formData.append('phone',phone)
            formData.append('password',password)
            formData.append('confirmPassword',confirmPassword)
            formData.append('image',file)

            const response = await axios.post("http://localhost:3004/api/auth/createAccount",formData,{
                headers:{
                   "Content-Type": "multipart/form-data",
                }
            })
            alert(response.data.message);
           
            console.log(response.data.data);

            const userInfo = {
              fullname:fullname,
              email:email,
              phone:phone,
              file:file,
            }
         localStorage.setItem('userInfo',JSON.stringify(userInfo))
            setFullname('')
            setEmail('')
            setPhone('')
            setPassword('')
            setConfirmPassword('')
             setFile(null);
              navigate('/login')
        } catch (error) {
        alert(error.response?.data?.message || "Something went wrong!");  
      }
   }

   const handleReset = ()=>{
    setFullname('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
    setFile(null)
   }
    
  return (
     <div className="flex justify-center bg-[#068114] items-center w-full min-h-[70vh]">
    <div className="form-content text-white w-full max-w-[700px] min-h-[55vh] p-6 rounded-lg  mx-5 border-1 border-gray-400">
      <h2 className="text-2xl font-bold mb-4 text-black">Create An Account</h2>
      <form className="flex flex-col gap-4" onSubmit={createUser}>
      <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1">

      <div className="">
       <div className="form-field">
        <label htmlFor="fullname">Fullname:</label>
        <input
          type="text"
          placeholder="Enter fullname" id='fullname' name='fullname' value={fullname} onChange={(e) => setFullname(e.target.value)}
          className="p-2 rounded  border border-gray-700"
        />
        </div>

         <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password" autoComplete='on'
          placeholder="Enter password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded  border border-gray-700"
        />
        </div>
       
         <div className="form-field">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          placeholder="Enter phone" id='phone' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)}
          className="p-2 rounded border border-gray-700"
        />
        </div>
        </div>

        <div className="">
       <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter email" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded  border border-gray-700"
        />
        </div>

        <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password" autoComplete='on'
          placeholder="Enter Confirm Password" id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 rounded  border border-gray-700"
        />
        </div>
        
        <div className="form-field">
        <label htmlFor="image">Profile Picture:</label>
        <input
          type="file" id='image' name='image' onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded   border border-gray-700"
        />
        </div>
        </div>
        </div>
      <div className="flex pt-[30px]  items-center space-x-3">
        <button
          type="submit"
          className="bg-[#068114] w-45 cursor-pointer hover:bg-green-700 p-2 rounded text-white font-semibold"
        >
          Submit
        </button>
        {/* <Link to="/dashboard" >Cancel</Link> */}
        <button type='button' onClick={handleReset} className='p-2 bg-red-500 w-45 rounded transition duration-500 hover:opacity-75'>Cancel</button>
        </div>
          <div className="text-black">
                        <p>Already have an account? &nbsp;<Link to='/login'>Click to login</Link></p>
                      </div>
          
      </form>
    </div>
    </div>
  )
}

export default Register