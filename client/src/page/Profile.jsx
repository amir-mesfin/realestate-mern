import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
const {currentUser} = useSelector((state)=>state.user);
const avatarURL = currentUser?.avatar?.includes("googleusercontent") && !currentUser.avatar.includes("=")
  ? currentUser.avatar + "=s96-c"
  : currentUser?.avatar || "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <div >
     <h1 className='text-3xl text-center font-semibold my-9'>Profile</h1>
     <form action="">
      <img src="" alt="" />

     </form>
    </div>
  )
}
