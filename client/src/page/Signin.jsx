
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate();

  const handleChange = (e) =>{
    // console.log(e.target.id);
    
    const {id,value}=e.target;
   setFormData(
    {
      ...formData,
      [id]:value
    }
   )
  }
  const handleSubmit = async (e) =>{
    
   e.preventDefault();
   try{
    setLoading(true);
    const res = await fetch('/api/auth/signin',{
       method:'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify(formData),
       credentials: 'include' 
    });
    const data =  await res.json();
    if(data.success === false){
     setError(data.message);
     setLoading(false);
     return
    }
   //  console.log(data);
   setLoading(false);
   setError(null);
   navigate("/");

   }catch(err){
     loading(false);
     setError(err.message);
   }
   }
  return (
    <div className='p-7 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center  my-8 font-semibold'>
           Sign In
       </h1>
       <form onSubmit={handleSubmit} 
       className='flex flex-col  gap-4 '>
        <input type="text" 
        placeholder='email' 
        className='border-0 p-3 focus:outline-blue-300  rounded-lg bg-white' 
        onChange={handleChange}
        id='email'  />
        <input type="text" 
        placeholder='password' 
        className='border-0 p-3 focus:outline-blue-300  rounded-lg bg-white'
         onChange={handleChange} 
         id='password'  />
        <button  disable={loading} type='submit' 
        className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            { loading?'Loading...':'Sign In'} 
            </button>
       </form>

       <div className='flex gap-2 mt-6 '>
        <p>👉  Don't Have an account?</p>
        <Link to="/sign-up">
        <span className='text-blue-700 font-bold'>Sign UP </span>
        </Link>
       </div>
       {error && <p className='text-red-500 mt-7 '>{error}</p>}
    </div>
  )
}
