import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(true)
    
    useEffect(()=>{

        const findProfile = localStorage.getItem('userInfo')
        setLoading(true)
        if(findProfile){
            try {
              const token = localStorage.getItem("authenticateSeller");
      console.log("Token from localStorage:", token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
                setUser(JSON.parse(findProfile))
            } catch (error) {
           console.error('Error parsing seller info:', err);
            }
            finally{
                setLoading(false)
            }
        }
    },[])

    if (loading) {
   return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if(!user){
    return(
      <span>User doesn't exist.</span>
    );
  }
  return (
    <div>
       <div className="w-full min-h-[70vh] flex justify-center items-center">
    <div className="bg-green-50 text-neutral-700 p-8 rounded-md shadow-lg w-full max-w-md mx-auto ">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-6 text-white rounded-full text-5xl">
          <img src={user.profile} className='w-35 h-35 object-cover rounded-full' alt="" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {user.fullname || 'User Name'}
        </h1>
        <hr className="w-full border-gray-300 mb-4" />
        <p className="mb-2"><strong>Email:</strong> {user.email || 'Not Available'}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not Available'}</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Profile