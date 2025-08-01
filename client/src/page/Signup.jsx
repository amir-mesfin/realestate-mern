import React from 'react'
import { Link } from 'react-router-dom'
export default function Signup() {
  return (
    <div className='p-7 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center  my-8 font-semibold'>
           Sign Up 
       </h1>
       <form className='flex flex-col  gap-4 '>
        <input type="text" placeholder='username' className='border-0 p-3  rounded-lg bg-white' id='username'  />
        <input type="text" placeholder='email' className='border-0 p-3  rounded-lg bg-white' id='email'  />
        <input type="text" placeholder='password' className='border-0 p-3  rounded-lg bg-white' id='password'  />
        <button  className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>  Sign UP </button>
       </form>

       <div className='flex gap-2 mt-6 '>
        <p>Have an account?</p>
        <Link to="/sign-in">
        <span className='text-blue-700 font-bold'>Sign In </span>
        </Link>
       </div>
    </div>
  )
}
