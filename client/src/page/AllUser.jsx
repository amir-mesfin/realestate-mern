import React, { useEffect, useState } from 'react'

export default function AllUSer() {
  const [error, SetError] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [allSeller, setAllSeller] = useState([]);
  
  console.log(allUser);
  console.log(allAdmin);
  console.log(allSeller);

  useEffect(()=>{
      const GetAllUser = async () =>{
           try{
            const res = await fetch("/api/adminWork/getUSer");
            const data = await res.json();
            if(data.succuss === false){
              SetError(data.mess)
            }else{
              setAllAdmin(data.filter((u) => u.role === "admin"));
              setAllSeller(data.filter((u) => u.role === "seller"));
              setAllUser(data.filter((u) => u.role === "user"));
             }
            //  console.log(data)
            // setAllUser(data);
           }catch(err){
            SetError(err);
           }
      }
      GetAllUser();
  },[]);

const DeleteUser = async (userId,role) =>{
     console.log(role);
       try{
             const res = await fetch(`/api/adminWork/deleteUser/${userId}`,{
               method:"DELETE",
             });
             const data  = await res.json();
             if(data.success === false){
               SetError(data.massage);
               return;
             }

            //  console.log(data);
            if(role=='user'){
              setAllUser((prev) => prev.filter((u) => u._id !== userId));
                
            }
            if(role=='seller'){
              setAllUser((prev) => prev.filter((u) => u._id !== userId));
                
            }


       }catch(err){

       }

}
  return (
    <div>
      <h1 className='text-blue-900  text-2xl font-semibold  mx-auto'> ALL Website  User </h1>
      
      <div className=' flex flex-col  gap-6 mt-5'>   
              <h3 className="text-lg md:text-xl font-bold text-red-600 border-b-2 border-red-400  pb-1">
         All  Admin
        </h3>
      {
          allAdmin?.map((userList)=>(
            <div className='flex justify-between items-center ' key={userList._id}>
               <div className='flex items-center gap-15 '
                  > 
                    <img  className="h-26 w-26 rounded-full" src={userList.avatar} alt="" />
                      <div className='flex flex-col items-center'>
                              <p className='text-slate-700 font-semibold '>{userList.username}</p>
                              <p className='text-slate-400 text-sm'>{userList.email}</p>
                    </div>
                 </div>
                 
            </div>
            
          ))
      }
      </div>
      <div className=' flex flex-col  gap-6 mt-5'>   
              <h3 className="text-lg md:text-xl font-bold text-yellow-600 capitalize border-b-2 border-yellow-400 pb-1">
           All Seller
        </h3>
      {
          allSeller?.map((userList)=>(
            <div className='flex justify-between items-center bg-white px-5 rounded-lg' key={userList._id}>
               <div className='flex items-center gap-5 '
                  > 
                    <img  className="h-26 w-26 rounded-full" src={userList.avatar} alt="" />
                      <div className='flex flex-col items-center'>
                              <p className='text-slate-700 font-semibold '>{userList.username}</p>
                              <p className='text-slate-400 text-sm'>{userList.email}</p>
                    </div>
                 </div>
                 <div>
                 <button className='bg-red-400 py-2 px-5 rounded-xl   text-white '
                  onClick={()=> DeleteUser(userList._id,userList.role)}  >Delete</button>
                     
                 </div>
            </div>
            
          ))
      }
      </div>
      <div className=' flex flex-col  gap-6 mt-5'>   
              <h3 className="text-lg md:text-xl font-bold text-green-600 border-b-2 border-green-400 pb-1">
           All User
        </h3>
      {
          allUser?.map((userList)=>(
            <div className='flex justify-between items-center  bg-white px-5 rounded-lg' key={userList._id}>
               <div className='flex items-center gap-5 '
                  > 
                    <img  className="h-26 w-26 rounded-full" src={userList.avatar} alt="" />
                      <div className='flex flex-col items-center'>
                              <p className='text-slate-700 font-semibold '>{userList.username}</p>
                              <p className='text-slate-400 text-sm'>{userList.email}</p>
                    </div>
                 </div>
                 <div>
                 <button className='bg-red-400 py-2 px-5 rounded-xl   text-white '
                 onClick={()=> DeleteUser(userList._id,userList.role)}   >Delete</button>
                     
                 </div>
            </div>
            
          ))
      }
      </div>
    </div>
  )
}
