import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import OAuth from '../Components/OAuth'
import {toast} from 'react-toastify'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'

export default function ForgotPassword() {
  const [formData,setFormData] = useState({
    email: "",
  });
  const {email} = formData;
  function onChange(e)
  {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Couldn't send reset password");
    }
  }
  return (
    <>
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forget Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80" alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className="md:w-[67%] lg:w-[40%] lg:ml-20">
          <form action="" className='flex flex-col space-y-4' onSubmit={onSubmit}>
            <input type="email" id='email'  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" placeholder='Email Address' value={email} onChange={onChange}/>
            <div className='flex justify-between'>
              <p>Don't have an account ?<Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Register</Link> </p>
              <p><Link to='/sign-in' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in instead</Link></p>
            </div>
            <button type="submit" className='w-full px-7 py-3 bg-blue-600 text-white text-sm uppercase hover:bg-blue-700 rounded shadow-md font-medium transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Send Reset Email</button>
            <div className='flex before:border-t before:flex-1 my-4 before:border-gray-300 items-center  after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
    </>
  )
}
