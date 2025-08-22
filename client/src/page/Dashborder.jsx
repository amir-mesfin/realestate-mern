import React from 'react'

export default function Dashborder() {
  return (
    <div className='flex  justify-between i gap-4 my-8'>
       <div className='w-1/5 bg-white pt-12 rounded-xl '>
          <ul className=' flex flex-col gap-8 '>
            <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>User</li>

            <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>Message</li>
              <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>Offer Real_state</li> 
               <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>Rent Real_state</li> 
                <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>Sale Real_state</li>
                  <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>Add  admin</li> 
                   <li className='p-3 text-lg font-semibold mx-5 bg-blue-100 rounded-xl hover:bg-blue-400 hover:text-white'>add Seller</li>
           
          </ul>
       </div >


       <div className='w-3/5 '></div>


       <div className='w-1/5 bg-white mr-7 py-3 px-4'>
       <div className='flex justify-between' >
       <h2 className='text-xl font-semibold text-slate-600'> TOp Agent</h2>
       <p className='text-slate-600'>...</p>
       </div>
       </div>
    </div>
  )
}
