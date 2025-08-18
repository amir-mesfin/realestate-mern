import React from 'react';
import { Link } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  
  const {currentUser} = useSelector(state=>state.user);
  // console.log(currentUser.avatar);
  const avatarURL = currentUser?.avatar?.includes("googleusercontent") && !currentUser.avatar.includes("=")
  ? currentUser.avatar + "=s96-c"
  : currentUser?.avatar 

  return (
    <header className='bg-slate-200 shadow-md ' >
       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/" className='md:flex border-0  hover:border-2 hover:border-[#fff] hover:p-3 '>
        <img src='http://res.cloudinary.com/de91zvrzu/image/upload/v1755390858/fmbw5k0za7akjpwavc1k.ico' alt=""  
         className='w-20 h-10 rounded-xl mr-5'/>
        <h1 className='font-bold text-sm sm:text-xl md:text-2xl flex flex-wrap'>
          <span className='text-slate-500'>Abushe</span>
          <span className='text-slate-700 '>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search....' className='bg-transparent focus:outline-none w-24 sm:w-64 lg:w-95' />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className='flex justify-between space-x-6  items-center' >
          <Link to="/home">
          <li className='hidden  sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to="about">
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
         
          <Link to="/profile">
          { currentUser? (
             <img src={avatarURL}
             alt="profile"
             className="w-10 h-10 rounded-full object-cover ml-8" />
          ):
          <ul>
              <li className='text-slate-700 hover:underline'> Sign In</li>
          </ul>
          }
          
          </Link>          
        </ul>
        </div>
    </header>
  )
}
