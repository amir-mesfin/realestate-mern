import React, {useRef} from 'react'
import { useSelector } from 'react-redux'


export default function Profile() {
const {currentUser} = useSelector((state)=>state.user);
const avatarURL = currentUser?.avatar?.includes("googleusercontent") && !currentUser.avatar.includes("=")
  ? currentUser.avatar + "=s96-c"
  : currentUser?.avatar || "https://www.w3schools.com/howto/img_avatar.png";

  const fileRef = useRef(null)
  return (
    <div className='max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-9'>Profile</h1>
     <form  className='flex flex-col gap-4'>
      <input  ref={fileRef}
      hidden
       className='border-0 p-4 focus:outline-blue-300  rounded-lg bg-white '
      type="file" />
      <img  onClick={()=> fileRef.current.click()}
      src={avatarURL}
      alt="profile img" 
      className='rounded-full h-39 w-39 object:cover cursor-pointer mt-2 self-center ' />
      <input type="text"
             placeholder='username'
             className='border-0 p-4 focus:outline-blue-300  rounded-lg bg-white '
             id="username" />
      <input type="text"
             placeholder='email'
             className='border-0 p-4 focus:outline-blue-300  rounded-lg bg-white '
             id="email" />
      <input type="text"
             placeholder='password'
             className='border-0 p-4 focus:outline-blue-300  rounded-lg bg-white '
             id="password" />
    <button className='bg-slate-700  p-4 rounded-lg text-white font-semibold text-xl uppercase hover:opacity-95 disabled:opacity-80'> Update</button>
     </form>
     <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>
     </div>
    </div>
  )
}
