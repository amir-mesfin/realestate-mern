import React, { useEffect, useState } from 'react'

export default function AddSeller() {
  const [error, SetError] = useState(null);
  const [requestUser, setRequestUser] = useState([])
  useEffect(()=>{
      const GetProve = async () =>{
           try{
            const res = await fetch("/api/user/requestSeller");
            const data = await res.json();
            if(data.succuss === false){
              SetError(data.mess)
            }
             console.log(data)
            setRequestUser(data);
           }catch(err){
            SetError(err);
           }
      }
      GetProve();
  },[]);

const acceptSeller = async (userId) =>{
       try{
            //  const res = await()
       }catch(err){

       }

}
  return (
    <div>
      <h1 className='text-blue-900  text-2xl font-semibold  mx-auto'> Add Seller </h1>
      
      <div className=' flex flex-col  gap-6 mt-5'>    
      {
          requestUser?.map((userList)=>(
            <div className='flex justify-between items-center'>
               <div className='flex items-center gap-5 '
                  key={userList._id}> 
                    <img  className="h-26 w-26 rounded-full" src={userList.avatar} alt="" />
                      <div className='flex flex-col items-center'>
                              <p className='text-slate-700 font-semibold '>{userList.username}</p>
                              <p className='text-slate-400 text-sm'>{userList.email}</p>
                    </div>
                 </div>
                 <div>
                 <button className='bg-blue-400 py-2 px-5 rounded-xl   text-white '
                  onClick={()=> acceptSeller(userList._id)}  >accept</button>
                     
                 </div>
            </div>
            
          ))
      }
      </div>
    </div>
  )
}
