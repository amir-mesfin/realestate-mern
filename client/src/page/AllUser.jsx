import React, { useEffect, useState } from 'react'

export default function AllUSer() {
  const [error, SetError] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [allSeller, setAllSeller] = useState([]);

  useEffect(() => {
    const GetAllUser = async () => {
      try {
        const res = await fetch("/api/adminWork/getUSer");
        const data = await res.json();
        if (data.succuss === false) {
          SetError(data.mess);
        } else {
          setAllAdmin(data.filter((u) => u.role === "admin"));
          setAllSeller(data.filter((u) => u.role === "seller"));
          setAllUser(data.filter((u) => u.role === "user"));
        }
      } catch (err) {
        SetError(err);
      }
    }
    GetAllUser();
  }, []);

  const DeleteUser = async (userId, role) => {
    try {
      const res = await fetch(`/api/adminWork/deleteUser/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        SetError(data.massage);
        return;
      }

      if (role === 'user') setAllUser(prev => prev.filter(u => u._id !== userId));
      if (role === 'seller') setAllSeller(prev => prev.filter(u => u._id !== userId));
    } catch (err) { }
  }

  const renderUserCard = (userList) => (
    <div className='flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 sm:px-5 sm:py-4 rounded-lg shadow-sm' key={userList._id}>
      <div className='flex items-center gap-3 sm:gap-5 w-full sm:w-auto'>
        <img className='w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover' src={userList.avatar} alt="" />
        <div className='flex flex-col items-start sm:items-center'>
          <p className='text-slate-700 font-semibold truncate'>{userList.username}</p>
          <p className='text-slate-400 text-sm truncate'>{userList.email}</p>
        </div>
      </div>
      <div className='mt-2 sm:mt-0'>
        {  (userList.role === 'user') &&<button className='bg-red-300 hover:bg-red-400 py-1 px-3 sm:py-2 sm:px-5 rounded-xl text-white text-sm sm:text-base'
          onClick={() => DeleteUser(userList._id, userList.role)}>Delete</button>}
           { (userList.role === 'seller' )  &&<button className='hover:bg-red-400 bg-red-300 py-1 px-3 sm:py-2 sm:px-5 rounded-xl text-white text-sm sm:text-base'
          onClick={() => DeleteUser(userList._id, userList.role)}>Delete</button>}
      </div>
    </div>
  )

  return (
    <div className='p-4'>
      <h1 className='text-blue-900 text-2xl font-semibold text-center mb-6'>ALL Website Users</h1>

      {/* Admin Section */}
      <div className='flex flex-col gap-4 mb-6'>
        <h3 className="text-lg md:text-xl font-bold text-red-600 border-b-2 border-red-400 pb-1">
          All Admin
        </h3>
        {allAdmin.map(renderUserCard)}
      </div>

      {/* Seller Section */}
      <div className='flex flex-col gap-4 mb-6'>
        <h3 className="text-lg md:text-xl font-bold text-yellow-600 capitalize border-b-2 border-yellow-400 pb-1">
          All Seller
        </h3>
        {allSeller.map(renderUserCard)}
      </div>

      {/* User Section */}
      <div className='flex flex-col gap-4 mb-6'>
        <h3 className="text-lg md:text-xl font-bold text-green-600 border-b-2 border-green-400 pb-1">
          All User
        </h3>
        {allUser.map(renderUserCard)}
      </div>
    </div>
  )
}
